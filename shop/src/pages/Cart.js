import Table from 'react-bootstrap/Table';

// (설명) redux 라이브러리의 hooks인 핵심함수 useDispatch, useSelector를 사용할 수 있도록 모듈 import
import { useDispatch, useSelector } from 'react-redux';

// (설명) store.js에서 만들어둔 전역 state함수 changeName, setCount를 사용할 수 있도록 모듈 import
import { changeName, setCount } from "./../store";

function Cart(){

    // useSelector( (parameter명) => { return parameter명 } )
    //  : redux 라이브라리의 함수로 만들어 둔 store를 가져와서, 그 안의 모든 state들을 담아두는 state객체 형식으로 반환해주는 역할하는 react hooks 함수의 일종 (= useContext()와 유사)
    //    (= axios나 fetch를 통해 외부서버로 API 보내 담은 데이터와 개념이나 사용법이 유사하기에, return 부분을 parameter.원하는state명 방식으로 원하는 데이터만 취하는거도 가능)
    //       -> (추측) tools로 오면서 react hooks의 추세에 맞춰 로직 및 API 사용법을 변형한 느낌

    // (설명) Cart 컴포넌트에서 store.js의 state 전체를 받아서 사용할 수 있게, useSelector의 반환값을 저장한 변수 reduxStates
    let reduxStates = useSelector( (state) => {
        return state;
    });

    
    // (설명) Cart 컴포넌트에서 store.js의 state 중 user라는 state만 받아서 사용할 수 있게, useSelector의 반환값을 저장한 변수 user
    let user = useSelector( (state) => state.user );

    // (숙제 구현) Cart 컴포넌트에서 store.js의 state 중 cartdata라는 state만 받아서 사용할 수 있게, useSelector의 반환값을 저장한 변수 user
    let cartdata = useSelector( (state) => state.cartdata );

    // useDispatch(import한 전역 state함수명)
    //  : store.js에 만들어 둔 전역 state함수명이 호출되도록, store.js에 요청을 보내는 redux 라이브라리의 react hooks 함수의 일종
    //     -> 요청을 보내는거지.. 실제 함수의 실행은 store.js에서 해줌
    let disPatch = useDispatch();

    return(
        <div>

            {user}의 장바구니

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
                {/* (숙제 구현) 주어진 데이터를 Redux store 안에 보관해두고 -> 이를 Cart.js 페이지에 가져와서 데이터바인딩하여 화면에 표시해라
                      -> 그렇게 cartdata라는 state의 멤버객체를 받고, 이를 map 반복문으로 처리  */
                    cartdata.map(function(a, i){
                        return(
                            <tr cartdata={cartdata[i]} key={i}>
                                <td>{cartdata[i].id}</td>
                                <td>{cartdata[i].name}</td>
                                <td>{cartdata[i].count}</td>
                                <td>
                                    {/*  */}
                                    <button onClick={() => {
                                        // disPatch(changeName());
                                        disPatch(setCount())
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