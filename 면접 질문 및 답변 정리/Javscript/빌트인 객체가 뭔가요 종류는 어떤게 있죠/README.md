# 자바스크립트의 객체란?
자바스크립트의 객체는 크게 표준 빌트인 객체, 호스트 객체, 사용자 정의 객체 3개로 분리된다.
```
표준 빌트인 객체 or 네이티브 객체
호스트 객체
사용자 정의 객체
```


## 네이티브 객체
네이티브 객체(Native objects or Built-in objects or Global Objects)는 ECMAScript 명세에 정의된 객체를 말하며 애플리케이션 전역의 공통 기능을 제공한다.   
네이티브 객체는 애플리케이션의 환경과 관계없이 언제나 사용할 수 있다.

Object, String, Number, Function, Array, RegExp, Date, Math와 같은 객체 생성에 관계가 있는 함수 객체와 메소드로 구성된다.

네이티브 객체를 Global Objects라고 부르기도 하는데 이것은 전역 객체(Global Object)와 다른 의미로 사용되므로 혼동에 주의하여야 한다.

전역 객체(Global Object)는 모든 객체의 최상위 객체를 의미하며 일반적으로 Browser-side에서는 window, Server-side(Node.js)에서는 global 객체를 의미한다.

표준 빌트인 객체의 종류
자바스크립트는 총 40여개의 표준 빌트인 객체를 제공하며 종류는 다음과 같다.

```
Object, String, Number, Boolean, Symbol, Date, Math, RegExp, Array, Map/Set, WeakMap/WeakSet, Function, Promise, Reflect, Proxy, JSON, Error등
```

위 객체들은 별도의 선언 없이 생성되며 해당 객체가 가지고 있는 메서드들 또한 사용 가능

### 원시값과 래퍼 객체
그러면 원시값이 있는데도 String, Number, Boolean등의 표준 빌트인 생성자 함수가 존재하는 하는데,

이유는 Javascript 엔진이 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌려주기 때문이다.

이렇게 임시로 생성되는 객체를 래퍼 객체 라고 한다. 생성된 임시 래퍼 객체는 사용 후 가비지 컬렉터에 의해 해제된다.

### 전역 객체
전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떠한 객체보다도 먼저 생성되는 객체이다.

브라우저에서 전역 객체는 window, node에서 전역 객체는 global을 통해 접근할 수 있다.

globalThis: ECMAScript11에서 도입된 globalThis는 브라우저와 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자이다.

전역 객체는 앞서 설명한 표준 빌트인 객체(Object, String, Number, Function, Array 등)을 프로퍼티로 갖는다.

호스트 객체
호스트 객체(Host object)는 브라우저 환경에서 제공하는 window, HTMLElement 등의 DOM 노드 객체와 같이 호스트 환경에 정의된 객체를 말한다. 예를 들어 브라우저에서 동작하는 환경과 브라우저 외부에서 동작하는 환경의 자바스크립트(Node.js)는 다른 호스트 객체를 사용할 수 있다.

브라우저에서 동작하는 환경의 호스트 객체는 전역 객체인 window, BOM(Browser Object Model)과 DOM(Document Object Model)등을 제공한다.

DOM (Document Object Model)
문서 객체 모델은 현재 웹페이지의 모델을 생성한다. 최상위 객체는 document 객체로 전체 문서를 표현한다. 또한 이 객체의 자식 객체들은 문서의 다른 요소들을 표현한다.

브라우저는 사용자가 띄운 웹 문서를 구성과 내용에 맞게 객체화하여 각 요소별(텍스트, 버튼, 이미지)로 트리 구조를 이용해 구조화 한다.

이 웹문서에 대한 내용을 담고있는 객체를(DOM)이라고 한다.



BOM (Browser Object Model)
브라우저 객체 모델은 브라우저 탭 또는 브라우저 창의 모델을 생성한다. 최상위 객체는 window 객체로 현재 브라우저 창 또는 탭을 표현하는 객체이다.

또한 이 객체의 자식 객체 들은 브라우저의 다른 기능들을 표현한다.