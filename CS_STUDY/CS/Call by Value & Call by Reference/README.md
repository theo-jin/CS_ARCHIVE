# Call by value & Call by reference

call by value와 call by reference란 변수나 객체등이 함수의 인자(argument)로 들어와 매개변수(parameter)로 전달될 때 어떤 방식으로 전달될 지를 결정하는 방식.
그 방법으로 Call by value & Call by reference가 있다.
Call by value(값에 의한 호출, 값의 복사)
Call by reference(참조에 의한 호출, 주소의 복사)

## parameter, argument

인자(argument)는 어떤 함수가 호출될 때 전달되는 값을 의미하고

매개변수(parameter)는 전달된 값을 받아들이는 변수를 의미한다.

```ts
function sum(a, b) {
  // a, b는 매개변수(parameter)
  return a + b;
}
sum(10, 20); // 10, 20은 인자(argument)
```

## Call by value(값에 의한 호출, 값의 복사)

Call by value(값의 복사)는 말 그대로 복사된 값을 인자로 넘겨서 매개변수로 전달한다.  
JS의 원시 타입(primitive type) 데이터인 경우에 해당하며, 변수가 가진 값을 복사하여 전달하므로 함수 내에서 값을 변경해도 원본 값은 변경되지 않는다.  
따라서 값의 불변성(Immutability)을 유지하는 데에 용이하다.

```ts
function addOne(x) {
  x += 1;
  return x;
}

let num = 5;
console.log(addOne(num)); // 6
console.log(num); // 5
```

장점 : 복사하여 처리하기 때문에 안전하다. 원래의 값이 보존이 된다.

단점 : 복사를 하기 때문에 메모리가 사용량이 늘어난다.

## Call by reference(참조에 의한 호출, 주소의 복사)

call by reference(주소값의 복사)는 실제 데이터가 존재하는 주소를 가리키는 주소값을 인자로 넘겨서 매개변수로 전달한다.  
이 방식에서는 함수 내에서 인자로 전달된 변수의 값을 변경하면, 호출한 쪽에서도 해당 변수의 값이 변경된다.  
객체(ex. obj, array, function ...)는 call by reference 방식으로 전달된다.

장점 : 복사하지 않고 직접 참조를 하기에 빠르다.  
단점 : 직접 참조를 하기에 원래 값이 영향을 받는다.(리스크)

```ts
function addOne(arr) {
  arr.push(1);
  return arr;
}

let nums = [1, 2, 3];
let result = addOne(nums);
console.log(result); // 출력: [1, 2, 3, 1]
console.log(nums); // 출력: [1, 2, 3, 1] (원본 값도 함께 변경됨)
```

예제

```ts
function foo(obj2) {
  obj2 = 10;
  console.log(obj2); // 10
}
let obj1 = { a: 5, b: 8 };
foo(obj1);

console.log(obj1); // { a: 5, b: 8 }
```

## Reference

https://velog.io/@younoah/call-by-value-call-by-reference
