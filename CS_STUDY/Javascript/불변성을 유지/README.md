# 불변성을 유지하려면 어떻게 해야하나.

## 불변성의 정의
- JavaScript에서 불변성이란, 객체가 생성된 이후 그 상태를 변경할 수 없는 것을 의미
- 상태를 변경할 수 없다와 값을 재할당하는 것은 다르다. 상태를 변경할 수 없다는 것은, 객체의 프로퍼티를 변경할 수 없다는 것을 의미
- 불변하다는 말은, 메모리영역 안에서 변경이 불가능하며, 변수에 할당할 때 새로운 값이 만들어져 주소값이 재할당된다는 의미 따라서 복사를 한 뒤 값을 변경하더라도 기존 값에 전혀 영향을 주지 않는다.


## Immutable type vs Mutable type
- 자바스크립트에서는 불변성을 유지하는 값들과 그렇지 않은 값들이 나누어져 있다.
- Boolean, Number, String, null, undefined, Symbol과 같이 원시 타입들은 불변성을 유지하는 타입들이고 Object타입들은 변경가능한 값
- 객체는 객체 내부의 값을 변경하면 객체를 참조하고 있는 다른 값들도 다 같이 변경된다는 의미

## 객체의 불변성 지키기
### 1)스프레드 문법 사용(1level deps까지만)
- 스프레드 문법을 사용하여 객체를 복사하면 객체가 불변성을 유지
### 2) JSON.parse(JSON.stringify(obj))

- JSON 객체를 stringfy 메서드를 통해 직렬화(serialize)한 뒤, parse 메서드를 통해 이를 역직렬화(deserialize)하는 방식. 
- JSON.stringfy()는 객체를 json 문자열로 변환하는데, 이 과정에서 원본 객체와의 참조가 모두 끊어지기 때문에 깊은 복사가 가능. 이후 JSON.parse()를 통해 다시 자바스크립트 객체로 만들어주면 복사가 완료.
- 간단한 방법이지만, 객체 내에 함수가 있을 경우 함수를 처리하지 못한다는 단점이 있다. 즉, 간단한 형태의 객체일 때에만 동작
### 3)  immer라이브러리
- immer라이브러리를 사용하면 간단하게 불변성을 유지 가능
## Reference
https://wandering-bear.tistory.com/66#Immutable%--type%--vs%--Mutable%--type
https://velog.io/@co_mong/JS-%EB%B6%88%EB%B3%80%EC%84%B1Immutability
https://jihyundev.tistory.com/20