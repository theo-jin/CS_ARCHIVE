# 리액트의 fiber 아키텍처에 대해 설명해 주세요

Fiber는 React v16에서 리액트의 핵심 알고리즘을 재구성한 새 재조정(Reconciliation) 엔진  

React Fiber의 핵심 기능은 렌더링 작업을 여러 덩어리로 나누어 여러 프레임에 분산하고 다양한 유형의 업데이트에 우선 순위를 지정하는 것
 
### 기능의 주요 목표
1. 중단 가능한 작업을 덩어리로 나누기
2. 진행 중인 작업의 우선순위를 지정하고, 리베이스하고 재사용
3. 리액트의 레이아웃을 지원하기 위해 부모와 자식 간에 yield back and forth
4. render()로부터 다수 엘리먼트들을 반환
5. 에러 바운더리에 대한 더 나은 지원

Reconciliation
React가 변경해야 할 부분을 결정하기 위해 한 트리를 다른 트리와 비교하는 데 사용하는 알고리즘

Fiber는 Reconciler를 재구현한다.

## Fiber
 Fiber의 목표는 리액트가 스케줄링의 이점을 활용할 수 있도록 하는 것
그러기 위해서
- 일을 잠시 멈추고 나중에 다시 돌아오기
- 다른 유형의 일에 우선권 부여하기
- 이전에 완성한 작업을 재상용하기
- 더 이상 필요하지 않은 작업을 중단하기

이들을 하기 위해선, 먼저 단위별로 세분화해야 하며, 이 과정 자체가 Fiber라고 할 수 있다. Fiber는 작업의 한 단위(unit of work)를 나타낸다.

Fiber는 리액트 컴포넌트에 특화된 stack의 재구성이다. 

하나의 Fiber를 virtaul stack frame으로 간주할 수 있다.

stack을 재구성함으로써 얻는 이점은 stack frame을 메모리에 보관하고 원하는 경우 언제든지 실행할 수 있다는 것이다. 그래서 스케줄링 목표를 달성하는 데 매우 중요하다.

stack frame을 수동으로 처리하면 스케줄링뿐만 아니라 concurrency 및 error boundary와 같은 기능들에 대한 잠재력을 확보할 수 있다.

## Reference
https://velog.io/@jangws/React-Fiber