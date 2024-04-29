# 성능 최적화 = 렌더링 최적화 + 로딩 최적화

## 렌더링 최적화

브라우저 렌더링 최적화는 가장 기본적인 전략은HTML, CSS, JavaScript의 크기를 최소화하고, 필요한 자원만을 로드하는 것입니다. 여기에는 코드 분할, 압축, 캐싱 등의 기술을 활용할 수 있다.

### 장점

또한, CSS와 JavaScript의 로딩 방식을 최적화하여 렌더링 차단을 방지할 수 있다. 여기서
렌더링 차단 리소스는 브라우저의 렌더링을 막는 소스들로 모든 css와 js가 렌더링 차단 리소스인 것은 아니지만.일반적으로 css와 js파일들이 여기에 해당 할 수 도 있다.

이외에도 이미지 최적화, 웹 폰트 로딩 최적화, Critical Rendering Path 최적화 등 다양한 방법을 통해 브라우저 렌더링 성능을 향상시킬 수 있습니다.

브라우저 렌더링 최적화는 단순히 웹사이트의 속도를 향상시키는 것뿐만 아니라, 검색 엔진 최적화(SEO)에도 긍정적인 영향을 미칩니다. 왜냐하면 검색 엔진은 로딩 속도를 중요한 랭킹 요소로 고려하기 때문입니다.

### 최적화 종류

- Webpack 사용:파일 용량 압축,모듈 번들링을 통한 파일 개수 감소
- Image Lazy Loading:화면에 실제로 이미지가 보여져야 할 때 이미지를 다운로드하여, CSS, JS를 더 앞서 다운로드하게 함
- WebP:압축율이 좋은 이미지 포맷을 사용하여 파일 용량 압축
- Lazy Component: 첫화면에 보이지 않는 컴포넌트는 나중에 다운로드하여 파일 개수 감소,
  당장 필요하지 않은 컴포넌트의 코드가 분리되어 파일 용량 압축
- Browser Caching: 브라우저에 파일을 캐싱하여 다운로드할 파일 개수 감소,
  다운로드하는 시간 자체가 없어지므로 큰 이득

브라우저 캐싱전략

### 주의할 점

모든 최적화 기술이 모든 상황에 적합한 것은 아니며, 때로는 사용자 경험을 저하시킬 수도 있습니다. 따라서 최적화 기술을 선택할 때는 웹사이트의 특성과 사용자의 요구를 충분히 고려해야 한다.

웹 페이지 렌더링 최적화의 목표는 리플로우를 최대한 적게 발생시키면서, 빠르게 화면을 그리는 것

- FCP (First Contentful Paint) : 첫 번째 텍스트 또는 이미지가 표시되는 데 걸린 시간
- TTI (Time to Interactive) : 사용자와 페이지가 상호작용할 수 있게 된 시간
- SI (Speed Index) : 페이지 콘텐츠가 얼마나 빨리 표시되는지에 대한 정보
- TBT (Total Blocking Time) : FCP와 TTI 사이 모든 시간의 합. 작업 지속 시간이 50ms를 초과하면 밀리초 단위로 표현됨
- LCP (Largest Contentful Paint) : 가장 큰 텍스트 또는 이미지가 표시된 시간
- CLS (Cumulative Layout Shift) : 표시 영역 안에 보이는 요소들이 얼마나 이동하는지에 대한 정보

### CSS

#### 리플로우, 리페인트(Reflow/Repaint)를 고려한 스타일 작성

리플로우가 일어나면 브라우저가 전체 픽셀을 다시 계산해야 하기때문에 되도록 리페인트 속성을 사용해 스타일을 작성하는 것이 성능면에서 좋다.

리플로우(Reflow)를 발생시키는 속성

```
position / width / height / margin / padding / display / top / left / right / bottom /
box-sizing / border-color / text-align / border / border-width /
font-family / float / font-size / font-weight / line-height / vertical-align /
white-space / word-wrap / text-overflow / text-shadow ...
```

리페인트(Repaint)를 발생시키는 속성

```
color / border-style / visibility / background / background-color /
background-image / background-position / background-repeat / background-size /
text-decoration / outline / outline-style / outline-color / outline-width /
border-radius / box-shadow ...
```

리플로우와 리페인트를 발생시키지 않는 속성

```
opacity / transform / cursor / z-index ...
```

#### 사용하지 않는 css 제거

css는 렌더링 차단 리소스이기 때문에 사용하지 않는 css는 제거하는 것이 좋다.구글 크롬 라이트하우스(Lighthouse)를 통해 확인할 수 있다.

#### html 최적화

✔️ 인라인 스타일을 사용하지 않는다  
html 요소에 style을 통해 인라인 스타일을 작성하면 불필요한 코드 중복이 발생하기 쉽다.
인라인 스타일은 웹 페이지가 그려지면서 레이아웃에 영향을 미치면서 추가로 리플로우를 발생시킨다.
애초에 스타일은 스타일 시트에 작성하는 것이 표준에도 맞고, 유지보수 측면에서도 좋다 !

```
<div style="margin-top:20px;"></div> <!-- 🔺 -->
```

## 로딩 최적화

### 렌더 블로킹 최적화

##### css는 head, js는 body 하단에서 불러온다

웹 페이지가 로드되면 html과 css가 동시에 파싱된다. html과 css는 바로 눈에 보이는 시각적 부분을 구현하기때문에 빠르게 그려질수록 좋다. 그래서 css는 head 내에서 임포트한다.

웹 페이지는 파싱을 실행하면서 script를 만나면 html 파싱을 멈추고 해당 파일을 다운로드한 뒤 실행한다. 따라서 js를 제외한 구조들의 로드가 끝나고 js가 들어오는 것이 좋다. 일반적으로 body 태그를 닫기 직전에 script를 임포트 한다.

### ✔️ async / defer

async와 defer 속성은 스크립트 파일을 병렬로 다운로드하게 해준다. 즉, 로딩 시 웹페이지 해석을 멈추지 않고 스크립트를 다운로드 하는것이다.

- async는 다운로드 후 즉시 실행한다.
- defer는 웹페이지가 모두 그려지고 DOM이 들어왔을 때 스크립트를 실행한다.

```
<!-- 병렬 다운로드 & 즉시실행 -->
<script async src="test.js"></script>

<!-- 병렬 다운로드 & 지연실행 -->
<script defer src="test.js"></script>
```

## Reference

https://f-lab.kr/insight/browser-rendering-optimization

https://velog.io/@bumsu0211/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B3%BC%EC%A0%95%EA%B3%BC-%EC%B5%9C%EC%A0%81%ED%99%94#%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EC%B5%9C%EC%A0%81%ED%99%94
