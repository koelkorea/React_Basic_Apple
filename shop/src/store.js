// (중요) REDUX 라이브러리
//   : props는 컴포넌트의 계층구조가 깊어지고 넓어지면 사용하는게 노가다에 가깝다는 것에, context의 단점까지 보완한 방식으로 component들이 state를 공유할 수 있게 하는 라이브러리

//   # redux 원리
//      : 전역 변수 state들을 보관한 store역할의 js 파일을 생성하고 나면... REDUX 라이브러리의 함수들을 통해, 모든 component가 그렇게 만들어진 store에 놓은 state들을 사용 가능함

//   # react-redux 설치법
//      : (node js가 깔려 있어야함 + react 18버전 이상이 필요) 터미널 열고 프로젝트 폴더에서 npm install @reduxjs/toolkit react-redux 입력 
//          -> redux toolkit = 기존 redux의 개선버전

//   # redux (주의사항)
//     1) redux의 store안에 들어가는 건 전역변수로 사용할 필요가 있는 state들 뿐임
//         -> (중요!) 공유가 필요없는 state 변수들까지도 redux에 넣는 건, component에 존재하는 state들의 {}처리 및 캡슐화를 통한 정보 관리 기준을 무너뜨리는 짓임

//     2) store.js에서 state를 담는데는 상관이 없지만.. 다른 컴포넌트에서 사용될 공유 state의 export될 이름은.. 절대로 소문자로만 구성되어야 함!
//        (= camalCase 같은거로 쓰면, react가 에러를 뿜으려 이름을 바꾸라고 함... )

//         ex) cartData = cartData.reduce (x)  -> cartdata = cartData.reduce (o)

//   # react-redux 사용법
//     1) (경로는 어디라도 상관X) 전역변수로 쓸 state를 저장해 줄 store.js를 생성하고, 해당 라이브러리의 튜토리얼 용 코드를 복붙함
//         -> 해당 js파일은 redux 라이브러리를 통해 모든 component들이 접근 가능하게 할 매개체

//     2) redux 라이브러리를 통해, store.js의 state들을 공유해서 쓸 component가 있는 js 파일가서 Provider 라는 컴포넌트와 아까 작성한 파일을 모듈로서 import 함
//        (= 해당 프로젝트의 모든 component가 이를 쓰게 하고 싶으므로, index.js파일에 import를 함)

//         ex) import store from './store.js'

//     3) store.js에 공유된 state에 모든 후손들을 포함하여 접근할 권한을 주고 싶은 component를 Provider라는 태그로 감싸고, store라는 속성을 store.js를 import한 모듈변수명을 속성값으로 채워서 작성함
//         -> 물론 Provider 태그 또한 react-redux의 변수이기에, 모듈 import를 통해 가져와야 함

//         ex) import { Provider } from 'react-redux';

//             <Provider store={import해온거}> <컴포넌트명> </Provider>

//     4) store.js 파일에 createSlice({name: state명, initialState: state값}); 함수를 통해 state변수를 생성함
//         -> (중요) initialState 요소에 들어가는 state값은 아무리 복잡한 형식의 객체배열 or 배열을 멤버로 받는 객체라도 다 받아줌
//         -> (중요) 만약, setState의 역할을 수행할 함수를 추가하면, reducers라는 멤버객체도 추가되고, 그 안에 멤버함수들을 추가 + 사용할 녀석들을 export 해줘야 함

//         ex) let user = createSlice({
//                 name : 'state명',
//                 initialState : state값 or [state값1, ... ,  state값N] or {멤버변수1 : 값1, ... , {멤버변수1 : 값1} 

//                 reducers : {
//                     함수명1(state){ return 'john' + state; },
//                     .... , 
//                     함수명N(state){ return 'john' + state; }
//                 }
//             })

//             export let { 함수명1, ... ,함수명N } = cartData.actions;

//     5) 하단의 무명 객체를 parameter로 받는 configureStore( { reducer: {} } ) 함수에서, reducer라는 멤버로 객체를 받는 멤버변수의 영역에 추가하여 store.js의 state 객체의 멤버로 등록
//         -> 추가 양식 : state명1 : state명1.reducer라고 추가

//         ex) export default configureStore({
//                reducer: {
//                   state명1 : state명1.reducer , 
//                   ... , 
//                   state명N : state명N.reducer 
//                }
//             }) 

//     6) 그렇게 추가한 state를 공유하여 사용할 component로 가서 useSelector(), useDispatch 함수 사용을 위해, useSelector를 redux라이브러리에서 모듈로 import함

//         ex) import { useSelector, useDispatch } from 'react-redux';

//     7) store.js의 원하는 state변수를 가져오고, 이를 변수에 저장해서 state변수처럼 쓰기 위해서는
//         -> useSelector( (state 역할의 parameter명) => { return parameter명 } ) 함수를 써야함

//     8) store.js에 작성한 state변수의 내부 함수를 사용하기 위해서는 
//         -> import 구문을 통해 모듈로서 그 함수들을 store.js에서 불러와야 함
//         -> useDispatch(import한 함수명()); 을 통해, 이벤트를 짜고 store.js에 해당 함수를 실행하도록 요청을 넣음

//         ex) import { 함수명1, ... , 함수명N } from "./../store";

//             useDispatch(changeName());

//     9) 그렇게 가져온 변수들을 component의 랜더링 return에 사용하자


//  # redux 관련 함수
//     1) createSlice({name: state명, initialState: state값 or [state값1, ... ,  state값N] or {멤버변수1 : 값1, ... , {멤버변수1 : 값1} });
//         : store.js에 state를 생성하는 함수..로 parameter는 state를 구성할 내용을 담은 object를 담음

//           @ createSlice()의 parameter 객체 구조
//              - name         : state의 이름값을 가지는 멤버변수 (이 녀석을 나중에 reducer 안에 등록해서 사용)
//              - initialState : state의 실질적인 값을 가지는 멤버변수
//                  -> (중요) initialState 요소에 들어가는 state값은 아무리 복잡한 형식의 객체배열 or 배열을 멤버로 받는 객체라도 다 받아줌

//     2) useSelector( (parameter명) => { return parameter명 } )
//        : redux 라이브라리의 함수로 만들어 둔 store를 가져와서, 그 안의 모든 state들을 담아두는 state객체 형식으로 반환해주는 역할하는 react hooks 함수의 일종 (= useContext()와 유사)
//          (= axios나 fetch를 통해 외부서버로 API 보내 담은 데이터와 개념이나 사용법이 유사하기에, return 부분을 parameter.원하는state명 방식으로 원하는 데이터만 취하는거도 가능)
//             -> (추측) tools로 오면서 react hooks의 추세에 맞춰 로직 및 API 사용법을 변형한 느낌

//     3) configureStore( { reducer : { state명1 : state명1.reducer , ... , state명N : state명N.reducer })
//         : store.js에서 생성된 전역state변수들이 외부 컴포넌트에서 사용될 수 있도록 등록하는 함수
//             -> (중요) 외부에서 호출하는 용도로 사용될 전역 state명의 구성은 절대로 소문자로만... 
//             -> (중요) 전역 state명에 어떤 state변수가 매핑될지는 'state명.reducer'로 결정

//     4) useDispatch(import한 전역 state함수명)
//         : store.js에 만들어 둔 전역 state함수명이 호출되도록, store.js에 요청을 보내는 redux 라이브라리의 react hooks 함수의 일종
//            -> 요청을 보내는거지.. 실제 함수의 실행은 store.js에서 해줌

//  # (중요) useDispatch를 통해 전역 state의 함수에 요청만 보내는 이유?
//     1) 각 component에서 전역 state를 건들게 만드는 경우와 다른데, 전역 state에 영향을 미치는 경우를 store.js에만 한정하게 해서, 코드 관리나 디버깅이 쉬움
//     2) 모든 전역 state 함수의 실행시, 무조건 store.js와 통신이 되어야 함으로.. 서비스 문제가 발생할떄도 원인찾기가 여러모도 수월함
//     


// (설명) redux 라이브러리의 튜토리얼 용 코드를 복붙
//   -> redux toolkit = 기존 redux의 개선버전을 쓰기 위한 module import
import { configureStore, createSlice } from '@reduxjs/toolkit'

// (설명) createSlice 함수를 통해 user라는 state 생성 (값은 문자열을 가짐)
let user = createSlice({
    name : 'user' ,
    initialState : 'kim' ,

    // (설명) reducers라는 멤버 안에 해당 state의 멤버함수들을 생성 가능함 (= 사실상 setState 함수도 이런식으로 만듦)
    //   -> 생성 함수의 parameter는 일반적으로 기존 state변수를 의미 
    reducers : {
        changeNameExample(state){
            return 'john' + state;
        }
    }

})

// (설명) user state의 함수인 changeNameExample를 외부 모듈로 쓸수 있게 export함
export let { changeNameExample } = user.actions;
export let changeName = user.actions.changeNameExample;

// (설명) createSlice 함수를 통해 stock라는 state 생성 (값은 숫자배열을 가짐)
let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

// (숙제) 주어진 데이터를 Redux store 안에 보관해두고 -> 이를 Cart.js 페이지에 가져와서 데이터바인딩하여 화면에 표시해라

// (숙제 구현) createSlice 함수를 통해 cartdata라는 state 생성 (값은 객체배열을 가져도 상관없음)
let cartData = createSlice({
    name : 'cartData',
    initialState : [
                        {id : 0, name : 'White and Black', count : 2},
                        {id : 2, name : 'Grey Yordan', count : 1}
                    ],
    // (설명) reducers라는 멤버 안에 해당 state의 멤버함수들을 생성 가능함 (= 사실상 setState 함수도 이런식으로 만듦)
    //   -> 생성 함수의 parameter는 일반적으로 기존 state변수를 의미 
    reducers : {
        setCount(state){
            return state.count + 1;
        }
    } 
})

// (설명) cartData state의 함수인 setCount를 외부 모듈로 쓸수 있게 export함
export let { setCount } = cartData.actions;

// (설명) stock.js의 state 객체의 멤버변수로 생성햇던 state들인 user, stock, cartdata라는 state를 사용가능하게 등록 
export default configureStore({

    // (설명) 생성한 state를 사용하기 위해선, reducer라는 멤버객체 안에 
    //   -> 'export되어 사용될 state이름' : 생성한 state명.reducer로 등록해야 함
    reducer: {
        user : user.reducer , 
        stock : stock.reducer ,
        // (숙제 구현) (주의) 외부로 export될 전역 state명은 절대로 소문자로만 구성되어야 함! 
        // cartData : cartData.reducer
        cartdata : cartData.reducer
    }
}) 