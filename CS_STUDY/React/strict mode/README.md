# StrictMode

- StrictMode는 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구.리액트를 실행할때 조금 더 엄격하게 코드를 검사한다.  
  Strict 모드를 사용하면 리액트가 자식 컴포넌트를 검사하고 잘못 사용된 부분을 알려준다.  
  Strict 모드 경고 메세지를 보면서 리액트를 사용하면 어플리케이션에 잠재된 문제를 미리 해결할 수 있다.

Strict Mode는 다음과 같은 개발 전용 동작을 활성화합니다.

- 순수하지 않은 렌더링으로 인해 발생하는 버그를 찾기 위해 컴포넌트가 추가로 다시 렌더링됩니다.
- Effect 클린업이 누락되어 발생하는 버그를 찾기 위해 컴포넌트가 추가로 Effect를 다시 실행합니다.
- 더 이상 사용되지 않는 API의 사용 여부를 확인하기 위해 컴포넌트를 검사합니다.

이러한 모든 검사는 개발 전용이며 프로덕션 빌드에는 영향을 미치지 않습니다.

## 개발 중 이중 렌더링으로 발견한 버그 수정

strict Mode는 실수로 작성된 순수하지 않은 코드를 찾아내기 위해 몇 가지 함수(순수 함수여야 하는 것만)를 개발 환경에서 두 번 호출한다.

- 순수 함수인 경우 두 번 실행하여도 동작이 변경되지 않는다.(순수 함수는 항상 같은 결과를 생성하기 때문)
- Strict Mode에서는 항상 렌더링 함수를 두 번 호출하므로 실수를 바로 확인할 수 있습니다

## 개발 환경에서 Effect를 다시 실행하여 발견된 버그 수정

Strict Mode는 Effects의 버그를 찾는 데도 도움이 될 수 있다.

모든 Effect에는 몇 가지 셋업 코드가 있고 클린업 코드가 있을 수 있다. 일반적으로 React는 컴포넌트가 마운트(화면에 추가)될 때 셋업을 호출하고 컴포넌트가 마운트 해제(화면에서 제거)될 때 클린업을 호출한다.그런 다음 React는 마지막 렌더링 이후로부터 의존성이 변경된 경우 클린업과 셋업을 다시 호출한다.

Strict Mode가 켜져 있으면, React는 모든 Effect에 대해 개발 환경에서 한 번 더 셋업+클린업 사이클을 실행합니다
Strict Mode를 사용하면 클린업 함수가 누락되는 실수들을 프로세스 초기에 발견할 수 있습니다.

Strict Mode가 없으면 Effect를 클린업해야 한다는 사실을 놓치기 쉽다. 개발 환경에서 Effect에 대해 셋업 대신 셋업 → 클린업 → 셋업을 실행하면 Strict Mode에서 누락된 클린업 로직이 더 눈에 띄게 된다.

### 추가(useLayoutEffect)

Strict Mode가 켜져 있으면, React는 실제 첫 번째 setup 함수가 실행되기 이전에 개발 모드에만 한정하여 한 번의 추가적인 setup + cleanup 사이클을 실행합니다. 이는 cleanup 로직이 setup 로직을 완벽히 “반영”하고, setup 로직이 수행하는 작업을 중단하거나 되돌리는 지를 확인하는 스트레스 테스트입니다. 이로 인해 문제가 발생하면 cleanup 함수를 구현하세요.

## 검사항목

1. 안전하지 않은 생명주기를 사용하는 컴포넌트 발견

Strict 모드가 활성화되면, React는 안전하지 않은 생명주기 메서드를 사용하는 모든 클래스 컴포넌트 목록을 정리해 컴포넌트에 대한 정보가 담긴 경고 로그를 출력합니다.

2. 레거시 문자열 ref 사용에 대한 경고

Strict 모드는 문자열 ref의 사용에 대해 경고 공식적으로는 콜백 형태를 사용하는 것을 권장하기 때문.

3. findDOMNode 사용 여부(권장되지 않는 findDOMNode 사용에 대한 경고):  
   컴포넌트 자식 중 특정 엘리먼트를 찾는 함수이다. 자식 엘리먼트는 구현 방식에 따라 달라질 수 있기 때문에 유지보수하기 어려워 사용을 자제한다. 대신 직접 ref를 지정해 사용하라고 권장한다.

4. 예상치 못한 부작용(side effect):  
   커밋 단계는 일반적으로 매우 빠르지만, 렌더링 단계는 느릴 수 있습니다. 이로 인해, 곧 추가될 concurrent 모드(아직 기본적으로는 비활성화됨)는 렌더링 작업을 더 작은 단위로 나누고, 작업을 중지했다 재개하는 방식으로 브라우저가 멈추는 것을 피합니다.

즉, React는 커밋하기 전에 렌더링 단계의 생명주기 메서드를 여러 번 호출하거나 아예 커밋을 하지 않을 수도 있다.

```
constructor
componentWillMount (or UNSAFE_componentWillMount)
componentWillReceiveProps (or UNSAFE_componentWillReceiveProps)
componentWillUpdate (or UNSAFE_componentWillUpdate)
getDerivedStateFromProps
shouldComponentUpdate
render
setState 업데이트 함수 (첫 번째 인자)
```

위의 메서드들은 여러 번 호출될 수 있기 때문에, 부작용을 포함하지 않는 것이 중요. 이 규칙을 무시할 경우, 메모리 누수 혹은 잘못된 애플리케이션 상태 등 다양한 문제를 일으킬 가능성이 있다.

5. 레거시 컨택스트 사용 여부(레거시 context API 검사): 레거시 context API는 오류가 발생하기 쉬워 이후 릴리즈에서 삭제될 예정이며, StrictMode에서는 경고 메시지 노출

### 문제

몇번씩 호출될까요?

```ts
export default function App() {
  const [test1, setTest1] = useState(0);
  const [test2, setTest2] = useState(0);

  useEffect(() => {
    setTest1(1);
  }, []);

  useEffect(() => {
    setTest2(1);
  }, []);

  console.log('test');

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
```

## Reference

https://ko.legacy.reactjs.org/docs/strict-mode.html

https://jeonghwan-kim.github.io/2022/05/20/react-strict-mode

https://ko.react.dev/reference/react/StrictMode#strictmode
