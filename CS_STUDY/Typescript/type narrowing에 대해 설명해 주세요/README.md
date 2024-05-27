# 타입 좁히기

타입스크립트가 넓은 타입으로부터 좁은 타입으로 진행하는 과정.

## 타입 가드

타입 좁히기를 유발하는 표현을 타입 가드라고 부릅니다.그리고 타입가드는 두 가지로 나뉘게 되는데,

- 제어흐름 분석
- 사용자 정의 타입가드
  로 나뉘게된다.

### 사용자 정의 타입가드

프로그래머가 값을 어떤 타입으로 좁혀야 하는지 직접 명시할 수 있는 수단
프로그래머가 직접 임의의 기준을 사용해 타입 가드를 정의

### 제어흐름 분석

프로그램에서 실행되는 구문이나 함수가 호출되는 순서를 제어 흐름(Control Flow)이라고 하고, 이 흐름을 나타내는 구문을 제어문이라고 한다.

#### 대표적 제어문

- 조건: if, else if, else
- 반복: for, while
- switch / case
- break / continue
- throw
- return
  등이 있고

TypeScript에서는 제어 흐름 분석(Control Flow Analysis)을 통해 특정한 시점에 프로그램이 어떤 상태를 가지고 있는지 알아내게 되고, 이 사실을 기반으로 특정 값의 타입을 제한할 수 있다.

### typeof, instanceof 연산자

가장 쉽게 타입을 알아차릴 수 있는 typeof, instanceof 연산자를 타입 가드로 사용할 수 있다.

- typeof 연산자는 하나의 인자를 받아 해당 인자의 타입을 나타내는 문자열을 반환한다. typeof의 반환값과 문자열을 비교한 결과를 타입 가드로 사용할 수 있다.
- instanceof 연산자는 값과 생성자를 받아 해당 값의 프로토타입 체인에 해당 생성자가 등장하는지를 확인한다.Instanceof는 내장 클래스 또는 직접 만든 클래스에만 사용이 가능한 연산이다.

### in 연산자

객체에 해당 프로퍼티가 있는지 체크하는 in 연산자도 타입을 식별할 수 있는 프로퍼티라면 타입 가드로 사용할 수 있습니다.
직접 만든 타입과 함께 사용하려면 다음과 같이 in 연산자를 이용해야 한다.ㄴ

```ts
function func(value: number | string | Date | null) {
  if (typeof value === 'number') {
    console.log(value.toFixed());
  } else if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else if (value instanceof Date) {
    console.log(value.getTime());
  }
}
```

### 비교 구문

비교 조건과 그의 반대 조건을 합하면 모든 케이스를 커버합니다. 이 특성을 이용해 null 혹은 undefined 와 비교하는 구문을 타입 가드로 사용할 수 있습니다.

## Reference

https://ahnheejong.gitbook.io/ts-for-jsdev/06-type-system-deepdive/type-narrowing

https://ts.winterlood.com/92c2035a-49bc-4585-9e3d-43206ce92d59

https://medium.com/humanscape-tech/typescript%EA%B0%80-%ED%83%80%EC%9E%85%EC%9D%84-%EC%A2%81%ED%98%80%EA%B0%80%EB%8A%94-%EB%B2%95-c5c318982967
