# 배열 메소드가 무엇인가요

## 배열 메소드

- Array 생성자 함수 => 정적 메서드 제공
- 배열 객체의 프로토 타입인 Array.prototpye은 프로토타입 메서드 제공

배열에는 원본 배열을 직접 변경하는 메서드와 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드가 있다.

선요약

```ts
// 요소를 더하거나 지우기
push(...items) – 맨 끝에 요소 추가하기

pop() – 맨 끝 요소 추출하기

shift() – 첫 요소 추출하기

unshift(...items) – 맨 앞에 요소 추가하기

splice(pos, deleteCount, ...items) – pos부터 deleteCount개의 요소를 지우고, items 추가하기

slice(start, end) – start부터 end 바로 앞까지의 요소를 복사해 새로운 배열을 만듦

concat(...items) – 배열의 모든 요소를 복사하고 items를 추가해 새로운 배열을 만든 후 이를 반환함. items가 배열이면 이 배열의 인수를 기존 배열에 더해줌

// 원하는 요소 찾기
indexOf/lastIndexOf(item, pos) – pos부터 원하는 item을 찾음. 찾게 되면 해당 요소의 인덱스를, 아니면 -1을 반환함

includes(value) – 배열에 value가 있으면 true를, 그렇지 않으면 false를 반환함

find/filter(func) – func의 반환 값을 true로 만드는 첫 번째/전체 요소를 반환함
findIndex는 find와 유사함. 다만 요소 대신 인덱스를 반환함

//배열 전체 순회하기
forEach(func) – 모든 요소에 func을 호출함. 결과는 반환되지 않음

// 배열 변형하기
map(func) – 모든 요소에 func을 호출하고, 반환된 결과를 가지고 새로운 배열을 만듦

sort(func) – 배열을 정렬하고 정렬된 배열을 반환함

reverse() – 배열을 뒤집어 반환함

split/join – 문자열을 배열로, 배열을 문자열로 변환함

reduce(func, initial) – 요소를 차례로 돌면서 func을 호출함. 반환값은 다음 함수 호출에 전달함. 최종적으로 하나의 값이 도출됨

//기타
Array.isArray(arr) – arr이 배열인지 여부를 판단함
sort, reverse, splice는 기존 배열을 변형시킨다는 점에 주의하시기 바랍니다.
```

### Array.isArray

Array.isArray는 Array 생성자 함수의 정적 메서드. Array.isArray 메서드는 전달된 인수가 배열이면 true 배열이 아니면 false반환

```ts
// true
Array.isArray([]);
Array.isArray(new Array());

//false
Array.isArray();
Array.isArray(undefined);
Array.isArray({ 0: 1, length: 1 });
```

### Array.prototye.indexOf

indexOf메서드는 원본배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다.

- 원본배열에 인수로 전달한 요소와 중복되는 요소가 여러 개 있다면 첫번째 요소의 인덱스를 반환한다.
- 원본배열에 인수로 전달한 요소가 존재하지 않으면 -1을 반환한다.

```ts
const arr = [1, 2, 2, 3];
// 배열 arr에서 요소 2를 검색하여 첫번째로 검색된 요소의 인덱스를 반환
arr.indexOf(2); // =>1
// 배열 arr에서 요소 4가 없어서 -1을 반환한다.
arr.indexOf(4); // => -1
// 두 번째 인수는 검색을 시작할 인덱스다. 두번째 인수를 생략하면 처음부터 검색한다
arr.indexOf(2, 2); //=>2
```

### Array.prototye.push

```ts
//배열 뒷부분에 값을 삽입
var arr = [1, 2, 3, 4];
arr.push(5);
console.log(arr); // [ 1, 2, 3, 4, 5 ]
```

### Array.prototye.pop

```ts
//배열 뒷부분의 값을 삭제
var arr = [1, 2, 3, 4];
arr.pop();
console.log(arr); // [ 1, 2, 3 ]
```

### Array.prototye.unshift

```ts
//배열 앞부분에 값을 삽입

var arr = [1, 2, 3, 4];
arr.unshift(0);
console.log(arr); // [ 0, 1, 2, 3, 4 ]
```

### Array.prototye.shift

```ts
//배열 앞부분의 값을 삭제

var arr = [1, 2, 3, 4];
arr.shift();
console.log(arr); // [ 2, 3, 4 ]
```

### Array.prototye.concat

```ts
다수의 배열을 합치고 병합된 배열의 사본을 반환

var arr1 = [ 1, 2, 3 ];
var arr2 = [ 4, 5, 6 ];
var arr3 = arr2.concat( arr1 );
console.log( arr3 ); // [ 4, 5, 6, 1, 2, 3 ]
```

### Array.prototye.splice

```ts
배열의 특정위치에 요소를 추가하거나 삭제
splice( index, 제거할 요소 개수, 배열에 추가될 요소 )

var arr = [ 1, 2, 3, 4, 5, 6, 7 ];
arr.splice( 3, 2 );
console.log( arr ); // [ 1, 2, 3, 6, 7 ]   3번째 인덱스에서부터 2개 제거

var arr = [ 1, 2, 3, 4, 5, 6, 7 ];
arr.splice( 2, 1, "a", "b");
console.log( arr ); // [ 1, 2, "a", "b", 4, 5, 6, 7 ] 2번째 인덱스에서 1개 제거 후 "a"와 "b"를 추가
```

### Array.prototye.slice

slice( startIndex, endIndex)

```ts
배열의 startIndex부터 endIndex까지(endIndex는 불포함)에 대한 shallow copy를 새로운 배열 객체로 반환

var arr = [ 1, 2, 3, 4, 5, 6, 7 ];
var newArr = arr.slice( 3, 6 );
console.log( 'slice',  newArr ); // [ 4, 5, 6 ]
```

### Array.prototye.forEach

```ts
//배열의 각 원소별로 지정된 함수를 실행한다.

var arr = [1, 2, 3];
arr.forEach(function (value) {
  console.log(value); // 1 2 3
});
```

### Array.prototye.map

```ts
//배열의 각 원소별로 지정된 함수를 실행한 결과로 구성된 새로운 배열을 반환한다.

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var isEven = function (value) {
  return value % 2 === 0;
};
var newArr = arr.map(isEven);
console.log(newArr); // [ false, true, false, true, false, true, false, true, false, true ]
```

### Array.prototye.filter
```ts
//지정된 함수의 결과 값을 true로 만드는 원소들로만 구성된 별도의 배열을 반환한다.

var arr =[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var isEven = function( value ) {
return value % 2 === 0;
};
var newArr = arr.filter( isEven );
console.log( newArr ); // [ 2, 4, 6, 8, 10 ]
```
### Array.prototye.reduce
```ts
//누산기(accumulator) 및 배열의 각 값(좌에서 우로)에 대해 (누산된) 한 값으로 줄도록 함수를 적용

var arr =[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var value = arr.reduce( function( previousValue, currentValue, index ) {
return previousValue + currentValue;
});
console.log( value ); // 55
```
### Array.prototye.join
```ts
//배열 원소 전부를 하나의 문자열로 합친다.

var arr =[ 1, 2, 3, 4 ];
console.log( arr.join() );      // 1,2,3,4
console.log( arr.join( '-' ) ); // 1-2-3-4  
```
## Referece

http://blog.302chanwoo.com/2017/08/javascript-array-method/
https://ko.javascript.info/array-methods
