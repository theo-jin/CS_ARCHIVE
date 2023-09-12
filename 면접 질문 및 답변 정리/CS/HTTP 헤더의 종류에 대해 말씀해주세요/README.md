# HTTP 헤더의 종류에 대해 말씀해주세요
HTTP 헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록 한다.

우리가 지난 시간에 HTTP 메시지에 대해서 알아보았을 때, 다음과 같은 메시지가 클라이언트, 서버 사이에서 전송된다고 했다.  

Header
헤더는 크게 4가지로 분류된다.

General Header(공통 헤더)  
Request Header(요청 헤더)  
Response Header(응답 헤더)  
Entity Header(엔티티 헤더)  

- General Header  
공통 헤더는 요청 및 응답의 메시지 모두에서 사용되지만 컨텐츠에는 적용되지 않는 헤더이다.
흔하게 우리가 사용하는 공통 헤더는 Date, Cache-Control, Connection등이 있다.



Request Header
요청 헤더는 HTTP 요청에서 사용되지만 메시지의 컨텐츠와 관련이 없는 HTTP 헤더이다.
보통 Fetch될 리소스나 클라이언트 자체에 대한 정보를 포함하여 서버로 보내진다.


Response Header
위치 또는 서버 자체에 대한 정보(이름, 버전)과 같이 응답에 대한 부가적인 정보를 갖는 헤더이다.


Entity Header
컨텐츠 길이나 MIME 타입과 같이 Entity Body에 대한 자세한 정보를 포함하는 헤더이다.

헤더는 프록시의 처리 방법에 따라 그룹핑될 수 있습니다.
