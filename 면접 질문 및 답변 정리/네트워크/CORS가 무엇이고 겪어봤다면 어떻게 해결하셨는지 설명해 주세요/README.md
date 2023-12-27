# CORS가 무엇이고 겪어봤다면 어떻게 해결하셨는지 설명해 주세요.
CORS는 Cross Origin Resource Sharing에 약자로, **서로 다른 Origin간의 리소스 교환을 뜻한다.**  
. 
**CORS(Cross-Origin Resource Sharing)** 란 웹 브라우저에서 **보안** 상의 이유로 **SOP(Same-Origin Policy)** 을 우회하는 방법 중 하나입니다.

여기서 **SOP(Same-Origin Policy)** 는 동일 출처(Same-Origin) 서버에 있는 리소스는 자유로이 가져올수 있지만, 다른 출처(Cross-Origin) 서버에 있는 이미지나 리소스는 상호작용이 불가능하다는 정책입니다. 따라서 다른 도메인에서 오는 리소스에 접근하기 위해서는 브라우저가 이를 허용해야 합니다.

CORS는 이러한 **Same-Origin Policy** 를 우회하기 위한 방법으로, 서버에서 특정 HTTP 헤더를 설정하여 브라우저에게 다른 도메인에서의 리소스에 대한 접근을 허용하도록 알려줍니다. 이를 통해 클라이언트 측에서 다른 도메인의 리소스에 접근할 수 있습니다.

![image](https://github.com/theo-jin/CS_ARCHIVE/assets/83561523/301ab0cf-73ee-4b9e-ae3a-4e9bf834f514)


CORS Error

**다른 Origin에서 오는 요청이라면 내가 요청으로 받아온 결과를 믿을만한지 그렇지 않은지 검증하는 과정이 필요하다**

브라우저에서는 localhost:8080 서버에서 전달 받은 응답중 헤더에 Access-Control-Allow-Origin 값을 확인하고 이 값에 현재 Origin이 포함되는지 확인한다. 포함되어 있다면 CORS를 수행하고 그렇지 않으면 에러를 낸다. 앞서 사진의 빨간 줄은 Origin에 포함되어 있지 않았기 때문에 브라우저에서 CORS 허용하지 않아 발생한 것이다. Origin이 포함되어 있다면 Method도 확인하고 Content Type도 본다.

cors 에러는 브라우저에서 내뱉는 에러.

![image](https://github.com/theo-jin/CS_ARCHIVE/assets/83561523/742efca3-e2ae-49f0-844d-b42430a2a004)


해결법

### 3.1 Access-Control-Allow-Origin 전체 허용

CORS 에러를 해결하는 방법으로 백엔드에서 모든 주소를 Access-Control-Allow-Origin 로 주면 간단히 해결한다.

→ 보안 문제 때문에 비추천

특정 주소만 허용되도록 함

Access-Control-Allow-Origin:특정주소

### 3.2 프록시 서버 사용하기

브라우저에서 보낸 요청을 프론트엔드에서 받아서 대신 보내는 방법이다.

nextjs의 경우에는 next.config.js 라는 파일을 이용해 상대 주소에 대해서는 미리 요청하는 주소를 바꿔줄 수 있다. 이외에도 nginx를 이용해서 프록시를 대신 구현할 수 있다. react에서도 proxy를 사용해서 해결 할 수 있다.


## 프리플라이트란?
"preflighted" request는  "simple requests" 와는 달리, 먼저 OPTIONS 메서드를 통해 다른 도메인의 리소스로 HTTP 요청을 보내 실제 요청이 전송하기에 안전한지 확인합니다. cross-origin 요청은 유저 데이터에 영향을 줄 수 있기 때문에 이와같이 미리 전송(preflighted)합니다.

다음은 preflighted 할 요청의 예제입니다.

```ts
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://bar.other/resources/post-here/');
xhr.setRequestHeader('Ping-Other', 'pingpong');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.onreadystatechange = handler;
xhr.send('<person><name>Arun</name></person>');
```
위의 예제는 POST 요청과 함께 함께 보낼 XML body를 만듭니다. 또한 비표준 HTTP Ping-Other 요청 헤더가 설정됩니다. 이러한 헤더는 HTTP/1.1의 일부가 아니지만 일반적으로 웹 응용 프로그램에 유용합니다. Content-Type 이 application/xml이고, 사용자 정의 헤더가 설정되었기 때문에 이 요청은 preflighted 처리됩니다.
