# == 과 === 의 차이가 무엇인가요?  

☝ '==' 연산자를 이용하여 서로 다른 유형의 두 변수의 [값] 비교
✌ '==='는 엄격한 비교를 하는 것으로 알려져 있다 ([값 & 자료형] -> true).

==는 Equal Operator동등연산자 이고,  ===는 Strict Equal Operator  엄격연산자 이다. 
==는 a == b 라고 할때, a와 b의 값이 같은지를 비교해서, 같으면 true, 다르면 false라고 한다.(값만 같으면 true이다.)
 
===는 Strict, 즉 엄격한 Equal Operator로써, "엄격하게" 같음을 비교할 때 사용하는 연산자이다. 
===는 a === b 라고 할때, 값과 값의 종류(Data Type)가 모두 같은지를 비교해서, 같으면 true, 다르면 false라고 한다. 

### 문제
밑의 코드의 콘솔값은 무엇이 나오고 그 이유는 무엇일까 

```
console.log("foo" === new String("foo"));
```


### 정답

 오브젝트를 숫자 또는 문자열과 비교하는 경우, JavaScript는 그 오브젝트의 기본값을 리턴한다. 연산자는 그 오브젝트를 그 오브젝트의 valueOf나 toString이라는 메소드를 이용해 primitive한 값, 혹은 String, 또는 Number의 값으로 변환한다. 이러한 변환을 시도 후 실패했을 때에는 런타임 에러가 발상한다.

```
console.log("foo" == new String("foo")); //true
console.log("foo" === new String("foo")); //false
```
 위 코드에서는 원시(primitive) 자료형과 String형의 비교하고 있으므로, String형이 primitive형으로 변환됐다. 따라서 아래의 코드는 false이다.
```ts
// 타입 비교 후, 같으면 isStrictEqual로 호출
function isLooselyEqual(x, y) {
  if (typeof x === typeof y) {
    return isStrictlyEqual(x, y);
  }

  if (x === null && y === undefined) {
    return true;
  }

  if (x === undefined && y === null) {
    return true;
  }

  // deprecated 된 document.all을 지원하기 위한 과정은 생략함.

  if (typeof x === "number" && typeof y === "string") {
    return isLooselyEqual(x, Number(y));
  }

  if (typeof x === "string" && typeof y === "number") {
    return isLooselyEqual(Number(x), y);
  }

  if (typeof x === "bigint" && y === "string") {
    let n = BigInt(y);

    if (n === undefined) return false;
    return isLooselyEqual(x, n);
  }

  if (typeof x === "string" && typeof y === "bigint") {
    return isLooselyEqual(y, x);
  }

  if (typeof x === "boolean") {
    return isLooselyEqual(Number(x), y);
  }

  if (typeof y === "boolean") {
    return isLooselyEqual(x, Number(y));
  }

  if (
    ["string", "number", "bigint", "symbol"].includes(typeof x) &&
    y instanceof Object
  ) {
    return isLooselyEqual(x, toPrimitive(y));
  }

  if (
    x instanceof Object &&
    ["string", "number", "bigint", "symbol"].includes(typeof y)
  ) {
    return isLooselyEqual(toPrimitive(x), y);
  }

  if (
    (typeof x === "bigint" && typeof y === "number") ||
    (typeof x === "number" && typeof y === "bigint")
  ) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
    if (x == y) return true;
    return false;
  }

  return false;
}
```