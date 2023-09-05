// (설명) store.js의 일부 내용을 파일분화하여 모듈화 하기 위해 userSlice라는 파일로 일부 내용을 분화
//   -> 여기 있는 내용을 import시 경로와 파일명도 store.js와 다르게 해줘야함
import { createSlice } from "@reduxjs/toolkit";

// (설명) createSlice 함수를 통해 user라는 state 생성 (값은 문자열을 가짐)
let user = createSlice({
    name : 'user' ,
    initialState : { name : 'kim', age : 20 },

    // (설명) reducers라는 멤버 안에 해당 state의 멤버함수들을 생성 가능함 (= 사실상 setState 함수도 이런식으로 만듦)
    //   -> 생성 함수의 parameter는 일반적으로 기존 state변수를 의미 (= this와 용도나 관계가 비슷함)
    reducers : {

        // (설명1) 개별 전역 state의 내부함수는 원래 있던 state값의 일부 멤버변수를 가져와서, 해당 멤버변수를 수정가능
        changeNameExample1(state){
            return 'john' + state.name;
        },

        // (설명2) 개별 전역 state의 내부함수는 원래 있던 state값이 객체인 경우, 그 값을 객체 단위 통쨰로 수정가능
        changeNameExample2(){
            return { name : 'park', age : 20 };
        },

        // (설명3) state의 값이 '배열(array) or 객체(object)'인 경우, return이 없이 직접적으로 함수를 통해 state값의 멤버변수를 직접 수정해도 변화가 적용됨
        //   -> return이 생략되도 immer.js 라는 redux 라이브러리의 파일 덕분에, 자동으로 함수의 결과값으로 변화된 state 멤버값이 반영된 객체를 깊은 복사하여 생성한 뒤, 그 객체를 state값으로 return으로 반환해주기 떄문
        changeNameExample3(state){
            state.name = 'park';
        },

        // (퀴즈) 클릭하면, user 데이터의 age를 parameter로 입력한 숫자만큼씩 증가시켜주는 함수를 제작하고 반영해라
        increaseAge(state, action ){
            state.age += action.payload;
        }
    }

})
// increaseAge(10);
// increaseAge(Math.floor(Math.random * 10));

// (설명) user state의 함수인 changeNameExample를 외부 모듈로 쓸수 있게 export함
export let { changeNameExample1, changeNameExample2, changeNameExample3, increaseAge} = user.actions;
export let changeName = user.actions.changeNameExample3;

export default user;