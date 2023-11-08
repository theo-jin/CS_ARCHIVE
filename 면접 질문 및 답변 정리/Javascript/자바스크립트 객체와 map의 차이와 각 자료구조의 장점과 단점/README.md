# 자바스크립트 객체와 map의 차이와 각 자료구조의 장점과 단점


Object와 Map 비교
전통적으로 objects 는 문자열을 값에 매핑하는 데 사용되었다. Object는 키를 값으로 설정하고, 값을 검색하고, 키를 삭제하고, 키에 저장된 내용을 검색 할 수 있게 만들어준다. 거기에  Map 객체는 몇 가지 장점을 더 가지고 있다.

Object의 키는 Strings이며, Map의 키는 모든 값을 가질 수 있다.
Object는 크기를 수동으로 추적해야하지만, Map은 크기를 쉽게 얻을 수 있다.
Map은 삽입된 순서대로 반복된다.
객체(Object)에는 prototype이 있어 Map에 기본 키들이 있다. (이것은 map = Object.create(null) 를 사용하여 우회할 수 있다. )
Object 혹은 Map중에 어느 것을 사용할지를 결정하는데 도움을 줄 두가지 팁이 있다:

실행 시까지 키를 알수 없고, 모든 키가 동일한 type이며 모든 값들이 동일한 type일 경우에는 objects를 대신해서 map을 사용해라.
각 개별 요소에 대해 적용해야 하는 로직이 있을 경우에는 objects를 사용해라.


https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Keyed_collections

https://velog.io/@namda-on/JavaScript-Map-%EA%B3%BC-Object-%EC%9D%98-%EC%B0%A8%EC%9D%B4