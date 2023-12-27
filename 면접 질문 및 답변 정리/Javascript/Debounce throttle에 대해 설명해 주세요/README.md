# Debounce 와 throttle에 대해 설명해 주세요
세줄요약
- debounce와 throttle은 프로그래밍에서 요청이나 처리의 빈도를 제한하거나 지연시키고자 할 때 자주 사용
- Debounce : 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것
- throttle: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것

## Debounce 
Debounce 는 여러번 발생하는 이벤트에서, 가장 마지막 이벤트 만을 실행 되도록 만드는 개념

디바운싱은 주로 ajax 검색에 자주 쓰임.
요청이 들어오고 일정 시간을 기다린 후 요청을 수행한다. 만약 일정 시간 안에 같은 요청이 추가로 들어오면 이전 요청은 취소된다

Debounce 는 입력 주기가 끝나면, 출력한다.
## throttle
쓰로틀링은 스크롤을 올리거나 내릴 때 보통 사용
일정 시간 동안 요청이 한 번만 수행되도록 한다
Throttle 는 입력 주기를 방해하지 않고, 일정 시간 동안의 입력을 모와서, 한번씩 출력을 제한한다.

## Throttle 와 Debounce 차이점
Throttle 와 Debounce 의 차이점은 이벤트를 언제 발생 시킬지의 시점 차이이다.
Debounce 는 입력이 끝날때까지 무한적으로 기다리지만, Throttle 는 입력이 시작되면, 일정 주기로 계속 실행
## Reference
https://medium.com/@kwoncharles/debounce%EC%99%80-throttle%EC%9D%98-%EC%B0%A8%EC%9D%B4-34845fbfa1ff