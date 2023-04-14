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
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/Crypto-App/',
        element:<Home/>
      },
      {
        path:'/Crypto-App/news',
        element:<News searchTerm={'Cryptocurrency'} />
      },
      {
        path:'/Crypto-App/crypto',
        element:<Crypto/>
      },
      {
        path:'/Crypto-App/crypto/:coinID',
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

