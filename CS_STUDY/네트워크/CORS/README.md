# CORS(Cross-Origin Resource Sharing)


![image](https://user-images.githubusercontent.com/83561523/236683640-6cd581d3-b7c2-4484-bc9f-9cc36af5a8b4.png)

CORS(Cross-Origin Resource Sharing)란 웹 브라우저에서 보안상의 이유로 SOP(Same-Origin Policy)을 우회하는 방법 중 하나입니다.

### origin(Protocol,Host,Port)

여기서 SOP(Same-Origin Policy)는 동일 출처(Same-Origin) 서버에 있는 리소스는 자유로이 가져올수 있지만, 
다른 출처(Cross-Origin) 서버에 있는 이미지나 리소스는 상호작용이 불가능하다는 정책입니다. 
따라서 다른 도메인에서 오는 리소스에 접근하기 위해서는 브라우저가 이를 허용해야 합니다.

CORS는 이러한 Same-Origin Policy를 우회하기 위한 방법으로, 서버에서 특정 HTTP 헤더를 설정하여 브라우저에게 다른 도메인에서의 리소스에 대한 접근을 허용하도록 알려줍니다. 
이를 통해 클라이언트 측에서 다른 도메인의 리소스에 접근할 수 있습니다.

CORS를 해결하는 방법은

**1.  Access-Control-Allow-Origin 크롬 확장프로그램**

로컬 환경에서 API테스트 시 CORS문제 해결

**2.프록시 사이트 이용**

클라이언트와 서버사잉  중계. 프로트에서 직접 서버에 리소스를 요청했더니 서버에서 따로 설정 안해주어 CORS에러가 뜬다면 **모든 출처를 허용한 프로시 서버**를 통해 요청하면된다.

3. 서버에서 Access-Control-Allow-Origin Headers 세팅하기
