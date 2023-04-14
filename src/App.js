import {Navbar} from './components';
import './App.css';
import { Layout, Typography, Space } from 'antd';
import {Link, Outlet} from 'react-router-dom'

const App = () => {

  

  return (
    <section className='app'>
      <div className="navbar">
        <Navbar />
      </div>
      <div className='main'>
        <Layout style={{padding:'20px',minHeight:'100vh'}}>
          <Outlet/>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            <Link to="/">
              Cryptopia
            </Link> <br />
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/crypto">Cryptocurrency</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </section>
  );
}

export default App;
