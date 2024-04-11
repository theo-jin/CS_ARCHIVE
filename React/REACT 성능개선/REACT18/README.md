# REACT18

## 1.Batch

automatic batching 이라는 기능이 있는데

```ts
setCount(1);
setName(2);
setValue(3); //기본적으로 state변경이 일어날때마다 재렌더링이 일어나지만 automatic batching에서는 마지막 1번만 재렌더링됨
```

state변경함수를 연달아서 3개 사용하면 재렌더링도 원래 3번 되어야하지만

리액트는 똑똑하게도 재렌더링을 마지막에 1회만 처리해줍니다.

일종의 쓸데없는 재렌더링 방지기능이고 batching이라고 합니다.

```ts
fetch().then(() => {
  setCount(1); //재렌더링됨
  setName(2); //재렌더링됨
});
```

근데 문제는 ajax요청, setTimeout안에 state변경함수가 있는 경우 batching이 일어나지 않습니다.

리액트 17버전까진 그런 식으로 일관적이지 않게 동작했는데 18버전 이후 부터는 어디 있든 간에 재렌더링은 마지막에 1번만 됩니다.

batching 되는게 싫고 state변경함수 실행마다 재렌더링시키고 싶으면 flushSync라는 함수를 쓰면 됩니다. 필요하면 찾아봅시다.

## 2.useTransition:느린 컴포넌트 성능향상 가능

렌더링시간이 매우 오래걸리는 컴포넌트가 있다고 칩시다.

버튼클릭, 타이핑할 때 마다 그 컴포넌트를 렌더링해야한다면

이상하게 버튼클릭, 타이핑 반응속도도 느려집니다.

사람들은 원래 클릭, 타이핑을 했을 때 0.3초 이상 반응이 없으면 불편함을 느끼기 때문에 (한국인은 0.2초)

개선방법을 알아봅시다.

당연히 그 컴포넌트 안의 html 갯수를 줄이면 대부분 해결됩니다.

근데 그런게 안되면 useTransition 기능을 쓰면 됩니다.

우선 재렌더링이 느린 컴포넌트 만들어보기

```ts
import { useState } from 'react';

let a = new Array(10000).fill(0);

function App() {
  let [name, setName] = useState('');

  return (
    <div>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {a.map(() => {
        return <div>{name}</div>;
      })}
    </div>
  );
}
```

- 데이터가 10000개 들어있는 array자료를 하나 만들고

- 그 갯수만큼 `<div>`를 생성하라고 했습니다.

- 그리고 유저가 타이핑할 수 있는 `<input>`도 만들어봤습니다.

유저가 `<input>`에 타이핑하면 그 글자를 `<div>` 1만개안에 집어넣어줘야하는데

`<div>` 1만개 렌더링해주느라 `<input>`도 많은 지연시간이 발생합니다.

타이핑한 결과가 바로바로 반응이 안옵니다. 답답해죽음

## useTransition 쓰면

```ts
import { useState, useTransition } from 'react';

let a = new Array(10000).fill(0);

function App() {
  let [name, setName] = useState('');
  let [isPending, startTransition] = useTransition();

  return (
    <div>
      <input
        onChange={(e) => {
          startTransition(() => {
            //startTransition으로 성능저하를 일으키는 state변경을 감싼다.
            setName(e.target.value);
          });
        }}
      />

      {a.map(() => {
        return <div>{name}</div>;
      })}
    </div>
  );
}
```

- useTransition() 쓰면 그 자리에 [변수, 함수]가 남습니다.

- startTransition의 기본 원리는 묶은 코드를 나중에 처리하는 것이다.그 중 우측에 있는 startTransition() 함수로 state변경함수 같은걸 묶으면 그걸 다른 코드들보다 나중에 처리해준다.

그래서 `<input>` 타이핑같이 즉각 반응해야하는걸 우선적으로 처리해줄 수 있습니다.

타이핑해보면 아까보다 반응속도가 훨씬 낫습니다.

물론 근본적인 성능개선이라기보단 특정코드의 실행시점을 뒤로 옮겨주는 것일 뿐입니다.

html이 많으면 여러페이지로 쪼개십시오.

isPending은 어디다 쓰냐면 startTransition() 으로 감싼 코드가 처리중일 때 true로 변하는 변수입니다.

```ts
{
  isPending
    ? '로딩중기다리셈'
    : a.map(() => {
        return <div>{name}</div>;
      });
}
```

그래서 이런 식으로 코드짜는 것도 가능합니다.

위의 코드는 useTransition으로 감싼게 처리완료되면 `<div>{name}</div>` 이게 보이겠군요.

useDeferredValue 이것도 비슷함

startTransition() 이거랑 용도가 똑같습니다.

근데 얘는 state 아니면 변수하나를 집어넣을 수 있게 되어있습니다.

그래서 그 변수에 변동사항이 생기면 그걸 늦게 처리해줍니다.

```ts
import { useState, useTransition, useDeferredValue } from 'react';

let a = new Array(10000).fill(0);

function App() {
  let [name, setName] = useState('');
  let state1 = useDeferredValue(name);

  return (
    <div>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      {a.map(() => {
        return <div>{state1}</div>;
      })}
    </div>
  );
}
```

이렇게 쓰면 아까랑 똑같은 기능을 개발가능합니다.
useDeferredValue의 기본원리는 useDeferredValue에 집어넣은 state를 늦게 처리해준다

- useDeferredValue 안에 state를 집어넣으면 그 state가 변동사항이 생겼을 때 나중에 처리해줍니다.

그리고 처리결과는 let state에 저장해줍니다.

참고로 실은 페이지 안에 html이 매우 많다면 리액트를 쓰면 안됩니다.

리액트 나왔던 2013년쯤 당시엔 브라우저의 html 조작성능이 쓰레기라

리액트가 Virtual DOM 이런 기술을 도입했고

이게 html 조작에 상대적으로 뛰어난 성능을 보였는데

요즘 브라우저는 Virtual DOM 안써도 html 조작성능이 괜찮습니다.

심지어 페이지에 많은 html을 집어넣을 경우

리액트가 다른프레임워크나 쌩자바스크립트보다 속도가 느리다는 벤치마크 결과가 많습니다.

하지만 취업하려면 리액트해야지 어쩔것임

한 페이지에 html 태그가 1만개 넘어서 성능이 이상하게 저하된다면

그냥 html 태그들을 페이지 여러개로 나눠놓는게 좋습니다.
