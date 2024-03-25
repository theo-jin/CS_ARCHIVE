# Position & Display

## position의 각 속성에 대해 설명해주세요. (static, relative, absolute, fixed, sticky)

position은 위치를 결정하는 속성.
요소의 위치를 어떤 기준으로, 어디에 배치시킬 것인지 표현

#### Posision 속성

```
static	    초기값. 기준 위치를 설정하지 않음.
relative	현재 위치를 기준으로 상대 위치를 지정.
absolute	부모 위치를 기준으로 절대 위치를 지정.
fixed	    윈도우(브라우저 창)를 기준으로 절대 위치를 지정하여 요소를 그 위치에 고정(fix)시킴
sticky	    지정된 위치에 뷰포트가 도달했을 때, 요소가 그 위치에 고정(fix)됨
```

#### position: static

static은 position의 기본값으로, position을 지정하지 않아도 기본적으로 적용된다.
position이 static인 상태에는
top, left, left, right, z-index를 지정해도 위치가 변경되지 않는다.

#### position: relative

relative는 현재 위치(static)를 기준으로 상대 위치를 지정하게 해준다.
relative는 요소 자기 자신의 원래 위치가 기준점이 됨

```
relative의 특징 정리

top, left, left, right의 지정이 가능해진다.
z-index의 지정이 가능해진다.
relative의 기준점은 요소 자기 자신이 원래 배치되었던 위치이다.
absolute의 기준 위치가 된다 (추후 언급 예정!)
```

#### position: absolute

absolute는 relative나 fixed가 지정된 부모 위치를 기준으로 자신의 위치를 지정할 수 있게 해준다.
absolute는 부모 위치를 기준점으로 설정하여 요소를 이동시킬 수 있게 할 수 있다.

```
absolute의 특징 정리

부모 요소(=기준 위치)에 relative 또는 fixed를 지정해야한다.
자식 요소(=이동시키고 싶은 요소)에 absolute를 지정한다.
자식 요소를 top, left, left, right 등으로 구체적인 위치를 조절할 수 있다.
```

#### position: fixed

fixed는 브라우저 화면(윈도우)을 기준으로 요소를 정해진 위치에 고정(fix)시킬 수 있다.
fixed는 브라우저 화면이 기준점이 된다

fixed는 이름 그대로 요소를 지정한 위치에 고정(fix)시켜주기 때문에
스크롤을 해도 .btn-top 버튼이 지정된 위치에 그대로 자리하고 있다

```
fixed의 특징 정리

브라우저 화면(윈도우) 전체가 기준점이 된다.
스크롤을 해도 요소가 지정된 위치에 계속 고정되어 있다.
top, left, left, right의 지정이 가능하다.
z-index의 지정이 가능하다.
```

#### position: sticky

sticky는 요소가 지정된 기준점(top, left, left, right 등으로 설정해둔 위치)에 도달했을 때, 그 기준점에 요소를 고정(fix)시켜준다.

```
sticky의 특징 정리

브라우저 화면(윈도우) 전체가 기준점이 된다.
기준점에 도달했을 때 요소가 그 위치(기준점)에 고정(fix)된다.
top, left, left, right의 지정이 가능하다.
z-index의 지정이 가능하다.
```

## Display

display CSS 속성은 요소를 블록과 인라인 요소 중 어느 쪽으로 처리할지와 함께, 플로우, 그리드, 플렉스처럼 자식 요소를 배치할 때 사용할 레이아웃을 설정합니다.

### block

display: block은 요소가 뷰 포트의 가로 영역을 100% 점유하게 되는 특징을 가지고 있다.
때문에 block 특성을 가진 요소와 인접된 다른 요소는 양 옆으로 배치될 수 없으며,
블럭이 쌓이듯 세로로 배열되는 것이 특징이다.

- width, height, margin, padding의 설정이 가능하여 자유도가 높다.
- block 특성을 가진 요소(Block-level elements)는 대표적으로`<div>, <p>, <h1>, <ul>`등이 있다.

등이 있다.

### inline

- 요소를 가로로 나열할 수 있다.따라서 inline 속성을 지닌 요소의 사이즈는, 요소 내부 컨텐츠 자체의 사이즈(폰트 사이즈, 텍스트 량, 이미지의 가로 세로 크기 등)에 따라 결정된다.
- width, height의 설정이 불가능하다.
- margin은 좌우 값만 설정이 가능하다.
- padding은 상하좌우 설정이 가능하지만, 상하의 padding은 다른 요소에게 영향을 줄 수 없다.
- text-align와 vertical-align을 지정하는 것이 가능하다.
- inline 특성을 가진 요소(Inline elements)는
  대표적으로
  `<a>, <span>, <img>, <svg>`등이 있다.

### inline-block의 특징 정리

요소의 배치는 inline적인 성질을 가지고 있고 요소의 형태는 block적인 성질을 가지고 있다.

- inline처럼 요소를 가로로 나열할 수 있다.
- block처럼 width, height의 설정이 가능하다.
- block처럼 margin과 padding 값을 자유롭게 설정하는 것이 가능하다!
- inline처럼 text-align, vertical-align을 사용하는 것이 가능하다.

### display:none과 visibility:hidden의 차이 +opacity:0
display:none과 visibility:hidden의 속성에서 가장 큰 차이점은 바로 영역의 인식
두 속성 모두 화면상에서 콘텐츠 영역을 동일하게 숨기는 역할을 하지만 그 둘에는 엄청난 차이가 있습니다. 
display:none 속성을 이용하면 해당 콘텐츠가 안 보이게 되면서 해당 콘테츠가 가지고 있던 있던 영역 또한 사라지게 됩니다. 하지만 visibility:hidden은 콘텐츠는 안 보이게 되는 것은 display:none과 동일하지만 display:none 과는 다르게 해당 콘테츠가 인지하고 있던 영역은 그대로 유지하게 됩니다.

visibility:hidden는 영역 자체는 


https://velog.io/@iamhayoung/CSS-Position-Display-Float%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0#-position-static

https://whales.tistory.com/13