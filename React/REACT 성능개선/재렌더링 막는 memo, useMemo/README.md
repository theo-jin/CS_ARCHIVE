# 재렌더링 막는 memo, useMemo

컴포넌트가 재렌더링되면 거기 안에 있는 자식컴포넌트는 항상 함께 재렌더링됩니다.이번에는 그 자식 컴포넌트의 재렌더링을 막는방법에 대해서 알아보자.

리액트는 그렇게 대충 무식하게 동작하는데 평소엔 별 문제가 없겠지만 자식컴포넌트가 렌더링시간이 1초나 걸리는 무거운 컴포넌트면 어쩔 것입니까.

부모컴포넌트에 있는 버튼 누를 때 마다 1초 버벅이는 불상사가 발생합니다.

그럴 땐 자식을 memo로 감싸놓으면 됩니다.

## 테스트용 자식 컴포넌트 하나 만들어보기

```ts

function Child(){
 console.log('재렌더링됨')
 return <div>자식임</div>
}

function Cart(){

 let [count, setCount] = useState(0)

 return (
   <Child />
   <button onClick={()=>{ setCount(count+1) }}> + </button>
 )
}
```

Cart 컴포넌트 안에 Child 컴포넌트를 만들었습니다.

그리고 버튼누를 때 Cart 컴포넌트가 재렌더링되게 만들어놨는데 이 경우 `<Child>` 이것도 재렌더링됩니다.

평소엔 별 문제가 없겠지만 `<Child>` 얘가 렌더링이 2초정도 걸리는 느린 컴포넌트면 어쩌죠?

그럼 버튼 누를 때 마다 버벅일것 같다.

그럴 땐 memo라는 함수를 쓰면 "꼭 필요할 때만 `<Child>` 컴포넌트 재렌더링해주세요" 라고 코드를 짤 수도 있습니다.

## memo()로 컴포넌트 불필요한 재렌더링 막기

memo() 써보려면 'react' 라이브러리로부터 import 해오시면 됩니다.

```ts
import {memo, useState} from 'react'

let Child = memo( function(){
console.log('재렌더링됨')
return <div>자식임</div>
})

function Cart(){

let [count, setCount] = useState(0)

return (
<Child />
<button onClick={()=>{ setCount(count+1) }}> + </button>
)
}
```

1. memo를 import 해와서

2. 원하는 컴포넌트 정의부분을 감싸면 됩니다.

memo의 원리는 props가 변할때만 재렌더링 해준다.

근데 컴포넌트를 let 컴포넌트명 = function( ){ } 이런 식으로 만들어야 감쌀 수 있습니다.

그럼 이제 memo의 원리대로 Child로 전송되는 props가 변하거나 그런 경우에만 재렌더링된다.

### Q. 어 그럼 memo는 좋은거니까 막써도 되겠네요?

memo로 감싼 컴포넌트는 헛된 재렌더링을 안시키려고 기존 props와 바뀐 props를 비교하는 연산이 추가로 진행된다.

props가 크고 복잡하면 이거 자체로도 부담이 될 수도 있다.

그래서 꼭 필요한 곳에만 사용하자.

비슷하게 생긴 useMemo 비슷한 useMemo라는 문법도 있는데 이건 그냥 useEffect와 비슷한 용도입니다.

컴포넌트 로드시 1회만 실행하고 싶은 코드가 있으면 거기 담으면 됩니다.

```ts
import {useMemo, useState} from 'react'

function 함수(){
return 반복문10억번돌린결과
}

function Cart(){

let result = useMemo(()=>{ return 함수() }, [state]) //state가 변화할때만 코드 실행

return (
<Child />
<button onClick={()=>{ setCount(count+1) }}> + </button>
)
}
```

1. 예를 들어서 반복문을 10억번 돌려야하는 경우

2. 그 함수를 useMemo 안에 넣어두면 컴포넌트 로드시 1회만 실행됩니다.

그럼 재렌더링마다 동작안하니까 좀 효율적으로 동작하겠죠?

useEffect 처럼 dependency도 넣을 수 있어서

특정 state, props가 변할 때만 실행할 수도 있습니다.

- useMemo와 useEffect 차이(실행 시점의 차이 )
  useEffect 는 html보여주는 거 다끝나면 실행
  useMemo는 렌더링 될때 실행.
