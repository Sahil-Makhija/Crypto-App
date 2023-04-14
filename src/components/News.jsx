import React, { useState } from 'react'
import { useGetNewsQuery } from '../redux/cryptoNews'
import Loader from './Loader'
import { Card, Row, Col , Avatar ,Typography} from 'antd'
import moment from 'moment'

const News = ({ searchTerm, simplified }) => {
  const [count, setCount] = useState(simplified ? 5 : 15)
  const { data, error, isLoading } = useGetNewsQuery({ searchTerm, count })
  const {Title , Text} = Typography


  console.log(data)

  if (isLoading) { return <Loader /> }
  return (
    <>
      <Row >
      {data?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl} alt="" />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl } alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  )
}

export default News
