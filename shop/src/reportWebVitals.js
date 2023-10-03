// reportWebVitals
//  : CRA(create-react-app)를 실행하면 나오는 디폴트 파일 중 하나로, 리액트 프로젝트를 생성하면 index.js에서 사용하며, 앱의 퍼포먼스 시간들을 분석하여 객체 형태로 보여주는 것이 목적
//    (그러니까, 개발자에게 중요한 지표를 위해 사용... 삭제해도 서비스 실행에는 문제없음)
//      -> reportWebVitals(console.log) 와 같이 다음과 같이 작성하여 콘솔에서 확인 가능
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
