import App from './src/App.js';

new App({ $target: document.querySelector('.App') });


/* 
Vanilla JavaScript로 프로젝트를 수행해 보았습니다.

코드가 작성된 특징을 요약하자면 다음과 같습니다.

1. 
생성자 함수를 사용해 React의 컴포넌트 처럼 관심사를 분리하고,
가독성을 높여주는 방식으로 작성되었다는 점
- 각 컴포넌트의 props 객체에는 'state의 초기값'과 '상위 요소'를 포함시킨다.
- 각 컴포넌트에는 state 멤버변수와 setState 메서드를 선언하여 상태 관리에 사용된다.

2.
App 컴포넌트 즉 전역 컴포넌트에는 각 하위 컴포넌트에서 사용되는 함수들이 정의 되었습니다.

3.
각 컴포넌트 내에는 해당 컴포넌트에 부여되는 event 함수들이 작성되었습니다.

ref: https://prgms.tistory.com/139
*/

