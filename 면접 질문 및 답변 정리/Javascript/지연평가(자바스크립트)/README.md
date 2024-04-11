# 지연 평가

지연 평가는 단어 그대로 계산이 필요한 시점까지 계산을 미루는 것을 의미.
즉, 지연 평가는 값을 계산하는 시점을 늦추어서 불필요한 계산을 방지하고 시스템의 성능을 향상시킬 수 있게 된다. 이를 통해, 메모리 사용량이 감소하고 프로그램의 반응성이 향상된다.
자바스크립트에서는 배열 데이터 구조를 많이 쓰는데 배열 연산의 성능을 끌어올리기 위해 필요한 기법 중 하나이며, 문자열과 같이 반복되는 것(Iterable)이라면 일부는 Lazy Evaluation 적용이 가능

지연평가의 장점

- 불필요한 계산을 하지 않으므로 빠른 계산이 가능하다.
- 무한 자료 구조를 사용 할 수 있다.
- 복잡한 수식에서 오류 상태를 피할 수 있다.

## ES6 엄격한 평가와 Lodash 지연 평가비교

ES6 엄격한 평가

```ts
const arr = [0, 1, 2, 3, 4, 5];

const result = arr
  .map((num) => num + 10) // 1. 모든 배열원소에 대해 10을 더한다 → [0, 11, 12, 13, 14, 15]
  .filter((num) => num % 2) // 2. 모든 배열원소에 대해 홀수만 구한다 → [11, 13, 15]
  .slice(0, 2); // 3. 모든 배열원소에 대해 2개만 추출한다 → [11, 13]

console.log(result); // [11, 13]
```

Lodash 지연 평가

```ts
const arr = [0, 1, 2, 3, 4, 5];

const result = _.chain(arr) // 일반배열을 lodash 체인 객체로 변환한다.
  .map((num) => num + 10)
  .filter((num) => num % 2)
  .take(2)
  .value(); // 지연 평가된 결과가 평가되어 실제값으로 변환

console.log(result); // [11, 13]
```

console.log() 도 지연평가이다. 

## Reference

https://www.zerocho.com/category/JavaScript/post/5c0cb264f82a70001e47db0c

https://armadillo-dev.github.io/javascript/whit-is-lazy-evaluation/

https://inpa.tistory.com/entry/LODASH-%F0%9F%93%9A-%EC%A7%80%EC%97%B0-%ED%8F%89%EA%B0%80-%EC%9B%90%EB%A6%AC-lodash%EB%8A%94-%EC%98%A4%ED%9E%88%EB%A0%A4-%EC%84%B1%EB%8A%A5%EC%9D%B4-%EC%A2%8B%EC%9D%84-%EC%88%98-%EC%9E%88%EB%8B%A4
