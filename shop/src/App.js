import logo from './logo.svg';
import './App.css';

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
        </Container>
      </Navbar>

      {/* <div className="main-bg" style = {{ backgroundImage : 'url('+ img + ')'}} > */}
      <div className="main-bg"></div>
      <Container>
        <Row>
          <Col sm>
            {/* (설명) public 폴더의 파일은 src속성에 경로를 아무 제한없이 넣어도 되며, react에서는 {process.env.PUBLIC_URL}를 사용하면 서브 도메인의 변경을 신경쓰지 않아도 된다고 공식적으로 권장함 */}
            <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col sm>
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col sm>
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col sm>
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
