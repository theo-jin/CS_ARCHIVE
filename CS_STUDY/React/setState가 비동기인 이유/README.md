# setState가 비동기인 이유

setState의 역할은 컴포넌트의 state 객체를 업데이트하는 것이다. 리액트에서는 state가 변경되면 컴포넌트가 리렌더링된다.

리액트의 setState가 비동기로 작동하는 이유: 렌더링 횟수를 줄여 더 빠르게 동작하게 하기 위함

1. 리액트에서는 state나 props가 변경되면 컴포넌트가 리렌더링된다.
2. 컴포넌트가 리렌더링되면 렌더링 함수가 호출되고, 이때 리액트는 새로운 가상 돔을 생성하여 이전 가상돔과 비교하여 변경된 부분만 실제 돔에 반영한다.
   이 과정을 reconciliation(조정)이라고 한다.
3. 리액트의 fiber 아키텍쳐는 reconciliation을 진행할 때 render phase와 commit phase의 두 단계로 나누어 진행한다.
   - render phase는 가상돔 트리를 순회하면서 변경된 부분을 찾는 과정이고, commit phase는 실제 돔에 변경 사항을 반영하는 과정이다.

실제 돔에 업데이트하는 과정이 만약 동기적으로 진행된다면, 메인 스레드가 차단되거나 응답 지연이 발생해서 렌더링 과정이 지연될 수도 있다.
이는 UX를 저해하는 요소가 될수도 있다.

```
정확히는 16ms 단위로 batch update를 진행하고, 그사이 변경된 상태값을 모아서(merge) 이전의 엘리먼트 트리와 변경된 state가 적용된 엘리먼트 트리를 비교하는 작업(reconciliation)을 거쳐 최종적으로 변경된 부분만 DOM에 적용시킨다.

state는 결국 객체이기 때문에 ...
merge 단계가 어떻게 이루어지는지는 Object.assign()으로 객체를 합칠 때는 생각하면 이해할 수 있다. state도 결국 객체이기 때문에, 같은 키값을 가진 경우라면 가장 마지막 실행값으로 덮어씌워진다.
```

**'setState가 비동기 함수가 아니라 setState 함수의 '호출'이 비동기적으로 이루어지는 것이다'**

```
함수가 비동기적으로 호출되는 것과 함수 자체가 비동기인 것은 다릅니다.
(예를 들어) setTimeout 함수는 비동기적으로 작동하나, (setTimeout 함수 안에 들어가는) 콜백 함수는 비동기 함수가 아닐 수 있습니다.
```

setState 함수는 동기 함수이지만
setState 함수 호출은 비동기적으로 일어난다.
그래서 상태의 업데이트 결과가 즉각적으로 바로 다음 코드 라인에 반영되지 않는다.

리액트의 setState가 동기 함수인데 마치 비동기 함수처럼 보이는 이유는 리액트의 리렌더링 원리가 가상 돔을 통해 비동기적으로 작동하기 때문이다.

리렌더링이 발생해야 업데이트된 상태 값이 가상돔 트리에 반영된다.

즉, 업데이트된 상태는 리렌더링된 후에 참조할 수 있다.

이러한 리렌더링이 비동기적으로 일어나기 때문에 성능적인 이득이 생긴다.
비동기적으로 일어나기 때문에 batch update(한 번에 모아서 업데이트)가 가능하고, (= 매번 변화가 발생할 때마다 바로바로 업데이트 x)
비동기적으로 리렌더링이 일어나기 때문에 렌더링의 우선순위를 설정할 수 있다

## Reference

https://velog.io/@zuzokim/React-setState%EA%B0%80-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%9D%B8-%EC%9D%B4%EC%9C%A0

https://velog.io/@yena1025/setState%EB%8A%94-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%95%A8%EC%88%98%EC%9D%B8%EA%B0%80

https://velog.io/@hyunjine/%EC%99%9C-setState%EB%8A%94-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%A0%81%EC%9C%BC%EB%A1%9C-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94%EA%B0%80

https://velog.io/@rookieand/React-18%EC%97%90%EC%84%9C-%EC%B6%94%EA%B0%80%EB%90%9C-Auto-Batching-%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80

https://github.com/reactwg/react-18/discussions/21

https://www.dashlane.com/blog/how-is-data-stored-in-v8-js-engine-memory
