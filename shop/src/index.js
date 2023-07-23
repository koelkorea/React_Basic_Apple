import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// react기반 웹페이지에서 routing 기능을 구현하기 위한, react-router-dom 라이브러리를 모듈로 import하고 BrowserRouter component를 가져오는 코드
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode
  //  : react 작동에 대한 엄격모드 스위치로.. 디버그 시 log가 2번 뜨는게 싫으면, 이거 해제하면 됨
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
