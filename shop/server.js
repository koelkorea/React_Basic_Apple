// Nodejs
//  : 쉽게 말해, JS로 확장성 있는 네트워크 애플리케이션 백엔드를 구축할 수 있게 만들어주는 일종의 소프트웨어 플랫폼
//    (= JS의 특유의 이벤트 루프와 Non blocking I/O와 같은 특징들을 그대로 서버에 활용할 수 있음)

//   # Express 프레임워크
//      : 웹이나 모바일 환경 기반 애플리케이션을 위한 Node.js 기반 웹 애플리케이션 프레임워크
//         -> 프레임워크인 이유?
//             : 사용법이 까다롭고 딱딱하나, 이 녀석이 시키는데로 하면 쉽고 빠르고 간편하게 사용자가 원하는데로 서버 환경 커스터마이징이 가능함

//   # Nodejs + Express로 서버 구축하는법
//     1. nodejs 설치
//     2. 작업폴더만들고 에디터로 오픈
//     3. server.js 파일을 프로젝트 가장 바깥쪽에 생성 후, 아래 코드 작성하여 express 프레임워크를 모듈로 불러온 뒤, 
//         -> 서버 세팅과 구동을 위한 보일러플레이트 코드(Boilerplate code) 작성
//     4. 터미널에 npm init -y 입력 = node 서버 초기화 작업
//     5. 터미널에 npm install express 이것도 입력 = express 프레임워크 설치
//     6. 터미널에 nodemon server.js(없으면 node server.js)를 입력 = 서버 미리보기 띄우기
//     7. (참고) client-side rendering을 react기반 웹페이지에서 사용시, server와 client간 무난한 ajax 요청/반응 원하면
//         -> 1) npm install cors 입력
//                : 다른 도메인주소끼리 ajax 요청 주고받을 때 필요한 cors 정책 옵션 관련하여 쉬운 설정을 위한 cors 라이브러리를 설치
//            2) 다음과 같은 코드를 server.js 상단에 입력

// Nodejs + Express를 활용한 웹서버 세팅에 필요한 보일러플레이트 코드(Boilerplate code)들 1번
const express = require('express');
const path = require('path');
const app = express();

// (참고) client-side rendering을 react기반 웹페이지에서 사용시, server와 client간 무난한 ajax 요청/반응 원할시 사용하는 추가 코드 (cors 정책관련 기능을 지원하는 라이브러리 인스톨 필요)
app.use(express.json());       // express.json()  : 유저가 보낸 array/object 데이터를 출력해보기 위해 필요
var cors = require('cors');    // require('cors') : cors 라이브러리 모듈로 불러오는 코드
app.use(cors());               // cors()          : cors 라이브러리의 cors관련 옵션 설정을 초기화하여, 다른 도메인 간 ajax소통을 가능하게 하도록 만드는 함수


// Nodejs + Express를 활용한 웹서버 실행에 필요한 보일러플레이트 코드(Boilerplate code)들 
app.listen(8080, function () {
  console.log('listening on 8080')
}); 


// server.js에 보내고 싶은 파일의 위치를 'JS명.use()' API로 다음과 같이 추가 + 'JS명.HTML메서드()'를 통해 서버에서 요청이 들어오면 보내주는 것도 가능
// (= /list 로 접속하면 글목록 보여주고 /mypage 접속하면 마이페이지도 보여줌)

// (참고) express.static이라는걸 쓰시면, 특정 폴더안의 파일들을 static 파일로 고객들에게 잘 보내줄 수 있음 = bulid
app.use(express.static(path.join(__dirname, '/build')));

// get메서드와 url 조합을 통해, index.html을 보내도록 응답
app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/build/index.html'));
});

// get메서드와 url 조합을 통해, 도메인/product라는 url을 받으면 name의 속성과 속성값을 가진 json을 보내도록 응답
app.get('/product', function (요청, 응답) {
    응답.json({ name : 'black shoes' });
});

// 만약 세부적인 API요청에 따른 페이지 라우팅을 react-router 라이브러리를 통해 구현하고 싶다면? 
//  : 서버로 하여금 그렇게 하도록, 그에 해당하는 코드를 server.js에 가장 하단에 입력함
//    (= 사실상 react 라우터에서 주어진 url 외의 모든 형식에 해당하는 요청에 답하라는 그 코드와 같음)
//       -> 단지, 서버는 고객이 URL란에 설정해 둔 URL주소를 찾을 수 없을 때, index.html을 출력하게 되고, 그 이후 후속 라우팅 조치는 react-router가 수행하게 만드는 로직일 뿐
app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/build/index.html'));
});

// 별 필요 없으나... 만들어 놓은 react 웹페이지를 메인 도메인(대문)이 아니라, 서브 도메인에 발행하고 싶은 경우 
// (= / 이렇게 접속하면 public 폴더에 있던 그냥 main.html을 보여주고, /react 이렇게 접속하면 리액트로 만든 html을 띄우고 싶은 경우)

// 1. server.js에 메인 도메인과 서브 도메인의 설정을 다르게 작성

//   ex) [메인 url 사용시의, 폴더 경로 & 메인 url로 get요청시 보낼 html명 설정] 
//       app.use( '/', express.static( path.join(__dirname, 'public') ))
//       app.get('/', function(요청,응답){
//         응답.sendFile( path.join(__dirname, 'public/main.html') )
//       }) 

//       [메인 url/react 사용시의, 폴더 경로 & 메인 url로 get요청시 보낼 html명 설정] 
//       app.use( '/react', express.static( path.join(__dirname, 'react-project/build') ))
//       app.get('/react', function(요청,응답){
//         응답.sendFile( path.join(__dirname, 'react-project/build/index.html') )
//       })

// 2. package.json의 homepage라는 항목을 react 웹페이지 요청에 해당되는 서브 디렉토리명(= 메인 url/react)로 새로 기입

//    ex) {
//          "homepage": "/react",
//          "version": "0.1.0",
//          ... 등
//        } 