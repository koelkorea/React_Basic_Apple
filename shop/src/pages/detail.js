// (설명) react router에 존재하는 react hooks 함수의 일종인 useParam 함수를 사용하기 위해, ES module로 import 후 {}안에 useParams만 import해서 해당 jsx에 가져다 줌
import { useParams } from "react-router-dom";

import React, { useContext, useEffect, useState } from 'react';

// (설명) styled-components 라이브러리의 style component를 사용하기 위해, ES module로 import 후 style이라는 객체(object)만 import해서 해당 파일의 js영역에서 사용 가능하게 가져다 줌
import styled from "styled-components";

// (설명) react-bootstrap 웹사이트에 예시로 올라온 component 사용을 위해서, 각 component 명을 {}안에 import해서 해당 jsx에 가져다 줌
import { Navbar, Nav }  from 'react-bootstrap';

// (설명) App 컴포넌트에서 제작한 Context1 컨텍스트와 공유예정인 state값의 사용을 위해서, 선언한 context변수명을 {}안에 import해서 해당 jsx에 가져다 줌
import { Context1 } from '../App.js';

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

    // (숙제 일반 function version)
    // let findShoes = props.shoes.find( function(wantShoes){
    //     return wantShoes.id == id;
    // });

    // (숙제 arrow function version)
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


    // (설명) 탭 클릭에 따른 state정보를 저장하기 위한 state 변수
    let [tabStatus, setTabStatus] = useState(0);


    // (숙제) Detail 컴포넌트 로드 시, 화면 전체의 투명도가 0에서 1로 서서히 증가하여 등장하는 애니메이션이 효과가 동작하고록 구현해라?
    //   -> Detail 컴포넌트는 props로 받아온 값을 근거로 화면이 구성됨...
    //      (= 연쇄적인 로직구조로 목표한 기능을 수행하기 위해서는 props로 받아온 값을 변화의 감지대상으로 삼아야함)

    // (fade 숙제 구현) 
    //   : class명에 따라 달라지는 css속성으로.. 태그의 내용이 사라졌다 나타나는 애니메이션을 적용하기 위해, 변화하는 class의 값으로 대입될 목적의 state변수 fade 
    let[fade, setFade] = useState('');

    // (fade 숙제 구현) 
    //  : detail 컨포넌트 구현시 전달되는 props객체 중 shoes라는 멤버변수가 변경되는 것이 감지되면.. 1초 후 state값인 fade의 내용이 end2로 변하게 해라
    //     -> fade값이 end2로 변화하면...? 하단의 HTML 영역의 class속성값이 fade의 내용에 연계되어 변경됨
    useEffect( () => {

        let timer2 = setTimeout( () => { setFade('end2') }, 1000);

        // (설명) detail 컴포넌트의 cleanup 함수로 props객체 중 shoes라는 멤버변수가 변경되는 것이 감지되면.. 가장 먼저 해당부분이 실행되게 함
        return () => {

            // (설명) 먼저 1초뒤 실행되는 비동기코드 setFade('end2')를 억제하여
            clearTimeout(timer2);

            // state값인 fade의 값을 공백으로 변경 
            setFade('');

            // 그 뒤 let timer = setTimeout( () => { setFade('end2') }, 1000); 파트 실행
        }

    }, [props.shoes] );

    return (
        // (fade 숙제 구현) 
        //   : state값인 fade의 값의 변경은 곧 HTML 태그가 가지는 class속성값이 fade의 내용을 반영하도록 jsx {}에 전통적인 ''(quation)을 사용해 제작
        <div className={'container start2 ' + fade}>

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
                    
                    {/* (설명) inputValue라는 state 값이 숫자가 아니면, 경고문을 띄우는 코드 */}
                    { isNaN(inputValue) == false
                    ? null
                    : <div style={{backgroundColor : "red", color : "white", display : "inline-block", padding: "10px", margin : "10px"}}>(경고!) 숫자만 입력해달라고!</div>}
                    
                    {/* (설명) input값에 값을 적는게 감지되면, 그 값을 inputValue라는 state값에 대입하도록 함 */}
                    <div>숫자입력 <input type="text" onChange = {(e) => { setInputValue(e.target.value);  console.log(typeof {inputValue}); } }/></div>
                    
                    <h4 className="pt-5">{findShoes.title}</h4>
                    <p>{findShoes.content}</p>
                    <p>{findShoes.price}원</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>

            {/* (목적) tab을 만들고, 그 탭을 클릭하면 다른 내용이 나오게 하자*/}
            {/* (설명) defalutActiveKey는 해당 탭의 기본으로 눌린 eventKey값을 의미함 */}
            <Nav variant="tabs" defalutActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => setTabStatus(0)}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => setTabStatus(1)}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => setTabStatus(2)}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            
            {/* (tab 구현1) 3항연산자를 사용해서 받아온 tabStatus값을 내용에 연계함 */}
            { tabStatus != null ?  <div>내용{tabStatus}</div> : null }

            {/* (tab 구현2) if문을 사용할 경우, HTML 영역 바깥쪽에 외부 component를 작성하고, parameter로 준 props값에 따라 다른 html요소가 튀나오게 조건문을 사용함 */}
            <TabStatus1 tabStatus={tabStatus} />

            {/* (tab 구현3) return문을 HTML 영역에 들어갈 요소들로 구성된 array로 설정해서 parameter로 준 props를 index로 사용하녀 따라 다른 html요소가 튀나오게 조건문을 사용함 */}
            {/* (숙제 구현) app - detail - TabStatus2 컴포넌트로 이어진 구조에서, 최선조인 app의 state인 shoes를 손자인 TabStatus2에서 쓸수있게 코딩해라 */}
            <TabStatus2 tabStatus={tabStatus} shoes={props.shoes}/>
        </div> 
    );


}

// (tab 구현2) if문으로 작성된 HTML요소를 함수 컴포넌트 TabStatus로 작성해서 props를 통해 state 값을 전달받아 구현이 가능
//   -> [tip] props 객체를 일일히 써주기 귀찮으면 {props멤버변수명1, props멤버변수명2 ... } 이런식으로 해당 컴포넌트의 parameter로 들어온 props객체의 멤버변수를 {}안에 넣으면, props객체 호출없이 바로 멤버변수를 기입해도 인식함
function TabStatus1({tabStatus}){

    // (목적) 해당 서비스에 CSS를 이용하여, 애니메이션을 통해 TAB을 누를때마다 내용이 사라졌다 나타나는 효과를 줘보자
    //   -> HOW? 상황에 따라 해당 태그의 속성값이 변하게 한다면? 그 변화에 따른 css 선택자의 적용 변화로 애니메이션 효과를 누릴수 있음!
    //      (= state가 변화할때? 그 state의 값이 속성명의 일부가 들어가게 하는 식이면 가능!)
    //          -> 구체적인 css 구현은 css의 애니메이션 속성(transition, scale, opacity 등)을 참고하면 되겠음

    // (fade 애니메이션 구현) 
    //   : class명에 따라 달라지는 css속성으로.. 태그의 내용이 사라졌다 나타나는 애니메이션을 적용하기 위해, 변화하는 class의 값으로 대입될 목적의 state변수 fade 
    let[fade, setFade] = useState('');

    // (fade 애니메이션 구현) 
    //  : TabStatus1 컨포넌트 구현시 전달되는 props객체의 멤버변수 중, tabStatus라는 멤버변수가 변경되는 것이 감지되면.. 1초 후 state값인 fade의 내용이 end2로 변하게 해라
    //     -> fade값이 end2로 변화하면...? 하단의 HTML 영역의 class속성값이 fade의 내용에 연계되어 변경됨
    useEffect( () => {

        // (설명) useEffect에 setTimeout을 통한 시간차 함수 구현 쓰는 이유?
        //   : react 18부터 'automatic batch'라는 기능이 생겼기 떄문
        //      -> 'flushSync()' 함수가 이를 피하기 위해 의미적으로 구현된 함수

        // (중요!) automatic batch
        //   : 1개의 {} 영역에 동일한 State값의 변동이 여러번 적혀있다면? state 변경함수를 다 처리하더라도, 화면은 마지막에 1번만 reRendering 함
        //     (= 설령 의도는 모든 state의 변경내역을 다 순차적으로 표시하길 원해도? react의 로직은 일반적으로는 서버의 과부하를 피하고 작업 효율성을 위해 마지막 녀석 하나만 랜더링에 적용함)
        //         -> 진짜로 다 순차적으로 동일한 state값 변경내역이 화면에 표시되길 원하면.. 같은 {}안에 setState를 연달아 쓰면 안됨
        //            (= setTimeout을 통해, 의도적으로 같은 {}안에 state의 변경을 막아주고, 원하는 작업을 비동기영역을 끌어들여서라도 처리하게 함) 
        //        -> 'flushSync()' 함수가 이를 피하기 위해 의미적으로 구현된 함수니.. 이걸 써도 됨
        let timer = setTimeout( () => { setFade('end2') }, 1000);

        // (설명) TabStatus1 컴포넌트의 cleanup 함수로 컨포넌트 구현시 전달되는 props객체의 멤버변수 중, tabStatus라는 멤버변수가 변경되는 것이 감지되면.. 가장 먼저 해당부분이 실행되게 함
        return () => {

            // (설명) 먼저 1초뒤 실행되는 비동기코드 setFade('end2')를 억제하여
            clearTimeout(timer);

            // state값인 fade의 값을 공백으로 변경 
            setFade('');

            // 그 뒤 let timer = setTimeout( () => { setFade('end2') }, 1000); 파트 실행
        }

    }, [tabStatus] );
    
    // (설명) react에서 3항연산자 아닌 if문을 쓰려면? HTML 작성 영역을 벗어나서 JS영역으로 넘어와야만 가능
    if(tabStatus == 0){
        // (fade 애니메이션 구현) 
        //   : state값인 fade의 값의 변경은 곧 HTML 태그가 가지는 class속성값이 fade의 내용을 반영하도록 jsx {}에 전통적인 ''(quation)을 사용해 제작
        return <div className={'start2 ' + fade}>내용00</div>
    }else if(tabStatus == 1){
        return <div className={'start2 ' + fade}>내용01</div>
    }else if(tabStatus == 2){
        return <div className={'start2 ' + fade}>내용02</div>
    }
}

// (tab 구현3) if문으로 작성된 HTML요소를 함수 컴포넌트 TabStatus로 작성해서 props를 통해 state 값을 전달받아 구현이 가능
function TabStatus2(props){
    
    // (scale 애니메이션 구현) 
    //   : class명에 따라 달라지는 css속성으로.. 태그의 내용이 작아졌다 커지게 등장하는 애니메이션을 적용하기 위해, 변화하는 class의 값으로 대입될 목적의 state변수 scale 
    let[scale, setScale] = useState('');

    // (scale 애니메이션 구현) 
    //  : TabStatus2 컨포넌트 구현시 전달되는 props객체의 멤버변수 중, tabStatus라는 멤버변수가 변경되는 것이 감지되면.. 1초 후 state값인 fade의 내용이 end3로 변하게 해라
    //     -> scale값이 end3로 변화하면...? 하단의 HTML 영역의 class속성값이 scaled의 내용에 연계되어 변경됨
    useEffect( () => {

        let timer = setTimeout( () => { setScale('end3') }, 1000);

        // (설명) TabStatus2 컴포넌트의 cleanup 함수로 컨포넌트 구현시 전달되는 props객체의 멤버변수 중, tabStatus라는 멤버변수가 변경되는 것이 감지되면.. 가장 먼저 해당부분이 실행되게 함
        return () => {

            // (설명) 먼저 1초뒤 실행되는 비동기코드 setScale('end3')를 억제하여
            clearTimeout(timer);

            // state값인 scale 값을 공백으로 변경 
            setScale('');

            // 그 뒤 let timer = setTimeout( () => { setScale('end3') }, 1000); 파트 실행
        }

    }, [props.tabStatus] );

    // useContext(context명) 함수
    //  : 특정 컴포넌트 가문이 일종의 static state같이 state를 함수형 프로그래밍 형식으로 사용할 수 있게 react hook로 제작된 Context API
    //     -> 제작된 context 안에 저장된 state함수를 쓸수 있도록 context객체의 내용을 해체해서, state객체( {state1, .. , n} ) 형식으로 변환해 리턴해서 쉽게 쓰게 해줌
    //        (= 쉽게말해, context라는 state보관함을 해체해서, state를 보기좋게 꺼내준다 이 말임)
    let context1 = useContext(Context1);   

    // (설명) state 객체 형식으로 리턴되는 useContext함수는 구조분해 구문으로 멤버별로 변수에 매핑시키는 식의 응용도 가능
    let {shoes, stock} = useContext(Context1);   

    return (// (scale 애니메이션 구현) 
            //   : state값인 scale 값의 변경은 곧 HTML 태그가 가지는 class속성값이 scale 내용을 반영하도록 jsx {}에 ``(ecma6의 최신 문물인 백틱)을 사용해 제작
            <div className={`start3 ${scale}`}>
                {/* (숙제) app - detail - TabStatus2 컴포넌트로 이어진 구조에서, 최선조인 app의 state인 shoes를 손자인 TabStatus2에서 쓸수있게 코딩해라 */}
                { [ 
                    // <div>{props.shoes[0].title}</div>, 

                    // (설명) useContext로 해체한 Context1의 state변수 shoes의 내용을 꺼냄
                    <div>{shoes[0].title}</div>,
                    <div>내용001</div>, 
                    <div>내용002</div> ][props.tabStatus] }
            </div>
            );
}


export default Detail;