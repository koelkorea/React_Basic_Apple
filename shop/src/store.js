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
//         -> (중요) 만약, setState의 역할을 수행할 함수를 추가하면, reducers라는 멤버객체도 추가되고, 그 안에 멤버함수들을 추가 + 사용할 녀석들을 export state명.action; 해줘야 함

//         ex) let user = createSlice({
//                 name : 'state명',
//                 initialState : state값 or [state값1, ... ,  state값N] or {멤버변수1 : 값1, ... , {멤버변수1 : 값1} 

//                 reducers : {
//                     함수명1(state){ return 'john' + state; },
//                     함수명2(state){ return { name : 'park', age : 20 }; },
//                     함수명3(state){ state.name = 'park'; },
//                     .... , 
//                     함수명N(state, action){ state.age += action.payload; }

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
//                                 -> (중요) initialState 요소에 들어가는 state값은 아무리 복잡한 형식의 객체배열 or 배열을 멤버로 받는 객체라도 다 받아줌
//              - reducer      : state의 내부함수들을 멤버로 가지는 createSlice()의 parameter 객체
//                                 -> (중요) state의 내부함수들을 사용하기 위해서는 'state명.action'을 통해 state별로 따로 export처리를 해야함
//                                 -> 자세한건 state 내부함수 만드는 부분 참고

//     2) useSelector( (parameter명) => { return parameter명 } )
//        : redux 라이브라리의 함수로 만들어 둔 store를 가져와서, 그 안의 모든 state들을 담아두는 state객체 형식으로 반환해주는 역할하는 react hooks 함수의 일종 (= useContext()와 유사)
//          (= axios나 fetch를 통해 외부서버로 API 보내 담은 데이터와 개념이나 사용법이 유사하기에, return 부분을 parameter.원하는state명 방식으로 원하는 데이터만 취하는거도 가능)
//             -> (추측) tools로 오면서 react hooks의 추세에 맞춰 로직 및 API 사용법을 변형한 느낌

//     3) configureStore( { reducer : { state명1 : state명1.reducer , ... , state명N : state명N.reducer })
//         : store.js에서 생성된 전역state변수들이 외부 컴포넌트에서 사용될 수 있도록 등록하는 함수
//             -> (중요) 외부에서 호출하는 용도로 사용될 전역 state명의 구성은 절대로 소문자로만... 
//             -> (중요) 전역 state명에 어떤 state변수가 매핑될지는 'state명.reducer'로 결정
//             -> (중요) state들을 reducer에 등록해도, state별 내부함수는 configureStore() 함수가 아니라, 'state명.action'을 통해 state별로 따로 export처리를 해야함

//     4) useDispatch(import한 전역 state함수명)
//         : store.js에 만들어 둔 전역 state함수명이 호출되도록, store.js에 요청을 보내는 redux 라이브라리의 react hooks 함수의 일종
//            -> 요청을 보내는거지.. 실제 함수의 실행은 store.js에서 해줌

//     5) current(state)
//         : proxy 객체배열인 state의 현재 상태를 볼수 있게 하는 함수


// # 전역 state변수의 내부함수 만드는 법
//    : store.js 내부에 존재하는 전역 state를 생성하는 createSlice() 함수의 parameter로 들어가는 무명 객체의 name, initialState 이외의 reduce라는 멤버객체 내부의 멤버함수를 선언하여 생성함 (= 사실상 setState 함수도 이런식으로 만듦)
//       -> (중요) 생성 함수의 parameter는 2가지가 존재함
//            1. state
//                : 해당 state 멤버객체 그 자체를 나타내는 parameter로 this와 용도나 관계가 비슷함
//                   -> state 그 자체는 proxy 배열 객체로 현재 값을 알기 위해서는 current(state) 식으로 함수를 이용하면 됨

//            2. action
//                : 실질적으로 들어가게 되는 변화무쌍한 동적타입과 값을 지닌 parameter.. 
//                  (= 사실상 state객체의 값이 array/object 같이 레버런스 주소값과 연관된 타입일 경우, 이를 함수를 통해 사용자가 의도적으로 가공하기 위한 목적으로 선언하여 사용하는 parameter라고 생각하면 됨)
//                      -> 내부에 멤버변수들이 많지만, payload라는 멤버변수가 실제로 투입된 값으로서 사용 + type라는 멤버변수는 호출 함수명을 저장하고 있음

//      ex) reducers : {

//          1) 해당 state가 가진 값이 단일 값인 경우
//              : 개별 전역 state의 내부함수는 정적인 연산 및 값으로 state의 값을 수정하거나, state라는 parameter를 통해 기존의 state 값을 이용하여 state값을 새롭게 수정가능

//                changeNameExample1(state){
//                    return 'john' + state.name;
//                },

//          2) 해당 state가 가진 값이 단일 객체인 경우
//              : 개별 전역 state의 내부함수는 새로운 객체값을 반환하여 해당 state값을 객체 단위로 통째로 수정 가능

//                changeNameExample2(){
//                    return { name : 'park', age : 20 };
//                },

//          3) 해당 state가 가진 값이 '배열(array) or 객체(object)'인 경우
//              : return 문구가 없이도 직접적으로 state값의 멤버변수를 state parameter를 통해 직접 수정해도, 해당 state 값에 수정한 변화가 적용됨
//                 -> immer.js 라는 redux 라이브러리의 파일 덕분에, return으로 반환되는 array/object가 없어도 됨
//                    (= immer.js 라이브러리는 자동으로 수정된 state 멤버값이 반영된 array/object를 깊은 복사 생성한 뒤, 함수의 결과값으로 그 수정된 객체를 return해주기 떄문)

//                changeNameExample3(state){
//                    state.name = 'park';
//                },

//          4) 해당 state의 값을 의도를 가진 parameter를 기입한 뒤, 이를 이용하여 사용자가 의도한 대로 가공한(연산값 or index로) 값으로 수정하고 싶은 경우
//              : this 역할하는 state라는 1번째 parameter외에, 사용자가 함수 호출시 기입한 기입한 동적인 타입의 특정값을 의미하는 action이라는 2번째 parameter를 통해 payload라는 멤버변수로 그 값을 불러와 연산 or index 지정을 할 수 있음
//                 -> 해당 특성은 함수를 parameter나 변수로도 취급가능한 일급시민으로 인정해주는 js의 특성과 연계되어, 다양하고도 복잡하게 응용되어 대부분의 의도를 수행가능함

//                increaseAge(state, action ){
//                    state.age += action.payload;        <- action을 연산에 사용  = increaseAge(100) : state갑에 100을 더함 
//                }, 

//                setCount(state, action){
//                    state[action.payload].count++;      <- action을 index에 사용 = setCount(100) : 101번쨰 데이터의 count라는 멤버변수에 1을 더함
//                }
// }


//  # (중요) useDispatch를 통해 전역 state의 함수에 요청만 보내는 이유?
//     1) 각 component에서 전역 state를 건들게 만드는 경우와 다른데, 전역 state에 영향을 미치는 경우를 store.js에만 한정하게 해서, 코드 관리나 디버깅이 쉬움
//     2) 모든 전역 state 함수의 실행시, 무조건 store.js와 통신이 되어야 함으로.. 서비스 문제가 발생할떄도 원인찾기가 여러모도 수월함



// (설명) redux 라이브러리의 튜토리얼 용 코드를 복붙
//   -> redux toolkit = 기존 redux의 개선버전을 쓰기 위한 module import
import { configureStore, createSlice, current } from '@reduxjs/toolkit'

// (설명) 파일 분화해 모듈화한 store.js를 import함
import user from './storeModule/userSlice.js'


// (설명) createSlice 함수를 통해 stock라는 state 생성 (값은 숫자배열을 가짐)
let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

// (숙제1) 주어진 데이터를 Redux store 안에 보관해두고 -> 이를 Cart.js 페이지에 가져와서 데이터바인딩하여 화면에 표시해라

// (숙제1 구현) createSlice 함수를 통해 cartdata라는 state 생성 (값은 객체배열을 가져도 상관없음)
let cartData = createSlice({
    name : 'cartData',
    initialState : [
                        {id : 0, name : 'White and Black', count : 2},
                        {id : 2, name : 'Grey Yordan', count : 1}
                    ],
    // (설명) reducers라는 멤버 안에 해당 state의 멤버함수들을 생성 가능함 (= 사실상 setState 함수도 이런식으로 만듦)
    //   -> 생성 함수의 parameter는 일반적으로 기존 state변수를 의미 
    reducers : {
        setCount(state, action){

            // (숙제2) +버튼을 클릭하면, 해당 데이터에 맞는 count데이터에 +1씩 해주는 걸 만들어봐라

            // (숙제2 구현) object의 내장함수 중 조건에 맞는 객체의 index를 반환하는 findIndex를 통해,
            //   -> 받아온 id값을 action값으로 쓰고.. 그 id값과 일치하는 객체의 index를 얻으면? 
            //       -> this 역할의 state와 [index]를 이용해서 대상 객체배열의 객체에 접근해서 원하는걸 이룸
            const index = state.findIndex( (state) =>  state.id == action.payload );
            state[index].count++;
        },

        // (숙제3) 주문하기 버튼을 누르면, 장바구니에 해당 상품이 추가되어 전시될 수 있도록 해봐라
        //   -> 힌트 : 장바구니는 특정 component에 소속된 state가 아님을 명심하고, 전역 state로서 구현해야 함 (= store.js에 데이터가 기존 존재하는 redux를 쓰자)
        addCart(state, action){

            // (숙제3 모범구현)
            //   : onClick에서 cart에 추가해 줄 신발의 정보들을 하나하나 조합한 무명객체를 action으로 넣고, 바로 state parameter를 통해 접근 가능한 기존 전역 state 객체에 push() 함수로 객체추가
            // state.push(action.payload);

            // (숙제3 숙제 구현)  
            //   : onClick에서 findShoes state 멤버객체를 action parameter로 넣고, state parameter를 통해 접근 가능한 기존 전역 state 객체에 action.payload를 통해 작성한 객체를 push() 함수로 추가
            console.log(current(state));

            const object = {id : action.payload.id, name : action.payload.title, count : 1};
            state.push(object);

            console.log(current(state));
        }
    } 
})

// (설명) cartData state의 함수인 setCount를 외부 모듈로 쓸수 있게 export함
export let { setCount, addCart } = cartData.actions;

// (설명) stock.js의 state 객체의 멤버변수로 생성햇던 state들인 user, stock, cartdata라는 state를 사용가능하게 등록 
export default configureStore({

    // (설명) 생성한 state를 사용하기 위해선, reducer라는 멤버객체 안에 
    //   -> 'export되어 사용될 state이름' : 생성한 state명.reducer로 등록해야 함
    reducer: {
        user : user.reducer , 
        stock : stock.reducer ,
        // (숙제1 구현) (주의) 외부로 export될 전역 state명은 절대로 소문자로만 구성되어야 함! 
        // cartData : cartData.reducer
        cartdata : cartData.reducer
    }
}) 