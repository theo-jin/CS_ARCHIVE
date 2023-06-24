## 서버로 array, object 전송하고 싶으면
서버와 데이터 주고받을 땐 원래 문자나 숫자밖에 주고받을 수 없다.

array, object 그런 이상한건 안됨.

하지만 array, object에 따옴표를 쳐 두면 문자취급을 해주기 때문에 그렇게 전송 가능.

큰 따옴표 쳐둔 array, object 자료들을 JSON이라고 부릅니다.
{name : 'kim'} → '{"name" : "kim"}' 이러면 JSON 되는거고 이걸 서버로 전송 가능. 
```
JSON.stringify( {name : 'kim'} )
```
근데 귀찮게 직접 따옴표 칠 필요는 없고 JSON.stringify() 안에 담으면 JSON으로 변환해서 그 자리에 남겨줍니다.

그래서 이렇게 해두면 서버로 array, object 전송가능
```
JSON.parse( '{"name" : "kim"}' )
```
참고로 JSON에 붙은 따옴표를 제거해서 array, object로 만들고 싶으면 JSON.parse() 안에 넣자. 
