import { Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useGetCoinsQuery } from '../redux/cryptoApi';
import { Link } from 'react-router-dom';
import { Col, Card } from 'antd'
import millify from 'millify';
import Loader from './Loader'

const Crypto = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data, error, isLoading } = useGetCoinsQuery(count)
  const [coins, setCoins] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {

    const filteredData = data?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm))
    setCoins(filteredData)

  }, [data, searchTerm])
  if (isLoading){return <Loader/>}
  return (
    <>
      {!simplified && (
        <div><Input placeholder='Search Cryptos...' style={{ marginBottom: "20px", width: '50%' }} onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} /></div>
      )}
      <Row gutter={[10, 10]} className="crypto-card-container"> {/*Gutter = x , y distance */}
        {coins?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt={`${currency.name}`} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Crypto
