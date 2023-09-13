import Table from 'react-bootstrap/Table';

// (설명) redux 라이브러리의 hooks인 핵심함수 useDispatch, useSelector를 사용할 수 있도록 모듈 import
import { useDispatch, useSelector } from 'react-redux';

// (설명) store.js에서 분화한 모듈에서 만들어둔 전역 state함수 changeName, increaseAge 사용할 수 있도록 모듈 import
import { changeName, increaseAge } from "./../storeModule/userSlice.js";

// (설명) store.js에서 만들어둔 전역 state함수 setCount를 사용할 수 있도록 모듈 import
import { setCount } from "./../store.js";
import { memo, useMemo, useState } from 'react';

// function MemoChild(){
//     console.log('부모 Conponent인 Cart가 랜더링 되면? 자식인 MemoChild가 재렌더링 됨.. 근데 얘가 만약에 무거운 놈이면 어떻게하지?')
//     return <div></div>
// }

// memo(무명 함수형 컴포넌트 내용)
//  : 특정 component가 크고 무겁기에 부모로부터 받은 props 값이 변동되는 것을 제외하고, react의 재랜더링 조건을 회피하고 싶을 떄 사용하는 함수
//    (= 조건부로 재랜더링 원칙이 적용된 특수한 component lifeCycle을 가졌다 보자)
//     -> memo의 결과값은 let, const, var로 받으며, 그 변수명은 반드시 component명이 되어야 함

//   # memo(무명 함수형 컴포넌트 내용)의 로직
//      : 재랜더링 대상으로 들어간 컴포넌트 내용에 기존 props와 바뀐 props를 비교하는 연산이 추가로 진행되고, 그것이 다르면 재랜더링 진행함
//        (= props가 크고 복잡하면 이거 자체로도 부담이 될 수도 있기에, 전가의 보도처럼 지르지 말고, 잘 판단해서 써야함)

// (설명) 상단의 MemoChild 컴포넌트가 props변경시에만 재랜더링 될 수 있도록 memo() 함수를 통해 설정
let MemoChild = memo(function (){
    console.log('부모 Conponent인 Cart가 랜더링 되면? 자식인 MemoChild가 재렌더링 됨.. 근데 얘가 만약에 무거운 놈이면 어떻게하지?');
    console.log(' -> 정답 : props값이 변할 떄만 추가로 랜더링을 하게 하고, 그 외에는 시작시 1번만 랜더링을 하라고 \n    (= 조건부 재랜더링이 적용된 특수한 component lifeCycle을 가졌다 보자)');
    return <div></div>;
});

// (설명) useMemo() 함수를 설명하기 위한 복잡한 함수
let example = (() => {
    let result = 0;

    for(let i = 0; i < 1e9; i++){
        result += i;
    }

    console.log('무거운 작업을 랜더링 중 1번만 실행');
    return result;
});

function Cart(){

    // useSelector( (parameter명) => { return parameter명 } )
    //  : redux 라이브라리의 함수로 만들어 둔 store를 가져와서, 그 안의 모든 state들을 담아두는 state객체 형식으로 반환해주는 역할하는 react hooks 함수의 일종 (= useContext()와 유사)
    //    (= axios나 fetch를 통해 외부서버로 API 보내 담은 데이터와 개념이나 사용법이 유사하기에, return 부분을 parameter.원하는state명 방식으로 원하는 데이터만 취하는거도 가능)
    //       -> (추측) tools로 오면서 react hooks의 추세에 맞춰 로직 및 API 사용법을 변형한 느낌

    // (설명) Cart 컴포넌트에서 store.js의 state 전체를 받아서 사용할 수 있게, useSelector의 반환값을 저장한 변수 reduxStates
    let reduxstates = useSelector( (state) => {
        return state;
    });

    
    // (설명) Cart 컴포넌트에서 store.js의 state 중 user라는 state만 받아서 사용할 수 있게, useSelector의 반환값을 저장한 변수 user
    let user = useSelector( (state) => state.user );

    // (숙제1 구현) Cart 컴포넌트에서 store.js의 state 중 cartdata라는 state만 받아서 사용할 수 있게, useSelector의 반환값을 저장한 변수 user
    let cartdata = useSelector( (state) => state.cartdata );

    // useDispatch(import한 전역 state함수명)
    //  : store.js에 만들어 둔 전역 state함수명이 호출되도록, store.js에 요청을 보내는 redux 라이브라리의 react hooks 함수의 일종
    //     -> 요청을 보내는거지.. 실제 함수의 실행은 store.js에서 해줌
    let disPatch = useDispatch();

    // useMemo( 무명함수, [state 및 props변수에 대한 배열요소])
    //  : memo() 함수랑 비슷하게, compoenent로드와 동시에 parameter로 들어가 있는 코드(특정 component나 함수)를 특별한 이유 없으면 단! 1번만 수행하라는 의미의 react-hooks 중 하나
    //    (= memo랑 비슷하게 주로 무거운 코드라, 재랜더링 할 때 반복수행되길 원지 않을 경우 사용)
    //       -> [state 및 props변수에 대한 배열요소]를 채우면, memo() 함수와 유사하게 특정 state나 props의 값의 변화시에 따른 재랜더링 시에는 반복을 허가함
    //          (= 해당 배열이 비어있다면... 재랜더링 때마다, 새로 실행..)

    //   # useEffect()  VS  useMemo()
    //      : (중요!) 코드의 실행시점이 구체적으로 차이가 있으며, 의미적으로도 차이가 있음
    //         -> useEffect() : component들의 랜더링 이후 실행되는 '사이드이팩트'에 해당하는 내용들만 실행
    //         -> useMemo()   : component들의 랜더링과 동시에 실행되는 코드로.. 부득이하게 시간을 오래잡아먹는 코드라 랜더링과 함께 실행되서 성능 향상을 위한 목적으로 사용

    // (설명) useMemo()를 통해 시간이 오래걸리는 함수 useMemoExample()의 실행을 랜더링과 함꼐하여, 시간단축과 성능향상을 동시에 목적으로 하기 위해 적용
    let result = useMemo( () => { return example}, [] );

    // (설명) 자식 컴포넌트인 MemoChild에 props를 전달하기 위한 목적으로 만들어진 state  
    let [MemoChildState, setMemoChildState] = useState(0);

    return(
        <div>
            {/* (설명) 자식 컴포넌트인 MemoChild에 props 객체를 넘겨서, 이 경우에 지속적으로 props 객체로 넘겨준 MemoChildState이 바뀌어도 재랜더링이 되는지 확인 용도 */}
            <MemoChild MemoChildProps = {MemoChildState} />
            <button onClick={()=>{ setMemoChildState(MemoChildState + 1) }}> + </button>
            <h6>{reduxstates.user.name}의 장바구니</h6>

            {/* (퀴즈 구현) 클릭하면, user 데이터의 age를 1씩 증가시켜주는 함수를 제작하고 반영해라 
                  -> store.js에 구현한 increaseAge()를 참고 */}
            <button onClick={() => { disPatch(increaseAge(Math.floor(Math.random() * 10))); } }>나이 : {reduxstates.user.age} </button>

            <Table>
                {/* (설명) thead : 표의 가로 머리 부분으로 정보를 전달 */}
                <thead>
                    {/* (설명) tr : 표의 행부분 생성 */}
                    <tr>
                        {/* (설명) th : 표의 세로 머리 부분으로 정보를 전달 */}
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                {/* (설명) tbody : 표의 본문 부분 */}
                <tbody>
                {/* (숙제1 구현) 주어진 데이터를 Redux store 안에 보관해두고 -> 이를 Cart.js 페이지에 가져와서 데이터바인딩하여 화면에 표시해라
                      -> 그렇게 cartdata라는 state의 멤버객체를 받고, 이를 map 반복문으로 처리  */
                    cartdata.map(function(a, i){
                        return(
                                <tr cartdata={cartdata[i]} key={i}>
                                    <td>{cartdata[i].id}</td>
                                    <td>{cartdata[i].name}</td>
                                    <td>{cartdata[i].count}</td>
                                    <td>
                                        <button onClick={() => {
                                                                    disPatch(changeName());
                                                                    {/* (숙제2 최종실패) 해당 state 배열의 index에 맞는 id를 setCount() 함수의 action parameter로 보내면...
                                                                        -> 그 id를 가진 data 객체의 index를 찾아내고, 이 index를 this역할의 state parameter를 통해 state[index].count 형식으로 원하는 녀석을 찾음..  */}
                                                                    disPatch(setCount(cartdata[i].id));
                                                                    
                                                                }}>+</button>
                                    </td>
                                </tr>
                        )
                    })
                }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;

