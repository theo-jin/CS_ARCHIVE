# Batching
배칭은 React가 더 나은 성능을 위해 여러 개의 state 업데이트를 하나의 리렌더링 (re-render)로 묶는 것을 의미한다.
예를들어, 하나의 클릭 이벤트 안에 두 개의 state 업데이트를 가지고 있다면, React는 언제나 이 작업을 배칭하여 하나의 리렌더링으로 만들었다.

React 18 이전까지, React 이벤트 핸들러 내부에서 발생하는 업데이트만 배칭을 하였다. Promise, setTimeout, native 이벤트 핸들러, 그리고 여타 모든 이벤트 내부에서 발생하는 업데이트들은 React에서 배칭되지 않았다.  

왜냐하면 이전에는 브라우저의 이벤트가 실행되는 중에만 Batching 작업을 수행했기 때문이다. 따라서 이벤트가 종료된 후에 실행되는 경우는 Batching 작업이 불가능했다.

## 리액트 18 부터 적용된 batching: Automatic Batching
React 18의 createRoot를 통해, 모든 업데이트들은 어디서 왔는가와 무관하게 자동으로 배칭되게 된다.

React 18 에서 제공하는 ReactDOM.createRoot 메서드를 기반으로 렌더링을 진행할 경우 모든 state update 작업은 자동으로 Batching 처리된다. 이 기능을 Automatic Batching 이라고 한다.

이 뜻은, timeout, promise, native 이벤트 핸들러와 모든 여타 이벤트는 React에서 제공하는 이벤트와 동일하게 state 업데이트를 배칭할 수 있다.
React 18 에서 제공하는 **ReactDOM.createRoot** 메서드를 기반으로 렌더링을 진행할 경우 모든 state update 작업은 자동으로 Batching 처리된다. 이 기능을 Automatic Batching 이라고 한다.

```
function App() {
	const [count, setCount] = useState(0);
	const [flag, setFlag] = useState(false);

	function handleClick() {
		fetchSomething().then(() => {
			// React 18 이후에서는 해당 작업을 Batching 처리 한다.
			setCount((c) => c + 1);
			setFlag((f) => !f);
			// React 는 해당 작업을 일괄 처리하여 한 번의 리렌더링만 진행한다.
		});
	}

	return (
		<div>
			<button onClick={handleClick}>Next</button>
			<h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
		</div>
	);
}

function fetchSomething() {
	return new Promise((resolve) => setTimeout(resolve, 100));
}

const rootElement = document.getElementById("root");
// React 18 에서 새롭게 제공하는 createRoot 메서드를 사용해야 한다!
ReactDOM.createRoot(rootElement).render(<App />);
```

 이를 통해 우리는 렌더링을 최소화하고, 나아가 애플리케이션에서 더 나은 성능을 기대한다.

React는 업데이트의 발생지점과 무관하게 자동으로 업데이트를 배칭한다. 

## Batching은 어떤 이점을 주는가?
 

여러개의 state 업데이트마다 발생하는 불필요한 리렌더링을 막아주기 때문에 성능적 이점을 준다..

레스토랑에서 종업원이 손님이 주문하는 첫번째 메뉴를 듣자마자 주방으로 달려가지 않듯이
Batching은 반드시 필요한 하나의 리렌더링을 수행한다.

## Auto Batching 을 무시하는 법:ReactDOM.flushSync()
- react-dom 라이브러리에 추가된 ReactDOM.flushSync() 메서드는 Auto Batching 을 무시하고 즉시 DOM을 렌더링해준다.
- React 에서는 공식적으로 해당 메서드의 사용을 추천하진 않으며 (de-opt case), 필요한 상황이 있을 경우에만 사용할 것을 강조했다.

```
import { flushSync } from "react-dom";

function handleClick() {
	// React 는 flushSync 메서드가 실행되는 즉시 DOM을 업데이트 한다.
	flushSync(() => {
		setCounter((c) => c + 1);
	});
	// React 는 flushSync 메서드가 실행되는 즉시 DOM을 업데이트 한다.
	flushSync(() => {
		setFlag((f) => !f);
	});
	// 따라서 해당 함수가 실행될 경우 React는 총 두 번의 리렌더링을 수행한다.
}
```
### Reference
https://velog.io/@rookieand/React-18%EC%97%90%EC%84%9C-%EC%B6%94%EA%B0%80%EB%90%9C-Auto-Batching-%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80
https://immigration9.github.io/react/2021/06/12/automatic-batching-react.html