# React 19에서 actions의 개념에 대해 설명해주시고. useActionState에 대해 간략히 설명해주세요

## Actions

데이터를 변조하고 이에 따라 상태를 업데이트
async transitions을 사용하는 함수를 "Actions"이라 부른다.

React 19 에서는 트랜지션에서 비동기 함수를 사용하여 pending states(대기 상태), errors(오류), optimistic updates(낙관적 업데이트), sequential requests(연속 요청) 를 자동으로 처리할 수 있습니다.

### Actions는 데이터 제출을 자동으로 관리합니다:

- Pending state: Actions는 요청이 시작될 때 보류 상태를 제공하고 최종 상태 업데이트가 완료되면 자동으로 리셋됩니다.
- 낙관적 업데이트: Actions는 새로운 useOptimistic 훅을 지원하여 요청이 제출되는 동안 사용자가 즉각적인 피드백을 볼 수 있게 합니다.
- 오류 처리: Actions는 오류 처리를 제공하여 요청이 실패할 경우 Error Boundaries를 표시하고 낙관적 업데이트를 원래 값으로 자동으로 되돌립니다.
- 폼: <form> 요소는 이제 action 및 formAction 속성에 함수를 전달할 수 있습니다. action 속성에 함수를 전달하면 기본적으로 Actions를 사용하며 제출 후 폼을 자동으로 리셋합니다.

## useActionState

useActionState는 폼 액션의 결과를 기반으로 state를 업데이트할 수 있도록 제공하는 Hook.

컴포넌트 최상위 레벨에서 useActionState를 호출하여 폼 액션이 실행될 때 업데이트되는 컴포넌트 state를 생성합니다.
useActionState에 기존의 폼 작업 함수와 초기 state를 전달하면, 최신 폼 state와 함께 폼에서 사용하는 새로운 액션을 반환합니다.
최신 폼 state 또한 제공된 함수에 전달됩니다.

useActionState는 Action을 하는 function를 인자로 받고, 래핑된 Action을 반환합니다.
래핑된 Action이 호출되면 useActionState는 Action의 마지막 결과를 데이터로 반환하고, 보류 중인 상태(pending state) 라면 보류 중(pending)으로 반환합니다.

사용 예시)

```ts
const [state, formAction] = useActionState(fn, initialState, permalink?);
```

### 매개변수

- fn: 폼이 제출되거나 버튼을 눌렀을 때 호출될 함수.함수가 실행될 때, 첫 번째 인수로 폼의 이전 state를 전달합니다. state는 초기에 전달한 initialState이고, 이후에는 이전 실행의 반환값입니다. 그 후 일반적으로 폼 액션에 전달하는 인수들이 이어집니다.

- initialState: 초기 state로 설정하고자 하는 값으로, 직렬화 할 수 있는 값일 수 있습니다. 액션이 처음 호출된 후에는 이 인수를 무시합니다.

- optional permalink: 이 폼이 수정하는 고유의 URL이 포함된 문자열입니다. 점진적인 향상과 함께 동적 콘텐츠(예: 피드)가 있는 페이지에서 사용합니다. fn이 서버 액션이고 폼이 자바스크립트 번들이 로드되기 전에 제출된다면, 브라우저는 현재의 페이지 URL이 아닌 명시된 permalink의 URL로 이동합니다. React가 상태를 전달하는 방법을 알 수 있도록 동일한 폼 컴포넌트가 대상 페이지에 렌더링 되어야 합니다(동일한 액션 fn 및 permalink 포함). 폼이 hydrated하면 이 매개변수는 아무런 영향을 미치지 않습니다.

### 반환값

useActionState는 정확히 두 개의 값이 담긴 배열을 반환합니다.

현재 state입니다. 첫 번째 렌더링에서는 전달한 initialState와 일치합니다. 액션이 실행된 이후에는 액션에서 반환한 값과 일치합니다.
form 컴포넌트의 action prop에 전달하거나 폼 내부 button 컴포넌트의 formAction prop에 전달할 수 있는 새로운 액션입니다.

## Reference

https://ko.react.dev/reference/react/useActionState

https://modulabs.co.kr/blog/react-19/

https://www.youtube.com/watch?v=NrlvV9zRQm0
