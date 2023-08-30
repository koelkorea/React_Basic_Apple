/* eslint-disable */

import { useState } from 'react';
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
import Detail from './pages/detail.js';

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

function App() {

  // state변수 shoes는 data.js를 모듈로 삼아 상품정보를 담은 object형식의 자료형을 배열로 담은 data를 초기값으로 입력받음
  let [shoes, setShoes] = useState(data);

  // useNavigate 함수
  //  : Link component와 유사하면서도, 확장기능을 수행하는 react hooks와 유사한 react router에 존재하는 react hooks 함수의 일종
  //     - useNavigate('url주소')
  //        : <Link to = "url주소" /> 와 유사

  //     - useNavigate(+ or -)
  //        : +는 횟수만큼 브라우저의 앞페이지로 돌아가기, -는 횟수만큼 브라우저의 뒤로가기 실행과 같음
  let navigate = useNavigate();

  // (숙제) 버튼을 누르면 서버에서 상품데이터 3개를 가져와서 메인페이지에 상품카드 3개 더 생성시, 서버로부터 받은 데이터를 저장할 state변수 extraShoes
  let [extraShoes, setExtraShoes] = useState(null);

  return (
    <div className="App">

      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">LSH's shop!</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={ () => navigate('/') }>Home</Nav.Link>
            <Nav.Link onClick={ () => navigate('/detail') }>Detail</Nav.Link>
          </Nav>
          {/* (설명) public 폴더의 파일은 src속성에 경로를 아무 제한없이 넣어도 되며, react에서는 {process.env.PUBLIC_URL}를 사용하면 서브 도메인의 변경을 신경쓰지 않아도 된다고 공식적으로 권장함 */}
          <img src={process.env.PUBLIC_URL + '/logo192.png'} width="50vh" />
        </Container>
      </Navbar>

      {/* (설명) react-router-dom에서 a태그와 같은 하이퍼링크 역할을 수행하는 Link component를 통해, to 속성의 url주소를 바탕으로 원하는 Route component의 component내용이 rendering 될 수 있도록 함 */}
      {/* <Link to = "/">홈</Link>
      <Link to = "/detail">상세페이지</Link> */}

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
        <Route path = "/detail/:id" element = { <Detail shoes = {shoes} /> } />
        

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


        {/* (설명) path 속성값이 *인 경우 = 현재 지정된 url 외의 모든 url에 대해서 해당 element내용을 rendering 하라는 의미 */}
        <Route path = "*" element = { <div>404! 없는 페이지 </div> } />
      </Routes>


    </div>
  );
}

// (숙제) 상품목록을 컴포넌트로 만들어보기 + 반복문은 map으로 처리 + 모듈로 받아온 상품정보에 대한 binding도 다시 하기
//   -> 컴포넌트 자체는 블록의 모양을 유지하고, 반복은 부모인 app에서 수행 계획 
//      (= props를 통해 그 구성을 바꿀수 있게 조정)
function Shoes(props){
  return (
    <>
      <Col>
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