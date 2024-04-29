# React18에서 도입된 동시성(concurrency)이 무엇인가요?

- 동시성은 순서에 상관없이 동시에 수행될 수 있다는 뜻을 의미합니다. 리액트 18에서는 렌더링 프로세스를 독립적으로 중단할 수 있는 작업 단위로 나누어서 구조화하는 방식.

- 여러 작업을 작은 단위로 나눈 뒤 그 작업들 간의 우선순위를 정하고 그에 따라 작업을 번갈아 수행. 작업간의 전환이 매우 빠르게 이루어 지기 때문에 동시에 여러 작업이 수행되는 것 처럼 보이게 됨

## 동시성을 도입하는 이유

- 리액트 18 이전: 렌더링은 개입할 수 없는 하나의 동기적인 처리=>그래서 한번 렌더링이 시작되면 렌더링을 중단/재개/폐기할 수 없었다. 만약 동시성이 지원되지 않을 경우엔 렌더링이 오래 걸린다면 다음에 수행해야 하는 작업은 블록킹되어 애플리케이션이 버벅이는 현상 발생 가능.

- 동시성 렌더링을 통해서 리액트는 렌더링 자체에 개입하고, 이를 중단하거나 재개하고 또는 폐기할 수 있다. 그래서 리액트는 무거운 렌더링 작업을 하는 동안에도 사용자와의 상호작용에 더 빨리 반응

## concurrent mode

concurrent mode를 사용시 "동시성"을 도입했기 때문에 여러 작업을 동시에 할 수 있게 됩니다.그 원리는
특정 state가 변경되었을 때 현재 UI를 유지하고, 해당 변경에 따른 UI 업데이트를 동시에 준비하면서 준비 중인 UI의 렌더링 단계가 특정 조건에 부합하면 실제 DOM에 반영하는 방식으로 진행
Concurrent Mode로 설정하기 위해서는 기존의 render 대신 createRoot를 사용하면 된다.

## Automatic Batching

배칭은 React가 더 나은 성능을 위해 여러 개의 state 업데이트를 하나의 리렌더링 (re-render)로 묶는 것을 의미한다.

- React 18 이전의 Automatic Batching: 이벤트 핸들러 내부에서 상태 변화만 한번에 처리하였습니다.하지만 이벤트 핸들러 바깥에서 진행된 업데이트는 일괄로 처리되지 않았다.=>네트워크 호출을 하는 맥락에서는 상태 업데이트가 일괄 처리 되지 않고 나눠서 처리하여 여러번 리렌더링이 발생.

- React 18 에서 제공하는 ReactDOM.createRoot 메서드를 기반으로 렌더링을 진행할 경우 모든 state update 작업(Promise, setTimeout, native 이벤트 핸들러, 그리고 여타 모든 이벤트 내부에서 발생하는 업데이트 포함)은 자동으로 Batching 처리된다. 이 기능을 Automatic Batching 이라고 한다.

여러개의 state 업데이트마다 발생하는 불필요한 리렌더링을 막아주기 때문에 성능적 이점을 준다

## Transitions

Transitions은 자원이 급하게 필요하지 않은 업데이트 상황에서 UI 변화를 표시하는 데 사용.무거운 UI 작업을 바로 급하게 처리하지 않아도 되는 우선순위가 낮은 작업에 Transition을 사용하면, 무거운 계산 과정을 나중에 처리함으로 UI blocking 없이 동시에 다른 작업이 수행되는 것과 같은 사용자 경험을 개선할수 있다. 그리고 React는 렌더링을 더 쉽게 최적화 하고, 업데이트의 우선 순위를 잘 매길 수 있게 됨.

예시)

1. 커서가 깜빡이며 검색어에 대한 피드백이 발생
2. 입력된 데이터에 대한 검색이 진행됨

위와 같은 상황에서
커서가 깜빡이는 시각적인 피드백은 사용성에서 중요하므로 우선순위가 높다. 하지만 검색은 조금 지연되더라도 문제되지 않으니 우선순위가 낮다.

이렇게 긴급하지 않는, 우선순위가 낮은 작업을 처리하는 부분에서 Transitions를 사용하면 리액트는 우선순위에 따라 업데이트를 진행가능.

## Suspense

Suspense는 아직 렌더링이 준비되지 않은 컴포넌트가 있을때 로딩 화면을 보여주고 로딩이 완료되면 해당 컴포넌트를 보여주는 React에 내장되어 있는 기능 이를 이용해서 컴포넌트 렌더링을 어떤 작업이 끝날 때까지 잠시 중단시키고, 다른 컴포넌트를 먼저 렌더링할 수 있다.

`<Suspense>`를 사용하면 자식 컴포넌트가 로딩이 완료될 때까지 fallback UI를 표시할 수 있다.

Suspense를 사용한 경우

```ts
// MyPage.tsx
function MyPage() {
  const info = useUserInfo();

  return <div>{info.data.name}님 안녕하세요.</div>;
}
// App.tsx
<ErrorBoundary fallback={<MyErrorPage />}>
  {' '}
  // 에러 처리
  <Suspense fallback={<Loader />}>
    {' '}
    // 로딩 처리
    <MyPage />
  </Suspense>
</ErrorBoundary>;
```

Suspense를 사용한 경우엔 MyPage에서는 컴포넌트의 주된 목적인 "사용자가 필요한 정보"를 보여주기만 하면 된다.
데이터의 로딩과 에러 상태는 MyPage 컴포넌트를 사용하는 상위 컴포넌트에서 fallback 으로 처리할 수 있다.
이렇듯 Suspense, ErrorBoundary 를 사용하면 데이터 요청 상태에 따른 처리를 관심사의 분리와 함께 선언적으로 처리할 수 있다.

### Suspense의 중첩

```ts
<Suspense fallback={<Spinner1 />}>
  // Suspense 1
  <ComponentA />
  <Suspense fallback={<Spinner2 />}>
    // Suspense 2
    <ComponentB />
  </Suspense>
</Suspense>
```

위 예제처럼 Suspense가 중첩된 경우를 생각해봅시다.

ComponentA가 준비가 안된 경우
이 경우엔 Spinner1이 보여지게 됩니다. ComponentA의 가장 가까운 상위 Suspense이기 때문입니다. 그리고 Spinner2는 보이지 않습니다.

ComponentA는 준비 되고, ComponentB가 준비가 안된 경우
이 경우엔 Spinner2이 보입니다. ComponentB의 가장 가까운 상위 Suspense이기 때문입니다. ComponentA는 정상적으로 렌더링되어 보여집니다.
만약 Suspense 2가 누락되었다면 ComponentA가 준비 되었더라도, ComponentB가 준비 안되었다면 가장 상위 Spinner1를 보여지게 됩니다. 따라서 원치 않은 최상위 로딩 indicator가 나타나서 사용성을 해치는 경우가 있을 수 있으니 조심해야 합니다.

### TanStack Query와 Suspense

하지만 무분별하게 Suspense를 사용하면 네트워크 병목 현상이 발생할 수 있다.

Suspense로 감싸준 컴포넌트 안에서 두 개의 useQuery 요청을 보낸다면, api 요청이 하나씩 차례로 요청되어 병목현상이 발생.

때문에 하나의 컴포넌트에서 여러 개의 api 요청을 수행하는 경우엔 TanStack Query v4.15이상의 환경에서 useQueries를 사용하여 네트워크 병목 현상을 해결할 수 있습니다.

### Server Suspense

- React 18 이전: 앱에서 특정 컴포넌트만 느리고 다른 컴포넌트들은 빠르더라도 전체 페이지 로드가 느려지게 되었다.
- React 18 : 서버에서 Suspense를 사용가능. 앱의 느린 컴포넌트를 Suspense로 감싸서 해당 부분의 로딩을 지연시킬 수 있게 되다. 느린 컴포넌트가 준비되기 이전엔 loading 상태를 표시, 다른 컴포넌트들을 전부 렌더링하여 전체 페이지 로드를 빠르게 수행할 수 있게 되었음.느린 컴포넌트가 준비가 다 되되면 컨텐츠를 채워갈 수 있게됨.

## Q.동시성(Concurrency)과 비동기차이는?

- 비동기: 결과를 기다리지 않고 바로 다음 작업을 실행할 수 있게 하는 방식. 보통 메인스레드에서 작업을 다른 스레드로 분산처리시키고 그 작업이 끝나길 기다리지않고 다음 작업을 생성

- 동시성: 싱글 코어(멀티 코어에서도 가능)에서 멀티스레드처럼 동작시키기 위한 방식. 멀티 태스킹을 위해 여러 개의 스레드가 번갈아 가면서 실행되는 방식

즉, 동기와 비동기가 작업을 보내는 시작점에서 작업을 기다릴지 말지에 관한 개념이라면, 동시성은 여러 작업을 한꺼번에 다루는 것과 관련된 개념

## Reference

https://velog.io/@perfumellim/%EC%89%BD%EA%B2%8C-%EB%96%A0%EB%A8%B9%EC%97%AC%EC%A3%BC%EB%8A%94-React-18-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8

https://velog.io/@heelieben/React-18-Concurrent-Rendering
