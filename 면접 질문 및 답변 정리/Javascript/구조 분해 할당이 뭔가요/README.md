# 배열 디스럭쳐링 할당. 

디스트럭처링(Destructuring)할당은 구조화된 배열과 같은 이터러블 또는 객체를 Destructuring(비구조화, 파괴)하여 1개이상의 변수에 할당하는 것을 말한다. 배열과 같은 이터러블 또는 객체 리터럴에서 필요한 값만을 추출하여 변수에 할당하거나 반환할 때 유용하다.

## 1.배열 디스럭쳐링 할당. 
ES6의 배열 디스트럭처링은 배열의 각 요소를 배열로부터 추출하여 한개 이상의 변수에 할당한다. 이때 배열 디스트럭처링 할당의 대상(할당문의 우변)은 이터러블하며,추출/할당 기준은 배열의 인덱스이다. 즉, 순서대로 할당.

(우변에 이터러블을 할당하지 않으면 에러가 발생) 
```
// ES6 Destructuring
const arr = [1, 2, 3];

// 배열의 인덱스를 기준으로 배열로부터 요소를 추출하여 변수에 할당
// 변수 one, two, three가 선언되고 arr(initializer(초기화자))가 Destructuring(비구조화, 파괴)되어 할당된다.
const [one, two, three] = arr;
// 디스트럭처링을 사용할 때는 반드시 initializer(초기화자)를 할당해야 한다.
// const [one, two, three]; // SyntaxError: Missing initializer in destructuring declaration

console.log(one, two, three); // 1 2 3
```

배열 디스트럭처링 할당을 위한 변수에  Rest파라미터와 유사하게 Rest요소 ...을 사용할수 있다. Rest요소는 Rest파라미터와 마찬가지로 반드시 마지막에 위치.

```
const [x,...y]=[1,2,3];
consoel.log(x,y); // 1 [2,3]
```

## 2.객체 디스럭쳐링 할당.  

ES6의 객체 디스트럭처링 할당은 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당 이때 객체의 디스럭처링 할당의 대상은 객체이어야 하며 할당의 기준은  프로퍼티 이름(키)이다. 순서는 의미가 없고 선언된 변수이름과 프로퍼티 키가 일치하면 할당된다. 

```
// ES6 Destructuring
const obj = { firstName: 'Ungmo', lastName: 'Lee' };

// 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어진다. 순서는 의미가 없다.
// 변수 lastName, firstName가 선언되고 obj(initializer(초기화자))가 Destructuring(비구조화, 파괴)되어 할당된다.
const { lastName, firstName } = obj;

console.log(firstName, lastName); // Ungmo Lee
```