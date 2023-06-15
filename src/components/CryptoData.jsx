import React, {  useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCoinsDataQuery, useGetCoinHistoryQuery } from '../redux/cryptoApi'

import { Col, Row, Typography, Select, Card, Avatar } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import millify from 'millify';
import moment from 'moment';
import HTMLReactParser from 'html-react-parser';

import Loader from './Loader'
import LineChart from './LineChart';
import { useGetNewsQuery } from '../redux/cryptoNews';


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoData = () => {
  const { coinID } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')


  const { data, error, isLoading } = useGetCoinsDataQuery({ coinID, timePeriod })
  const { data: coinHistory } = useGetCoinHistoryQuery({ coinID, timePeriod })
  const cryptoDetails = data?.data?.coin;
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];


  //news item
  const { data: news } = useGetNewsQuery({ searchTerm: cryptoDetails?.name, count: 3 })

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.[`24hVolume`] && millify(cryptoDetails?.[`24hVolume`])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];
  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  if (isLoading) { return <Loader /> }
  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
          </Title>
          <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </Col>
        <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
          {time.map((date) => <Option key={date}>{date}</Option>)}
        </Select>

        <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />

        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
              <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">Other Stats Info</Title>
              <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Col className="coin-links">
            <Col className='coin-desc'>
              <Title level={2} className="coin-details-heading">
                About {cryptoDetails.name}
              </Title>
              <p>{HTMLReactParser(cryptoDetails.description)}</p>
            </Col>
            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
            {cryptoDetails.links?.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">{link.type}</Title>
                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
              </Row>
            ))}
          </Col>
          <Col className='crypto-news' style={{width:'95%';}}>
            <Title level={3} className="coin-details-heading">Realted News</Title>
            {news?.value.map((news, i) => (
              <Col key={i}>
                <Card hoverable className="news-card">
                  <a href={news.url} target="_blank" rel="noreferrer">
                    <div className="news-image-container">
                      <Title className="news-title" level={4}>{news.name}</Title>
                      <img src={news?.image?.thumbnail?.contentUrl} alt="" />
                    </div>
                    <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                    <div className="provider-container">
                      <div>
                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="" />
                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                      </div>
                      <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                    </div>
                  </a>
                </Card>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  )
}

export default CryptoData
