# inline vs block vs inline-block 속성을 비교
## display: inline
display 속성이 inline으로 지정된 엘리먼트는 전후 줄바꿈 없이 한 줄에 다른 엘리먼트들과 나란히 배치
줄바꿈 없이 순서대로 한 줄에 보이게 됨.

inline은 width, height 속성에 영향을 받지 않는다.왜냐하면 해당 태그가 마크업하고 있는 컨텐츠의 크기 만큼만 공간을 차지하도록 되어 있기 때문.   
또한, margin과 padding 속성은 좌우 간격만 반영이 되고, 상하 간격은 반영이 되지 않습니다.

inline을 default값으로 가지고 있는 tag: <span>, <a>, <img>, <em>, <i>, <strong>,

## display: block
display 속성이 block으로 지정된 엘리먼트는 전후 줄바꿈이 들어가 다른 엘리먼트들을 다른 줄로 밀어내고 혼자 한 줄을 차지
block 엘리먼트는 inline 엘리먼트와 달리 width, height, margin, padding 속성이 모두 반영  

block을 default값으로 가지고 있는 tag: <div>, <h1>, <p>, <li>, <section>


## display: inline-block
display 속성이 inline-block으로 지정된 엘리먼트는 마치 하이브리드 모드처럼 동작  
기본적으로 inline 엘리먼트처럼 전후 줄바꿈 없이 한 줄에 다른 엘리먼트들과 나란히 배치되지만,   
block 엘리먼트처럼 width와 height 속성 지정 및 margin과 padding 속성의 상하 간격 지정이 가능
내부적으로는 block 엘리먼트의 규칙을 따르면서 외부적으로 inline 엘리먼트의 규칙을 따르게 됨

inline과 같이 양 옆으로 화면에 나열할 수 있다.
inline과 다른점은 width, height 속성을 통해 사이즈 조절이 가능.
inline-block을 default값으로 가지고 있는 tag: <button>, <input>, <select>, <textarea>


## Reference

https://www.daleseo.com/css-display-inline-block/