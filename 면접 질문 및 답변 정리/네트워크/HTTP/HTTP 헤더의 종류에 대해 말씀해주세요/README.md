# HTTP 헤더의 종류에 대해 말씀해주세요
HTTP 헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록 해줍니다.   
HTTP 헤더는 대소문자를 구분하지 않는 이름과 콜론 ':' 다음에 오는 값(줄 바꿈 없이)으로 이루어져있습니다
HTTP 메시지는 보통 Header + Body로 이루어지는데,Requset 와 Response로 나뉘어진다.  



Header
헤더는 크게 4가지로 분류된다.

General Header(공통 헤더)  
Request Header(요청 헤더)  
Response Header(응답 헤더)  
Entity Header(엔티티 헤더)  

- General Header
공통 헤더는 요청 및 응답의 메시지 모두에서 사용되지만 컨텐츠에는 적용되지 않는 헤더이다.
흔하게 우리가 사용하는 공통 헤더는 Date, Cache-Control, Connection등이 있다.
- Date
- Connection
- Cache-Control
- Content-Encoding
- Date


Request Header  
HTTP 요청 헤더는 서버로 요청할 데이터의 정보가 담겨있는 헤더이다.
보통 Fetch될 리소스나 클라이언트 자체에 대한 정보를 포함한다.  

요청 헤더는 HTTP 요청에서 사용되지만 메시지의 컨텐츠와 관련이 없는 HTTP 헤더이다.
보통 Fetch될 리소스나 클라이언트 자체에 대한 정보를 포함하여 서버로 보내진다.
- Access-Control-Allow-Origin
- Allow
- Content-Disposition
- Location
- Content-Security-Policy

Response Header    
응답 헤더는 HTTP 응답에서 사용될 수 있는 HTTP 헤더이며, 메시지의 컨텐츠와는 관련이 없습니다
HTTP 응답 헤더는 요청에 따라 적절한 로직이 수행되고 결과로 응답할 HTTP 메시지의 헤더를 말 한다.
위치 또는 서버 자체에 대한 정보(이름, 버전)과 같이 응답에 대한 부가적인 정보를 갖는 헤더이다.


Entity Header
컨텐츠 길이나 MIME 타입과 같이 Entity Body에 대한 자세한 정보를 포함하는 헤더이다.
엔티티 헤더는 HTTP 메시지의 페이로드(예: 메시지 본문에 대한 메타데이터)를 나타내는 HTTP 헤더입니다.   
Content-Length, Content-Language, Content-Encoding, Content-Type, Expires 등과 같은 헤더는 엔티티 헤더에 포함됩니다.   
엔티티 헤더는 HTTP 요청 및 응답 모두에 존재할 수 있습니다.

