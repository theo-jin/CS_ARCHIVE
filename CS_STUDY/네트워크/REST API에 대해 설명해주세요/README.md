# REST API에 대해 설명해주세요.

## Rest란?

REST(Representational State Transfer)의 약자로

REST란
HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고,
HTTP Method(POST, GET, PUT, DELETE, PATCH 등)를 통해
해당 자원(URI)에 대한 CRUD Operation을 적용하는 것을 의미합니다.

```
CRUD Operation이란
CRUD는 대부분의 컴퓨터 소프트웨어가 가지는 기본적인 데이터 처리 기능인 Create(생성), Read(읽기), Update(갱신), Delete(삭제)를 묶어서 일컫는 말로
REST에서의 CRUD Operation 동작 예시는 다음과 같다.
```

## REST 구성 요소

자원(Resource) : HTTP URI
자원에 대한 행위(Verb) : HTTP Method
자원에 대한 행위의 내용 (Representations) : HTTP Message Pay Load

## REST의 특징

Server-Client(서버-클라이언트 구조)
Stateless(무상태)
Cacheable(캐시 처리 가능)
Layered System(계층화)
Uniform Interface(인터페이스 일관성)

## Restful api

REST API란 말 그대로 REST형식의 API를 의미.REST API란 핵심 컨텐츠 및 기능을 외부 사이트에서 활용할 수 있도록 제공되는 인터페이스

RESTful API는 두 컴퓨터 시스템이 인터넷을 통해 정보를 안전하게 교환하기 위해 사용하는 인터페이스입니다.  
RESTful API는 HTTP 프로토콜을 기반으로 하며, 클라이언트와 서버 사이의 통신을 위해 주로 JSON 형식을 사용합니다.  
RESTful API에서 자원(Resource)은 URI(Uniform Resource Identifier)로 표현되며, HTTP 메서드(GET, POST, PUT, DELETE)를 사용하여 CRUD 기능을 수행합니다.  
각각의 HTTP 메서드는 자원에 대한 다음과 같은 작업을 수행합니다.

• GET : 자원을 조회합니다.

• POST : 새로운 자원을 생성합니다.

• PUT : 기존 자원을 수정합니다.

• PATCH : 리소스의 일부 수정합니다.

• DELETE : 자원을 삭제합니다.

• HEAD : GET과 동일하지만 메시지 부분(body 부분)을 제외하고, 상태 줄과 헤더만 반환

• CONNECT : 목적 리소스로 식별되는 서버로의 터널을 맺습니다.

• OPTIONS : 대상 리소스에 대한 통신 가능 옵션(메서드)을 설명(주로 CORS에서 사용)

• TRACE : 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트를 수행

RESTful API는 HTTP 프로토콜의 Stateless 특성을 사용하여 서버에서 세션 정보를 유지하지 않고,  
클라이언트와 서버 사이의 통신을 위한 데이터를 모두 요청(Request)과 응답(Response)에 포함시킵니다.  
이러한 Stateless 특성은 서버의 확장성과 성능을 향상시키는 데 도움이 됩니다.  
RESTful API는 간결하고 직관적인 인터페이스를 제공하여, 다양한 클라이언트와 서버 사이의 상호 운용성을 보장합니다.  
또한, RESTful API는 웹 개발의 기본 원칙을 따르기 때문에, 이를 이해하는 것이 비교적 쉽고, 구현하기도 간단합니다.  
따라서, RESTful API는 현대적인 웹 어플리케이션에서 자주 사용되는 아키텍처 스타일 중 하나입니다.

RESTful API를 사용했을 때 가지는 이점은 확장성, 유연성,독립성이 있습니다.

### 확장성

REST API를 구현하는 시스템은 REST가 클라이언트-서버 상호 작용을 최적화하기 때문에 효율적으로 크기 조정할 수 있습니다. 무상태는 서버가 과거 클라이언트 요청 정보를 유지할 필요가 없기 때문에 서버 로드를 제거합니다. 잘 관리된 캐싱은 일부 클라이언트-서버 상호 작용을 부분적으로 또는 완전히 제거합니다. 이러한 모든 기능은 성능을 저하시키는 통신 병목 현상을 일으키지 않으면서 확장성을 지원합니다.

### 유연성

RESTful 웹 서비스는 완전한 클라이언트-서버 분리를 지원합니다. 각 부분이 독립적으로 발전할 수 있도록 다양한 서버 구성 요소를 단순화하고 분리합니다. 서버 애플리케이션의 플랫폼 또는 기술 변경은 클라이언트 애플리케이션에 영향을 주지 않습니다. 애플리케이션 함수를 계층화하는 기능은 유연성을 더욱 향상시킵니다. 예를 들어, 개발자는 애플리케이션 로직을 다시 작성하지 않고도 데이터베이스 계층을 변경할 수 있습니다.

### 독립성

REST API는 사용되는 기술과 독립적입니다. API 설계에 영향을 주지 않고 다양한 프로그래밍 언어로 클라이언트 및 서버 애플리케이션을 모두 작성할 수 있습니다. 또한 통신에 영향을 주지 않고 양쪽의 기본 기술을 변경할 수 있습니다.
RESTful API에서 자원(Resource)은 URI(Uniform Resource Identifier)로 표현되며, HTTP 메서드(GET, POST, PUT, DELETE)를 사용하여 CRUD 기능을 수행합니다. 각각의 HTTP 메서드는 자원에 대한 다음과 같은 작업을 수행합니다.

- GET: 자원을 조회합니다.
- POST: 새로운 자원을 생성합니다.
- PUT: 기존 자원을 수정합니다.
- PATCH: 리소스의 일부 수정합니다.
- DELETE: 자원을 삭제합니다.

### **REST의 장단점**

장점

- HTTP 프로토콜의 인프라를 그대로 사용하므로 REST API 사용을 위한 별도의 인프라를 구축할 필요가 없다.
- HTTP 프로토콜의 표준을 최대한 활용하여 여러 추가적인 장점을 함께 가져갈 수 있게 해 준다.
- HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.
- Hypermedia API의 기본을 충실히 지키면서 범용성을 보장한다.
- REST API 메시지가 의도하는 바를 명확하게 나타내므로 의도하는 바를 쉽게 파악할 수 있다.
- 여러 가지 서비스 디자인에서 생길 수 있는 문제를 최소화한다.
- 서버와 클라이언트의 역할을 명확하게 분리한다.

단점

- 표준이 자체가 존재하지 않아 정의가 필요하다.
- HTTP Method 형태가 제한적이다.
- 브라우저를 통해 테스트할 일이 많은 서비스라면 쉽게 고칠 수 있는 URL보다 Header 정보의 값을 처리해야 하므로 전문성이 요구된다.
- 구형 브라우저에서 호환이 되지 않아 지원해주지 못하는 동작이 많다.(익스폴로어)

## REST API URI를 설계하는 7가지 규칙

## Reference

https://khj93.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-REST-API%EB%9E%80-REST-RESTful%EC%9D%B4%EB%9E%80
