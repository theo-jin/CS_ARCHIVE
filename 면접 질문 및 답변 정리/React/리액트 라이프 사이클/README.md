# 리액트 라이프 사이클 

모든 리액트 컴포넌트에는 라이프사이클이 존재. 컴포넌트의 수명은 페이지에 렌더링되기 전인 준비과정에서 시작하여 페이지에 사라질때 끝난다. 

생명주기 내에서는 여러 메서드가 호출되며 이를 사용할 수 있는데 클래스형 컴포넌트에서는 생명주기 메서드를 사용하고, 함수형 컴포넌트에서는 Hook을 사용

리액트 라이프사이클은 총세가지 카테고리를 가진다. 마운트, 업데이트, 언마운트 

## 1. 마운트
DOM이 생성되고 웹 브라우저상에 나타나는 것을 마운트(mount)라고 한다. 

호출되는 메소드:
- constructor: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드입니다.

- getDerivedStateFromProps: props에 있는 값을 state에 넣을 때 사용하는 메서드입니다.

- render: 우리가 준비한 UI를 렌더링하는 메서드입니다.

- componentDidMount: 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드입니다.

## 2. 업데이트
컴포넌트는 다음과 같은 총 네 가지 경우에 업데이트합니다.

1. props가 바뀔 때

2. state가 바뀔 때

3. 부모 컴포넌트가 리렌더링될 때

4. this.forceUpdate로 강제로 렌더링을 트리거할 때

호출되는 메소드:

- getDerivedStateFromProps: 이 메서드는 마운트 과정에서도 호출되며, 업데이트가 시작하기 전에도 호출됩니다. props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용합니다.

- shouldComponentUpdate: 컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정하는 메서드입니다. 이 메서드에서는 true 혹은 false 값을 반환해야 하며, true를 반환하면 다음 라이프사이클 메서드를 계속 실행하고, false를 반환하면 작업을 중지합니다. 즉, 컴포넌트가 리렌더링되지 않습니다. 만약 특정 함수에서 this.forceUpdate() 함수를 호출한다면 이 과정을 생략하고 바로 render 함수를 호출합니다.

- render: 컴포넌트를 리렌더링합니다.

- getSnapshotBeforeUpdate: 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드입니다.

- componentDidUpdate: 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드입니다.

## 3. 언마운트

마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것을 언마운트(unmount)라고한다.

호출되는 메소드:
- componentWillUnmount: 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드입니다.


```
useEffect(() => {}, []) // ComponetDidMount
useEffect(() => {}, [a, b]) // ComponentDidUpdate
useEffect(() => {return () => {}}) // ComponentWillUnmount 컴포넌트가 언마운트 되기 직전에 실행됨
```


```ts
function SomeComponent() {
  const [count, setCount] = useState(0);

  console.log("render");

  useEffect(() => {
    console.log("effect");

    return () => {
      console.log("clean up");
    };
  });

  return (
    <button
      onClick={() => {
        console.log("fire");
        setCount(count + 1);
      }}
    >
      count!
    </button>
  );
}
```
1. 컴포넌트 첫 렌더 => 'render'
2. 브라우저 레이아웃 및 페인트
3. useEffect 실행 및 clean up 함수 반환 => 'effect'
4. count! 버튼 클릭 => 'fire'
5. onClick 실행
6. setState 실행 및 리렌더 트리거
7. 컴포넌트 리렌더
8. 브라우저 레이아웃 및 페인트
9. 3번에서 useEffect가 반환한 clean up 실행
10. useEffect 실행 및 clean up 함수 반환