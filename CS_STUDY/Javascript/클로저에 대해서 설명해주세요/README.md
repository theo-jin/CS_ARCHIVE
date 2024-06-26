# 클로저에 대해서 설명해주세요.

## 클로저의 정의

클로저(closure)는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이라고 부르며,
클로저는 자신이 생성될 때의 환경(Lexical environment)을 기억하는 함수이며 내부 함수가 외부(enclosing) 함수 변수에 액세스(접근) 할 수 있는 자바스크립트의 기능을 말한다.

```
스코프는 함수를 호출할 때가 아니라 함수를 어디에 선언하였는지에 따라 결정된다. 이를 렉시컬 스코핑(Lexical scoping)라 한다
```

그 이유는 클로저는 자신이 생성될 때의 환경(Lexical environment)을 기억하는 함수이고,
클로저는 반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있다.

## 동작원리

- 클로저는 자신이 선언되었을 때의 환경(=렉시컬 스코프)을 기억하는 함수입니다.
- 자바스크립트의 모든 함수는 내부슬롯[[Environment]]라 불리는 숨김 프로퍼티를 갖습니다. 이곳에 렉시컬 스코프에 대한 참조값이 저장됩니다.
- 함수 본문에서 [[Environment]]를 사용해서 외부 함수의 변수에도 접근할 수 있게 됩니다.

## 클로저의 활용

### 상태 유지

클로저는 현재 상태를 기억하고 이 상태가 변경되어도 최신 상태를 유지해야 하는 상황에 매우 유용하다.  
클로저는 자신이 생성될 때의 환경(Lexical environment)을 기억해야 하므로 메모리 차원에서 손해를 볼 수 있다.하지만,클로저가 가장 유용하게 사용되는 상황은 현재 상태를 기억하고 변경된 최신 상태를 유지할때 많이 쓰인다.

useState 같은경우 내부적으로 클로저를 사용함.

### 전역변수 사용을 억제

만약 자바스크립트에 클로저라는 기능이 없다면 상태를 유지하기 위해 전역 변수를 사용할 수 밖에 없다.  
전역 변수는 언제든지 누구나 접근할 수 있고 변경할 수 있기 때문에 많은 부작용을 유발해 오류의 원인이 되므로 사용을 억제해야 한다. 가변(mutable) 데이터를 피하고 불변성(Immutability)을 지향하는 함수형 프로그래밍에서 Side effect를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.

- 클로저를 사용하면 변수를 공유하는 특성은 유지하되 데이터를 은닉화할 수 있기 때문에, 전역 변수를 대체하여 안전한 코드를 작성할 수 있습니다.

### 정보의 은닉

- 변수 값을 은닉할 수 있습니다. 클래스 기반 언어의 private 키워드를 흉내낼 수 있습니다.

## 클로저 단점

클로저를 사용하면 메모리 측면에서 손해를 볼 수 있습니다.

클로저에 의해 내부 함수는 외부 함수의 변수를 참조하고 있습니다.
따라서 외부 함수의 생명 주기가 끝났음에도 가비지 콜렉터에 의해 메모리가 해제되지 않습니다.
해결 방법
클로저를 할당한 변수에 null을 할당해줌으로써 메모리를 해제시키는 방법이 있습니다.

코드 질문 by 이춘구님

```ts
var a = 10;

function f1() {
  return function () {
    console.log(a);
  };
  var a = 20;
}

var f2 = f1();
f2(); // undefined
// f1 함수 내부의 평가 단계에서 a는 undefined로 초기화되고 익명함수가 반환되면서 20이 할당되지 못한다.
// 그래서 익명함수 내부의 a는 undefined가 된다.
```

```ts
var a = 1;

function f1() {
  var b = 2;
  function f2() {
    console.log(a, b);
  }

  return f2;
}

var f2 = f1();
var b = 3;

function f3() {
  var a = 5;
  f2();
}

f3(); // 1 2
// f3의 호출로 호출되는 함수는 f1 내부의 f2이다. 로컬 스코프부터 확장해나가며 a, b를 찾으면 a는 글로벌, b는 f1 내부이다
```

```ts
const a = {};

const func = (b) => {
  b = b.a = 1;
  // b = (b.a = 1) <= 연속 할당은 우측부터 결합되고 좌측부터 평가된다.
  // a = { a: 1 } <= b가 참조하는 객체인 글로벌 a에 속성이 추가된다.
  // b = 1 <= b.a = 1은 1을 반환하고 b에는 1이 재할당된다.
  b.b = 2;
  // 1.b = 2 <= 1은 객체가 아니므로 무시된다.
};

func(a);

console.log(a); // { a: 1 }
```

## Reference

https://poiemaweb.com/js-closure

https://ljtaek2.tistory.com/147

https://enjoydev.life/blog/javascript/6-closure
