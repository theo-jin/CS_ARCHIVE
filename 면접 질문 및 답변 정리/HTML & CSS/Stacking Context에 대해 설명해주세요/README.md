# Stacking Context에 대해 설명해주세요

**요약**
```
쌓임 맥락(stacking context)은 가상의 Z축을 사용한 HTML 요소의 3차원 개념화입니다. Z축은 사용자 기준이며, 사용자는 뷰포트 혹은 웹페이지를 바라보고 있을 것으로 가정합니다. 각각의 HTML 요소는 자신의 속성에 따른 우선순위를 사용해 3차원 공간을 차지합니다.
```
쌓임 맥락이란 가상의 Z 축을 사용한 HTML 요소의 3차원 개념화이다.

특정 요소의 렌더링 순서는 자신의 z-index 속성 값에 의해 결정된다. 그이유는 그 요소들이 가진 속성으로 인해 쌓임 맥락이 생성되기 때문이다.

쌓임 맥락은 대표적으로 아래 조건을 만족할 경우 생성된다.

- 문서의 루트 요소 (html)
- position이 absolute , relative 이며, z-index가 auto가 아닌 요소
- position이 fixed , sticky 인 요소
- flexbox 컨테이너의 자식 중 z-index가 auto가 아닌 요소
- grid 컨테이너의 자식 중 z-index가 auto가 아닌 요소
- opacity가 1보다 작은 요소

쌓임 맥락 내부의 자식 요소의 특징
1. 쌓임 맥락이 생성된 요소의 자식 요소는 쌓임 맥락 생성 규칙 및 z-index 규칙에 의해 동일하게 쌓인다.

2. 쌓임 맥락 내부에 또 쌓임 맥락이 포함 될 수 있다. 따라서 쌓임 맥락은 계층 구조를 이룬다.

3. HTML 의 모든 요소가 쌓임 맥락을 가지는 것은 아니므로, 쌓임 맥락 계층구조는 HTML 요소 계층구조의 부분집합이다.
자식의 z-index 값은 부모 요소 내부에서만 의미 있다.

4. 자신의 쌓임 맥락을 만들지 않을 경우, 부모의 쌓임 맥락에 의해 동화 된다.





https://developer.mozilla.org/ko/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context  

https://velog.io/@moonheekim0118/CSSz-index%EC%99%80-%EC%8C%93%EC%9E%84-%EB%A7%A5%EB%9D%BD-stacking-context#%EC%8C%93%EC%9E%84-%EB%A7%A5%EB%9D%BD-stacking-context