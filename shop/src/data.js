let data = [
    {
        id : 0,
        title : "White and Black",
        content : "Born in France",
        price : 120000
    },

    {
        id : 1,
        title : "Red Knit",
        content : "Born in Seoul",
        price : 110000
    },

    {
        id : 2,
        title : "Grey Yordan",
        content : "Born in the States",
        price : 130000
    }] 

// ES Module 내보내기 : export 구문 사용

// a. export default 내보내고 싶은 변수명;
//     : import시 특별한 변수명을 적지 않으면(= 보통 import a구문 사용시), 이 때 지명한 변수를 가져옴
//       (단! 한번 사용 가능함.. 기본으로 출력할 변수를 부르기 때문)

export default data; 

// b. export { 내보내고 싶은 변수명(여러개도 가능) };
//     : import시 특별한 변수명을 적지 않으면(= 보통 import a구문 사용시), 이 때 지명한 변수들을 가져옴
//       (a와 마찬가지로 한번 사용 가능함.. 기본으로 출력할 변수를 부르기 때문)

// export {a, b}; 

// c. export let(const) 내보내고 싶은 변수명;
//     : 이를 통해 여러개의 변수들을 직관적으로 지명 가능
//         -> 그나마 가장 범용성이 좋은 방법 