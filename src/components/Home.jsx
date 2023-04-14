import React from 'react'
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCoinsQuery } from '../redux/cryptoApi';
import {Crypto , News} from './index'
import {Link} from 'react-router-dom'

import millify from 'millify';
import Loader from './Loader';

const Home = () => {
    const { Title } = Typography
    const { data, error, isLoading } = useGetCoinsQuery(10)
    const stats = data?.data?.stats
    if (isLoading){
        return    <Loader/>
    }
    return (
        <div>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row gutter={[32, 32]}>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={stats?.totalCoins} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={stats?.totalExchanges} /></Col>
                <Col span={12}><Statistic title="Total Market Cap:" value={millify(stats?.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(stats?.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={stats?.totalMarkets} /></Col>
                <Col span={12}><Statistic title="Total Amount" value={millify(stats?.total)} /></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
                <Title level={3} className="show-more"><Link to="/crypto">Show more</Link></Title>
            </div>
            <Crypto simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={3}><Link to="/news">Show more</Link></Title>
            </div>
            <News simplified />
        </div>
    )
}

export default Home
