# HTTP 특징과 메서드, 상태 코드

> HTTP(Hyper Text Transfer Protocol)란?  
> 인터넷에서 데이터를 주고 받을 수 있는 통신규약 클라이언트와 서버사이에 이루어지는 요청/응답 프로토콜

## HTTP특성

클라이언트 / 서버의 구조
단순하며, 확장이 용이하다

**비연결성과 무상태**

- 비연결성: 클라이언트와 서버가 연결된 후 클라이언트 요청에 대해 서버가 응답을 마치면 연결을 끊는 특성
  - 비연결성의 한계
    - 매번 TCP/IP 연결을 맺어야 함
    - HTML 뿐만이 아닌 JS, CSS, 이미지 등 수많은 자원들에 대한 연결이 각각 맺어짐
  - 극복
    - 현재는 HTTP 지속 연결(Persistent Connections)로 문제를 해결(한번의 연결로, 필요한 자원을 모두 받고 연결을 종료)
- 무상태: 서버는 클라이언트의 상태를 저장하고 있지 않는다. HTTP의 비연결성으로 인해 서버가 클라이언트를 식별할 수없는 특성. 각각의 요청을 독립적인 트랜잭션으로 취급

## HTTP 메서드

- GET - 리소스 조회
- POST - 요청 데이터 처리 (리소스 등록)
- PUT - 리소스를 대체, 리소스가 존재 하지 않으면 생성
- PATCH - 리소스의 특정 부분을 변경
- DELETE - 리소스 삭제

- HEAD - GET과 동일하지만, 메시지 부분을 제외하고, 상태와 헤더만 반환
- OPTIONS - 대상 리소스에 대한 통신 가능 옵션(메서드)을 설명
  ex) CORS의 Preflight
- CONNECT - 대상 자원으로 식별되는 서버에 대한 터널을 설정
- TRACE - 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트 수행

### HTTP 메서드의 속성

- 안전 - 호출해도 리소스를 변경하지 않는다. (GET, HEAD, OPTIONS)
- 멱등 - 여러번 호출하여도 결과는 일정 (GET, PUT, DELETE), 외부 요인으로 인해 중간에 리소스가 변경 되는 부분까지는 고려하지 않는다.
- 캐시 가능

멱등성
:동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일하게 남을 때, 해당 HTTP 메서드가 멱등성을 가졌다고 말합니다.
멱등성 메서드에는 통계기록 등을 제외하면 어떠한 부수효과(side effect)도 존재해서는 안됩니다

## HTTP 상태코드

- 1xx (Informational): 요청이 수신되어 처리 중

- 2xx (Successfult): 요청이 정상적으로 처리 됨

  - 200 (OK): 요청이 성공적
  - 201 (Created): 요청이 성공적이며, 새로운 리소스가 생성됨
  - 202 (Accepted): 요청이 받아졌으나, 처리가 완료되지 않았다
  - 204 (No Content): 서버가 요청을 정상적으로 수행하였으나, 응답으로 보낼 본문이 없다

- 3xx (Redirection): 요청을 완료하기 위해서 추가 동작이 필요하다 (리다이렉션)  
   클라이언트가 관심 있어 하는 리소스에 대해 다른 위치를 사용하라고 말해주거나 그 리소스의 내용 대신 다른 대안 응답을 제공

  - 301 (Moved Permanently) 영구적 리다이렉션(특정 리소스의 URL 이 영구적으로 이동)
    - 리다이렉트시 요청 메서드가 GET으로 변경, 요청 본문이 제거 될 수 있음
  - 302 (Found) 일시적 리다이렉션( 특정 리소스의 URL 이 일시적으로 이동)
    - 요청 메서드가 GET으로 변경, 요청 본문이 제거 될 수 있음
  - 304 (Not Modified) 캐시 목적으로 사용
    - 클라이언트는 계속해서 응답의 캐시된 버전을 사용할 수 있다.
  - 307 (Temporary Redirect) 일시적 리다이렉션
    - 요청 메서드와 본문이 유지 된다. (변경되면 안됨)
  - 308 (Permanent Redirect) 영구적 리다이렉션
    - 리다이렉트시 요청 메서드와 본문을 그대로 유지

- 4xx (Client Error): 클라이언트 오류를 의미하며, 잘못된 문법 등의 오류로 인해 서버가 요청을 수행할 수 없고 그 원인이 클라이언트에게 있음을 뜻한다. 잘못 구성된 요청 메세지 같은 것이 있을 수 있으며, 존재하지 않은 URL 요청도 있을 수 있다.

  - 400 (Bad Request):클라이언트가 잘못된 요청을 해서 서버가 요청을 처리 할 수 없음
  - 401 (Unauthorized): 인증(Authentication) 되지 않음.
    - 오류 발생시 응답 헤더에 WWW-Authenticate 헤더를 추가하여 인증 방법을 첨부
    - 메시지는 Unauthorized이지만 인증(Authentication)의 용도로 사용 된다.
  - 403 (Forbidden): 인증은 되었지만, 접근 권한이 존재 하지 않을 때
    - ex) 관리자 전용 페이지에 일반 사용자가 접근하려 하는 경우
  - 404 (Not Found):요청 리소스가 서버에 존재하지 않는다.

- 5xx (Server Error):서버 오류를 의미하며, 400 번대와 동일하게 오류로 인한 요청 처리 실패를 의미하지만 원인이 서버에게 있음을 뜻한다.

  - 500 (Internal Server Error):서버 내부 문제로 인한 오류
  - 503 (Service Unavailable):서버가 일시적인 과부화, 혹은 점검으로 인해 잠시 요청을 처리 할 수 없음
  - Retry-After 헤더 필드로 복구 시점을 전달 가능

### 4xx과 5xx차이

4XX 상태코드와 5XX 상태코드 모두 오류를 반환하는 응답 코드이지만, 4XX는 클라이언트의 요청에 문제가 있는 것이기에 요청 메세지를 검토하여 수정한 뒤 재전송하면 해결이 가능하지만, 5XX 는 서버에 문제가 있는 것이기 때문에 서버 자체의 상태를 보아야 하는 차이가 있다.

## Reference

https://velog.io/@pilyeooong/HTTP

https://whwl.tistory.com/158

https://inpa.tistory.com/entry/HTTP-%F0%9F%8C%90-%EC%83%81%ED%83%9C-%EC%BD%94%EB%93%9C-1XX-5XX-%EC%B4%9D%EC%A0%95%EB%A6%AC%ED%8C%90-%F0%9F%93%96
