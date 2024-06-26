## JWT, session, OAuth 설명

### session 방식

로그인 :

1. 유저가 로그인하면 DB에 { 유저의 아이디, 로그인 날짜, 유효기간, session id } 이런걸 기록해두고
2. 유저에게 입장권을 발급해줄 때 입장권에 session id 하나만 적어보냅니다.

로그인이 필요한 서버기능 :

1. 유저가 GET/POST 요청시 입장권을 서버에 제출함
2. 서버는 입장권에 써있는 session id를 가지고 DB를 조회해본 다음 DB기록에 별 이상 없으면 GET/POST요청을 진행시켜 줍니다.

장점: 매번 GET/POST 요청할 때 마다 DB를 조회해보기 때문에 하나하나의 요청마다 엄격하게 유저를 체크해볼 수 있다.

단점: 그 만큼 DB의 부담이 심해질 수 있습니다.그래서 유저가 많은 사이트들은 조금 더 빠른 Redis 같은 DB를 사용하기도 한다.

### token 방식

대부분 JWT라고 불러서 그냥 JWT라고 하겠습니다. JSON Web Token의 약자

JWT방식을 쓴다면

로그인 :

1. 유저가 로그인하면 유저에게 입장권을 발급해줄 때 입장권에 { 유저의 아이디, 로그인 날짜, 유효기간 } 등을 적어두고 암호화해서 보냅니다. DB에 뭐 저장하는건 없음

로그인이 필요한 서버기능 :

1. 유저가 GET/POST 요청시
   유저가 입장권을 제출하면 { 유저의 아이디, 로그인 날짜, 유효기간 } 이 적혀있는데 그걸 확인하고 별 이상 없으면 통과시켜 줍니다.

Q. 유저가 JWT를 맘대로 위조하면?
근데 JWT를 만들 때 여러 정보들을 짧은 문자로 변환을 해서 만드는데 변환할 때 암호를 넣을 수 있어서 암호가 변경되거나 내용이 변경되면 짧은 문자도 변하기 때문에 위조여부를 쉽게 알 수 있어서 걱정은 안해도 된다.

JWT의 장점은 매번 GET/POST 요청할 때 마다 DB를 조회할 필요가 없어서 DB 부담이 적다.
그래서 유저가 매우 많은 사이트들이 즐겨쓰는 경향이 있습니다.

단점은 유저의 JWT를 나쁜 사람이 훔쳐가면 그 사람의 로그인을 막거나 할 수 있는 방법이 없습니다.
그리고 다른 컴퓨터에 저장된 JWT를 소멸시키거나 그럴 수는 없기 때문에 다른 컴퓨터를 로그아웃시키기도 어려울 수 있습니다.
물론 나쁜 JWT들을 모아서 DB 같은 곳에 기록해두면 되는데 그러면 매번 JWT 사용마다 DB를 조회해야하니 session 방식과 딱히 다른 점이 없음
아무튼 session, JWT 각각 장단점이 있으니 골라서 사용하도록 합시다.

### 번외 : OAuth

OAuth는 입장권같은건 아니고 로그인 방법 중 하나.
OAuth의 뜻은 유저의 A 사이트의 사용권한을 B 사이트를 운영하는 내가 잠깐 빌릴 수 있는데 그 과정을 정의하는 규칙같은겁니다.
그래서 OAuth를 잘 이용하면 유저의 A 사이트 회원정보를 가져와서 내가 운영하는 B 사이트 회원가입시 사용할 수도 있고
이걸 흔히 소셜로그인이라고도 부릅니다.
예를 들어 코딩애플이라는 사이트를 운영하는데 구글로그인을 구현하고 싶으면 어떤 식으로 이루어지냐면

1. 유저가 코딩애플 사이트에서 구글 로그인 버튼을 누르면 구글 계정으로 로그인하라고 뜨는데 로그인합니다.
2. "수상한 코딩애플 사이트로 느그 개인정보 전송해도 되냐"고 구글이 물어봅니다.
3. 유저가 허락하면 허락했다고 구글 -> 코딩애플서버 이렇게 알림을 전송합니다.
4. 알림이 도착하면 코딩애플서버는 구글에게 유저 정보를 요청해서 받아옵니다.

거기엔 { 유저이메일, 이름, access_token, 유효기간 } 이런 것들이 들어있습니다.

그 정보들로 JWT 만들어서 사용하거나 session 으로 DB에 저장해두거나 마음대로 한 다음 다른 사이트 로그인시 사용하면 됩니다.

Next-Auth (Auth.js) 라이브러리

JWT또는 OAuth를 사용해서 회원기능을 매우 쉽게 만들 수 있게 도와주는 라이브러리입니다.라이브러리 설치하고 코드만 복사붙여넣기 하면 회원기능 구현 끝입니다.

소셜로그인, 아이디/비번 로그인 전부 구현 가능합니다.JWT, session 방식 구현도 가능합니다.
DB adapter 기능을 이용하면 DB에 session을 저장해두고 유저 관리도 가능합니다.

다만 단점은 아이디/비번으로 로그인하는 옵션을 켜둔 경우 JWT 방식을 강제로 사용해야합니다.
session 방식은 사용 불가능하게 되어있습니다.
왜 제한해놨냐면"개발자가 직접 아이디/패스워드 관리하면 복잡하고 보안이슈가 생길 수 있다"라고 합니다.
최대한 아이디/패스워드 로그인 방식은 지양한다.
