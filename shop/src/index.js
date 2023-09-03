import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store.js';

// react기반 웹페이지에서 routing 기능을 구현하기 위한, BrowserRouter component를 react-router-dom 라이브러리를 모듈로 import하여 가져오는 코드
import { BrowserRouter } from 'react-router-dom';

// redux를 통해 store.js를 통해 state들에 접근할 component와 그 후손들을 규정해줄 provider component를 쓰기위해 이를 모듈로서 redux라이브러리에서 가져오는 코드
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode
  //  : react 작동에 대한 엄격모드 스위치로.. 디버그 시 log가 2번 뜨는게 싫으면, 이거 해제하면 됨
  <React.StrictMode>
    {/* (설명) App 컴포넌트의 후손들까지 store.js에 저장된 state들을 redux 라이브러리를 통해 접근할 수 있음을 Provider 컴포넌트와 store 속성이 규정함 */}
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
