# 1. 스택의 정의

스택의 ADT를 정의하고 스택의 동작원리를 살펴봅시다.
ADT(abstract data type): 한국말로 추상 자료형. 인터페이스만 있고 실제로 구현되지 않는 자료형이다. 일종의 자료형의 설계도.

## 스택의 ADT

스택은 우선 다음과 같은 연산을 정의 해야한다.

- 1. push
- 2. pop
- 3. isFull
- 4. isEmpty
- 5. top

### 스택 세부 동작에 대해

- 스택에 데이터 추가시 연산과정
  push(3)을 호출시

1. isFull()을 수행하여 우선 data배열에 데이터가 가득 찼는지 확인
2. 찼지 않다면 top을 1만큼 증가.
3. data[0]에 3을추가.

- 스택에 데이터 제거시 연산과정
  pop()을 호출시

1. isEmpty()함수를 우선 수행하여 우선 data배열에 데이터가 없는건 아닌지 확인 확인
2. 데이터가 있다면 top을 1만큼 김서.
3. data 3을반환.

```ts
const stack = []; //스택 초기화
const maxSize = 10; //스택의 최대 크기

function isFull(stack) {
  //스택이 가득 찼는지 확인하는 함수
  return stack.length === maxSize;
}
function isEmpty(stack) {
  //스택이 비어 있는지 확인하는 함수
  return stack.length === 0;
}
function push(stack, item) {
  //스택에 데이터를 추가하는 함수
  if (isFull(stack)) {
    console.log('스택이 가득 찼습니다');
  } else {
    stack.push(item);
    console.log('데이터가 추가되었습니다.');
  }
}
function pop(stack) {
  // 스택에서 데이터를 꺼내는 함수
  if (isEmpty(stack)) {
    console.log('스택이 비어 있습니다.');
    return null;
  } else {
    return stack.pop();
  }
}
```

그러나 JS의 배열은 크기를 동적으로 관리하므로 maxSize나 isFull()함수,isEmpty함수는 실전에서 필요없다.

```ts
const stack = []; //스택 초기화

function push(stack, item) {
  //스택에 데이터를 추가하는 함수
  stack.push(item);
  console.log('데이터가 추가되었습니다.');
}
function pop(stack) {
  // 스택에서 데이터를 꺼내는 함수
  if (stack.length === 0) {
    console.log('스택이 비어 있습니다.');
    return null;
  } else {
    return stack.pop();
  }
}
```

```

```
