# spread와 rest에 대해 설명

## SPREAD
 spread 라는 단어가 가지고 있는 의미는 펼치다, 퍼뜨리다 입니다. 이 문법을 사용하면, 객체 혹은 배열을 펼칠수있다.

 기존의 것을 건들이지 않고, 새로운 객체를 만든다는 것 
```
const slime = {
  name: '슬라임'
};

const cuteSlime = {
  ...slime,
  attribute: 'cute'
};

const purpleCuteSlime = {
  ...cuteSlime,
  color: 'purple'
};

console.log(slime);
console.log(cuteSlime);
console.log(purpleCuteSlime);
```


## REST
Rest parameter는 하나의 함수에서 여러 개의 인자를 받을 때, 앞 쪽에서 받은 인자를 제외한 나머지(rest) 인자들을 배열로 합쳐서 받을 수 있게 해준다.

```
const purpleCuteSlime = {
  name: '슬라임',
  attribute: 'cute',
  color: 'purple'
};

const { color, ...cuteSlime } = purpleCuteSlime;
console.log(color);
console.log(cuteSlime);
```


## 정리
spread operator는 펼치고, rest parameter는 모은다.
spread operator는 주는 쪽이고, rest parameter는 받는 쪽이다.
spread operator는 기존의 변수를 사용하고, rest parameter는 새로운 변수를 만든다.

## Q.다음 코드의 값은?
```
const numbers = [0, 1, 2, 3, 4, 5, 6];

const [..rest, last] = numbers;
```
신텍스 에러

https://soopdop.github.io/2020/12/02/rest-and-spread-in-javascript/
 https://learnjs.vlpt.us/useful/07-spread-and-rest.html