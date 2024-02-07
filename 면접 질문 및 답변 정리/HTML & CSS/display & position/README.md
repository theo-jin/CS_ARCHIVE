
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

https://velog.io/@iamhayoung/CSS-Position-Display-Float%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0#-position-static