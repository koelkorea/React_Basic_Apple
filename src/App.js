// /* eslint-disable */
//  : eslint 모듈에서 잡아주는 warning 메시지가 안 뜨도록 조치하는 메시지로... 
//     -> 반드시 *주석으로 써야함


/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// react 라이브러리 사용시 jsx 형식을 사용하며, 그 내부에서 사용자지정 HTML 태그와 같은 <App>으로 명명되는 HTML conponent를 제작.. 
//  -> react 라이브러리는 index.js에서 ReactDOM.createRoot(document.getElementById('root')).render 함수 안에 이런 conponent를 조립해서 블록으로 장난감 만들듯 구성한 페이지를 코딩하면 
//     -> ReactDOM 라이브러리의 static함수인 render API를 통해, 이를 최종적으로 index.html의 root라는 id의 div태그에 전달함으로서, 브라우저가 rendering을 하게 함

// jsx(java script extention)란 무엇인가?
//  : js에 자체적인 확장 문법을 곁들은 형식의 언어로 이를 통해서 react는 프로그래머에게 코딩의 직관성과 편의성을 강력하게 제공함
//     -> 1. js에서 HTML component 작성을 통해, html 구성의 기본 벽돌과도 같은 component를 html 형식의 문법 거의 그대로 사용해서 쉽게 만들 수 있음
//            : 일단 component를 만들어두고, 모듈러를 통해 가져온다면 <컴포넌트명> 형식으로 작성하여, 작성한 html 코드를 쉽게 재사용이 가능함
//               -> (주의!) 단! 반드시 component는 하나의 <div> 태그만을 최상위 부모로 가지고 있어야 함
//                          (= 병렬의 div를 짜지 말라는 말... component는 말 그대로 jsx를 통해 작성하는 html의 최소단위라고 보면 됨)

//     -> 2. {}를 통해 선언한 js변수를 'DOM조작 명령어 없이' 작성해 둔 html component에 쉽게 대입하여 반응형 component가 되게 할 수 있음
//            : 이를 추후 서버로 부터 데이터를 받는 것 + props, state의 set함수를 통한 변경시 조건부 랜더링이라는 특성과 조합하면, 아주 쉽게 html의 content를 효율적으로 채울 수 있음

//     -> 3. 시멘틱 + get, set 캡슐화 구현 + 변경시 rendering 자동 수행되는 props와 state를 사용할 수 있음
//            - props : 전역변수는 아니지만, 또 페이지와 페이지 간 값을 주고 받을 목적을 가지고 선언된 get, set 로직이 적용된 변수
//            - state : 해당 페이지 안에서만 쓸 지역변수로서의 목적을 가지고 선언한 get, set 로직이 적용된 변수

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
//     : 손쉽게 JS변수(state, props와 연관)에 값을 넣기만 하면 HTML 그 어떤 요소(속성, contents 등 어디를 불문하고) 에서라도 data binding(= 내용이 자동으로 반영)됨
//        -> (중요!) 최종적으로 state, props의 값 변경과 연동된 render API를 통해, DOM조작 없이 내용을 바꾸면서 자동으로 render되게 만드는 시발점이 됨


//  # js 변수가 있는데, state나 props를 써야 하는 이유?
//     : 1. 분명한 용도적 의미를 가지며
//       2. js의 구조 분해 할당(destructuring assignment) 문법을 통해 구현한 getter setter 로직을 써서 캡슐화를 구현함
//       3. (가장 핵심적인 이유!) state, props의 변경 = 자동 rendering의 트리거 조건
//          (= 기존 js 변수들처럼 이벤트핸들러 같은 짓으로 DOM조작 코드를 짜지 않아도, 값 변경시 이들과 연관된 html 태그만 rendering이 자동으로 실행되는 기적을 맛 볼수 있음) 


//  # state 
//    : 해당 페이지 안에서만 쓸 지역변수로서의 목적을 가지고 선언한 get, set 로직이 적용된 변수 + state값의 변경이 감지시 해당 html 재rendering 
//      (= 해당 component에서 값이 변경되었을때, html에 자동으로 내용이 반영되고 rendering되게하고 싶을 떄? state를 사용 ㅇㅋ) 

//    [state 사용법]
//     1. 변수타입 [getter함수의 별칭, setter함수의 별칭] = useState('변수가 담을 value값'); 작성
//         -> 참고로 parameter로 들어갈 내용을 []을 통해 여러개 담아도 사용가능함

//     2. {} 문법을 통해 conpent의 원하는 자리에 사용함

//         - getter함수의 별칭
//            : 해당 state값을 조회하고 싶을때 사용하는 변수명

//               (state getter함수의 사용법) 
//                 : getter함수의 별칭
//                    -> state 배열을 사용했을 경우?
//                        : 'getter함수의 별칭[index]'로 원하는 state요소에 접근 가능


//         - setter함수의 별칭
//            : 해당 state값을 수정 + 변경된 state값을 반영한 html영역을 다시 rendering 하도록 조치하고 싶을때 사용하는 변수명

//               (state setter함수의 사용법) 
//                 : setter함수의 별칭(state가 될 value or 연산식 or 변수명);
//                    -> (중요) set함수를 쓰지 않아도, state를 바꿀수는 있지만...
//                              자동 rendering의 작동 트리거는 set함수를 통해 state를 변경하는 것이기에 state에 set을 안쓰는건 react를 사용할 의미가 없다는 점과 같음을 명심하자

//                    -> (중요) state 배열을 사용했을 경우? 
//                        : 'setter함수의 별칭(배열변수 or 배열 그 자체)' 와 같이 parameter로 배열이 들어가게 해야함
//                            -> 이 또한 js의 구조분해 할당 문법의 원리로 작동
//                               (= '주는쪽 배열의 요소개수 != 받는 쪽 배열의 요소개수'  ->   대입이 가능한 index에 해당하는 요소들만 대입하고, 나머지 index는 관련 X)

//                            1. setter함수의 별칭(배열 그 자체)를 통한 state 배열 수정
//                                : 'setter함수의 별칭[수정내용1, 수정내용2 , ... ]'로 배열 그 자체를 parameter로 투입해서 원하는 state요소를 순차적으로 일괄 변경도 가능함
//                                    -> But! 이렇게 state 배열을 사용하면서 setter 또한 배열로 parameter를 줘서 사용하면.. 유지보수나 확장성이 아예 병신이 되므로 추천은 하지 않음

//                            2. setter함수의 별칭(배열변수)를 통한 state 배열 수정
//                                : let 배열명 = [...타 배열변수명]'로 스프레드 문법(spread syntax)을 통한 state 배열을 깊은복사를 한 뒤,
//                                  배열명[index] = '원하는 value값' 과 같은 식으로 새로 선언된 배열의 원하는 index의 요소에 원하는 값을 대입하고,
//                                  'setter함수의 별칭(배열명)' 과 같은 식으로 원하는데로 값이 수정된 state배열로 수정 
//         

//                               ex) let [states, setStates] = useState(['내용1', '내용2', '내용3']);
//                                    : 여기서 states라는 state는 state배열로 선언되었고, component에 2번째 요소인 '내용2'에 대한 부분을 담고 싶은 html 태그가 있다면?
//                                        -> getter의 경우 : { states[1] }; 이런식으로 작성함
//                                        -> setter의 경우 : 
//                                            1. 배열 그 자체 parameter로
//                                                : { setStates(['내용1', '내용4', '내용3']); } 이런식으로 set 함수를 통해 변경 

//                                            2. 깊은복사한 배열변수 parameter로 
//                                                : let copyArray = [... state]; 로 스프레드 문법(spread syntax)을 통한 state 배열을 깊은복사를 한 뒤
//                                                  copyArray[1] = '내용4';
//                                                  setStates(copyArray); 이런식으로 작성


//  # component 란?
//     : react 라이브러리에서 JSX(JavaScript XML) 문법을 사용해서, 웹페이지의 상태(state)와 속성(properties)와 이벤트 핸들링을 수행하는 User Interface에서 rendering의 기본 단위로서 기능하는 독립적인 모듈
//        -> 쉽게 말해.. 다음과 같은 성질을 전부 가짐
//            1. component는 js를 기반으로 작성된 일종의 HTML 요소로서, react에서는 rendering 기본 블록같은 단위를 의미
//            2. component는 그 자체가 상태(state)와 속성(properties)을 가지고 이벤트헨들링까지 독립적(stand alone)으로 수행 가능함
//            3. React.Component를 기반으로 그 자식 class로서 구체적인 component가 작성될 수도 있지만, 함수처럼 호출하면 즉시 관련 component를 return해주는 방식으로 사용도 가능
//            4. JSX(JavaScript XML) 문법 라는 특수 문법으로 구현
//            5. component는 독립적으로 동작 가능 =  일단 만들어두면 다른 component에 가져다 붙여서 확장 가능 (= component tree 구조)
//                -> 코드의 재사용성과 유지보수성을 높여줌 + 확장성이 뛰어나서, 복잡한 UI를 구현할 수 있음
//            6. 다른 component에 호출된 하위 component는 부모-자식 관계를 가지며, 부모 component로부터 속성(= props)만 전달받아 공유 가능함

//  # component 사용의 주의점
//     1. component는 일종의 rendering 가능한 html 요소 단위로서 1개의 component는 단 1개의 최상위 선조격 div만 가지고 있어야 함
//       (= 애초에 component를 왜 쓰는지에 대한 semantic한 부분을 생각하고, 해당 component를 개발자가 왜 조각으로 만드는지 생각해야 함) 
//           -> 굳이 써야 한다면? 빈 태그( <> <compoenent></compoenent> </>)로 나머지를 감싸는 fragment 문법을 쓰자
//     2. component간 상태(state)는 공유 불가능이며, 부모-자식 간의 속성(properties)만 전달이 가능할 뿐임
//        (= 쓸데없이 component를 쪼갰다가, 개발자 입장에서 인지 불가능한 수준으로 스파게티코드를 맛볼 수 있음)

//  # component는 언제 쓸까?
//     1. 반복적으로 잘 쓰이는 html요소
//     2. 값이 자주 변경되어, state와 props가 필히 필요해서 관리해줘야 하는 html 요소들
//        (= 너무 component를 잘게 쪼게면, 관리 단위로서 component가 의미가 없으며, state관리가 더 복잡해짐)
//     3. 페이지가 큰 html 요소 



// react 사전이해에 필요한 JS지식

//  @ 구조 분해 할당(destructuring assignment)?
//     : ECMA6에서 새로 공개된 배열 또는 객체의 속성을 쉽게 추출하여 개별 단일 변수에 할당하는 방법으로.. 
//       -> 배열이나 객체의 요소를 일일히 접근하여 변수에 할당하는 대신, 구조 분해 할당을 사용하여 한 번에 여러 변수에 값을 할당 가능 + []와 {}의 차이만 있을 뿐, 문법이 서로 비슷함
//           -> 해당 컴포넌트의 지역변수 역할을 하는 state에 get, set 로직을 구현하는데 사용됨

//       ex) 배열 구조 분해 할당
//           const numbers = [1, 2, 3, 4, 5];
//           const [a, b, ...rest] = numbers;         <- numbers의 배열요소의 값들을 각 개별변수에 일괄적으로 대입 가능
//           const [e, f] = numbers;                  <- (중요) 값을 제공하는 배열 numbers의 요소의 개수 > 값을 받는 배열의 개수?
//                                                         : 이 경우는 1, 2만 e, f에 대입

//           console.log(a);    // 1
//           console.log(b);    // 2
//           console.log(rest); // [3, 4, 5]
//           console.log(e);    // 1
//           console.log(f);    // 2

//        ex) 객체 구조 분해 할당
//           const person = { name: 'John', age: 30, city: 'New York' };
//           const { name, age, city } = person;      <- 객체 person의 멤버변수 값들을 각 개별변수에 일괄적으로 대입 가능

//           console.log(name); // 'John'
//           console.log(age);  // 30
//           console.log(city); // 'New York'


//  @ 스프레드 문법(spread syntax)
//     : '...배열명 or 객체명'을 통해, 배열(array)이나 객체(object)에 존재하는 각 요소 또는 멤버변수들을 해당 컨테이너명을 사용하여 개별적인 값으로 쉽게 확장하는 작성하는 역할을 수행하는 문법
//        (= 이걸 쓰면 귀찮게 배열, 객체의 각 모든 요소들을 일일히 기입하지 않아도 되며, 함수의 선언부에 parameter의 갯수에 따른 오버로딩 또한 노가다 없이 rest parameter형식으로 작성가능하게 해줌)
//            -> 다시 말해 배열, 객체의 깊은 복사가 쉬워짐

//               ex) const numbers = [1, 2, 3];
//                   const copiedNumbers = [...numbers];

//                   console.log(copiedNumbers); // [1, 2, 3]

//                   const person = { name: 'John', age: 30 };
//                   const copiedPerson = { ...person };

//                   console.log(copiedPerson); // { name: 'John', age: 30 }


//  @ html 이벤트핸들러 속성
//    : js의 이벤트핸들러를 html에서 사용가능하게 속성으로 구현한 것.. 속성값으로는 행동 function명이나, 익명함수로 원하는 로직을 입력함녀 됨. onClick이 대표적


//  @ 일급 객체 function
//    : js의 function이란 변수에 대입이 가능하며, 다른 함수의 return으로 가능한 대상이자, 다른 함수의 parameter로도 사용이 가능함
//      (= 특정 변수에 익명함수를 입력해서 저장시키거나, 다른 함수를 대입하는 것도 가능하며, callback 함수를 사용가능한 근원이 되는 js의 특성임)


//  @ array/object를 다룰 때의 주의사항
//    1. 배열명 / 객체명 그들 자신 자체는 reference 타입의 변수
//       (= 배열요소 / 객체맴버변수 데이터를 보존하는게 아니라, 해당 배열이나 객체가 어떤 메모리 주소에 위치해 있는지에 대한 위치값(= 포인터)을 가지고 있음)
//           -> 그래서, 'let 변수명 = 배열/객체명;' 과 같은 식의 코드는 의도대로 배열이나 객체의 값이 변수명에 복사되지 않고, 배열/객체명의 메모리 주소를 대입하는 '얕은 복사'가 실행됨

//    2. 배열 / 객체는 다룰 때 원본을 보존하는 것이 좋기에, 완전히 다른 메모리주소를 할당한 후 값을 할당하는 '깊은 복사'를 쓰는게 좋음    


// react 프로젝트를 시작하면, 기본적으로 생성되는 component
function App() {

  let post = '강남 우동 맛집';

  // [구조분해 할당 문법 없이 구현한 state의 getter setter]
  // let something = '남자 코트 추천';
  // let 글제목 = getState(something);
  // let set글제목= setState(something(value값));     <- useState('value 값')이 get, set을 구현 후, API적으로 접근 및 사용가능하게 함 

  // [개별 state변수 방식]
  // let [글제목1, set글제목1] = useState('남자 코트 추천'); 
  // let [글제목2, set글제목2] = useState('강남 우동 맛집'); 
  // let [글제목3, set글제목3] = useState('React 독학...'); 

  // [state 배열 방식]
  let [숙제, 숙제변경] = useState('남자 코트 추천');
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', 'React 독학...']);
  let [따봉, 따봉변경] = useState(0);

  return (

    <div className="App">
      <div className="black-nav">
        <h4 id={post} style={ {color : 'red' , fontSize : '16px'} }>ReactBlog</h4>
      </div>



      <div className="list">
        <h4>
          { /* { 글제목[0] }  */ 글제목[0] } 
          <span onClick = { () => { 따봉변경(따봉 + 1);} } >👍</span> 
          { 따봉 }
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div>

      <button onClick = { () => { let copy = [... 글제목]; 
                                  copy.sort();
                                  글제목변경(copy); }       }>한글 오름차순 정렬(숙제)</button>
      {/* <button onClick = { () => { 글제목변경(['여자 코트 추천', '강남 우동 맛집', 'React 독학...']); } } >예시1</button> */}
      {/* <button onClick = { () => { 숙제변경('여자 코트 추천'); } } >숙제용</button> */}
      <button onClick = { () => { let copy = [...글제목]; 
                                  copy[0] = '여자코드 추천'; 
                                  글제목변경(copy); }       } >예시2</button>

      {/* <Modal></Modal> */}
      <Modal/>

    </div>

  );
}

// 새로운 component 문법 작성 (function 방식 component)
//  -> (주의) div로 시작하면 div에서 끝나야하며, component의 최고선조 div는 1개만 있어야 함 
//     (= 애초에 블록처럼 쓰려고 조립하는걸 기억하자)
function Modal() {

  return(
    <div class = "modal">
    <h4>제목</h4>
    <p>날짜</p>
    <p>상세내용</p>
  </div>
  );
}


export default App;
