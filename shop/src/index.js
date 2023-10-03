import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 웹페이지의 PWA화를 위해, 오프라인에서의 웹구동을 통해 네이티브 앱처럼 동작하는 로직을 담닿나는 service-worker.js와 연관된 파일로 이를 모듈로 import하여 가져오는 코드
import * as ServiceWorkerRegistration from './serviceWorkerRegistration';

// reportWebVitals
//  : CRA(create-react-app)를 실행하면 나오는 디폴트 파일 중 하나로, 리액트 프로젝트를 생성하면 index.js에서 사용하며, 앱의 퍼포먼스 시간들을 분석하여 객체 형태로 보여주는 것이 목적
//    (그러니까, 개발자에게 중요한 지표를 위해 사용... 삭제해도 서비스 실행에는 문제없음)
//      -> reportWebVitals(console.log) 와 같이 다음과 같이 작성하여 콘솔에서 확인 가능

// CRA(create-react-app)를 실행하면 나오는 디폴트 파일인 reportWebVitals를 모듈로 import하여 가져오는 코드
import reportWebVitals from './reportWebVitals';

// REDUX의 전역 state변수들을 모아놓은 store.js를 모듈로 import하여 가져오는 코드
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

// 상단에 모듈로 불러온 ServiceWorkerRegistration 항목 부분이 적용될 수 있도록 하는 ServiceWorkerRegistration 내부의 함수
//  -> npx create-react-app 프로젝트명 --template cra-template-pwa을 통해 만들어진 초기코드는 ServiceWorkerRegistration.unregister();
ServiceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
