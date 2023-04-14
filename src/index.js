import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider ,createBrowserRouter} from 'react-router-dom';
import { News , Crypto , Home , CryptoData } from './components';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    path:'/crypto-app/',
    element:<App/>,
    children:[
      {
        path:'/crypto-app/',
        element:<Home/>
      },
      {
        path:'/crypto-app/news',
        element:<News searchTerm={'Cryptocurrency'} />
      },
      {
        path:'/crypto-app/crypto',
        element:<Crypto/>
      },
      {
        path:'/crypto-app/crypto/:coinID',
        element:<CryptoData/>
      },
    ]
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

