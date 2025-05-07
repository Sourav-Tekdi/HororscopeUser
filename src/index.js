import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'; // ✅ Add this
import store from './store'; // ✅ Adjust the path to your actual store file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* ✅ Wrap App with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
