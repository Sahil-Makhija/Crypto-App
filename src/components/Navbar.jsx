import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, Typography, Avatar } from 'antd';
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png'
const Navbar = () => {
    const [screenSize , setScreenSize] = useState(null)
    const [show ,  setShow] = useState(false)
    window.addEventListener('resize',()=>{
        setScreenSize(window.innerWidth)
    })
    useEffect(()=>{
        if (screenSize > 768){
            setShow(false)
        }
    },[screenSize])
    return (
        <>
            <div className="nav-container">
                <div className="logo-container">
                    <Avatar src={icon} size="large" />
                    <Typography.Title level={2} className="logo"><Link to="/Crypto-App">Cryptopia</Link></Typography.Title>
                    <Button className="menu-control-container" onClick={()=>{show ? setShow(false):setShow(true)}}><MenuOutlined /></Button>
                </div>
                <Menu  theme="dark" hidden={ show}  >
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/Crypto-App">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/Crypto-App/crypto">Cryptocurrency</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/Crypto-App/news">News</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </>
    )
}

export default Navbar
