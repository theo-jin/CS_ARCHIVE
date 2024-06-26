# 멋있게 컴포넌트 전환 애니메이션 주는 법 (transition)

Detail 컴포넌트 로드시 투명도가 0에서 1로 서서히 증가하는 애니메이션을 주려면?

컴포넌트 등장, 퇴장 애니메이션같은게 필요하면 라이브러리설치해서 써도 되겠지만 CSS 잘하면 간단한건 알아서 개발가능합니다.

옛날에 배웠던 useEffect 이런거 활용하면 되는데 CSS 애니메이션 처음인 분들을 위해 오늘도 정확한 개발스텝을 알려드립니다.

애니메이션 만들고 싶으면

1. 애니메이션 동작 전 스타일을 담을 className 만들기

2. 애니메이션 동작 후 스타일을 담을 className 만들기

3. transition 속성도 추가

4. 원할 때 2번 탈부착

이게 끝입니다. CSS 잘쓰면 모든 애니메이션 알아서 만들 수 있습니다.

저번에 만들었던 탭의 내용이 서서히 등장하는 fade in 애니메이션을 만들어봅시다.

## 1. 애니메이션 동작 전 2. 애니메이션 동작 후 className 만들기

```css
.start {
  opacity: 0;
}
.end {
  opacity: 1;
}
```

CSS 파일 열어서 이런거 추가하면 됩니다.

애니메이션 동작 전엔 투명도가 0, 동작 후엔 투명도가 1이 되면 좋을듯요

## 3. transition 추가

```css
.start {
  opacity: 0;
}
.end {
  opacity: 1;
  transition: opacity 0.5s;(transition은 애니메이션 주는 스타일 opacity가 변경될때 0.5초에 걸쳐서 변경해 주세요란 뜻)
}
```

transition은 "해당 속성이 변할 때 서서히 변경해주세요~" 라는 뜻입니다.

그럼 이제 원하는 <div> 요소에 start 넣어두고 end 를 탈부착할 때 마다 fade in이 됩니다.

```ts
function TabContent({ 탭 }) {
  return (
    <div className="start end">
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}
```

▲ end라는 className 떼었다가 붙여보면 진짜로 애니메이션이 동작합니다.

안보이면 저장을 안했거나 CSS파일이 import 안되어있는 것임

## 4. 원할 때 end 부착

이제 "버튼을 누를 때 마다 end를 저기 부착해주세요" 라고 코드짜면 애니메이션 동작합니다.

버튼누르면 end 부착하라고 코드짜려면 코드를 3번이나 짜야할듯요 버튼이 3개니까요.

그게 싫으면 useEffect 이런거 활용해봐도 됩니다.

useEffect 쓰면 특정 state 아니면 props가 변할 때 마다 코드실행이 가능하다고 했습니다.

그래서 "탭이라는 state가 변할 때 end를 저기 부착해주세요" 라고 코드짜도 같을듯

```ts
function TabContent({ 탭 }) {
  let [fade, setFade] = useState('');

  useEffect(() => {
    setFade('end');
  }, [탭]);

  return (
    <div className={'start ' + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}
```

탭이라는게 변할 때 end를 저기 부착하고 싶으면 동적인 UI 만드는 법 떠올리면 됩니다.

- fade라는 state 하나 만들고

- state에 따라서 className이 어떻게 보일지 작성하고

- 원할 때 fade를 변경했습니다.

이제 탭이라는 state가 변할 때 마다

fade라는 state가 'end'로 변하고

그럼 className="start end" 이렇게 변합니다.

이제 버튼 막 누르면 end가 부착되니까 애니메이션이 잘 보이겠군요

Q. 안보이는데요

내 의도와 다르게 동작하는건 개발자도구에서 검사해보면 됩니다.

end라는 클래스명을 부착하는게 맞긴 맞는데

실은 떼었다가 붙여야 애니메이션이 보입니다. end를 떼었다가 붙여보셈

```ts
function TabContent({ 탭 }) {
  let [fade, setFade] = useState('');

  useEffect(() => {
    setTImeout(() => {
      setFade('end');
    }, 100);
    return () => {
      setFade('');
    };
  }, [탭]);

  return (
    <div className={'start ' + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}
```

▲ 떼었다가 부착하라고 코드짜봤습니다.

clean up function 안에 fade라는 state를 공백으로 바꾸라고 했으니

useEffect 실행 전엔 'end'가 ' ' 이걸로 바뀝니다.

이제 잘될듯

Q. setTimeout 왜 씁니까

리액트 18버전 이상부터는 automatic batch 라는 기능이 생겼습니다.

state 변경함수들이 연달아서 여러개 처리되어야한다면

state 변경함수를 다 처리하고 마지막에 한 번만 재렌더링됩니다.

그래서 'end' 로 변경하는거랑 ' ' 이걸로 변경하는거랑 약간 시간차를 뒀습니다.

찾아보면 setTimeout 말고 flushSync() 이런거 써도 될 것 같기도 합니다. automatic batching을 막아줍니다.

오늘의 숙제 :

Detail 컴포넌트 로드시 투명도가 0에서 1로 서서히 증가하는 애니메이션을 주려면?

```ts
function Detail(props){

  let [fade2, setFade2] = useState('')

  useEffect(()=>{
    setFade2('end')
    return ()=>{
      setFade2('')
    }
  },[])

    return (
      <div className={'container start ' + fade2}>
      (하단 html 생략)
    )
}
```

1. start라는 className 만들고 부착했습니다

2. end라는 className 만들었습니다

3. transition도 강의처럼 추가했습니다. 이제 end라는거 붙였다 뗄 때 애니메이션 동작합니다.

4. 내가 원할 때 end를 떼었다가 붙이면 됩니다

- Detail 컴포넌트 로드시엔 'end'를 부착해주세요

- Detail 컴포넌트 삭제시엔 'end' 떼어주세요

라고 코드짰습니다.
