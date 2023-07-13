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


// (설명) react-bootstrap 라이브러리 사용에 필요한 css정보를 import
import 'bootstrap/dist/css/bootstrap.min.css';

// (설명) react-bootstrap 웹사이트에 예시로 올라온 component 사용을 위해서, 각 component 명을 {}안에 import해서 해당 jsx에 가져다 줌
import { Container, Row, Col, Navbar, Nav }  from 'react-bootstrap';

// (설명) js의 import 예약어를 통한 모듈시스템은 이미지를 가져온 뒤 alias(별칭인 변수)처리해서 바로 사용이 가능함
//  -> (중요!) 단! react에서는 모든 js파일이나 image같은 걸 모듈화시켜 import로 가져올 때, src안에 반드시 있어야 에러가 발생 안 함 
import img from './img/image2.jpg';


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
  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">LSH's shop!</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
            <Nav.Link href="#aboutUs">About Us</Nav.Link>
          </Nav>
          {/* (설명) public 폴더의 파일은 src속성에 경로를 아무 제한없이 넣어도 되며, react에서는 {process.env.PUBLIC_URL}를 사용하면 서브 도메인의 변경을 신경쓰지 않아도 된다고 공식적으로 권장함 */}
          <img src={process.env.PUBLIC_URL + '/logo192.png'} width="50vh" />
        </Container>
      </Navbar>

      {/* <div className="main-bg" style = {{ backgroundImage : 'url('+ img + ')'}} > */}
      <div className="main-bg"></div>
      <Container>
        <Row>
        {
          // (숙제) object 배열인 data를 초기값으로 받는 반복되는 state 배열인 shoes는 그 state 배열크기 만큼, 반복되는 내용을 component로 구현하게 하는 코드
          shoes.map(function(a, i){
            return(
              <Shoes shoes={shoes[i]} ></Shoes>
            )
          })
        }
        </Row>
      </Container>
    </div>
  );
}

// (숙제) 상품목록을 컴포넌트로 만들어보기 + 반복문은 map으로 처리 + 모듈로 받아온 상품정보에 대한 binding도 다시 하기
//   -> 컴포넌트 자체는 블록의 모양을 유지하고, 반복은 부모인 app에서 수행 계획 
//      (= props를 통해 그 구성을 바꿀수 있게 조정)
function Shoes(props){
  return (
    <>
      <Col sm>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes.id + 1) + '.jpg'} width="80%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
      </Col>
    </>
  );

}

export default App;
