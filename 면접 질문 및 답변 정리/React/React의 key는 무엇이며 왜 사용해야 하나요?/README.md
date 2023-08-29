# React의 key는 무엇이며 왜 사용해야 하나요?

Key는
1. React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕고,
2. 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 한다.
   
 key 는 그 값이 변하지 않는, 유일한 식별자의 역할을 가집니다.

또한 key 는 엘리먼트의 변화를 감지한다.

React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인하여 

효율적으로 DOM 사용이 가능하다.

key에 인덱스값을 쓰면안되는 이유:데이터가 변경됐을 때 인덱스와 밸류값이 달라지는 경우가 생길수 있다. 그것을 막기위해 고유한 ID값을 키값에 넣어야한다. 

참고:
https://junior-datalist.tistory.com/184
https://ko.legacy.reactjs.org/docs/reconciliation.html#recursing-on-children
