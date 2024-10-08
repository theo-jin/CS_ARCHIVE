# 프레임워크 vs 라이브러리

## 라이브러리

- 공통으로 사용될 수 있는 특정한 기능들을 모듈화한것을 의미한다. 폴더명, 파일명 등에 대한 규칙이 없고 프레임워크에 비해 자유롭다.

### 라이브러리의 특징 및 기능

- 코드 재사용성: 라이브러리는 특정 작업을 처리하는 코드의 재사용을 촉진합니다.
- 추상화: 복잡한 작업을 간단한 함수 호출로 추상화합니다.
- 모듈화: 라이브러리는 기능별로 모듈화되어 필요에 따라 가져다 쓸 수 있습니다.
- 유연성: 개발자가 필요에 따라 라이브러리를 선택하여 사용할 수 있습니다.

## 프레임워크

- 공통으로 사용될 수 있는 특정한 기능들을 모듈화한 것을 의미한다. 폴더명, 파일명 등에 대한 규칙이 있으며 라이브러리에 비해 좀 더 엄격하다.
- 원하는 기능 구현에 집중하여 개발할 수 있도록 일정한 형태와 기능을 갖추고 있는 골격, 뼈대를 의미.프레임워크는 애플리케이션 개발 시 필수적인 코드, 알고리즘, DB연동과 같은 기능을 위해 어느정도 구조(뼈대)를 제공하고, 이러한 구조위에서 사용자가 코드를 작성해서 애플리케이션을 개발.
- 앱/서버 등의 구동, 메모리관리, 이벤트 루프 등 공통된 부분은 프레임워크가 관리하고, 사용자는 프레임워크가 정해준 방식대로 클래스, 메소드를 구현하면 됩니다.

### 프레임워크의 특징 및 기능

- 개발자가 따라야 하는 가이드를 제공한다.
- 개발할 수 있는 범위가 정해져있다.
- 개발자를 위한 다양한 도구 , 플로그인들을 지원한다.
- 코드 재사용성 : 프레임워크는 공통 기능을 제공하여 코드 재사용에 용이합니다.
- 일정한 구조 제공 : 프레임워크는 애플리케이션의 구조를 정의하여 개발자가 그 구조를 따르도록 합니다.
- 모듈화 : 프레임워크는 기능을 모듈화하여 독립적인 컴포넌트로 나눌 수 있게 합니다.
- 생산성 향상 : 반복적인 작업을 자동화하고 개발 생산성을 높입니다.
- 유지보수성 : 일관된 코드 구조를 유지하여 유지보수성을 향상시킵니다

### 프레임워크의 장점

- 개발 시간을 줄일 수 있음
- 정형화 되어 있어 일정수준 이상의 품질을 기대할 수 있음
- 유지 보수가 쉬움

### 프레임워크의 단점

- 너무 의존하면 개발자들의 능력이 떨어져서 스스로 직접 개발하는 것이 어려워짐
- 습득에 걸리는 시간이 오래 걸림

## 프레임워크 vs 라이브러리

### 제어의 역전 (Inversion of Control)

라이브러리와 프레임워크의 가장 큰 차이는 제어 흐름에 대한 주도성이 누구에게/어디에 있는가에 있다.

- 어플리케이션의 Flow(흐름)를 누가 쥐고 있느냐에 달려있다.

- 프레임워크는 전체적인 흐름을 프레임워크가 쥐고 있으며 사용자는 그 안에 필요한 코드를 짜 넣으면 된다.
- 라이브러리는 사용자가 전체적인 흐름을 직접 만들고 필요에 따라 라이브러리를 가져다가 쓰는 것이라고 할 수 있다.

프레임워크는 그 틀안에 제어 흐름에 대한 주도성이 내포되어 있고, 라이브러리는 사용자가 전적으로 제어 흐름에 대한 주도성을 가집니다.

### 구조 제공 유무

프레임워크는 전체 어플리케이션의 구조를 정의하여 일정한 개발 패턴을 따르게끔 합니다. 앞서 말한 제어 흐름을 가지고 있다는 것과 거의 유사한 의미입니다.

그러나 라이브러리는 특정 기능만을 제공할 뿐 어플리케이션의 전체 구조에는 관여하지 않습니다. 사용하는 개발자 스스로 원하는 방식으로 구조를 설계할 수 있습니다.

## Reference

https://idkim97.github.io/2022-08-16-%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC%20vs%20%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/

https://sharonprogress.tistory.com/169
