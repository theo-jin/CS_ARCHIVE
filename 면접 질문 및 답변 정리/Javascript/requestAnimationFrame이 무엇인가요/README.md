# requestAnimationFrame

## requestAnimationFrame이란?

requestAnimationFrame 함수는 시스템이 프레임을 그릴 준비가 되면 애니메이션 프레임을 호출하여 애니메이션 웹페이지를 보다 원활하고 효율적으로 생성할 수 있게 해주는 역할을 하는 함수다.
더 자세히는 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트 바로 전에 애니메이션을 업데이트할 함수를 호출하도록 요청

화면에 애니메이션을 업데이트할 준비가 될 때마다 이 메서드를 호출해야 한다.
실제 화면이 갱신되어 표시되는 주기에 따라 함수를 호출해주기 때문에 자바스크립트가 프레임 시작 시 실행되도록 보장해주어 위와 같은 밀림 현상을 방지해준다.

## requestAnimationFrame의 장점

- 백그라운드 동작 중지:requestAnimationFrame는 페이지가 비활성화 된 상태이면 페이지 화면 그리기 작업도 브라우저에 의해 일시 중지됨으로 CPU 리소스나 배터리 수명을 낭비하지 않게 된다.

- 디스플레이 주사율에 맞게 호출 횟수: 지금까지 1초에 60번 호출했지만, rAF에서는 모니터의 주사율을 그대로 따르게 되어 최적화.

- 브라우저가 언제 업데이트를 할지 알게해줌으로써 프레임(frame) 손실을 방지해줌. 그래서 리소스도 균등하게 분배해서 사용할 수 있고, 간격도 균등하게 가져갈 수 있다.

## requestAnimationFrame 사용법

- requestAnimationFrame 사용법은 setTimeout 처럼 콜백 함수 내부에서 재귀 호출 하는 식으로 구성하면 된다.
- 브라우저는 애니메이션 프레임을 출력할 때마다 requestAnimationFrame 에 등록된 콜백 함수들을 비동기로 호출하여, 애니메이션을 부드럽게 출력해준다.
- 대신 차이점은 setTimeout 은 타이머를 지정해주어야 하지만, requestAnimationFrame 은 프레임 단위로 동작하기 때문에 별도의 반복 플래그가 필요 없다.

```ts
javascriptconst performAnimation = () => {
  /* 스타일 조정 스크립트 */

  requestAnimationFrame(performAnimation) // 함수 내부에서 다시 requestAnimationFrame을 호출하여 반복
}

requestAnimationFrame(performAnimation);

```

requestAnimationFrame 를 취소하는 방법으로 cancelAnimationFrame 를 사용한다.

## Reference

https://inpa.tistory.com/entry/%F0%9F%8C%90-requestAnimationFrame-%EA%B0%80%EC%9D%B4%EB%93%9C#requestanimationframe

https://developer.mozilla.org/ko/docs/Web/API/window/requestAnimationFrame
