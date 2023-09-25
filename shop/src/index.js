import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as ServiceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import store from './store.js';

// react기반 웹페이지에서 routing 기능을 구현하기 위한, BrowserRouter component를 react-router-dom 라이브러리를 모듈로 import하여 가져오는 코드
import { BrowserRouter } from 'react-router-dom';

// redux를 통해 store.js를 통해 state들에 접근할 component와 그 후손들을 규정해줄 provider component를 쓰기위해 이를 모듈로서 redux라이브러리에서 가져오는 코드
import { Provider } from 'react-redux';

// react기반 웹페이지에서 ajax요청 관련 상태값 및 값을 편하게 가져오고 개발에 쓰게 하기 위한 react-query 라이브러리를 모듈로 import하여 가져오는 코드
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' 

// (설명) react-query 사용을 위해 <QueryClientProvider> 태그 안의 client속성의 속성명으로 들어갈 queryClient 객체를 생성하여, 그 자식 태그들이 전부 react-query 사용 사정권에 들수 있도록 하는 코드
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode
  //  : react 작동에 대한 엄격모드 스위치로.. 디버그 시 log가 2번 뜨는게 싫으면, 이거 해제하면 됨
  <React.StrictMode>
    {/* (설명) react-query 라이브러리에 접근할 수 있도록 연결해주어 component 구역을 지정하기 위한 태그*/}
    <QueryClientProvider client={queryClient}>
      {/* (설명) App 컴포넌트의 후손들까지 store.js에 저장된 state들을 redux 라이브러리를 통해 접근할 수 있음을 Provider 컴포넌트와 store 속성이 규정함 */}
      <Provider store={store} >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
ServiceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
