# Stacking Context에 대해 설명해주세요

**요약**

쌓임 맥락이 다른 쌓임 맥락을 포함할 수 있고, 함께 계층 구조를 이룬다.  

쌓임 맥락은 형제 쌓임 맥락과 완전히 분리됩니다. 쌓임을 처리할 땐 자손 요소만 고려합니다.
각각의 쌓임 맥락은 독립적입니다. 어느 요소의 콘텐츠를 쌓은 후에는 그 요소를 통째 부모 쌓임 맥락 안에 배치합니다.

```
쌓임 맥락(stacking context)은 가상의 Z축을 사용한 HTML 요소의 3차원 개념화입니다. Z축은 사용자 기준이며, 사용자는 뷰포트 혹은 웹페이지를 바라보고 있을 것으로 가정합니다. 각각의 HTML 요소는 자신의 속성에 따른 우선순위를 사용해 3차원 공간을 차지합니다.
```
설명
이전 글 z-index 사용하기에서 보았듯, 특정 요소의 렌더링 순서는 자신의 z-index 속성 값에 영향을 받습니다. 이는 그 요소들이 가진 특별한 속성으로 인해 쌓임 맥락이 생성되기 때문입니다.


쌓임 맥락은 대표적으로 아래 조건을 만족할 경우 생성된다.

- 문서의 루트 요소 (html)
- position이 absolute , relative 이며, z-index가 auto가 아닌 요소
- position이 fixed , sticky 인 요소
- flexbox 컨테이너의 자식 중 z-index가 auto가 아닌 요소
- grid 컨테이너의 자식 중 z-index가 auto가 아닌 요소
- opacity가 1보다 작은 요소


쌓임 맥락 안의 자식 요소는 이전에 설명했던 규칙을 동일하게 사용해 쌓입니다. 중요한 것은, 자식의 z-index 값은 부모에게만 의미가 있다는 점입니다. 하나의 쌓임 맥락은 부모 쌓임 맥락 안에서 통째로 하나의 단위로 간주됩니다.



https://developer.mozilla.org/ko/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context  