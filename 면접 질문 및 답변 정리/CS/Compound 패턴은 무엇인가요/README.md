# Compound 패턴

컴파운드 컴포넌트 패턴은 여러 컴포넌트들이 모여 하나의 동작을 할 수 있게 해 준다.

## 장점
- Compound 컴포넌트들은 내부적으로 상태를 다루며 몇몇 자식 컴포넌트들 사이에서만 공유한다.
- Compound 컴포넌트를 사용하면 우리 자신의 별도 상태를 다루는 것에 대해서 걱정할 필요가 없다.
 
- Compound 컴포넌트를 import할 때, 해당 컴포넌트에 필요한 자식 컴포넌트를 명시적으로 import할 필요도 없다.



## 단점
- 내부에서 React.Children.map을 사용하고 있기 때문에 쓰는 쪽에서 자식 컴포넌트를 약속된 형태로 넘겨야 하는 제약이 생긴다.
- 오직 부모 컴포넌트의 직접적인 자식들만 open과 toggle props에 대한 접근성이 생기므로, 이 컴포넌트를 다른 어떠한 컴포넌트로도 감쌀 수 없게 된다.

엘리먼트를 복제하는 경우. 복제 대상 컴포넌트가 기존에 갖고 있는 prop과 이름이 충돌될 수 있다. 이 경우 React.cloneElement를 사용할 때 넘어간 값으로 해당 prop은 덮어써질 것이다.

https://patterns-dev-kr.github.io/design-patterns/compound-pattern/