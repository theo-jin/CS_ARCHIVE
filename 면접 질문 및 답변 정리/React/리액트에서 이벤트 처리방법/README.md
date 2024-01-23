# 리액트에서 이벤트 처리방법

## React 엘리먼트에서 이벤트를 처리하는 방식
- React의 이벤트는 소문자 대신 캐멀 케이스(camelCase)를 사용합니다.
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다. (문자열이 아닌 JSX 함수명으로 전달한다. (onClick={함수명}))
리액트
- DOM 요소에만 이벤트 설정이 가능합니다.
```<div>, <button>, <input>, <form>, <span>``` 등의 DOM 요소에는 이벤트 설정이 가능하지만, 리액트의 컴포넌트에는 불가능합니다.

## 이벤트 핸들러 네이밍
- Props의 경우 : 보통 onClick과 같이 on접두사를 지정합니다.
- Function Names의 경우: handle접두사가 붙은건 이벤트가 발생했을 때 호출되는 실제 function을 의미

## React 합성 이벤트(Synthetic Event)
**크로스 브라우징 해결**
브라우저마다 이벤트 이름부터 시작해서 이벤트 종류나 이벤트가 처리되는 방식이 다르다. 
이를 동일하게 처리하기 위해 React는 Synthetic 이벤트로 브라우저마다 다른 native 이벤트를 묶어서 처리한다.
즉, 이벤트 핸들러는 모든 브라우저에서 이벤트를 동일하게 처리하기 위한 이벤트 래퍼 SyntheticEvent 객체를 전달받는다.
## 많이 쓰이는 DOM 이벤트
- onClick : Element를 클릭했을 때
- onChange : Element의 내용이 변경되었을 때(input의 텍스트를 변경, 파일 선택 등)
- onKeyDown, onKeyUp, onKeyPress : 키보드 입력이 일어났을 때
- onDoubleClick : Element를 더블 클릭했을 때
- onFocus : Element에 Focus 되었을 때
- onBlur : Element가 Focus를 잃었을 때
- onSubmit : Form Element에서 Submit 했을 때
## 이벤트의 기본동작 방지
DOM 엘리먼트의 경우 이벤트 핸들러가 false를 반환해도 해당 엘리먼트의 기본 동작을 방지할 수 있었지만, 
React에서는 preventDefault()를 기본동작 방지로 사용한다.
보통 form에서 input을 받을때 콘솔창에 출력해볼때 자주 사용합니다. 
form의 onSubmit으로 이벤트를 수행하면 바로 새로운 페이지로 연결되기에 콘솔창을 제대로 확인할 수 없기때문
### e.preventDefault()와 e.stopPropagation()의 차이점은?
```
e.preventDefault()는 고유 동작을 중단시키고,
e.stopPropagation()은 상위 엘리먼트들로의 이벤트 전파를 중단시킵니다
```
리액트 이벤트 처리 방식이 전통적인 방식과 다른 이유

**브라우저 호환성**
낮은 버전의 브라우저의 경우 이벤트 처리가 일관되게 작동하지 않을 수 있다. 때문에 리액트는 기존 이벤트 객체를 SyntheticEvent로 래핑함으로써 호환되지 않는 환경에서도 이벤트 처리를 동일한 방법으로 할 수 있게 한다.
**성능 향상**
- 이벤트 핸들러는 많으면 많을 수록 많은 메모리를 차지한다.
- 리액트는 DOM 엘리먼트에 직접 이벤트 핸들러를 부착하지 않는다. 리액트는 문서 최상위에 있는 하나의 이벤트 핸들럴르 사용한다. 이 핸들러는 모든 이벤트를 리스닝하며, 이벤트 발생 시 적합한 개별 핸들러를 호출하는 역할을 한다.
이는 이벤트 처리 코드를 개발자가 직접 최적화 하지 않아도 되게 해준다.
https://ko.legacy.reactjs.org/docs/handling-events.html
https://velog.io/@yoonvelog/React-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%B2%98%EB%A6%AC
https://velog.io/@gyumin_2/React.js-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0