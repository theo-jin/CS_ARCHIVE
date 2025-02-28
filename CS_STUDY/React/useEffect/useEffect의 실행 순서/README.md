# useEffect의 실행 순서

## useEffect

useEffect는 외부 시스템과 컴포넌트를 동기화하는 React Hook
useEffect는 컴포넌트의 최상위 레벨에서 useEffect를 호출하여 Effect를 선언할 수 있다.

### 매개변수

- setup(설정): Effect의 로직이 포함된 함수.
  setup함수는 선택적으로 clean up(정리) 함수를 반환할 수 있다.
  React는 컴포넌트가 DOM에 추가된 이후에 설정 함수를 실행한다.
  의존성의 변화에 따라 컴포넌트가 리렌더링이 되었을 경우, (설정 함수에 정리 함수를 추가했었다면) React는 이전 렌더링에 사용된 값으로 정리 함수를 실행한 후 새로운 값으로 설정 함수를 실행한다. 컴포넌트가 DOM에서 제거된 경우에도 정리 함수를 실행한다.

```
cleanup 함수

useEffect의 setup 함수가 리턴하는 함수로, 컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 수행할 작업이 있는 경우 사용한다.
```

- dependencies : 설정 함수의 코드 내부에서 참조되는 모든 반응형 값들이 포함된 배열로 구성됩니다.
  반응형 값에는 props와 state, 모든 변수 및 컴포넌트 body에 직접적으로 선언된 함수들이 포함된다.
  린터(소스 코드를 분석하여 프로그램 오류, 버그, 스타일 오류, 의심스러운 구조체에 표시(flag)를 달아놓기 위한 도구)가 리액트 환경에 맞게 설정되어 있을 경우,
  린터는 모든 반응형 값들이 의존성에 제대로 명시되어 있는지 검증할 것입니다.
  의존성 배열은 항상 일정한 수의 항목을 가지고 있어야 하며 [dep1, dep2, dep3]과 같이 작성되어야 합니다.
  React는 각각의 의존성들을 Object.is 비교법을 통해 이전 값과 비교하고, 의존성을 생략할 경우, Effect는 컴포넌트가 리렌더링될 때마다 실행됩니다.
  인수에 의존성 배열을 추가했을 때, 빈 배열을 추가했을 때, 의존성을 추가하지 않았을 때의 차이를 확인해 보세요.

### 반환값

useEffect는 undefined를 반환합니다.

## useEffect의 실행 순서

setup 함수는 optional dependencies에 무엇이 오든 간에 컴포넌트가 DOM에 마운트되면 일단 실행된다.

모든 리렌더링이 발생한 다음에는 (cleanup 함수를 작성했다면) 변경되기 이전 값으로 cleanup 함수를 호출하며 이후 변경된 새로운 값으로 setup 함수를 호출한다.

useEffect의 실행 순서는(optional dependencies가 있는 경우)

1. 컴포넌트 마운트 시 setup 함수 호출
2. props/state 업데이트
3. 리렌더링 발생
4. 변경 이전 값으로 cleanup 함수 호출
5. 변경 이후 값으로 setup 함수 호출

useEffect는 (리)렌더링이 발생한 다음 실행된다. 즉, 상태 변경이 먼저 일어난다.

자식 컴포넌트의 useEffect가 먼저 실행되고 그 다음 부모의 useEffect가 실행된다. 즉, 자식 컴포넌트가 먼저 렌더링된다.

useEffect의 setup 함수는 컴포넌트가 마운트될 때 무조건 한 번 실행된다. 따라서 오직 의존성 배열 요소에 변경이 있을 때만 실행시키려면 상태 값을 직접 비교하는 로직이 필요하다.

cleanup 함수가 있는 경우 변경이 발생하기 이전 값을 참조하여 cleanup 함수를 실행하고, 그 다음에 변경이 반영된 값을 참조해 setup 함수를 실행한다.

## Reference

https://ko.react.dev/reference/react/useEffect
https://velog.io/@jhsung23/React-useEffect-%EC%8B%A4%ED%96%89-%EC%88%9C%EC%84%9C#useeffect-%EC%8B%A4%ED%96%89-%EC%88%9C%EC%84%9C-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0
