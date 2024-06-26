## AJAX란?

서버에 GET, POST 요청을 할 때 새로고침 없이 데이터를 주고받을 수 있게 도와주는 간단한 브라우저 기능을 AJAX라고 합니다.

그거 쓰면 새로고침 없이도 쇼핑몰 상품을 더 가져올 수도 있고 새로고침 없이도 댓글을 서버로 전송할 수도 있고 그런 기능을 만들 수 있다.

AJAX로 GET/POST요청하려면 방법 3개 중 택1 하면 됩니다.

1. XMLHttpRequest라는 옛날 문법 쓰기

2. fetch() 라는 최신 문법 쓰기

3. axios 같은 외부 라이브러리 쓰기

이번에는 axios를 사용하여 진행해본다.

터미널 열어서

```
npm install axios
```

로 설치한다.

## AJAX 요청하는 법

버튼누르면 제가 만든 서버로 ajax 요청을 해보자.

https://codingapple1.github.io/shop/data2.json 이 URL로 GET요청을 하면 상품 3개를 가져와줍니다.

여기로 요청해봅시다.

```ts
import axios from 'axios';

function App() {
  return (
    <button
      onClick={() => {
        axios
          .get('https://codingapple1.github.io/shop/data2.json')
          .then((결과) => {
            console.log(결과.data);
          })
          .catch(() => {
            console.log('실패함');
          });
      }}
    >
      버튼
    </button>
  );
}
```

1. axios를 쓰려면 상단에서 import해오고

2. axios.get(URL) 이러면 그 URL로 GET요청이 됩니다.

3. 데이터 가져온 결과는 결과.data 안에 들어있습니다.

그래서 위의 버튼 누르면 서버에서 가져온 데이터가 콘솔창에 출력됩니다.

4. 인터넷이 안되거나 URL이 이상하면 실패하는데

실패했을 때 실행할 코드는 .catch() 안에 적으면 된다.

## 예제)

버튼을 누르면 서버에서 상품데이터 3개를 가져와서

메인페이지에 상품카드 3개를 더 생성해봅시다.

(팁) 리액트에선 html을 3개 더 생성해주세요~라고 코드짜지 않는다고 했습니다.

state 조작하면 html 알아서 생성될걸요
서버에서 데이터 가져와서 상품 html 3개 생성하라고 했는데

1. 서버에서 데이터 가져와주세요

2. html 3개 더 만들어주세요

이렇게 코드 2개만 짜면 되겠군요 근데 1번은 저번시간에 해서 2번만 짜면 숙제 끝임

리액트에선 "html 3개 더 만들어주세요~" 이렇게 코드짜지 않습니다.

state 조작하면 알아서 html이 변경되도록 코드짠다고 했는데 지금도 shoes.map() 덕분에 shoes에 들어있는 자료 갯수만큼 html이 자동으로 생성되고 있어서

여러분은 그냥 state만 조작하면 됩니다.

"shoes라는 state에 자료 3개 추가해주세요~" 라고 코드짜면 html 알아서 3개 더 생성됩니다.

```ts
import axios from 'axios';

function App() {
  let [shoes, setShoes] = useState(어쩌구);
  return (
    <button
      onClick={() => {
        axios
          .get('https://codingapple1.github.io/shop/data2.json')
          .then((결과) => {
            let copy = [...shoes, ...결과.data];
            setShoes(copy);
          })
          .catch(() => {
            console.log('실패함');
          });
      }}
    >
      버튼
    </button>
  );
}
```

1. 점3개 이용해서 shoes의 사본을 만들었습니다. 근데 그 안에 ...결과.data 이것도 함께 뒤에 집어넣었습니다.

결과.data 출력해보면 [{4번상품}, {5번상품}, {6번상품}] 이게 나오기 때문에 ...결과.data 하면 { }, { }, { } 이것만 남을듯요

2. 그 다음에 그걸 shoes라는 state에 추가했습니다. 그럼 이제 버튼누르면 shoes라는 state는

[{ }, { }, { }, { }, { }, { }] 이렇게 되어있을듯요

그럼 이거에 맞게 상품 html도 알아서 6개가 잘 생성됩니다.

## POST요청 하는 법

```ts
axios.post('URL', { name: 'kim' });
```

이거 실행하면 서버로 { name : 'kim' } 자료가 전송됩니다.

완료시 특정 코드를 실행하고 싶으면 이것도 역시 .then() 뒤에 붙이면 됩니다.

동시에 AJAX 요청 여러개 날리려면

```ts
Promise.all([axios.get('URL1'), axios.get('URL2')]);
```

이러면 URL1, URL2로 GET요청을 동시에 해줍니다.

둘 다 완료시 특정 코드를 실행하고 싶으면 .then() 뒤에 붙이면 됩니다.

원래 서버와 문자자료만 주고받을 수 있음 object/array 이런거 못주고받습니다.

근데 방금만해도 array 자료 받아온 것 같은데 그건 어떻게 한거냐면

object/array 자료에 따옴표를 쳐놓으면 됩니다.

```ts
"{"name" : "kim"}"
```

이걸 JSON 이라고 한다.

JSON은 문자 취급을 받기 때문에 서버와 자유롭게 주고받을 수 있습니다.

그래서 실제로 결과.data 출력해보면 따옴표쳐진 JSON이 나와야하는데

axios 라이브러리는 JSON -> object/array 변환작업을 자동으로 해줘서

출력해보면 object/array가 나옵니다.

```ts
fetch('URL')
  .then((결과) => 결과.json())
  .then((결과) => {
    console.log(결과);
  });
```

쌩자바스크립트 문법인 fetch() 를 이용해도 GET/POST 요청이 가능한데

그건 JSON -> object/array 이렇게 자동으로 안바꿔줘서 직접 바꾸는 작업이 필요합니다.

마음에 들면 쓰도록 합시다.

자주묻는 질문 : ajax로 가져온 데이터를 html에 꽂을 때 왜 에러남?

1. ajax요청으로 데이터를 가져와서

2. state에 저장하라고 코드를 짜놨고

3. state를 html에 넣어서 보여달라고 <div> {state.어쩌구} </div> 이렇게 코드 짰습니다.

잘 될 것 같은데 이 상황에서 state가 텅 비어있다고 에러가 나는 경우가 많습니다.

이유는 ajax 요청보다 html 렌더링이 더 빨라서 그럴 수 있습니다.

state안에 뭐가 들어있으면 보여달라고 if문 같은걸 추가하거나 그러면 됩니다.

## 추가 예제

응용1. 버튼을 2번 누르면 7,8,9번 상품을 가져와서 html로 보여주려면?

여기로 GET요청하면 7,8,9번 상품 줍니다.

https://codingapple1.github.io/shop/data3.json

버튼을 몇번 눌렀는지 어디 변수나 state 같은 곳에 기록해둬도 되겠군요.

응용2. 버튼을 3번 누르면 더 상품이 없다고 안내문을 띄우려면?

아니면 버튼을 숨기거나 그래도 되겠군요.

응용3. 버튼을 누른 직후엔 "로딩중입니다" 이런 글자를 주변에 띄우고 싶으면?

그리고 요청이 성공하거나 실패하거나 그 후엔 "로딩중입니다" 글자를 제거해야합니다.
