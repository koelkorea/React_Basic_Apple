// /* eslint-disable */
//  : eslint 모듈에서 잡아주는 warning 메시지가 안 뜨도록 조치하는 메시지로... 
//     -> 반드시 *주석으로 써야함


/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// [functional component를 기준으로 작성된 설명임을 밝힘]
//   -> class component도 하단에 언급함.... 추후 class -> function으로 넘어가기까지의 역사나 hooks에 관련된 역사적 부분까지 정리할 예정

// react 라이브러리 사용시 jsx 형식을 사용하며, 그 내부에서 사용자지정 HTML 태그와 같은 <App>으로 명명되는 HTML conponent를 제작.. 
//  -> react 라이브러리는 index.js에서 ReactDOM.createRoot(document.getElementById('root')).render 함수 안에 이런 conponent를 조립해서 블록으로 장난감 만들듯 구성한 페이지를 코딩하면 
//     -> ReactDOM 라이브러리의 static함수인 render API를 통해, 이를 최종적으로 index.html의 root라는 id의 div태그에 전달함으로서, 브라우저가 rendering을 하게 함

// jsx(java script extention)란 무엇인가?
//  : js에 자체적인 확장 문법을 곁들은 형식의 언어로 이를 통해서 react는 프로그래머에게 코딩의 직관성과 편의성을 강력하게 제공함
//     -> 1. js에서 HTML component 작성을 통해, html 구성의 기본 벽돌과도 같은 component를 html 형식의 문법 거의 그대로 사용해서 쉽게 만들 수 있음
//            : 일단 component를 만들어두고, 모듈러를 통해 가져온다면 <컴포넌트명> 형식으로 작성하여, 작성한 html 코드를 쉽게 재사용이 가능함
//               -> (주의!) 단! 반드시 component는 하나의 <div> 태그만을 최상위 부모로 가지고 있어야 함
//                          (= 병렬의 div를 짜지 말라는 말... component는 말 그대로 jsx를 통해 작성하는 html의 최소단위라고 보면 됨)

//     -> 2. 어떤 component를 구성하는 특정 html 태그의 이벤트핸들러 안에서만 통용되는 스코프를 {}를 통해서, 해당 html component가 사용자의 조작에 반응하는 반응형 component가 되게 할 수 있음
//            -> 해당 html영역에서만 통용되는 js변수를 선언하고, component에서 선언한 js변수를 쉽게 {}안의 js변수(보통은 state)와 대입함으로서 'DOM조작 명령어 없이' 해당 component가 내용에 따라 변화하도록 이끌 수 있음  
//                : 이를 추후 서버로 부터 데이터를 받는 것 + state의 set함수를 통한 변경시 조건부 랜더링이라는 특성과 props를 통해 이를 타 compoenent에 전달하는 법을 조합하면, 아주 쉽게 html의 content를 효율적으로 채울 수 있음

//     -> 3. 시멘틱 + get, set 캡슐화 구현 + 변경시 rendering 자동 수행되는 state와 다른 자식 component에 '일괄적'으로 html 속성을 넣는 형식으로 다양한 형태의 값들을 전달하기 위한 목적을 가지는 js객체 props를 사용할 수 있음
//            - state : 해당 페이지 안에서만 쓸 지역변수로서의 목적을 가지고 선언한 get, set 로직이 적용된 변수
//            - props : '부모 component -> 자식 component'로 '일괄적'으로 html 속성을 넣는 형식으로 다양한 형태의 값들을 전달하기 위한 목적을 가지는 js객체
//                      (= props의 핵심은 부모 component에서 속성을 적고, 그 값으로 부모 component의 state값을 넣어 또한 전송할 수 있다는 점에 있음!)
//                         -> 누군가의 자식인 component는 component들은 'props'의 역할(일반적으로는 props라 지음)을 하는 parameter를 단 1번만 받음


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
//     : 스코프{} 영역은 고립된 js 지역변수들의 영역이기에, 여기서 js변수를 선언해서 손쉽게 component 차원에서 선언된 JS변수(state, props와 연관)에 값을 대입하기만 하면,
//        ->  HTML 그 어떤 요소(속성, contents 등 어디를 불문하고) 에서라도 data binding(= 내용이 자동으로 반영)됨
//            -> (중요!) 최종적으로 state, props객체의 전달값 변경과 연동된 render API를 통해, DOM조작 없이 내용을 바꾸면서 자동으로 render되게 만드는 시발점이 됨


//  # js 변수가 있는데, state변수나 props객체를 써야 하는 이유?
//     : 1. 분명한 용도적 의미를 가지며
//       2. js의 구조 분해 할당(destructuring assignment) 문법을 통해 구현한 getter setter 로직을 써서 캡슐화를 구현함
//       3. (가장 핵심적인 이유!) state 변수 , props객체의 멤버변수의 값 변경 = 자동 rendering의 트리거 조건
//          (= 기존 js 변수들처럼 이벤트핸들러 같은 짓으로 DOM조작 코드를 짜지 않아도, 값 변경시 이들과 연관된 html 태그만 rendering이 자동으로 실행되는 기적을 맛 볼수 있음) 


// state 
//  : 해당 페이지 안에서만 쓸 지역변수로서의 목적을 가지고 선언한 get, set 로직이 적용된 변수 + state값의 변경이 감지시 해당 html 재rendering 
//    (= 해당 component에서 값이 변경되었을때, html에 자동으로 내용이 반영되고 rendering되게하고 싶을 떄? state를 사용 ㅇㅋ) 

//  # (중요) state 과거사
//     : state도 원래는 props와 마찬가지로 object 속성이며, functional component 기준으로 구조분해 할당과 useState 함수를 통해 만들어진 개별 state들은 state객체의 멤버속성임

//  # state 사용법
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
//               -> 이 setter 역할의 함수는 비동기방식(= 병렬로 다음코드를 계속 처리)으로 재rendering 처리되어서, rendering의 결과가 당장에 반영되지 않고, 화면에는 늦게 반영됨

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


// props 
//  : '부모 component -> 자식 component'로 html 속성을 넣는 형식으로, 부모 component의 {} 제한을 넘어 '일괄적'으로 다양한 형태의 값(일반문자도 가능)들을 전달하기 위한 목적을 가지는 js객체 + props값이 변경되어 다시 전달시 해당 html 재rendering 
//    (= props의 핵심은 부모 component에서 속성을 적고, 이를 통해 부모 component의 state값 또한 전송할 수 있다는 점에 있음!)
//       -> 해당 component에서 부모 componont에서 값들을 받아 사용하고 싶고, 변경사항이 생길시 자동으로 다시 전달되어 내용이 반영되고 rendering되게하고 싶을 때? props를 사용 ㅇㅋ?


//  # props 사용법

//    1. <자식components props속성명1 = { state명 } props속성명2 = "속명2 내용" props속성명 = {속성3 속성값} /> 형식으로 'props속성명'과 그에 해당하는 값을 { js객체명 }이나 "문자열" 같은 방식으로 적음
//    2. 자식components의 function에 'props'에 해당하는 parameter를 적음
//    3. 자식components 안에서 { props.속성명 } 형식으로 부모 component로 부터 전달받은 props 속성을 골라서 사용 

//       ex) function App (){
//             let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
//             return (
//               <div>
//                 </ Modal 글제목전달={글제목}         <- 부모 component <App>에서, 자식 component <Modal>에 '글제목전달'이란 속성명에 '글제목' 이란 부모의 state값을 대입해서 props객체의 멤버변수로 전달
//                          color = "blue"     >      <- 부모 component <App>에서, 자식 component <Modal>에 'color'이란 속성명에 'blue'란 문자열 값을 대입해서 props객체의 멤버변수로 전달
//               </div>
//             )
//           }
//           
//           function Modal(props){
//             return (
//               <div className="modal" style={{ background : props.color }}>     <- 자식 component <Modal>은 부모가 전달한 props객체에서 'color'라는 멤버변수의 값을 꺼내서 style 태그의 값으로 써먹음
//                 <h4>{ props.글제목[0] }</h4>                                    <- 자식 component <Modal>은 부모가 전달한 props객체에서 '글제목'이라는 부모의 state값인 멤버 배열변수의 1번쨰 요소를 꺼내서 contents 요소의 값으로 써먹음
//                 <p>날짜</p>
//                 <p>상세내용</p>
//               </div>
//             )
//           }


//  # props객체 핵심적인 특성 및 전달 방식의 장, 단점
//     : props 객체는 부-자 component에서만 통용되는 일종의 지역객체 + 부모 -> 자식 편도적 전송 흐름 + 전송의 대상도 부-자 component에만 한정
//        -> 단점인 노가다로 인한 개발자의 실수를 줄이고자, 일부 자주 사용되는 props로 전달되는 값을 아예 전역변수로서 관리하자는 취지의 의견 등장
//            -> redux 라이브러리의 탄생

//        - (장점) 
//           : 개발자가 생각해야 할 side effect가 적음
//              1) 지역변수로서 다른 component에 영향 X 
//              2) component간 값의 흐름을 예측하기 쉬움 
//              3) 전송되는 값이 개발자가 적은것에 한정되어 딱 정해짐 

//        - (단점)
//           : 값의 지속성이 일시적 + 전달 시 값의 나열도 일일히 해줘야해서 노가다가 심하기에 관리하기가 힘듦...
//              1) 자신의 영역에서만 살아있는 지역변수를 계속 쓰려면 다른 component에 전달, 전달의 연속  
//              2) 자주 사용되는 값일수록, 노가다를 통해 매번 개별 다른 자식 component의 속성으로 나열해서 props객체로 값을 보내야 하는 반복의 노가다를 맛봐야 함
//              3) 철저히 1:1 구조의 component간 일방적 전송이라... 그 밑의 후손들에게 전달할거면 마찬가지로 2)의 노가다를 또 겪어야 함..


//  # (중요) props 의 특성
//     : 순수 react의 props객체의 전달 대상은 '부모 -> (개별) 자식' +  자동으로 더 후손 component로 전달도 X 라서... 
//        -> 전달할 props객체의 멤버변수와 자식 component의 머리수가 많아지면? 그거 관리하는게 사실상 노가다에 가깝고, 개발자의 실수로 인해 많은 삽질이 발생할 소지가 있음
//           (= 대부분의 component들이 쓰는 공통의 속성값의 경우, 전역객체 props를 통해 관리되어야 할 필요성 존재)
//               -> redux의 등장

//    1. props를 통해 부모 component는 함수나 클래스 {}제한을 넘어, 사실상 다른 함수나 클래스 {}에 속한 자식 component에 값을 전달할 수 있음

//    2. (중요!) 반드시 '부모 -> (개별) 자식' 으로만 일방적으로 전달됨
//         -> 자식 -> 부모, 형제끼리 props객체 전송 같은건 불가능
//             -> 따라서, 어떤 state를 사용하는 component그룹이 있다면, 거기서 가장 상위의 선조 component에게 state를 선언해두는게 좋음

//    3. 각 props객체를 구성하는 멤버변수들은 개별 component만을 기준으로 일종의 지역변수 개념으로 작성됨
//       (= component만 다르면 속성명 겹쳐도 상관 없음)  

//    4. (3번의 지역변수 개념에 의거..) props객체는 개별 component 단위로 전송되며, props에 들어갈 멤버변수는 반드시 해당 자식 component에 속성형식으로 일일이 열거되어야 함
//       (= 자식 component가 자신의 아들 및 후손 component에 값을 보내고 싶으면, component마다 props객체의 멤버로서 전달할 속성을 일일히 기입하는 노가다를 뛰어야 함) 
//          -> 그거 ㅈ같아서 몇몇 변수는 전역객체 props로 전달해서 쓰기위해 만든 라이브러리가 redux!


//  # props 사용시 유의점

//    1. 부모 component 측에서 props로 전송 가능한 속성의 갯수는 제한이 없음

//    2. props 객체의 멤버변수로 들어가는 속성에 들어갈 수 있는 값의 자료형 또한 제한이 없음
//       (= 부모 component의 state값 또한 전송가능한 수많은 자료형의 일부에 지나지 않음)
//          -> (중요!) 심지어 함수도 전송이 가능!

//    3. props 객체를 전송받는 자식 component는 parameter로 받는 props객체를 객체 그 자체로 1번만 받고, 거기서 필요한 멤버변수를 꺼내서 그 값을 component 구현에 사용함
//        -> parameter명에 props라고 이름까지 정해져 있진 않지만, 일반적으로 props로 적음  

//    4. 자식 component로 전달된 props객체는 값의 수정을 위한 접근이 일반적으로는 불가능함
//       (= 전달된 props객체는 일종의 값들이 새겨진 앍기전용의 상수 창고로서, 값의 복사는 가능해도 수정은 불가능하다 생각하면 이해가 쉬움)

//    5. (중요!) 하지만! props객체를 통해 전달된 setstate 함수를 통해서, 부모의 state 변수 자체를 수정하는 방식으로 부모 component의 값을 통제하는 것은 가능함!
//         -> 애초에 props를 통해 부모 component의 state를 이용한 권장사항이기 때문에 당연히 잘되는게 당연함

//    6. (중요!) 그렇지만, props객체에 유저가 수정을 위한 접근이 불가능할 뿐이지, 5번 이외의 이유로도 변동이 생기면, 재rendering이 시작되고 반영된다는 점은 명심해야 함
//         -> props객체로 전달된 setState로 부모 component의 state값을 통제하여 rerendering을 유도하고, 그로 인해 props객체가 다시 값을 가져와야 할 필요로 인한 변화는 의도된 합법
//            (= props객체의 전달값 중 부모의 state값에 해당되는 부분이 수정되어 변해서 다시 전달되는거 상황말고, 다른 props값에 해당하는 부모 component의 속성값이 직접 수정되어 rerendering이 일어나는건 권장사항이 아님)

//               ex) function ParentComponent() {

//                     let color = 'red';
//                   
//                     setTimeout(() => {
//                       color = 'blue';             <- setTimeout()을 통한 props객체에 포함되는 속성값의 강제 수정을 유도하여, props객체의 변화까지 인위적으로 이끌어내는 예외
//                     }, 1000);
//                   
//                     return <ChildComponent color={color} />;
//                   }
//                   
//                   function ChildComponent(props) {
//                     return <div style={{ background: props.color }}>Hello, World!</div>;        <- props.color의 값 변경으로 ChildComponent가 rerendering
//                   }


//  # 자식 -> 부모, 형제 -> 형제 끼리 component 전송이 불가능한 이유에 대한 추론?
//     : 애초에 호출된 component을 react팀은 자식 component라 정의하고, 거기에 html 속성 형식으로 사용자가 적은 값들에 대해서는 부모 component가 타 component를 호출하는 것을 접점으로 전송하도록 로직을 구성하였기 때문
//       (= 애초에 component 호출을 통한 접점 관계를 부모 - 자식이라 명명함 + 형제관계나 자식 - 부모 관계는 그렇게 값을 전달할 방법이 로직적으로 존재하지 않음)



// component 란?
//  : react 라이브러리에서 JSX(JavaScript XML) 문법을 사용해서, 웹페이지의 상태(state)와 속성(properties)와 이벤트 핸들링을 수행하는 User Interface에서 rendering의 기본 단위로서 기능하는 독립적인 모듈
//     -> 쉽게 말해.. 다음과 같은 성질을 전부 가짐
//         1. component는 js를 기반으로 작성된 일종의 HTML 요소로서, react에서는 rendering 기본 블록같은 단위를 의미
//         2. component는 그 자체가 상태(state)와 속성(properties)을 가지고 이벤트헨들링까지 독립적(stand alone)으로 수행 가능함
//         3. React.Component를 기반으로 그 자식 class로서 구체적인 component가 작성될 수도 있지만, 함수처럼 호출하면 즉시 관련 component를 return해주는 방식으로 사용도 가능
//         4. JSX(JavaScript XML) 문법 라는 특수 문법으로 구현
//         5. component는 독립적으로 동작 가능 =  일단 만들어두면 다른 component에 가져다 붙여서 확장 가능 (= component tree 구조)
//             -> 코드의 재사용성과 유지보수성을 높여줌 + 확장성이 뛰어나서, 복잡한 UI를 구현할 수 있음
//         6. 다른 component에 호출된 하위 component는 호출한 component와 '부모 : 자식' 관계를 가지며, parameter를 통해 부모 component로부터 state들을 모은 js객체(= props)만 전달받아 부모의 state를 사용 가능함


//  # component 사용의 주의점
//     1. component는 일종의 rendering 가능한 html 요소 단위로서 1개의 component는 단 1개의 최상위 선조격 div만 가지고 있어야 함
//        (= 애초에 component를 왜 쓰는지에 대한 semantic한 부분을 생각하고, 해당 component를 개발자가 왜 조각으로 만드는지 생각해야 함) 
//           -> 굳이 써야 한다면? 빈 태그( <> <compoenent></compoenent> </>)로 나머지를 감싸는 fragment 문법을 쓰자

//     2. component간 상태(state)는 공유 불가능이며, 부모-자식 간의 속성(properties)만 전달이 가능할 뿐임
//        (= 쓸데없이 component를 쪼갰다가, 개발자 입장에서 인지 불가능한 수준으로 스파게티코드를 맛볼 수 있음)

//     3. component만으로 구성된 배열을 만들수 있음
//        (= 애초에 js에서 html 태그도 마찬가지로 배열로 만들 수 있음)

//        ex) [<div>안녕</div>, <div>안녕</div>, <div>안녕</div>]       <- js에서 가능
//            [<Modal/>, <Modal/>,  <Modal/>]                          <- jsx에서만 가능

//     4. (중요) objects are not valid as a react child (found: object with keys { 문제있는 key명 }) 오류 주의!
//          : react에서는 component를 rendering 하는 과정에서, 화면에 출력할 때 필요한 state나 props객체의 멤버변수가 가지고 있는 값이 '객체(object)' 자료형일 경우 rendering을 하지 못하고 오류를 뿜음
//             -> 문제의 핵심은 현재 rendering하라고 던져준 변수가 key : value 형식의 object라, react 상에서 뭘 화면에 띄어줘야 할지 모르는것에 있음
//                (= error 메시지가 어떤 key명이 문제의 쟁점인지 파악 후, 그런 key를 가지고 있을법한 object 객체를 가진 component가 무엇인지 찾아서, 그 객체가 자신의 value만 온전히 띄울수 있도록 object를 다른 타입으로 형변환 시킴)

//                   ex) <h4>{ 글입력배열[i] }</h4>   ->   <h4>{ 글입력배열[i].입력값 }</h4>
//                         : 글입력배열[i] 자체가 key : value를 가진 object라, 이를 문자열인 value만 가져올 수 있도록 '배열.key명' 문법으로 객체의 멤버변수를 지정함


//  # component는 언제 쓸까?
//     1. 반복적으로 잘 쓰이는 html요소
//     2. 값이 자주 변경되어, state와 props가 필히 필요해서 관리해줘야 하는 html 요소들
//        (= 너무 component를 잘게 쪼게면, 관리 단위로서 component가 의미가 없으며, state관리가 더 복잡해짐)
//     3. 페이지가 큰 html 요소 



// react를 통해 동적인 UI를 만들려면?
//  1. class나 function component를 만들어서 html 구조를 만들고, 거기에 맞는 css로 디자인을 확정함
//  2. 해당 component UI의 상태를 제어할 flag 변수의 역할을 하는 state선언를 선언함
//  3. component 내에서 3항 조건문을 활용하여, 앞서 선언한 flag state에 따라 해당 component를 어떻게 보일지를 작성함
//      -> 해당 조건문의 작동의 key가 되는 state변경을 위해서는, react의 이벤트핸들러 속성 + {}를 통해 앞서 선언한 state변수들에 접근하여 이를 조작함


//  # (중요) JSX에서 조건문이 필요하다면?
//     : 반드시! 3항 연산자를 통한 true와 false문을 통한 패턴화로 해결하면 됨
//        -> (주의) 조건식에는 state값도 당연히 사용이 가능함 + null을 사용하면 그 자리에 아무것도 출력하지 않을수 있음


//  # (중요) JSX에서 반복문이 필요하다면?
//     : js 지역 스코프 {}에 js 배열(state배열도 포함)객체의 멤버함수 map()을 이용하고, 배열 안에 component를 담도록 하자 
//       (= for 문법은 JSX 안에서 사용할 수 없음)
//         -> (참고) map 반복문으로 반복생성한 html 요소들에는 이렇게 반복 생성된 요소들을 구분하기 위한 key 속성을 추가해야 warning이 뜨지 않음 

//            ex1) function App (){
//                   return (
//                     <div>
//                       { 
//                         글제목.map(function(a){                 <- 첫번째 parameter a = 해당 index순번의 배열요소
//                           return (
//                           <div className="list" key={i}>
//                             <h4>{ a }</h4>
//                             <p>2월 18일 발행</p>
//                           </div> )
//                         }) 
//                       }
//                     </div>
//                   )
//                 }

//            ex2) function App (){
//                   return (
//                     <div>
//                       { 
//                         글제목.map(function(a, i){              <- 두번째 parameter i = 해당 index의 값 그 자체
//                           return (
//                           <div className="list" key={i}>
//                             <h4>{ 글제목[i] }</h4>
//                             <p>2월 18일 발행</p>
//                           </div> )
//                         }) 
//                       }
//                     </div>
//                   )
//                 }


//  # 만약 반복되는 html요소를 구현하는데 for문이 굳이 쓰고 싶다면?
//     : component의 return 부분은 jsx 부분이므로, 그 윗 라인 영역인 js 영역에서 for문을 사용하여, 배열 안에 html요소를 대입한 후 이를 jsx의 conponent return 영역에서 호출해서 사용도록 하자

//       ex) function App (){

//             var 어레이 = [];

//             for (var i = 0; i < 3; i++) {
//               어레이.push(<div>안녕</div>)         <- 이런식으로 배열에 html요소를 대입
//             }

//             return (
//               <div>
//                 { 어레이 }
//               </div>
//             )

//           }


// (중요) class component
//  : 원래 react의 component를 작성할때는 객체지향관점에서 class 자료형으로 component를 작성하고 이를 객체화하여 호출함
//    (= React class의 Component라는 class를 상속받음)


//  # class component가 도태 된 이유?
//     : 더 쓰기 편하면서, 직관적이면서, 코드량도 적은 functional component가 class component가 할수 있는 모든 기능을 가지고 있기 때문
//       -> 정확히는 16.8에서 functional component도 state나 여러기능을 쉽게 사용하게 하는 react hook의 등장으로 functional 방식으로 코딩하는게 유리해졌기에 class component는 구식이 됨


//  # class component를 통해 유추가능한 중대한 사실들
//     1. (중요) props도 객체지만, state도 원래는 객체
//        (= functional component에서 구조분해할당 문법을 통해 생성해 준 개별 state명들은 사실 state객체의 객체 안의 1개의 멤버변수)
//           -> 그래서, functional component에서 만든 state에서 hooks문법인 usestate() 안에 제대로 된 자료형을 안 넣으면, 자동으로 그 state는 object 형식으로 지정되는 것...

//     2. setState 함수는 개별적으로 존재하며, 그 목표는 state라는 객체 자신의 멤버변수를 변경하는 것이기에, '멤버명 : 값' 형식으로 parameter를 지정함
//        (= functional component에서 구조분해할당 문법을 통해 생성해 준 개별 setState함수들은 사실 일종의 alias(별칭)으로서, 'setState(지정 state멤버변수)'와 비슷하게 치환될 수 있다고 추정 + 내부적으로 작동되는 로직이 있다는걸 유추 가능)

//     3. 조상인 Component class의 render 함수를 해당 component에 맞춰 override함
//        (= Component render 기능의 인터페이스화는 이미 class component 시절부터 시작된 전통임)
//            -> render 함수는 해당 html DOM요소를 브라우저에서 쉽게 랜더링이 가능하도록 react 차원에서 jsx형식을 우리가 아는 그 형식으로 푸는 함수로 interface화 되어있음



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


//  @ 3항 연산자(ternary operator)
//    : '조건식 ? true일시의 실행 : false일시의 실행' 형식으로 작성하는 조건문... 
//        -> 이를 사용하면, if else if else 범벅보다, 1줄로 간편하면서도 때때로 직관적인 코드를 짤 수 있음


//  @ 논리 부정 연산자 !
//     : true, false의 각자 반대값을 출력하도록 함


//  @ 배열object의 멤버함수 map
//     1. [요소1, 요소2, ... , 요소n].map( function() { 내용 } )
//         : 해당 배열 요소들의 개수만큼, 내부 무명함수의 내용을 반복해 줌

//     2. [요소1, 요소2, ... , 요소n].map( function() { return '내용' )
//         : 해당 배열 요소들의 개수만큼, 해당 횟차만큼의 index 위치에 있는 배열요소에 return에 존재하는 '내용'을 기입

//           ex) [1,2,3].map(function(){
//                 return 123           <- 123을 배열의 index마다 반복해서 기입 [123, 123, 123]
//               });

//     3. [요소1, 요소2, ... , 요소n].map( function(변수a) { 내용(변수a를 사용) } )
//         : 해당 배열 요소들의 개수만큼, 내부 무명함수의 내용을 반복하되, 변수a에 해당하는 부분은 해당 횟차만큼의 index 위치에 있는 배열요소를 사용함

//           ex) [1,2,3].map(function(a){
//                 console.log(a);          <- 1, 2, 3을 log에 순차적으로 출력
//               });

//     4. [요소1, 요소2, ... , 요소n].map( function(변수a) { return (변수a를 사용) } )
//         : 해당 배열 요소들의 개수만큼, 내부 무명함수의 내용을 반복하되, return에 해당하는 부분도 변수a에 해당하는 부분은 해당 횟차만큼의 index 위치에 있는 배열요소를 사용함

//           ex) [1,2,3].map(function(a){
//                 return a*100            <- 각 배열의 index에 위치한 요소 * 100에 해당하는 값을 배열의 각 index에 반복해서 기입 [100, 200, 300]
//               });

//     5. [요소1, 요소2, ... , 요소n].map( function(변수a, 변수i) { 내용(변수a와 i를 사용) } )
//         : 해당 배열 요소들의 개수만큼, 내부 무명함수의 내용을 반복하되, 변수a에 해당하는 부분은 해당 횟차만큼의 index 위치에 있는 배열요소를 사용 + 변수i는 해당 index에 해당하는 번호를 사용함

//           ex) [1,2,3].map(function(a, i){
//                 return a*i              <- 각 배열의 index에 위치한 요소 * 각 index의 값에 해당하는 값을 각 index에 반복해서 기입 [1, 4, 9]
//               });


//  @ HTML 이벤트핸들러 속성
//     : HTML에는 자체적인 명세서에 동적인 웹페이지를 구성하도록 하기 위한, js의 자주 쓰이는 이벤트핸들러들을 DOM 속성 형식으로 쉽게 쓸 수 있기 지원함
//        -> 이벤트핸들러가 전역변수로 노출 + 복수 이벤트핸들러를 설정하는 문법이 X + 사용자 정의 이벤트를 설정 불가능.. 이 3콤보로 요즘은 사장..
//            -> 그렇지만 react에서는 이러한 형식의 친숙함을 차용하여, react방식의 매커니즘에서도 dom조작 없이 state의 변경을 통한 이벤트를 구현하였음
//                -> 단! 이미 html DOM기반 이벤트핸들러는 존재하기에, 기존에 존재한 이벤트핸드러 속성을 'camalCase' 형식으로 표기하여 동일한 속성을 피함
//                    -> 물론! 그렇다고, onClick으로 구현한 react의 유사 이벤트핸들러의 구현이 onclick과 절대 같지는 않음
//                       (= 아마, 형식만 html DOM기반 이벤트핸들러 형식으로 작성된 react 이벤트 속성이 감지되면, 내부적으로 구현되는 로직이 존재할듯)


//  @ 이벤트 객체 e
//     : 이벤트핸들러에 들어가는 함수에 넣는 parameter로, 이는 객체로서 현재 발생하는 이벤트와 관련한 유용한 기능들을 제공하는 일종의 변수로 생각하면 됨

//        - e.target            : 현재 이벤트가 발생한 곳을 알려줌
//        - e.target.value      : 현재 이벤트가 발생한 곳의 값을 출력함
//        - e.preventDefault()  : 해당 이벤트의 기본 동작을 막아줌
//        - e.stopPropagation() : 가장 최상단의 조상 HTML DOM요소부터 해당 HTML DOM요소에 접근하는 호출 stack을 구성해 위치를 찾은 후, stack을 해제하는 과정에서 접근하게 되는 부모 HTML요소도 같은 이벤트핸들러의 내용을 작동시키게 되는 버블링을 막아줌


//  @ 이벤트버블링
//     : 어떤 HTML 요소에 이벤트가 발생하여 이벤트핸들러가 동작하고, 이어서 부모 요소부터 가장 최상단의 조상 요소에 이르기까지 같은 종류의 이벤트핸들러가 동작하는 개념을 의미
//        -> HTML 요소 접근을 위한 stack 회수 과정에서 구현하였기에, 편도행에는 문제가 생기게 하지 않을 수 있다고 생각함
//           (= e.stopPropagation()을 통해, 본 이벤트 발생 이후의 다른 HTML DOM요소들의 이벤트의 통제 또한 가능함)


//  @ object(객체) 타입
//     : js의 자료형 중 하나로 '속성 : 속성값 = key : value'구조를 가지는 멤버들이 여러개로 구성되어 있는 일종의 구조체(construct) 같은 자료형
//        -> let 객체명 = {속성1 : 속성값, ... , 속성n : 속성값n} 형식으로 작성

//      # (주의) react에서는 render할 component에 있는 출력값이 object 타입이면, 에러를 뿜으니... 유의하도록 하자 


//  @ js 모듈러 시스템
//     : HTML의 script 태그에서 다른 스크립트 파일들을 src속성을 통해 불러올 때, 해당 script 코드들이 1개의 단일영역에 적혀있는 것처럼 작동하는 것을 막고, js 모듈을 기준으로 '블럭 스코프'(block scope)와 같은 판정이 생겨서, 그 안에서 선언한 변수는 그 안에서만 사용이 가능하게 하는 시스템
//         -> 다시 말해, Class 내 변수를 쓰려고 할 때 이들을 불러오는 문법이 있듯, 모듈 내의 변수들을 구분해서 불러오는 구문이 따로 필요하다는 것 의미
//             -> 이렇게 js의 모듈을 불러오는 방식을 '모듈 시스템(module system)'으로 명칭함

//      # 블럭 스코프'(block scope)
//        : js(es6 이후로 추정)에서 지역변수적 요소를 구현하고자 쓰는 결계로 그 안에 쓰는 변수 let 혹은 const는 그 안에서만 통용되는 지역변수처럼 적용됨
//           -> {}를 통해 결계를 치고, 그 안에 쓴 변수 let 혹은 const는 그 안에서만 통용되는 지역변수화가 됨 (반대로, 안에서는 전역변수들을 만나는게 가능한 함수에서의 {}와 같음)
//              (단! var는 그런거 적용 안 되니 쓰지 않도록 한다)

//      # 자주 사용되는 2가지의 모듈 시스템
//         1. ES Module (사실상의 승자)
//             : JS ES6(ES2015)에 도입된 자바스크립트 자체의 모듈 시스템 방식 (과거 제작된 react에서 많이 보이는 녀석)
//                -> (중요) NodeJS 13.2부터 ES모듈 시스템에 대한 정식 지원이 시작 = node.js에서도 babel같은거 없이 사용 가능 
//                      -> package.json에서 type = "module" 선언화면 바로 사용 가능하게 조치 
//                         (= package.json와 연관있는 react 또한 이를 사용함을 유추 가능...)
//                             ->  정확히는 함수 component를 쓸 때, 해당 기능을 강화시키는 hooks 모듈을 불러올 때 사용)

//              # ES Module 사용법
//                : (from 사용할 모듈) export 구문을 입력 -> (to 가져오는 파일) import구문을 통해 불러옴

//                - ES Module 내보내기 : export 구문

//                    a. export default 내보내고 싶은 변수명;
//                        : import시 특별한 변수명을 적지 않으면(= 보통 import a구문 사용시), 이 때 지명한 변수를 가져옴
//                          (단! 한번 사용 가능함.. 기본으로 출력할 변수를 부르기 때문)

//                    b. export default { 내보내고 싶은 변수명(여러개도 가능) };
//                        : import시 특별한 변수명을 적지 않으면(= 보통 import a구문 사용시), 이 때 지명한 변수들을 가져옴
//                          (a와 마찬가지로 한번 사용 가능함.. 기본으로 출력할 변수를 부르기 때문)

//                    c. export let(const) 내보내고 싶은 변수명;
//                        : 이를 통해 여러개의 변수들을 직관적으로 지명 가능
//                            -> 그나마 가장 범용성이 좋은 방법 


//                - ES Module 불러오기 : import 구문

//                    a. import 지은 변수명 from '불러오는 모듈 경로'
//                        : 모듈에서 변수 하나만 가져오는 방법  
//                            -> export defalut {여려변수들} 을 사용한다면, b구문처럼 '지은 변수명'을 객체명처럼 사용 가능 

//                    b. import * as 지은 변수명 from '불러오는 모듈 경로';
//                        : 모듈에서 모든 변수를 가져오는 방법 
//                          (*의 의미 : SQL에서 모든 변수 가져오는것 의미.. -> 이걸 '지은 변수명'으로 통칭해 객체명화 하는 것)
//                            -> '별칭.프로퍼티' or '별칭.메서드명(파라미터....)'' 를 통해 값을 지칭해서 불러옴

//                    c. import { 가져올 변수명(여러개도 가능) } from '불러오는 모듈 경로';
//                        : 모듈에서 1개 ~ 여러개 변수를 가져오는 방법
//                            -> 그나마 가장 범용성이 좋은 방법 


//         2. CommonJs
//             : NodeJS 환경에서 자바스크립트 모듈을 사용하기 위해 만들어진 모듈 시스템 
//                -> 일부 내용은 ES Module과 기능상 호환되는 부분이 존재함

//              # CommonJs 사용법
//                 : (from 사용할 모듈) 사용할 변수 앞에 export.변수명 입력 or module.export { } 구문 입력- > (to 가져오는 파일) require('파일경로'); 구문을 통해 불러옴

//                 - CommonJs 모듈 내보내기 : export.변수명 및 module.export 구문

//                     a. export.내보내고 싶은 변수명;
//                         : 내보내고 싶은 js 변수 앞에 'export.' 를 일일히 붙여서 모듈의 변수로서 블록 스코프에 넣는 것으로 판정 

//                     b. module.export { 내보내고 싶은 변수명(여러개도 가능) };
//                         : 이를 통해 여러개의 변수들을 직관적으로 지명 가능
//                             -> 그나마 가장 범용성이 좋은 방법 


//                 - CommonJs 모듈 불러오기 : require 구문

//                     a. let or const { 불러오고 싶은 변수명(여러개도 가능) } = require('파일경로');
//                         : 모듈에서 1개 ~ 여러개 변수를 가져오는 방법
//                             -> 그나마 가장 범용성이 좋은 방법 

//                     b. let or const 지은 변수명(= 별칭) = require('파일경로');
//                         : 모듈에서 모든 변수를 '지은 변수명'으로 통칭해 객체명화 하여 가져오는 방법 
//                             -> '별칭.프로퍼티' or '별칭.메서드명(파라미터....)'' 를 통해 값을 지칭해서 불러옴


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
  // let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동 맛집', 'React 독학...']);

  // state는 useState(초기 state값 내용) 함수를 통해, [state명, setstate함수명]에 구조분해 할당 문법을 통해 getter, setter 매커니즘이 대입되어 수정/관리 됨
  let [숙제, 숙제변경] = useState('남자코트 추천');
  let [따봉, 따봉변경] = useState(['0', '0', '0']);

  // state는 배열형식으로도 선언 가능하고, 이를 스프레드 문법(spread syntax)을 통해 관리할 수도 있음
  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동 맛집', 'React 독학...']);

  // Modal component를 통제하기 위한 flag역할의 state변수 모달
  let [모달, 모달변경] = useState(false);

  // (숙제) 클릭한 게시물 제목에 맞춰 모달창을 뜨게 만들어라
  //  -> state배열인 글제목의 index를 가져오기 위한 state를 설정하고, 이를 자식 component인 <Modal>에 props 문법으로 보내서 동적으로 반응하도록 만들겠음
  let [인덱스, 인덱스변경] = useState(0);

  // input에 입력되는 값들을 state로 저장할 목적으로 만들어진 state변수 입력값
  let [입력값, 입력값변경] = useState(null);

  // (숙제1) input창 옆의 버튼을 클릭하게 되면, 상단의 state변수 입력값의 내용을 상단에 띄워지는 기능을 만들어라 
  //   -> 글입력배열 state배열을 만들고, 초기값은 빈배열로 설정 후, 버튼 클릭을 기점으로 input창의 내용들을 배열의 요소로서 동적으로 추가하기 위한 state배열
  let [글입력배열, 글입력배열추가]  = useState([]);

  let [글작성날짜, 글작성날짜추가] = useState(['2월 17일', '2월 20일', '2월 27일']);

  // -------------------------------------------[본격 jsx 영역의 시작 = 해당 line 위는 아직 js의 영역이라 js의 문법이 통함]-------------------------------------------------------------------
  return (

    <div className="App">
      <div className="black-nav">
        
        {
          // (숙제) 글입력배열에 아무런 입력값이 없다면? 타이틀에 해당하는 부분을 띄어라
          글입력배열.length == 0 ? 
          /* (설명) jsx에서의 {}는 jsp에서 java영역을 따로 지정해서, 자바 명령어를 입력하듯, js영역으로 인도함
          /   -> 이를 통해 상단의 js영역에서 선언된 state변수를 끌어온다던가, js와 같이 지역변수를 선언하여 로직을 전개도 할 수 있음  */
          <h4 id={post} style={ {color : 'red' , fontSize : '16px'} }>ReactBlog</h4>

          /* (숙제) 글입력배열에 아무런 입력값 감지되면? 해당 내용들을 순차적으로 화면에 띄움
              -> react의 virtual DOM이 새로 추가되는 부분만, 친절하게 rendering 해줌 
                  -> (주의) state변수 자체가 배열의 push되면, key : value 형식의 object가 되는데, 이 경우는 react상에서 rendering이 불가능함
                       -> 따라서, 자료형이 object인 변수를 component 구성에 쓴다면? 반드시 타 자료형으로 형변환하거나, 그렇지 않은 변수를 선언해서 기입해야 함   */
          : 글입력배열.map(function(a, i){
            return (
              (
                <div style={ {background : 'white' , color : 'black'} } key = {i}>
                  <h4>{ /* (숙제) 글입력배열에 들어간 배열 요소 자체는 object(기존 state명 : 값)로 들어가있기에 key값 지정으로 value만을 출력해야함 */
                        글입력배열[i].입력값  }</h4>
                  <p>2월 17일 발행</p>
                </div>
              )

            );
          })

        }

      </div>


      <button onClick = { () => { let copy = [... 글제목]; 
                                  copy.sort();
                                  글제목변경(copy); }       }>한글 오름차순 정렬(숙제)</button>

      {/* (설명) 해당 버튼을 클릭시, 숙제라는 state변수가 가진 '남자코트 추천'이라는 값을 여자코트 추천(숙제버전)으로 변경

          <button onClick = { () => { 숙제변경('여자 코트 추천'); } } >남자코트 추천 -> 여자코트 추천(숙제버전)</button> */}

      {/* (설명) 해당 버튼을 클릭시, 글제목이라는 state배열의 구성 state요소값이 '여자 코트 추천', '강남 우동 맛집', 'React 독학...' 다음과 같은 순서로 대입되도록 변경
      
          <button onClick = { () => { 글제목변경(['여자 코트 추천', '강남 우동 맛집', 'React 독학...']); } } >남자코트 추천 -> 여자코트 추천(예시1)</button> */}

      {/* (설명) 해당 버튼을 클릭시, 글제목이라는 state배열의 구성 state요소값을 copy라는 state 배열을 복사한 후 그 1번째 요소가 '여자코트 추천'으로 변경된 값을 가진 배열의 값이 순차적으로 대입될 수 있도록 변경
            -> 앞으로 state 배열의 값을 바꿀 일이 있다면, 이처럼 배열을 먼저 복사해서 받아넣고, 그 일부값을 변경한 후 setter함수르 쓰도록 하자 */}
      <button onClick = { () => { let copy = [...글제목]; 
                                  copy[0] = '여자코트 추천'; 
                                  글제목변경(copy); }       } >남자코트 추천 to 여자코트 추천(예시2)</button>
                                  
      {
        // component의 html 영역에서의 단일 line 주석
        /* component의 html 영역에서의 복수 line 주석 */ 
        글제목.map(function(a, i){
          return (
                    <div className="list" key = {i}>
                      <h4 onClick = { // (설명) 해당 제목을 클릭시, 하단 Modal이란 component의 출력 여부를 판정하는 flag역할을 하는 state값은 state값에 따라 set함수에 다른 paramter를 넣어서, 모달의 출력을 통제함

                                      // 1. 본인 구현
                                      // () => { 모달 == true ? 모달변경(false) : 모달변경(true) } 

                                      // 2. 모범
                                      () => { 모달변경(!모달);

                                              // (숙제) 모달창 게시물 제목에 맞게 반응하도록 구현하기 위한 인덱스란 state변수를 클릭하는 게시물의 index로 변경하고자 setstate적용 
                                              인덱스변경(i);      } }  >

                        { // (설명) {}에서는, state 배열의 요소도 가져올 수 있음 
                          // 글제목[1]
                          //  -> 이렇게 개별요소를 가져오는 하드코딩말고, 진짜 동적으로 데이터에 따라 반응하는 웹 화면을 출력하려면?
                          //      1. 배열.map({ function(a){ a를 사용한 내용 } ) 으로 안정적으로 state배열의 state요소들을 가져와서 놓으면 훨씬 편리 
                          //      2. 배열.map({ function(a, i){ a, i를 사용한 내용 } ) 으로 안정적으로 state배열의 index 값을 가져와서 원하는 각 index의 state요소를 출력

                          // [글제목 state배열의 값 출력]
                          a
                          // 글제목[i]
                        }
                      <span onClick = { (e) => {  e.stopPropagation();
                                                  let copy = [... 따봉]; 
                                                  copy[i] = Number(copy[i]) + 1;
                                                  따봉변경(copy);                 } } >👍</span> 
                      { // (설명) component의 html영역에서 {}은 js의 지역영역을 의미하며, 이를 통해 상단의 state로 선언된 변수들의 값을 가져올 수 있기에 '따봉'이란 state의 값을 가져옴
                        따봉[i]
                      }

                      {/* (숙제) 버튼을 클릭시, 게시글 제목에 해당하는 라인이 전부 사라지게 구현하고, 버튼은 오른쪽에 배치하라 */}
                      <button style ={{ float : "right"}} onClick = { (e) => {  e.stopPropagation();
                                                                                let copy = [... 글제목]; 
                                                                                copy.splice(i, 1)
                                                                                글제목변경(copy);         } } >게시글 삭제(숙제)</button>
                      </h4>
                      {/* (설명) 글작성날짜 state변수도 띄우기 */}
                      <p>{글작성날짜[i]}</p>
                    </div>
                  )
        })

      }

      <div>
        {/* (설명) input창의 내용이 변하는게 감지되면, 이벤트객체 e를 통해 변화된 값을 받아서, 입력값변경이라는 setstate를 실행하여 입력값 state를 수정함 */}
        <input style={ {display:"inline-block"} } onChange = {(e) => { 입력값변경(e.target.value);  console.log(typeof {입력값}); } } />

        <button onClick = {() => {  /* (숙제1) input 옆의 버튼을 누르면, 입력값 state가 빈칸이거나 null이 아닌 경우, 
                                        -> 글입력배열state배열을 복사후, 그 입력값 state를 마지막 배열요소로 끼워놓어서, 글입력배열 setstate함수를 통해 갱신함 */
                                    // let copy1 = [...글입력배열];
                                    // (입력값 == " " || 입력값 == null) ?
                                    // null :
                                    // copy1.push( {입력값} );
                                    // 글입력배열추가(copy1);               
                                    
                                    /* (숙제2) input 옆의 버튼을 누르면, 입력값 state가 빈칸이거나 null이 아닌 경우, 새로운 게시글을 추가시켜라 + 따봉 기능도 정상 작동하도록 조치 + 현재시간 추가
                                        -> 글제목state배열을 복사후, 그 입력값 state를 마지막 배열요소로 끼워놓어서, 글배열 setstate함수를 통해 갱신함
                                        -> 따봉도 마찬가지로... 단 추가영역 state를 1번째 배열요소로 끼워놓음 */
                                    let copy2 = [...글제목];
                                    let copy3 = [...따봉];
                                    let copy4 = [...글작성날짜];
                                    let writeDate = new Date();

                                    (입력값 == " " || 입력값 === null) ?
                                    null :  copy2.unshift( 입력값 );
                                            copy3.unshift( 0 );
                                            copy4.unshift( (writeDate.getMonth() + 1) + "월 " + writeDate.getDate() + "일 " + writeDate.getHours() + "시" );
                                            글제목변경(copy2);
                                            따봉변경(copy3); 
                                            글작성날짜추가(copy4);             } } >글입력</button>
      </div>

      {
        // (설명) 모달이란 state의 상태에 따라 Modal이란 component를 보여주고 안 보여주고를 통제가 가능한 3항 연산자
        //   -> 자식 component인 <Modal>에 props객체로 전달할 멤버변수로서 color라는 속성에는 'skyblue'라는 문자열과 글제목전달이라는 속성에 '글제목'이란 부모 component의 state를 대입해서 전달
        모달 == true ? /* <Modal></Modal> */ <Modal color = "skyblue" 글제목전달 = {글제목} 글제목함수 = {글제목변경} 인덱스전달 = {인덱스} /> : null
      }

      <ClassModal/>
    </div>

  );
  // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

// 새로운 component 문법 작성 (function 방식 component)
//  -> (주의) div로 시작하면 div에서 끝나야하며, component의 최고선조 div는 1개만 있어야 함 
//     (= 애초에 블록처럼 쓰려고 조립하는걸 기억하자)
function Modal(props) {

  // (설명) 부모 component인 <app>으로부터 전달받은 props객체에서 state를 구성할 멤버변수와 멤버함수를 꺼내서, 구조 분해 전달 문법으로 대입도 가능함
  // let [글제목, 글제목변경] = [props.글제목전달, props.글제목함수]

  return(
    // (설명) 부모 component인 <app>으로부터 전달받은 props객체에서 멤버변수를 꺼내서 자식 component 구현에 사용
    //   -> props로 개별적으로 전달된 state와 setstate 함수라고 해도, 바로 사용 가능함
    //      (= 전달된 setstate는 부모 component의 state값을 직빵으로 업데이트 하고, 그렇게 바뀐 state를 통해 react는 재rendering을 시작함)
    <div className = "modal" style = {{background : props.color}}>
      <h4>{/* (숙제) 모달창이 게시물 index에 따라 다른 제목을 띄우도록 하는 부분 props객체에 전달 하여 사용 */ props.글제목전달[props.인덱스전달]}</h4>
      <p>날짜</p>
      <p>상세내용</p>

      <button onClick = { () => { // (설명) props객체에 setstate 함수를 받아와서, 자식 component에서 해당 내용을 수정하게 하는 함수 숙제 구현
                                  let copy = [...props.글제목전달]; 
                                  copy[0] = '여자코트 추천'; 
                                  props.글제목함수(copy); }       } >남자코트 추천 to 여자코트 추천(예시2)</button>
    </div>
  );
}

// class component
//  : 원래 react의 component를 작성할때는 객체지향관점에서 class 자료형으로 component를 작성하고 이를 객체화하여 호출함
//    (= React class의 Component라는 class를 상속받음)
//       -> 하지만 16.8에서 functional component도 state나 여러기능을 쉽게 사용하게 하는 react hook의 등장으로 functional 방식으로 코딩하는게 유리해짐
class ClassModal extends React.Component{

  // 멤버객체로는 props, state(얘도 기본이 객체)를 가지고 있으며, 생성자(constructor)를 통해서만 이들을 통제할 수 있는 private한 접근자를 가지고 있음
  //  -> 부모 component로부터 전달받은 props객체는 parameter를 받는 형식으로 구현함
  //  -> state는 해당 component class 객체의 멤버객체이므로, this를 통해 접근하게 함
  constructor(props){
    super(props);
    this.state = {
      name : 'lee',
      age : 20
    }
  }

  // 조상인 Component class의 render 함수를 해당 component에 맞춰 override함
  //  -> render 함수는 해당 html DOM요소를 브라우저에서 쉽게 랜더링이 가능하도록 react 차원에서 jsx형식을 우리가 아는 그 형식으로 푸는 함수로 interface화 되어있음
  //      -> state와 props는 this와 js영역을 나타내는 {}를 통해 사용
  //          -> 알고보면 functional component의 state에서의 개별 state명은 state 객체 안의 1개의 멤버변수였다는 사실을 알수 있으며, 구조분해할당을 통한 state명 setState명을 정하는건 개발자의 직관성을 늘리는 효과 존재
  //             (= setState 함수도 마찬가지로 this를 통해 접근하며, 그 목표는 state라는 객체 자신의 멤버변수를 변경하는 것이기에, '멤버명 : 값' 형식으로 parameter를 지정함 )
  render(){
    return(
      <div>안녕~! 안녕~! 안녕~! {this.state.name} {this.state.age} {/* this.props */}
        <button onClick = {() => {
          this.setState({name : 'kim'});
          this.setState({age : this.state.age + 1});
        }}>버튼</button>
      </div>
    )
  }
}


export default App;
