# state 변경함수 사용할 때 주의점 : async

자바스크립트의 sync / async 관련 상식

자바스크립트는 일반적인 코드를 작성하면 synchronous 하게 처리됩니다. 번역하면 동기방식 이런데..

뭔소리냐면 코드 적은 순서대로 윗줄부터 차례로 코드가 실행된다는 뜻입니다.

실은 거의 모든 프로그래밍 언어들은 무조건 위에서 부터 한줄한줄 실행됩니다.

예를 들어

```ts
console.log(1 + 1);
console.log(1 + 2);
console.log(1 + 3);
```

이런 코드는 그냥 위에서부터 한줄한줄 잘 실행됩니다. 그니까 콘솔창에 2, 3, 4 순으로 출력된다는 소리입니다.

뭔가 당연한 소리를 하고 있습니다.

자바스크립트는 이상한 함수들을 사용하면 asynchronous 하게 코드실행이 가능합니다. 번역하면 비동기적인데

ajax, 이벤트리스너, setTimeout 이런 함수들을 쓸 때 그런 현상이 일어납니다.

이런 함수들은 처리시간이 오래걸립니다. ajax를 예로 들면 인터넷 상황이 안좋으면 코드 실행이 오래걸리겠죠? 10초도 걸릴 수 있습니다.

그래서 ajax 요청하는 코드들은 순차적으로 실행되지 않고 완료되면 실행됩니다.

예를 들어

```ts
console.log(1+1)
axios로 get요청하고나서 console.log(1+2) 실행해주셈~
console.log(1+3)
```

이런 코드는 2, 4가 바로 출력되고 그 다음에 3이 출력됩니다.

3을 출력하는 코드가 asynchronous 처리를 지원하는 코드라 그렇습니다.

3을 출력할 때 오래걸리면 완료될 때 까지 잠깐 보류했다가 다른 코드를 먼저 실행시킨다는 소리입니다.

심지어 ajax요청이 0.00초 걸려도 2, 4가 먼저, 그 다음 3이 출력됩니다.

물리적으로 잠깐 처리가 보류되어서 그렇습니다.

자바스크립트라는 언어의 특징이자 장점이라고 볼 수 있겠습니다.

(asynchronous 처리를 지원하는 함수들을 써야 이런 식으로 동작합니다)

리액트의 setState 함수 특징

리액트로 state 만들 땐 이렇게 합니다.

```ts
function App() {
  let [name, setName] = useState('kim');
}
```

그리고 이제 setName을 사용하시면 name이라는 state를 자유롭게 변경가능합니다.

setName('park') 이런 식으로 하면 변경된다는 겁니다.

근데 문제는 setName() 같은 state 변경함수들은 전부 asynchronous (비동기적) 으로 처리됩니다.

그니까 setName()이 오래걸리면 이거 제껴두고 다른 밑에 있는 코드들부터 실행한다는 겁니다.

그래서 뭔가 예상치 못한 문제가 생길 수 있습니다.

예제 : 버튼을 누르면 2개 기능을 순차적으로 실행하고 싶습니다.

```ts
function App() {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  return (
    <div>
      <div>안녕하십니까 전 {age}</div>
      <button>누르면한살먹기</button>
    </div>
  );
}
```

위와 같은 코드가 있다고 칩시다.

여러분도 한번 그대로 따라적어보십시오. 그리고 하단처럼 기능개발해보십시오.

버튼을 누를 때마다

(1) count라는 state를 +1 해야합니다. (버튼누른 횟수 기록용)

(2) age라는 state도 +1 해야합니다.

(3) 근데 count 가 3 이상이면 더 이상 age라는 state를 1 더하지 말도록 코드를 짜십시오.

버튼 3번 이상 누르면 (count가 3 이상이면) 나이를 그만더하라는 기능입니다. 그니까 22살에서 멈춰야합니다.

이거 코드 어떻게 짜면 되죠?

버튼에다가 onClick 열고 짜면 될 것 같은데 빨리 짜보십시오.

저는 이렇게 짰습니다. 잘 되는 것 같지만 뭔가 이상합니다.

```ts
<button
  onClick={() => {
    setCount(count + 1);
    if (count < 3) {
      setAge(age + 1);
    }
  }}
>
  누르면한살먹기
</button>
```

1. 버튼을 누르면 count를 +1 해줍니다. 버튼누른 횟수 기록용이니까요.

2. 그리고 만약에 count라는게 3회보다 적으면 age를 +1 해줍니다.

끝입니다. 그러면 아마 count라는게 2일 때 까지 실행해주니까

age는 20에서 22가 되면 더이상 증가하지 않고 멈추겠군요.

근데 23까지 증가하는데얌?

뭔가 이상합니다.

분명 count가 2일 때까지만 age를 +1 해주라고 했습니다.

count가 1일 때 age +1

count가 2일 때 age +1

count가 3이면 age +1 하지마 이런 코드니까요.

근데 지금은 count가 3일 때도 age +1를 해주고 있는 듯 합니다.

왜죠?

이유는 위에서 제가 말한 async라는 특징 때문에 그렇습니다.

state 변경함수는 async 하게 처리되는 함수기 때문에 완료되기까지 시간이 오래걸리면 제쳐두고 다음 코드를 실행해줍니다.

그래서 코드를 해석해보자면

① 버튼을 세번째 누르면 setCount(count+1); 이걸 실행해서 count를 3을 만들어줍니다.

② 근데 count를 3으로 만드는건 오래걸리니까 제껴두고 if ( count > 3 ) {} 이걸 실행합니다.

③ 이 때 count는 아직 2라서 if문 안의 setAge(age+1)이 잘 동작하고 있는겁니다.

이 모든 문제는 setCount()가 async 함수라서 그렇습니다.

async함수는 오래걸리면 제껴두고 다음 줄 코드부터 실행하니까 그렇습니다.

그래서 저렇게 state1 변경하고나서 state2를 변경하는 코드를 작성할 땐 가끔 문제가 생깁니다.

이걸 정확히 sync스럽게, 순차적으로 실행하고 싶을 때 해결책은 useEffect입니다.

useEffect를 잘 작성하면 특정 state가 변경될 때 useEffect를 실행할 수 있다고 하지 않았습니까.

알아서 해결해보십시오.

## 해설

App 컴포넌트안에 useEffect를 만들어봅니다.

```ts
useEffect(() => {}, [count]);
```

useEffect는 컴포넌트가 렌더링/재렌더링될 때 실행되는 함수랬습니다.

근데 뒤에다가 [] 대괄호안에 state를 집어넣으면

state가 변경되면 이 코드 실행해주세요~ 라는 뜻으로도 사용가능합니다.

그래서 이거 쓰시면 아까 말했던 문제를 해결할 수 있습니다.

1. count라는 state가 변경되고나서 2. age도 변경해주세요~ 이런 식으로 순차적으로 코드를 실행할 수 있다는 것입니다.

① 그래서 일단 버튼을 이렇게 변경했습니다.

```ts
<button
  onClick={() => {
    setCount(count + 1);
  }}
>
  누르면한살먹기
</button>
```

count라는 것만 +1 되게 바꿨습니다.

② 그 다음에 나머지 age를 +1 하는 코드는 useEffect안에 개발해놨습니다.

```ts
useEffect(() => {
  if (count < 3) {
    setAge(age + 1);
  }
}, [count]);
```

이런 식입니다.

그러면 useEffect는 count라는 state가 변경되고나서 실행이 되며

그럼 if문으로 count라는 state값을 제대로 의도대로 측정해볼 수 있는 겁니다.

③ 근데 문제는 useEffect 저렇게 써도 처음 페이지 로드될 때도 한번 실행이 되기 때문에 의도치 않은 버그가 발생할 수 있습니다.

그래서 처음 페이지 로드시 useEffect 실행을 막는 코드를 알아서 검색해서 적용하셔도 되고

아니면 count라는 state를 또 활용하셔도 됩니다.

count가 0일 때는 (페이지 처음 로드되었을 때는) 내부 코드를 동작시키지 않으면 될듯요

```ts
useEffect(() => {
  if (count != 0 && count < 3) {
    setAge(age + 1);
  }
}, [count]);
```

이런 식입니다. count가 0이 아닐 때만 실행하라고 조건을 추가해줬습니다.

이제 버튼 누르면 22살까지만 잘 증가합니다.
