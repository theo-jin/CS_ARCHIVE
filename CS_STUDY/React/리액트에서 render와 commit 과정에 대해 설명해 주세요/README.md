# Render and Commit

렌더링 단계는 특정 환경(예를 들어, DOM과 같이)에 어떤 변화가 필요한 지 결정하는 단계입니다. 이 과정에서 React는 render를 호출하여 이전 렌더와 결과값을 비교합니다.

커밋 단계는 React가 변경 사항을 반영하는 단계입니다(React DOM의 경우 React가 DOM 노드를 추가, 변경 및 제거하는 단계를 말합니다). 이 단계에서 React는 componentDidMount 나 componentDidUpdate 와 같은 생명주기 메서드를 호출합니다.

**Render and Commit과정은 먼저 세단계로 진행된다.**

1. 렌더링 촉발 Triggering a render
2. 컴포넌트 렌더링 Rendering the component
3. DOM에 커밋 Committing to the DOM

## Step1 : 렌더링 촉발 Triggering a render

렌더링은 두가지 경우일 때 촉발된다.

1. 컴포넌트의 첫 렌더링인 경우(createRoot 함수와 render 함수를 통해 이루어진다.)
2. 컴포넌트의 state(또는 상위 요소 중 하나)가 업데이트된 경우

## Step2 : 컴포넌트 렌더링 Rendering the component

렌더링을 촉발시키면, React는 컴포넌트를 호출하여 화면에 표시할 내용을 파악한다.("렌더링"은 React에서 컴포넌트를 호출하는 것입니다.)

첫 렌더링에서 React는 루트 컴포넌트를 호출하고,이후 렌더링에서 React는 state 업데이트에 의해 렌더링이 발동된 함수 컴포넌트를 호출한다.

## Step3 : DOM에 커밋 Committing to the DOM

컴포넌트를 렌더링(호출)한 후 React는 DOM을 수정합니다.

- 초기 렌더링의 경우 React는 appendChild() DOM API를 사용하여 생성한 모든 DOM 노드를 화면에 표시합니다.

- 리렌더링의 경우 React는 필요한 최소한의 작업(렌더링하는 동안 계산된 것!)을 적용하여 DOM이 최신 렌더링 출력과 일치하도록 한다.

React는 렌더링 간에 차이가 있는 경우에만 DOM 노드를 변경합니다.
Render phase에서 컴포넌트가 변경되어야 한다고 React에서 계산이 되면 Render 함수를 통해 실제 DOM으로 반영이 되는데 이를, Commit Phase(변경 사항을 실제 DOM에 적용하는 단계) 라고 한다.

### Brower Paint

렌더링이 완료되고 React가 DOM을 업데이트한 후 브라우저는 화면을 다시 그립니다. 이 단계를 "브라우저 렌더링"이라고 하지만 이 문서의 나머지 부분에서 혼동을 피하고자 "페인팅"이라고 부를 것입니다.

## Reference

https://react-ko.dev/learn/render-and-commit  
https://velog.io/@jinyoung234/Render-and-commit#react-commits-changes-to-the-dom
