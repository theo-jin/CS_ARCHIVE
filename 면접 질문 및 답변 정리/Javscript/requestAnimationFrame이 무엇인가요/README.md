# requestAnimationFrame - 3줄 요약
1. requestAnimationFrame은 브라우저가 화면을 그리기 직전에 호출할 코드를 등록한다.

2. requestAnimationFrame을 재귀적으로 반복호출하면, 60FPS 목표로 애니메이션을 최적화한다.

3. cancelAnimationFrame은 requestAnimationFrame으로 등록해둔 코드를 취소한다.

## requestAnimationFrame이란?
 window(브라우저에서만 제공하고, NodeJS에서는 다른 API를 써야함) 객체 안에 있는 'requestAnimationFrame'는 부드러운 애니메이션을 위해 사용하고 그러한 기능을 제공한다. 좀더 쉽게 말해 브라우저가 렌더링을 할 수 있을때에 다음 렌더링을 진행할 수 있도록 최적화 해주는 툴이라고 생각하면된다.

## requestAnimationFrame의 원리
- 'requestAnimationFrame'은 매개변수로 콜백 함수를 받는데, 리페인트 이전에 실행할 콜백 함수를 인자로 받는다.
- 라우저는 리플로우, 리페인트 과정을 거쳐서 리렌더링을 하게된다. 이 때, 아직, 이전 리렌더링이 끝나지도 않았는데, 다음 애니메이션 로직을 실행하도록 명령을 내린다면 애니메이션이 의도한대로 부드럽게 움직이지 않을 것이다.
requestAnimationFrame은 위와 같은 문제를 해결해준다.
- 그래서 리페인트 과정이 끝난 후 적용할 애니메이션을 requestAnimationFrame의 콜백으로 넣어주면 된다.

### requestAnimationFrame의 장점
- 페이지가 비활성 상태이면 페이지의 화면 그리기 작업도 브라우저에 의해 일시 중지되므로 브라우저를 따르는 requestAnimationFrame도 렌더링을 중지한다.   
- 이에 따라 CPU 리소스와 배터리 수명을 낭비하지 않게된다(setInterval은 비활성 상태여도 백그라운드에서 계속 실행됨)
- 브라우저가 언제 업데이트를 할지 알게해줌으로써 프레임(frame) 손실을 방지해줌. 이에 따라 리소스도 균등하게 분배해서 사용할 수 있고, 간격도 균등하게 가져갈 수 있다.