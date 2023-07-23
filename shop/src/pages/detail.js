// (설명) react router에 존재하는 react hooks 함수의 일종인 useParam 함수를 사용하기 위해, ES module로 import 후 {}안에 useParams만 import해서 해당 jsx에 가져다 줌
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from 'react';

// (설명) styled-components 라이브러리의 style component를 사용하기 위해, ES module로 import 후 style이라는 객체(object)만 import해서 해당 파일의 js영역에서 사용 가능하게 가져다 줌
import styled from "styled-components";

// (설명) styled-components 라이브러리를 통해 button형식의 style component를 만들고 백틱(`)을 통해 style 속성과 속성값을 입력 후, js변수 ColoredButton에 대입하여 component처럼 사용가능하게 조치
//   -> background, color 속성은 props 객체를 통해 color라는 값을 전달 받을 수 있게 코드가 짜여있고, color 속성은 삼항연산자를 적용하여 속성값을 다르게 주게 코드가 짜여있음
let ColoredButton = styled.button`
    background : ${ props => props.color };
    color : ${ props => props.color == 'blue' ? 'white' : 'black'};
    padding : 10px;
`
// (설명) style component를 복사하는 방법은 복사하는 style component와 같은 메서드를 쓰고 그 파라미터로 대상이 되는 style component명을 투입하고, 다른 js변수에 대입하면 됨
let copiedButton = styled.button(ColoredButton);

// (설명) 과거의 Life Cycle hook 코드 class component에서 사용 예시 
class Detail2 extends React.Component {

    // Detail2 component 생성시 이 안의 코드가 실행
    componentDidMount(){

    }

    // Detail2 component가 rerendering 될 시 이 안의 코드가 실행
    componentDidUpdate(){

    }

    // Detail2 component가 삭제 될 시 이 안의 코드가 실행
    componentWillUnmount(){

    }
}

// (숙제) 해당 component를 app.js의 '상세페이지' Link를 클릭시 보이게 하라
function Detail(props){

    // (설명) react router에 존재하는 react hooks 함수의 일종인 useParam을 통해, Route component에서 받아놓은 url 파라미터값(:파라미터명)을 jsx 변수명 id에 대입  
    let {id} = useParams();

    // (숙제) 현재 id와 상품 정렬 순서가 같아서 망정이지, 'props.shoes[id].멤버변수명' 이런식으로 상세조회 상품을 id값을 index처럼 쓰고 있음
    //   -> 만약 상품배열이 바뀌더라도, 상품의 id는 상품의 id에 맞는 상품을 찾을 수 있도록 조치해라
    //       -> props 객체 안의 shoes객체 배열이 멤버변수로 있다는 점 이용해서, shoes객체 배열에서 원하는 요소를 찾는 find나 filter 함수를 통해 구현

    // 숙제 일반 function version
    // let findShoes = props.shoes.find( function(wantShoes){
    //     return wantShoes.id == id;
    // });

    // 숙제 arrow function version
    //  : 배열.find( (item 파라미터명, index 파라미터명, array 파라미터명) => 조건문 작성 ) 
    //     -> 조건문에 해당하는 1번째 배열요소만 찾음 
    //        (= 여러개를 찾고 있으면, filter를 걸면 됨)
    let findShoes = props.shoes.find( (wantShoes) => wantShoes.id == id );

    // (설명) 현대의 Life cycle hook을 구현하는 react hooks 중 하나인 useEffect() 함수
    //  : 함수명은 핵심기능이 아닌 부가기능이라 중요성이 떨어지는 것을 의미하는 side effect에서 따옴..
    //    (= 실제로 rendering 같은 핵심기능 말고, 사실상 중요도가 낮고, 시간이 오래걸리는걸 여기서 짬처리를 하게 됨)
    //        -> 해당 component가 mount(생성), update(rerendering으로 인한 수정)시, html rendering이 완료되고 나서! 해당 무명 함수의 내용이 실행됨
    //           (= 해당 내용을 useEffect 밖에 쓰는 경우, 겉보기에는 내용이 비슷해도, 실행되는 순서가 rendering이 이뤄지기 전이기에 사실상 전혀 내용이 다름)
    //               -> 따라서 주로 어렵고 복잡한 연산을 수행하거나, 서버에서 데이터를 가져오는 등 수행 시간이 오래걸리거나, 모든게 로딩과 rendering이 끝나고 가장 나중에 처리되어야 할 내용을 useEffect안에 사용 

    //        -> (중요!) rendering 완료 전, 후라는 시점은 별거 아닌거 같아도, 어떤 요소나 데이터가 로딩이 되지 않아 에러가 나거나, 성능이 쓸데없이 낮아지게 되는 원인이 된다는점에서 아주 중요함!
    //             -> 좋은 프로그래머라면? 필히 자신이 치는 코드의 실행과정이나 의미에 대해서 디테일하게 알고, 무엇이 필요한지를 염두하고 코드를 짜야함 

    //        -> [case1] 만약 useEffect 안의 내용에 대해 'mount(생성)' 후에만 실행을 원하거나 or update(rerendering으로 인한 수정)를 하더라도 특정 state의 변화에만 변경되게 만들고 싶다면?
    //             -> useEffect() 함수의 2번째 parameter로 [state변수에 대한 배열요소]를 추가함으로서 update후에 대한 rendering 조건도 변경이 가능함
    //                 1) useEffect( () => {내용}, [] ) 가 비어 있으면?
    //                     : 어떤 state가 변화해서 rerendering이 되던 말던, 해당코드를 실행하지 않는다는 것을 의미
    //                       (= 최초 1회 component를 mount(생성)할때면 useEffect()의 내용을 실행해라)

    //                 2) useEffect( () => {내용}, [state변수에 대한 배열요소] )
    //                     : 배열 안에 존재하는 state 요소들의 경우만 변화하여 rerendering이 되는 경우만, 해당코드를 실행하게 함
    //                       (= 조건부 componentdidupdate() 실행과 같음)
    
    //           [case2] 근데 useEffect() 쓰는데, 만약 useEffect() 본 내용 실행하기 전에 실행하고 싶은 코드가 있다면 어떻게 함?
    //             -> 'return () => {내용}' 이란 clean up function을 마지막에 추가하면 됨
    //                 (= clean up function : component의 update로 인한 rerendering 직전이나, component의 unmount시 해당 코드가 실행되게 하는 함수)
    //                     -> clean up function은 lifeCycle 중 이미 존재하는 component의 'unmount(삭제)'와 연관되어, lifecycle hook 함수 componentWillUnmount()과 연관됨
    //                     -> clean up function이 update(갱신)와 연관이 되는 이유?
    //                         : component의 update(갱신) 상태라는건 component가 다시 rendering 될 때, 기존에 존재하는 component는 unmount(해제)시키고, 갱신된 component를 다시 mount시키는 개념이기 때문
    //                           (어찌보면 과거 class component 시절 lifecycle hook 계열 함수 중 componentWillUnmount() 함수까지 구현함)

    //           [case3] 근데 useEffect() 쓰는데, 만약 useEffect() unmount시에만 실행하고 싶은 코드가 있거나 or update(rerendering으로 인한 수정)를 하더라도 특정 state의 변화에만 반응하게 만들려면 어떻게 함?
    //             -> [state변수에 대한 배열요소]랑 'return () => {내용}'을 둘 다 쓰면 됨
    //                 -> (결론) 'return 코드를 어떤 state변화에도 반응하지 말라'는 내용의 명령어로 unmount시에만 실행되는 코드를 구현할 수 있음

    //                 1) useEffect( () => {return () => {내용} }, [] )
    //                     -> 비워둔 []   : state 변화에 대해 해당 useEffect()는 작동 X
    //                     -> return 코드 : useEffect 본 내용 실행전에 해당 코드 실행

    //                 2) useEffect( () => {return () => {내용} }, [state변수에 대한 배열요소] )
    //                     -> [state변수에 대한 배열요소]   : 해당 state 변화에 대해서만, 해당 useEffect()는 작동함
    //                     -> return 코드                  : useEffect 본 내용 실행전에 해당 코드 실행

    // (숙제) useEffect 함수와 setTimeout 함수를 통해, 해당 component rendering 완료 후 2초후에 div 태그를 사라지게 하기 위한 flag 역할을 할 boolean 타입의 state객체의 멤버변수인 fadeout
    let [fadeout, setFadeout] = useState(false);

    useEffect( () => {

        // (숙제) useEffect 함수와 setTimeout 함수를 통해, 해당 component rendering 완료 후 2초후에 div 태그를 사라지게 하기 위한 useEffect 내부 코드
        console.log('fadeout 실행 시작!');
        let timer = setTimeout(() => { setFadeout(true) }, 2000);

        // (설명) useEffect()의 본 코드가 실행직전, 이 return 안의 내용이 실행
        //   -> 보통 타이머제거, socket 연결요청제거, ajax요청 중단과 같은 clean up function 구현에 이를 활용함
        //      (= 보통 db에 데이터 요청에 대해 그렇게 함)
        return () => {

            console.log('기존 timer 해제!');

            // (설명) clearTimeout
            //   : web api 중 하나인 timer 계열 함수를 해제시키는 clean up function
            //      -> (중요!) clean up function은 component 최초 로딩인 mount시에는 실행이 안 되지만(정확히는 해제할 녀석이 없음), unmount 시에도 실행이 됨
            clearTimeout(timer);
        }

    }, []) // (설명) [state변수에 대한 배열요소]가 비어있음 = 최초 1회 component를 mount(생성)할때면 useEffect()의 내용을 실행하고, unmount(해제)할때 return 요소를 실행해라
           //  -> 만약 []를 배제해버리면, 모든 state 변경에 따른 update상태가 감지됨에 따라 rerendering이 발생해도, component들의 unmount가 엄밀하게 일시적으로나마 발생하여 rerendering 될때마다 작동하게 됨
           //     (= 좋은 프로그래머라면? 코드의 알고리즘 흐름에 이 또한 고려하여, 사용자들이 불편을 감지하지 못하도록 정교하게 적용해서 코드 짜야함)


    // (숙제) useEffct()를 사용해서, 숫자가 아닌 값을 입력 시, '숫자만 입력하쇼'라는 알람이 뜨게 하라는 부분의 input값을 받기 위한 state변수
    let [inputValue, setInputValue] = useState(null);

    // (숙제) useEffct()를 사용해서, 숫자가 아닌 값을 입력 시, '숫자만 입력하쇼'라는 알람이 뜨게 하라
    useEffect( () => {

        if(isNaN(inputValue) == true){
            // alert('숫자만 입력하쇼');
        }

    }, [inputValue])

    return (
        <div className="container">

            {/* (설명) js영역에 선언한 style component를 호출하고, props 객체에 전달할 멤버속성값인 color의 값을 입력하면, 상단의 style component 선언 부분과 로직이 상호작용하게 됨 */}
            <ColoredButton color="blue">파란 버튼</ColoredButton>
            <ColoredButton color="orange">오랜지 버튼</ColoredButton>

            {/* (숙제) useEffect 함수와 setTimeout 함수를 통해, 해당 component rendering 완료 후 2초후에 div 태그를 사라지게 해봐라 */}
            {fadeout == false ? 
            <div className="alert alert-warning">2초 이내 구매시 할인</div> : null}
            
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + ( Number(findShoes.id) + 1 ) + '.jpg'} width="100%" />
                </div>
                <div className="col-md-6">
                    
                    {/*  */}
                    { isNaN(inputValue) == false
                    ? null
                    : <div style={{backgroundColor : "red", color : "white", display : "inline-block", padding: "10px", margin : "10px"}}>(경고!) 숫자만 입력해달라고!</div>}
                    
                    {/*  */}
                    <div>숫자입력 <input type="text" onChange = {(e) => { setInputValue(e.target.value);  console.log(typeof {inputValue}); } }/></div>
                    
                    <h4 className="pt-5">{findShoes.title}</h4>
                    <p>{findShoes.content}</p>
                    <p>{findShoes.price}원</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>

        </div> 
    );

}

export default Detail;