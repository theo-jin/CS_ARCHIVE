# 캐시 제어 헤더 종류

## 캐시

최초의 HTTP 요청은 서버에게 전송되어 HTTP 응답을 받아오게 되고, 이를 캐시에 저장해 두면 다음번에 동일한 HTTP 요청이 시도될 때는 서버에 해당 HTTP 요청을 다시 보내지 않고
저장되어 있는 HTTP 응답을 재활용하는 것을 말함.
보통 캐싱은 GET 요청에만 한다.일반적으로 200(가져오기 성공), 301(다른 주소로 이동 후 가져옴), 404(가져올 게 없음) 상태 코드로 온 응답을 캐싱할 수 있다.

## Pragma 헤더

Pragma는 HTTP/1.0 헤더입니다. Pragma: no-cache는 캐시가 검증을 위해 원래 서버에 요청을 보내도록 강제한다는 점에서 Cache-Control: no-cache와 유사합니다. 그러나 Pragma는 HTTP 응답에 대해 명세되지 않았으므로 일반적인 HTTP/1.1 Cache-Control 헤더를 신뢰성 있게 대체할 수 없습니다.

Cache-Control HTTP/1.1 헤더가 없는 HTTP/1.0 클라이언트와의 하위 호환성을 위한 경우에만 Pragma를 사용하여야 합니다.

## Cache-Control

Cache-Control HTTP/1.1 기본 헤더 필드는 요청과 응답 양측 모두에 있어 캐싱 메커니즘을 위한 디렉티브를 지정하는데 사용된다.
Cache-Control은 여러 디렉티브(Directive)들을 나열할 수 있는데 여기서 디렉티브는 캐싱을 어떻게 할 것인지와 관련된 일종의 옵션이라고 생각하자.
이때 Cache-Control 헤더는 HTTP 요청 헤더와 HTTP 응답 헤더에 모두 사용할 수 있지만,
각각에 나열하는 디렉티브들은 서로 다른 의미를 지닌다.여러 디렉티브들을 나열하는 경우에는 콤마로 구분한다.

헤더 값 파라미터 종류(디렉티브)

- max-age : 캐시 유효 시간, 초 단위
- no-cache : 데이터는 캐시해도 되지만, 항상 Origin Server 에 검증후 사용
- no-store : 데이터에 민감한 정보가 포함되어 있어 저장 불가 혹은 최대한 빨리 삭제
- public : public 캐시(프록시 캐시 서버)에 저장 가능
- private : public 캐시에 저장 불가
- s-maxage : 프록시 캐시 서버에 적용되는 max-age
- Age : Origin Server 의 응답이 프록시 캐시 서버에 머문 시간(sec)
- must-revalidate : 캐시 만료후 최초 조회시 Origin Server 에 검증

- Expires: 응답 컨텐츠가 언제 만료되는지를 나타내며, Cache-Control의 max-age가 있는 경우 이 헤더는 무시됩니다.

### ETag

ETag: HTTP 컨텐츠가 바뀌었는지를 검사할 수 있는 태그입니다. 같은 주소의 자원이더라도 컨텐츠가 달라졌다면 ETag가 다릅니다.
예시)
GET www.zerocho.com의 응답 본문이 안녕 제로초이고 ETag 헤더 값이 12345라 칩시다. 만약 서버 컨텐츠(응답 본문)가 동일하다면 매번 GET www.zerocho.com을 할 때마다 ETag는 12345입니다. 그런데 안녕 제로초에서 안녕 이태그로 컨텐츠가 바뀌었다면 ETag 헤더 값도 34567로 바뀝니다. 그러면 서버가 클라이언트의 응답 내용이 달라졌구나를 깨닫게 되어 캐시를 지우고 새로 컨텐츠를 내려받을 수 있게 됩니다.

Etag: W/"3bf2-wdj3VvN8/CvXVgafkI30/TyczHk"

If-None-Match:서버보고 ETag가 달라졌는 지 검사해서 ETag가 다를 경우에만 컨텐츠를 새로 내려주라는 뜻입니다.

### 검증

HTTP 응답은 수명(Lifetime)이란 것이 있는데, 수명이 아직 다하지 않았다면 해당 HTTP 응답은 유효하다(Fresh)고 표현하며, 수명이 다했다면 만료되었다(Stale)고 표현한다.그리고
기본적으로 캐시는 만료된 자원에 대한 HTTP 요청을 받으면 그 자원이 여전히 유효한지 검증하기 위해 서버에게 해당 HTTP 요청을 전달한다. 이러한 과정을 검증(Validation)이라고 한다

### 검증 방식

1. 검증하고자 하는 HTTP 응답에 ETag 헤더가 존재한다면 ETag 헤더의 값을 If-None-Match 헤더에 포함시켜서 서버에게 검증 요청을 보냄.
2. 
만약 여전히 해당 자원이 유효하다면 서버는 Body가 없는 가벼운 304 (Not Modified) 응답을 반환하고, 더 이상 유효하지 않다면 새로운 자원의 내용을 Body에 담아서 200 응답을 반환한다. 전자의 경우에는 기존에 캐싱되어 있던 자원을 다시 사용하게 하는 것이므로 나이(Age)를 0으로 초기화시키게 되고, 필요한 경우에는 만료 시각을 갱신해줄 수도 있다

## Reference

https://inpa.tistory.com/entry/HTTP-%F0%9F%8C%90-%EC%9B%B9-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EC%BA%90%EC%8B%9C-%EC%A0%84%EB%9E%B5-Cache-Headers-%EB%8B%A4%EB%A3%A8%EA%B8%B0#%EC%BA%90%EC%8B%9C_%EC%A0%9C%EC%96%B4_%ED%97%A4%EB%8D%94_%EC%A2%85%EB%A5%98

https://www.zerocho.com/category/HTTP/post/5b594dd3c06fa2001b89feb9#google_vignette

https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Cache-Control
https://developer.mozilla.org/ko/docs/Web/HTTP/Caching#cache-control_%ED%97%A4%EB%8D%94

https://it-eldorado.tistory.com/142
