/* eslint-disable */

import { Suspense, createContext, lazy, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// ES Module 불러오기 : import 구문

// a. import 지은 변수명 from '불러오는 모듈 경로'
//     : 모듈에서 변수 하나만 가져오는 방법  
//         -> export defalut {여려변수들} 을 사용한다면, b구문처럼 '지은 변수명'을 객체명처럼 사용 가능 

//             ex) import a from './data.js';


// b. import * as 지은 변수명 from '불러오는 모듈 경로';
//     : 모듈에서 모든 변수를 가져오는 방법 
//       (*의 의미 : SQL에서 모든 변수 가져오는것 의미.. -> 이걸 '지은 변수명'으로 통칭해 객체명화 하는 것)
//         -> '별칭.프로퍼티' or '별칭.메서드명(파라미터....)'' 를 통해 값을 지칭해서 불러옴

// c. import { 가져올 변수명(여러개도 가능) } from '불러오는 모듈 경로';
//     : 모듈에서 1개 ~ 여러개 변수를 가져오는 방법
//         -> 그나마 가장 범용성이 좋은 방법 

//             ex) import {a, b} from './data.js';

// (중요) data.js을 Module로서 간주하여 그 js파일의 data라는 object 객체 배열(유저 데이터로 간주)을 해당 js 영역에 존재하는 변수같이 사용할 수 있게 import 하겠다는 의미  
import data from './data.js';
// import Detail from './pages/Detail.js';
// import Cart from './pages/Cart.js'

// lazy import = lazy( () => import('파일 상대경로') ) 
//  : (react 어플 성능개선 팁1) aplication 배포시 모든 component들을 통합하여, 하나의 html, js 파일로 합본해 퉁치는 react 특성 상, 초기 로딩 시간이 약점이 될 수 밖에 없는 구조인데..
//     -> 그 약점을 일부 나중에 등장하는 컨포넌트들을 통합 js파일에서 제외시켜, 별도로 import하도록 조치하자는 데서 비롯된 방식
//        (= 나중에 늦게 import해줘라는 개념으로 볼 수 있겠다)
//     -> react에서는 lazy ( 무명함수 parameter) 형식으로 구현

// (중요) Detail과 Cart 컴포넌트는 react aplication 배포시 통합되는 하나의 html, js 파일에 포함되지 않고, 별개의 파일로서 import되는 구조로 생성되게 하며, 해당 컴포넌트들이 로딩될 떄 비로소 Module로서 해당 파일들을 다운받도록 함
//  -> 단점 : Detail과 Cart 컴포넌트 페이지 진입시, 당연히 시간이 오래걸림
const Detail = lazy( () => import('./pages/Detail.js') )
const Cart = lazy( () => import('./pages/Cart.js') )

// (설명) react-bootstrap 라이브러리 사용에 필요한 css정보를 import
import 'bootstrap/dist/css/bootstrap.min.css';

// (설명) react-bootstrap 웹사이트에 예시로 올라온 component 사용을 위해서, 각 component 명을 {}안에 import해서 해당 jsx에 가져다 줌
import { Container, Row, Col, Navbar, Nav }  from 'react-bootstrap';

// (설명) js의 import 예약어를 통한 모듈시스템은 이미지를 가져온 뒤 alias(별칭인 변수)처리해서 바로 사용이 가능함
//  -> (중요!) 단! react에서는 모든 js파일이나 image같은 걸 모듈화시켜 import로 가져올 때, src안에 반드시 있어야 에러가 발생 안 함 
import img from './img/image2.jpg';

// (설명) react-router-dom 라이브러리를 모듈로 가져와서, Routes, Route, Link component를 사용할 수 있게함
//  -> Routes
//      : 해당 component에서 웹페이지의 다른 개별 페이지들의 url 정보를 담는 path 속성과 내용에 대한 element라는 속성을 가지고 있는 Route라는 component들을 navigation처럼 묶어줘서 관리하는 일종의 container역할을 하는 component

//  -> Route
//      : 해당 웹페이지 내부의 다른 개별 페이지들의 정보를 담고 있는 component 
//        (path : url 정보를 가지는 속성, element : 해당 내부 페이지가 가지는 component 정보)

//  -> Link  
//      : react-router-dom 라이브러리에서 일종의 a태그와 비슷한 역할을 하는 component
//        (to : 해당 Link component를 클릭 시, 연결되어야 하는 Route component의 url정보를 가지는 속성)         
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

// (설명) ajax를 통해 서버와 통신하게 하는 axios 라이브러리를 모듈로 가져와서, axios object를 사용할 수 있게 함
import axios from 'axios'

// react기반 웹페이지에서 ajax요청 관련 상태값 및 값을 편하게 가져오고 개발에 쓰게 하기 위한 react-query 라이브러리를 모듈로 import하여 가져오는 코드
import { useQuery } from '@tanstack/react-query' 

// (중요) public 폴더의 존재 의의
//  : 개발이 끝나고, bulid를 하여 소스코드를 압축할 때, src 폴더에 있던 코드와 파일은 다 압축이 되는데 public 폴더에 있는 것들은 그대로 보존
//    (= 만약 형태를 보존하고 싶은 이미지, txt, json 등 수정이 필요없는 static 파일이 있다면, public 폴더에 넣으면 됨)

//   # (주의) public 폴더의 파일의 경우는 src 속성으로 경로를 '/파일명.확정자'로 입력해도 접근이 수월함
//      -> 단! 도메인 URL이 'www.lsh.com/자원명/~' 같이 서브 도메인 경로가 붙는 경우에는 그에 맞게 수정해야함 
//          ->  react에서 권장하는 공식적인 public폴더 파일 사용 추천 방법은 {process.env.PUBLIC_URL}를 사용
//              (= process.env 객체는 Node.js의 환경 변수에 접근할 수 있는 객체로, 개발 환경 또는 빌드 시 설정한 환경 변수의 값을 가져올 수 있고,  PUBLIC_URL은 그 중 act 애플리케이션의 빌드 시에 설정된 public URL 값을 나타냄)

//              ex) <img src="/logo192.png" width="80%" />
//                    -> 'www.lsh.com/goods' 라는 페이지에 해당 image태그를 rendering해야 하는 경우.. 경로명을 고쳐야함
//                         -> goods 까지 포함해서 <img src="/goods/logo192.png" width="80%" /> 

// (중요) Context API
//   : props는 컴포넌트의 계층구조가 깊어지고 넓어지면 사용하는게 노가다에 가깝다는 것을 해결하기 위한 방책 중 하나로 react에서 기본제공하는 API
//      -> 대충 공유한 state정보를 저장하는 context 객체를 생성하고 나면, 그 context객체에 접근가능한 component를 지정하고 state의 종류를 지정해서, 해당 컴포넌트의 후손들이 자유롭게 state에 접근가능하게 함

//   # 사용법
//      1) createContext()로 context 제작
//      2) 해당 context를 사용할 component를 <context명.Provider> 태그로 감쌈
//      3) <context명.Provider> 안에 value 속성을 추가하고, 공유할 state들을 js {}안에 속성 객체형식으로 나열해 작성함
//      4) 제작한 context를 export 처리하고, 사용할 component 파일에서 해당 context가 저장된 변수를 import함
//      5) useContext(context명)라는 reacthooks 함수를 사용하여, 제작된 context1안의 state 들을 state 객체 형식으로 변환해서 반환함
//      6) 5번을 통해.. props 문법 없이 해당 component와 후손들이 context안에서 공유하기로 한 state값들을 static 값 마냥 가져다 씀 

//         ex) export let Context1 = createContext();

//             <Context1.Provider value={{ stock, shoes }}>
//                <Detail shoes = {shoes} /> 
//             </Context1.Provider>

//             ------------(다른 component가 있는 jsx 모듈 안에서...)-----------
//             import { Context1 } from '파일경로';

//             ------------(원하는 Detail가문 내 compoent안에서..)--------------
//             let example = useContext(Context1);
//               -> example.state명[index번호] 식으로 사용

//   # (주의) Context API를 잘 안쓰는 이유
//       -> (중요!) 결론 : 이 2가지 이슈들 문제로... 아예 전역으로 쓸 state를 나열하고, 별 문제없이 가져다 쓰게하자는 외부 라이브러리 'redux'를 쓰게 됨

//       1) Context랑 연관된 전체 component 가문들의 경우 무지성적 rerendering 이슈
//          : 해당 context의 state를 안쓰는 component들도 만약 context를 쓰기로 한 component의 가문 안에 소속된 경우...
//             -> context의 state들을 쓰던말던 걔들이 변경될때마다, 모든 가문구성원 component들은 일괄적으로 rerendering 됨...
//                (= 비효율적인 rendering 이행으로 인해, 컴퓨터 자원 낭비가 심하고, 성능으로 말이 안 나올수가 없음)

//       2) Context를 직접 사용한 component는 재사용이 어려움
//          : 어차피 component에서 context를 가져다 쓸거면, 또 모듈로 context, useContext를 모듈로 가져와야 하는데? 
//              -> 그렇게 API가 적용된 component를 또 다른 모듈에서도 재사용을 하게 되어 중첩되기 시작하면?
//                  -> 결국 기존 props처럼 프로그래머의 노가다를 요구하게 되고, 사람의 실수로 인한 비효율적 문제가 터져나오게 됨


// createContext 함수
//  : state를 저장해주고, 이를 어떤 component에서라도 가져다 쓸수 있게 하는 context(= context API와 연관)를 제작해주는 함수
//    (= state변수를 전역적으로 쓸수 있게 하는 매개체인 context객체를 제작해주고, 그 메모리 레버런스 위치를 반환해준다 이거)
export let Context1 = createContext();

function App() {

  // state변수 shoes는 data.js를 모듈로 삼아 상품정보를 담은 object형식의 자료형을 배열로 담은 data를 초기값으로 입력받음
  let [shoes, setShoes] = useState(data);
  
  // (설명) Context1이라는 변수에 담은 context를 통해 손자건 증손자건 모든 component에서 가져다 쓰는걸 유도하는 state변수
  //   -> 하단의 context1.provider 태그에 detail 컴포넌트의 후손들에게 공유될 state로 쓰일 예정
  let [stock, setStock]= useState([10, 11, 12]);

  // useNavigate 함수
  //  : Link component와 유사하면서도, 확장기능을 수행하는 react hooks와 유사한 react router에 존재하는 react hooks 함수의 일종
  //     - useNavigate('url주소')
  //        : <Link to = "url주소" /> 와 유사

  //     - useNavigate(+ or -)
  //        : +는 횟수만큼 브라우저의 앞페이지로 돌아가기, -는 횟수만큼 브라우저의 뒤로가기 실행과 같음
  let navigate = useNavigate();

  // (숙제) 버튼을 누르면 서버에서 상품데이터 3개를 가져와서 메인페이지에 상품카드 3개 더 생성시, 서버로부터 받은 데이터를 저장할 state변수 extraShoes
  let [extraShoes, setExtraShoes] = useState(null);

  // (설명) 도메인 당 5mb의 문자열만 넣을 수 있는 localStorage & sessionStorage에 array/object를 저장하기 위한 변수
  let obj = {name : 'kim'};

  // localStorage & sessionStorage
  //  : 웹 브라우저에서 데이터를 저장하는 데 사용되는 옵션들
  //    (= 서버가 아닌 client 쪽에 저장해서 사용할 로직과 이에 필요한 데이터를 저장하는 공간)
  //        -> state들을 localStorage에 저장하도록들 은근 많이 구현하는 케이스가 많옴
  //            ex) redux-persist : redux의 전역 state들을 실시간으로 localstorage로 구현하게 하는 라이브러리 녀석

  //   # localStorage & sessionStorage 공통 특징
  //      1) 문자열만 저장 가능
  //      2) key, value 형식 저장
  //      3) 수정 불가 (= 삭제 후 생성 다시 해야..)

  //   # localStorage & sessionStorage 차이점
  //      1) 데이터 수명
  //          - localStorage   : 사용자가 정리하기 전까지 유지
  //          - sessionStorage : 사용자와의 현재 세션이 유지되는 동안만 유지 (= 탭이나 브라우저 종료되면 삭제)

  //      2) 접근 범위
  //          - localStorage   : 동일한 도메인(사이트) 내의 모든 웹 페이지에서 공유됨 (= 그 이외의 웹페이지에서는 참고 불가)
  //          - sessionStorage : 사용자와의 현재 세션이 유지되는 동안 모든 탭 간에 공유가 가능

  //      3) 용도
  //          - localStorage   : 지속적인 상태 정보(ex : 유저 설정, 로그인 정보)
  //          - sessionStorage : 임시 정보 (ex : 장바구니 정보)

  //      4) 저장 크기
  //          - localStorage   : 도메인(사이트)마다 5MB
  //          - sessionStorage : 20MB

  //   # localStorage & sessionStorage 메서드
  //     - localStorage & sessionStorage.setItem(key값, value값)
  //        : 브라우저의 localStorage 항목에 key, value를 저장하기 위한 localStorage 객체의 내부함수

  //     - localStorage & sessionStorage.getItem(key값)
  //        : 브라우저의 localStorage 항목의 해당 key에 있는, value를 추출 위한 localStorage 객체의 내부함수

  //     - localStorage & sessionStorage.removeItem(key값)
  //        : 브라우저의 localStorage 항목에 해당 key에 해당하는 key, value를 삭제 위한 localStorage 객체의 내부함수


  // JSON 전역 객체
  //  : JS에서 JavaScript Object Notation(JSON)을 분석하거나 값을 JSON으로 변환하는 메서드를 가지는 전역객체

  //   # JavaScript Object Notation(JSON)
  //      : Javascript 객체 문법을 따르는 문자열 기반의 데이터 포맷으로.. 베이스가 된 문법이 JS의 object일뿐 어디서나 쓸수 있는 범용적 데이터 포맷
  //         -> JSON의 특성
  //            1) JSON은 순수히 데이터 포맷 (= 멤버변수 O , 메서드 X)
  //            2) 프로퍼티와 값을 구분시, 큰 따옴표("") 만 사용해서 구분할 수 있음
  //            3) JSON은 '문자열'로서 JSON은 그 전체에 해당하며, 이를 파싱(paring)하여 JS Object로 쓸 수 있게 변환함
  //               (= JSON 형식 데이터 그 자체로는 JS object 마냥 객체명.프로퍼티명 or 객체명['프로퍼티명']; 이런식으로 쓸 수 없음)

  //   # JSON 메서드
  //     - JSON.stringify(array/object 변수)
  //        : paramter의 array/object -> JSON 변환하여 문자열로서 저장 가능하게 하는 JSON 객체의 내부 함수
  //           -> 선택 사항으로 특정 속성만 포함하거나, 사용자 정의 방식으로 속성을 대체 가능

  //     - JSON.parse(JSON 형식 구문)
  //        : paramter의 JSON 형식 문자열을 JSON으로서 구문 분석하여, JSON구문 -> array/object나 숫자 문자 반환
  //           -> 선택적으로 분석 결과의 값과 속성을 변환해 반환
  //               -> BUT! object의 함수는 받아주지 못함


  // (설명) localStorage에 key, value를 저장하기 위한 명령어와 parameter
  //   -> JSON.stringify(객체)를 통해 array/object -> '문자열 형식 나열'로 변환
  //       -> JSON.stringify(객체)를 쓰지 않으면, [Object object] 라고 value값이 깨져나옴
  localStorage.setItem('data', JSON.stringify(obj) );

  // (설명) localStorage에 JSON 형식으로 저장한 data라는 key의 value를 log로 보여줌
  //   -> JSON 형식으로 저장한 데이터는 문자열로서 각 프로퍼티명에 ""가 붙음
  //       -> JSON.parse(JSON 형식 구문) 를 통해, JS의 데이터 타입으로 변경하면, 객체가 됨
  console.log(JSON.parse(localStorage.getItem('data') ).name );

  // (localStorage 숙제) 최근 본 상품 UI 기능 구현위해, 상세페이지 진입시 상품id를 localStorage에 순차적으로 저장되게 array형식으로 저장되게 해라
  //   -> 첫 페이지 접속시, 해당 데이터 저장을 위한 watchHistory라는 key에 저장된 빈 JSON 데이터를 넣어줌
  useEffect(()=>{

    localStorage.getItem('watchHistory') == null ?
    localStorage.setItem('watchHistory', JSON.stringify( [] )) : null;

  },[]) 

  // (tanstack) react-query
  //   : React Application에서 Hooks(use뭐시기 형식의 리엑트의 기능들을 함수형으로 사용가능하게 한 함수집합)형식의 함수를 통해 사용하여, component로부터 서버의 데이터 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트 하는 작업을 도와주는 라이브러리
  //      -> 그러니까, 대충 실시간으로 ajax 관련 지속적인 데이터 요청을 받고 응답해야 하는 서비스(실시간 SNS, 거래소)를 구현하는데 편하기에 도움이 되는 라이브러리라 볼 수 있겠다...
  //         (= redux 개량판인 toolkit도 RTK Query라고 비슷한걸 제공하니 참고)
  //             -> 사실, Redux state 변경함수 안에선 ajax요청하면 안 된다는 불편함을 변수별 useSlice()를 통해 전역 state안에서 해결할 수 있도록 해소하고, Redux state와 관련있는 ajax들을 효율적으로 관리하는데 더 집중하는 라이브러리에 가까움

  //    # react-query 사용법
  //      1) import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' 를 시작할 컴포넌트(= 사실상 최선조인 index.js)에 입력함
  //      2) QueryClient(); 를 통해 QueryClient의 객체를 선언해주고, 이 객체를 <QueryClientProvider clinet={QueryClient()를 받은 변수}> 태그를 선언하는데 사용함.. 
  //          -> <QueryClientProvider> 태그는 가장 react-query를 적용할 모든 컴포넌트 및 state를 감쌀수 있는 위치로 향한다
  //      3) useQuery()라는 hook을 통해, 그 안에 서버로 API요청을 그대로 비동기로 보내고 난뒤, 이를 변수로 받으면..? 그 변수로 component에 추가적인 state 없이도 쉽게 요청에 대한 결과나 상태를 체크하고, 조건에 따른 HTML 출력을 짤 수 있음 
  
  //          ex) let 변수명 = useQuery('아무 이름이나', () => 
  //                fetch('API url') or axios.get('API url')
  //                .then( (성공parameter) => {  

  //                  return 성공parameter.data;    -> 이후 result.멤버변수를 통해 ajax 요청에 대한 상태값 및 값을 state에 이식하지 않고도 받아올 수 있음
  //                }), 
  //                { 옵션명1 : 옵션값1 , ... , 옵션명n : 옵션값n }
  //              );

  //    # react-query 장점
  //      1) (중요) state 배치없이도, 내가 보낸 ajax 요청 성공/실패/로딩중 상태를 ajax요청결과를 담은 변수의 속성값으로 손쉽게 알 수 있음
  //          - result.isLoading : 현재 ajax요청이 로딩 중인지 여부를 true/false로 체크함
  //          - result.error     : 현재 ajax요청이 실패했는지 여부를  true/false로 체크함
  //          - result.data      : 현재 ajax요청이 성공했으면, 데이터가 들어오고, 이를 state 객체마냥 사용이 가능

  //      2) 1)의 특성을 이용해, ajax 요청의 결과에 따른 HTML 영역 내용을 조건문으로 쉽게 짤 수 있음    
  //      3) 자식 component에 props 객체의 멤버값으로 전송하지 않아도, 자식 또한 해당 값을 공유 가능함
  //          -> 정확히는 자식 component에도 같은 ajax요청을 보낼 시, 이를 중복되지 않도록 1번만 실행 후, 그 이후에는 캐싱한 내용을 사용하는 알고리즘임

  //      4) 주기적으로 ajax 요청을 날리고 내용을 최신화해줌
  //          -> 옵션 부분에 { staleTime : 숫자/mms }로 조절가능

  //      5) 실패시에도 마찬가지로 주기적으로 재시도 함
  //          -> 옵션 부분에서 마찬가지로 제어 가능

  // (설명) useQuery()를 통해 요청한 ajax의 결과나 상태값을 result라는 변수를 통해 알 수 있으며, 그 값들을 주기적으로 최신화하는 코드 (= state처리 안해도 ㅇㅋ)
  let result = useQuery(['작명'], () => 
    fetch('https://codingapple1.github.io/userdata.json')
    .then( (response) => {  

      // refetch(실시간으로 재요청) 확인용
      console.log('요청됨');
      return response.json();
    })

    // axios.get('https://codingapple1.github.io/userdata.json')
    // .then((a)=>{ return a.data })
    , { staleTime : 2000 }
  );

  // result.data;
  // result.isLoading;
  // result.error;


  return (
    <div className="App">

      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">LSH's shop!</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ () => navigate('/') }>Home</Nav.Link>
            <Nav.Link onClick={ () => navigate('/cart') }>Cart</Nav.Link>
          </Nav>

          {/* (설명) useQuery()로 받아온 ajax 상태값과 값들을 이용 하여, 어떤 화면을 내보낼지를 쉽게 결정 가능함*/}
          <Nav className="ms-auto">
            { result.isLoading && '로딩 중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav>

          {/* (설명) public 폴더의 파일은 src속성에 경로를 아무 제한없이 넣어도 되며, react에서는 {process.env.PUBLIC_URL}를 사용하면 서브 도메인의 변경을 신경쓰지 않아도 된다고 공식적으로 권장함 */}
          <img src={process.env.PUBLIC_URL + '/logo192.png'} width="50vh" />
        </Container>
      </Navbar>

      {/* (설명) react-router-dom에서 a태그와 같은 하이퍼링크 역할을 수행하는 Link component를 통해, to 속성의 url주소를 바탕으로 원하는 Route component의 component내용이 rendering 될 수 있도록 함 */}
      {/* <Link to = "/">홈</Link>
      <Link to = "/detail">상세페이지</Link> */}

      {/* (설명) (react 어플 성능개선 팁2) <Suspense> 태그 
            : fallback 속성의 값으로 HTML 태그를 넣으면, 컴포넌트가 로딩되는 동안 이 녀석이 임시적으로 출력됨*/}
      <Suspense fallback={ <div>로딩중임</div> }>

        {/* (설명)  container 역할인 Routes component를 호출하여, 해당 component에서 요청된 url에 따라 다른 component내용이 rendering 될 수 있는 정보를 가지고 있는 Route component들을 묶어서 선언 및 관리하고, 
                    item 역할인 Route component는 호출하면, 요청된 url정보를 각 path 속성값과 비교한 뒤, 그에 해당하는 Route component의 element 내용을 rendering 함 */}
        <Routes>
          <Route path = "/" element = { 
            <>
              {/* <div className="main-bg" style = {{ backgroundImage : 'url('+ img + ')'}} > */}
              <div className="main-bg"></div>
              <Container>
                <Row xs='3'>
                {
                  // (숙제) object 배열인 data를 초기값으로 받는 반복되는 state 배열인 shoes는 그 state 배열크기 만큼, 반복되는 내용을 component로 구현하게 하는 코드
                  shoes.map(function(a, i){
                    return(
                      <Shoes shoes={shoes[i]} key={i}></Shoes>
                    )
                  })
                }
                </Row>
              </Container>

              {/* (설명) axios 라이브러리를 통해 가져온 axios 객체의 멤버 함수 get 함수를 통해, 서버에 http 메서드 중 get방식으로 해당 url을 통해 요청을 보내는 버튼을 생성 */}
              <button onClick={ () => {

                // (설명) axios.get('url명')    <->      axios.post('url명', {name : 'kim'})   <- post는 요청자가 데이터를 보내면, 그걸 서버가 가공한 후 response를 보냄
                //   : 해당 url명으로 get요청을 하게하는 axios 라이브러리의 멤버함수
                //      -> .then( (결과값명) => {내용} )
                //           : 서버를 향한 요청이 성공시 실행할 코드 
                //              -> '결과값명'은 임의로 붙일수 있고, 서버가 보낸 모든 값(json이나 html)을 지칭함...
                //                  -> (중요!) json으로 돌아온 응답값은 axios에서는 json -> object array 형태로 자동 변경해 줌..
                //                      -> 사용자가 바라는 요청데이터 이외에, 어마어마한 상태값을 가지는 멤버변수도 많으니... 
                //                         '결과값명.data'로 사용자가 원하는 object array 데이터 꾸러미를 받고, 가공할때는 array에서 멤버객체를 지정해 시작하자
                //
                //      -> .catch( () => {내용} )
                //           : 요청 실패시 실행할 코드
                //
                //      -> finally( () => {내용})
                //           : ajax 성공/실패랑 관계없이 무조건 실행하는 코드
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((allResponse) => {
                  console.log(allResponse.data);
                  // (숙제) 서버로부터 받은 값으로 extraShoes state변수를 채우도록 setState함수 사용
                  setExtraShoes(allResponse.data);
                  
                  let copy = [...shoes, ...allResponse.data];
                  setShoes(copy);
                })
                .catch(() => {
                  console.log('요청 실패...');
                })
              }}>더보기</button>

            </>
          }/>

          {/* (설명) 'id'라는 url 파라미터(:id로 표기함)를 가져서, 사용자가 url에 입력하는 id값에 따라 rendering 되는 component의 내용을 다르게 구성할 수 있도록 하는 Route component
                -> 사용자가 넘긴 id값을 어떻게 전달받고 사용하는지는 element의 속성값으로 들어간 Detail 컴포넌트에서 useParam 함수에 대해 알아보면 됨 */}
          <Route path = "/detail/:id" element = { 
                                                  // (설명) <context명.Provider value={{ state1, ... , stateN}} >
                                                  //   : 생성한 context에 접근하도록 허락하고 싶은 component를 표시해주고, 그 녀석과 후손들까지 접근가능한 state는 무엇인지 value 속성의 속성객체 멤버들을 통해 표기함
                                                  //      -> 여기서는 Detail 컴포넌트로 하여금 context1이라는 context에 접근가능하게 함을 의미
                                                  <Context1.Provider value={{ stock, shoes }}>
                                                    <Detail shoes = {shoes} /> 
                                                  </Context1.Provider>
                                                } />
          

          {/* (설명) Nested Route(중첩 라우트)라고 불리는 구조
                : 쌩으로 url을 나열하는 것보다, 단계에 따른 깊이를 구별함으로서 해당 페이지 tree 구조에 대해 더 직관적으로 알 수 있음
                    -> (주의!) Nested Route구조가 아니더라도, 하위 Route들의 내용 코드는 <Outlet></Outlet>을 통해 상위 Route 요소에 rendering 위치를 정해줄 수 있음 */}
          <Route path = "/about" element = { <About /> } >
            <Route path = "member" element = { <div>멤버</div> } />
            <Route path = "location" element = { <div>위치</div> } />
          </Route>

          {/* (예시) Nested Route 구조 없이 쌩으로 나열된 Route들
          <Route path = "/about" element = { <About /> } />
          <Route path = "/about/member" element = { <div>멤버</div> } />
          <Route path = "/about/location" element = { <div>위치</div> } />  */}

          {/* (숙제) /event/one /event/two 페이지로 접속시 해당하는 페이지가 뜨게해봐라 */}
          <Route path = "/event" element = { <div>
                                              <h3>오늘의 이벤트</h3>
                                              <Outlet></Outlet>
                                            </div> } >
            <Route path = "one" element = { <div>첫 주문시 양배추즙 서비스</div> } />
            <Route path = "two" element = { <div>생일기념</div> } />
          </Route>

          <Route path="/cart" element={<Cart/>}>

          </Route>


          {/* (설명) path 속성값이 *인 경우 = 현재 지정된 url 외의 모든 url에 대해서 해당 element내용을 rendering 하라는 의미 */}
          <Route path = "*" element = { <div>404! 없는 페이지 </div> } />
        </Routes>
      </Suspense>


    </div>
  );
}

// (숙제) 상품목록을 컴포넌트로 만들어보기 + 반복문은 map으로 처리 + 모듈로 받아온 상품정보에 대한 binding도 다시 하기
//   -> 컴포넌트 자체는 블록의 모양을 유지하고, 반복은 부모인 app에서 수행 계획 
//      (= props를 통해 그 구성을 바꿀수 있게 조정)
function Shoes(props){

  // useNavigate 함수
  //  : Link component와 유사하면서도, 확장기능을 수행하는 react hooks와 유사한 react router에 존재하는 react hooks 함수의 일종
  //     - useNavigate('url주소')
  //        : <Link to = "url주소" /> 와 유사

  //     - useNavigate(+ or -)
  //        : +는 횟수만큼 브라우저의 앞페이지로 돌아가기, -는 횟수만큼 브라우저의 뒤로가기 실행과 같음
  let navigate = useNavigate();

  return (
    <>
      {/* (설명) 목록의 그림을 클릭하면, 상세조회 화면으로 이동 */}
      <Col onClick={ () => navigate('/detail/' + props.shoes.id ) }>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes.id + 1) + '.jpg'} width="80%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
      </Col>
    </>
  );

}

function About(){
  return(
    <div>
      <h4>회사정보</h4>
      {/* (설명) Routes구조에서 해당 component에 해당하는 url의 하위 url를 가지는 Nested Routes로 작성된 내용들이 어디로 위치할지 지정함  */}
      <Outlet></Outlet>
    </div>
  )
}


export default App;