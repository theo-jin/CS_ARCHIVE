# 커링(Curring)이란?
커링은 인자를 여러개 받는 함수를 분리하여, 인자를 하나씩만 받는 함수의 체인으로 만드는 방법이다.
커링은 f(a, b, c)처럼 단일 호출로 처리하는 함수를 f(a)(b)(c)와 같이 각각의 인수가 호출 가능한 프로세스로 호출된 후 병합되도록 변환하는 것.

커링은 함수를 호출하지 않습니다. 단지 변환할 뿐.

함수형 프로그래밍 기법 중 하나로 함수를 재사용하는데 유용하게 쓰일 수 있는 기법이다.
자바스크립트 내부에는 커링이 내장되어 있지 않지만 자바스크립트로도 구현이 가능하다.

```ts
function curry(f) { // 커링 변환을 하는 curry(f) 함수
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

커링은 f(a,b,c)를 f(a)(b)(c) 와 같이 다중 callable 프로세스 형태로 변환하는 기술입니다. 보통 자바스크립트에서의 커링되어진 함수는 평소처럼 호출도 하고 만약에 인수들이 충분하지 않을 때에는 partial을 반환합니다.

커링은 partial을 쉽게 적용할 수 있도록 해줍니다. 로그 예시에서 보았듯이 커링을 적용하면 인수 세 개의 범용 함수 log(date, importance, message)를 log(date)같이 인수가 하나인 형태나 log(date, importance)처럼 인수가 두 개인 형태로 호출할 수 있습니다.

## Reference
https://ko.javascript.info/currying-partials