# Intersection Observer API


Intersection Observer는 브라우저 화면 내의 요소들이 교차하는 부분을 감시하고 이에 대한 이벤트를 처리하는 API입니다.
특히 스크롤이나 요소의 크기 변화와 같은 상황에서 요소의 가시성 여부를 감지할 때 유용하다.
(Element가 뷰포트에 보이는지? 보이지 않는지에 따라서 이를 감지할 수 있는 수단을 제공한다는 것을 의미합니다.)

주로 Lazy Loading, 무한 스크롤, 광고 뷰 트래킹 등에서 활용됩니다. 
이전에는 이러한 요소의 가시성을 확인하기 위해서 스크롤 이벤트를 사용하는 등의 방법이 사용되었는데, 이는 성능에 부정적인 영향을 미칠 수 있었습니다. 
Intersection Observer는 이러한 문제를 보다 효과적으로 해결합니다.





## Reference
https://heropy.blog/2019/10/27/intersection-observer/