import logo from './logo.svg';
import './App.css';

// react 라이브러리 사용시 jsx 형식을 사용하며, 그 내부에서 사용자지정 HTML 태그와 같은 <App>으로 명명되는 HTML conponent를 제작.. 
//  -> react 라이브러리는 index.js에서 ReactDOM.createRoot(document.getElementById('root')).render 함수 안에 이런 conponent를 조립해서 블록으로 장난감 만들듯 구성한 페이지를 코딩하면 
//     -> ReactDOM 라이브러리의 static함수인 render API를 통해, 이를 최종적으로 index.html의 root라는 id의 div태그에 전달함으로서, 브라우저가 rendering을 하게 함

// jsx(java script extention)란 무엇인가?
//  : js에 자체적인 확장 문법을 곁들은 형식의 언어로 이를 통해서 react는 프로그래머에게 코딩의 직관성과 편의성을 강력하게 제공함
//     -> 1. js에서 HTML component 작성을 통해, html 구성의 기본 벽돌과도 같은 component를 html 형식의 문법 거의 그대로 사용해서 쉽게 만들 수 있음
//            : 일단 component를 만들어두고, 모듈러를 통해 가져온다면 <컴포넌트명> 형식으로 작성하여, 작성한 html 코드를 쉽게 재사용이 가능함

//     -> 2. {}를 통해 선언한 js변수를 'DOM조작 명령어 없이' 작성해 둔 html component에 쉽게 대입하여 반응형 component가 되게 할 수 있음
//            : 이를 추후 서버로 부터 데이터를 받는 것과 조합하면, 아주 쉽게 html의 content를 효율적으로 채울 수 있음

//  # js가 아나라 jsx(java script extention)를 쓰는 이유?
//    : 순수 js만 써서하려면... 그냥 React.createRoot 함수를 짤없이 써야하는데, 이거보단 그냥 html 흉내라도 내게 하는게 더 직관적이라 jsx를 씀
//       -> babel 같은 ECMA5 JS 이전 버전으로 호환성 맞추는 컴파일러를 쓰면 다 확인이 어느정도 가능함을 확인 가능

//  # (주의!!) jsx(java script extention)도 엄밀하게는 js를 기반으로 함
//     1. js에서 예약어로 쓰이는 단어인데, HTML component에서도 속성으로 사용하는 단어가 있는 경우는 이를 다르게 쓸수 밖에 없음을 명심해야.
//        -> 그 대표적 CASE가 class로.. js에서는 class 타입을 선언할 때 사용하며, html에서는 html 요소의 속성으로 사용되기에... 그 양자는 서로 구분될수 있어야함

//           ex) class -> className

//     2. style 속성도 작성시 'style = { {key : 'value' , key : 'value' } }' 형식으로 작성해야 한다는 불편함이 존재함    
//        -> 엄밀하게는 js지 html이 아니기에 style을 기존 html 형식으로 ""안에 통쨰로 작성하면, js 문법으로는 도저히 해석하도록 코딩하기가 어렵기에..
//            -> 그래서 js 객체 형식인 {key : value}을 이용해서 style이 jsx 형식에서 코딩 가능하도록 구현

//     3. style 속성의 세부 속성들 중 font-size 같이 '-'가 들어 간 녀석들은 fontSize 값이 일종의 camalCase 형식으로 바꿔야함
//         -> js에서 -은 -연산자로서 작동하기 때문

//           ex) <h1 style= "color : red", font-size : '16px'>  ->  <h1 style={ {color : 'red' , fontSize : '16px'} }>

//  # {}문법의 포텐셜
//     : DOM조작 없이 내용을 바꾸고, JS변수(state, props와 연관)에 값을 넣기만 하면, 
//       최종적으로 render API를 통해 HTML 그 어떤 요소(속성, contents 등 어디를 불문하고) 에서라도 data binding(= 내용이 자동으로 반영)되어 render되게 만드는 시발점이 됨

function App() {

  let post = '강남 우동 맛집';

  return (

    <div className="App">
      <div className="black-nav">
        <h4 id={post} style={ {color : 'red' , fontSize : '16px'} }>블로그임</h4>
      </div>
      <h4>{post}</h4>
    </div>

  );
}




export default App;
