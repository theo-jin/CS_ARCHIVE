# 타이머 관련 호출 스케줄링, 타이머 함수에는 어떤 것들이 있나요

## 호출 스케줄링 
함수가 바로 호출되지 않고, 일정 시간이 지난 후 호출 되도록 함수 호출을 예약하는 것으로 타이머 함수를 사용

## 타이머 함수
타이머 함수들은 빌트인 함수가 아니고, 브라우저/Node.js 환경에서 제공하는 전역 객체의 메서드로 제공하는 호스트 객체
l 

### setTimeout/clearTimeout
#### setTimeout
- 동작: 타이머 생성. 대기시간 이후 콜백함수 호출됨 단한번 동작한다
```
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```
- func|code : 호출할 콜백 함수 (문자열도 가능하나 권장하지 않음)
- delay : 실행전 대기 시간, 단위 ms, 기본값 0
- arg1~ : 콜백함수에 전달할 인수 (IE9 이하 전달불가)
- 반환값 : 타이머 식별을 위한 고유 타이머 id (브라우저: 숫자 / Node.js: 객체)
#### clearTimeout
- 동작:호출스케쥴링을 취소함 (타이머 취소)
```
clearTimeout(timerId)
```
- timerId: setTimeout 함수가 반환한 타이머 id

### setInterval/clearInterval 
#### setInterval
- 동작: 타이머 생성. 대기시간 마다 콜백함수 반복 호출됨주기적으로 반복 동작

```
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```
- func|code : 호출할 콜백 함수 (문자열도 가능하나 권장하지 않음)
- delay : 실행전 대기 시간, 단위 ms, 기본값 0
- arg1~ : 콜백함수에 전달할 인수 (IE9 이하 전달불가)
- 반환값 : 타이머 식별을 위한 고유 타이머 id (브라우저: 숫자 / Node.js: 객체)

#### clearInterval 
- 동작:호출스케쥴링을 취소함 (타이머 취소)
```
clearInterval(timerId)
```
유의사항
- 중첩 setTimeout을 사용하면 setInterval을 사용한 것보다 유연하게 코드를 작성할 수 있습니다. 여기에 더하여 지연 간격 보장이라는 장점도 있습니다.
- 대기 시간이 0인 setTimeout(setTimeout(func, 0) 혹은 setTimeout(func))을 사용하면 ‘현재 스크립트의 실행이 완료된 후 가능한 한 빠르게’ 원하는 함수를 호출할 수 있습니다.
- 지연 없이 중첩 setTimeout을 5회 이상 호출하거나 지연 없는 setInterval에서 호출이 5회 이상 이뤄지면, 4밀리초 이상의 지연 간격이 강제로 더해집니다. 이는 브라우저에만 적용되는 사항이며, 하위 호환성을 위해 유지되고 있습니다.


#### 명시한 지연 간격이 보장되지 않는 상황.
- CPU가 과부하 상태인 경우
- 브라우저 탭이 백그라운드 모드인 경우
- 노트북이 배터리에 의존해서 구동 중인 경우

이런 상황에서 타이머의 최소 지연 시간은 300밀리초에서 심하면 1,000밀리초까지 늘어납니다. 연장 시간은 브라우저나 구동 중인 운영 체제의 성능 설정에 따라 다릅니다.
## Reference
https://ko.javascript.info/settimeout-setinterval
https://peach-milk.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%98%B8%EC%B6%9C-%EC%8A%A4%EC%BC%80%EC%A4%84%EB%A7%81-setTimeout-setInterval