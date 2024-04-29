# zustand(store 방식)와 jotai(atom 방식)의 차이점에 대해 설명해 주세요
Zustand과 Jotai는 둘 다 React 애플리케이션의 상태 관리를 위한 라이브러리 중 하나이며, 각각 "store"와 "atom"이라는 개념을 사용. 

## Zustand (Store 방식)
보일러 플레이트가 최소화된 상태관리 solution. Store 형태임에도 굉장히 간단하게 상태관리 구성이 가능하다.
store 구현 방식 및 변경 방식이 간단해 보일러플레이트 코드가 매우 줄어든다.
Provider로 감쌀 필요가 없다.

#### 상태 변경 방식
Zustand (Store 방식): Zustand은 상태 관리를 위한 store를 생성하고, 해당 store를 통해 상태를 직접적으로 변경합니다. Zustand는 기본적으로 Immer 라이브러리를 사용하여 불변성을 유지하면서 상태를 업데이트.

#### API 디자인
Zustand: Zustand은 단일 객체(store)를 통해 상태를 관리하며, 해당 객체에 액션을 디스패치하여 상태를 업데이트합니다. 이는 전통적인 Redux와 유사한 패턴을 사용합니다.

#### 리렌더링 최적화
Zustand: Zustand은 React의 Context API를 기반으로 하며, 필요한 경우 최적화를 위해 useStore를 사용하여 특정 상태에만 리렌더링을 트리거할 수 있습니다.





## Jotai (Atom 방식)
Jotai 는 Context의 re-rendering 문제를 해결하기 위해 만들어진 React 특화 상태관리 라이브러리

기본적으로 atom 단위로 상태를 관리하며 atom 을 이용해서 state를 생성한다.
보일러 플레이트 코드가 redux에 비하면 현저하게 줄어든다.


Primitive: 리액트 기본 state 함수인 useState 와 유사한 인터페이스


Flexible: atom들끼리 서로 결합 및 상태에 관여할 수 있고, 다른 라이브러리들과 원할한 결합을 지원한다.

#### 상태 변경 방식
Jotai (Atom 방식): Jotai는 상태를 atom이라는 작은 단위로 나누고, atom을 조합하여 전체 상태를 만듭니다. 각 atom은 자체적으로 업데이트 메서드를 가지고 있으며, 이를 통해 상태를 변경합니다. Jotai는 컴포넌트의 렌더링과 관련된 부분만 업데이트되도록 최적화되어 있습니다.

### API 디자인  

Jotai: Jotai는 작은 단위의 atom을 생성하고 이를 조합하여 상태를 만듭니다. Atom은 상태와 업데이트 함수를 갖추고 있으며, useContext와 함께 사용하여 컴포넌트 트리를 따라 데이터를 전파합니다.

리렌더링 최적화:


Jotai: Jotai는 미세한 업데이트를 가능케 하고, atom의 변경에 의해 영향을 받는 부분만을 리렌더링함으로써 성능을 최적화합니다.


## 결론
종합적으로, Zustand은 전통적인 상태 관리 방식을 따르면서도 Immer를 통해 불변성을 간편하게 유지하고, Jotai는 작은 단위의 atom을 통해 더 세분화된 상태 관리를 제공하며 최적화 측면에서도 특별한 주의를 기울입니다. 선택은 프로젝트의 성격과 개발자의 취향에 따라 다를 수 있습니다.


## Reference
https://programming119.tistory.com/263