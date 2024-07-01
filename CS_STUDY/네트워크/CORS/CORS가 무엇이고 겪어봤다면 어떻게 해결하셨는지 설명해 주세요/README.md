# CORS가 무엇이고 겪어봤다면 어떻게 해결하셨는지 설명해 주세요.
  
## CORS
CORS는 Cross Origin Resource Sharing에 약자로, **서로 다른 Origin간의 리소스 교환을 뜻한다.** 그리고 웹 브라우저에서 보안상의 이유로 **SOP(Same-Origin Policy)** 을 우회하는 방법 중 하나입니다.

여기서 **SOP(Same-Origin Policy)** 는 동일 출처(Same-Origin) 서버에 있는 리소스는 자유롭게 가져올수 있지만, 다른 출처(Cross-Origin) 서버에 있는 이미지나 리소스는 상호작용이 불가능하다는 정책. 그래서 다른 도메인에서 오는 리소스에 접근하기 위해서는 브라우저가 이를 허용해야 합니다.

```
 출처(Origin) 라는 것은 Protolcol,Host,Port 까지 모두 합친 URL
 같은 프로토콜, 호스트, 포트를 사용한다면, 그 뒤의 다른 요소는 다르더라도 같은 출처로 인정된다.

Internet Explorer 브라우저는 출처 비교시 Port 부분은 무시한다. 이는 곧 보안 취약으로 이어진다.
```

CORS는 이러한 **Same-Origin Policy** 를 우회하기 위한 방법으로, 서버에서 특정 HTTP 헤더를 설정하여 브라우저에게 다른 도메인에서의 리소스에 대한 접근을 허용하도록 알려줍니다. 이를 통해 클라이언트 측에서 다른 도메인의 리소스에 접근할 수 있다.

 

![image](https://github.com/theo-jin/CS_ARCHIVE/assets/83561523/301ab0cf-73ee-4b9e-ae3a-4e9bf834f514)


### 웹의 발달과 CORS
웹이 발전하면서 점점 더 클라이언트에서 API를 직접 호출하는 방식이 흔해지게 되었는데, 보통 클라이언트와 API는 다른 도메인에 있는 경우가 많았기때문에 CORS 정책이 생기게 되었다. 출처가 다르더라도 요청과 응답을 주고받을 수 있도록 서버에 리소스 호출이 허용된 출처(Origin)를 명시해 주는 방식으로 발전하게되었다.

### CORS Error
**다른 Origin에서 오는 요청이라면 내가 요청으로 받아온 결과를 믿을만한지 그렇지 않은지 검증하는 과정이 필요하다**
브라우저에서는 localhost:8080 서버에서 전달 받은 응답중 헤더에 Access-Control-Allow-Origin 값을 확인하고 이 값에 현재 Origin이 포함되는지 확인한다. 포함되어 있다면 CORS를 수행하고 그렇지 않으면 에러를 낸다. 앞서 사진의 빨간 줄은 Origin에 포함되어 있지 않았기 때문에 브라우저에서 CORS 허용하지 않아 발생한 것이다. Origin이 포함되어 있다면 Method도 확인하고 Content Type도 본다.

cors 에러는 브라우저에서 내뱉는 에러.

![image](https://github.com/theo-jin/CS_ARCHIVE/assets/83561523/742efca3-e2ae-49f0-844d-b42430a2a004)


## 해결법

### 3.1 Chrome 확장 프로그램 이용:Access-Control-Allow-Origin 전체 허용 >>>서버에서 할 수 있는 일

CORS 에러를 해결하는 방법으로 백엔드에서 모든 주소를 Access-Control-Allow-Origin 로 주면 간단히 해결한다.

→ 보안 문제 때문에 비추천

특정 주소만 허용되도록 함 Access-Control-Allow-Origin:특정주소

### 3.2 프록시 서버 사용하기  >>프론트단에서 할 수 있는 일
웹 애플리케이션이 리소스를 직접적으로 요청하는 대신, 프록시 서버를 사용하여 웹 애플리케이션에서 리소스로의 요청을 전달하는 방법도 있다. 이 방법을 사용하면, 웹 애플리케이션이 리소스와 동일한 출처에서 요청을 보내는 것처럼 보이므로 CORS 에러를 방지할 수 있다.


nextjs의 경우에는 next.config.js 라는 파일을 이용해 상대 주소에 대해서는 미리 요청하는 주소를 바꿔줄 수 있다. 이외에도 nginx를 이용해서 프록시를 대신 구현할 수 있다. react에서도 proxy를 사용해서 해결 할 수 있다.


### 3.3 서버에서 Access-Control-Allow-Origin 응답 헤더 세팅하기
서버에서 Access-Control-Allow-Origin 헤더를 설정해서 요청을 수락할 출처를 명시적으로 지정할 수 있다. 
각 서버의 문법에 맞게 위의 HTTP 헤더를 추가해 주어서 해결한다.
이 헤더를 세팅하면 출처가 다르더라도 리소스 요청을 허용할 수 있다.

```
'Access-Control-Allow-Origin': 사이트 이름
```
위와 같이 직접 허용할 출처를 세팅하는 방법이 더 좋습니다.

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


## 동일 출처 정책(SOP)이 필요한 이유

출처가 다른 두 어플리케이션이 자유로이 소통할 수 있는 환경은 꽤 위험한 환경이다. 
만일 SOP 같은 제약이 없다면, 해커가 CSRF(Cross-Site Request Forgery)나 XSS(Cross-Site Scripting) 등의 방법을 이용해서 우리가 만든 어플리케이션에서 해커가 심어놓은 코드가 실행하여 개인 정보를 가로챌 수 있다.


## Reference
https://docs.tosspayments.com/resources/glossary/cors#%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C-access-control-allow-origin-%EC%9D%91%EB%8B%B5-%ED%97%A4%EB%8D%94-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0

https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F