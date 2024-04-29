# SOLID원칙
SOLID 는 다음 5가지 원칙의 앞글자만 따온 단어입니다.

- SRP : Single Responsibility Principle  
- OCP : Open/Closed Principle  
- LSP : Liskov Substitution Principle  
- ISP : Interface Segregation Principle  
- DIP : Dependency Inversion Principle


 이상적인 소프트웨어 구조는 변경된 요구사항이 전달되었을 때 다른 컴포넌트에 영향(side-effect)이 가지 않도록 딱 원하는 부분만 변경할 수 있는, 응집도가 높고 결합도가 낮은 컴포넌트의 집합 구조

1. **SRP: 단일 책임 원칙 (Single Responsibility Principle)**
    - 콘웨이 법칙에 따른 따름정리: 소프트웨어 시스템이 가질 수 있는 최적의 구조는 시스템을 만드는 조직의 사회적 구조에 커다란 영향을 받는다. 따라서 **각 소프트웨어 모듈은 변경의 이유가 하나, 단 하나여야만 한다.** (= 하나의 모듈은 하나의 사용자 또는 **이해관계자**에 대해서만 책임져야 한다.)

2. **OCP: 개방-폐쇄 원칙 (Open-Closed Principle)**
    -  **기존 코드를 수정하기보다는 반드시 새로운 코드를 추가하는 방식으로 시스템의 행위를 변경할 수 있도록 설계**해야만 소프트웨어 시스템을 쉽게 변경할 수 있다는 것이 이 원칙의 요지다.
3. **LSP: 리스코프 치환 원칙 (Liskov Substitution Principle)**
    - 1988년 바바라 리스코프가 정의한, 하위 타입(subtype)에 관한 유명한 원칙이다. 요약하면, 상호 대체 가능한 구성요소를 이용해 소프트웨어 시스템을 만들 수 있으려면, 이들 구성요소는 반드시 서로 치환 가능해야 한다는 계약을 반드시 지켜야 한다.
4. **ISP: 인터페이스 분리 원칙 (Interface Segregation Principle)**
    - 이 원칙에 따르면 소프트웨어 설계자는 사용하지 않은 것에 의존하지 않아야 한다. (= 꼭 필요한 것에만 의존하도록 만들어야 한다)
5. **DIP: 의존성 역전 원칙 (Dependency Inversion Principle)**
    - 고수준 정책을 구현하는 코드는 저수준 세부사항을 구현하는 코드에 절대로 의존해서는 안 된다. 대신 세부사항이 정책에 의존해야 한다.


## Reference 
https://fe-developers.kakaoent.com/2023/230330-frontend-solid/  