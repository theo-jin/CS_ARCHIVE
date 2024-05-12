다크모드 기능을 만들어봅시다.

버튼누르면 배경색 등이 까만색으로 변하면 끝입니다.

물론 CSS에서 쓸 수 있는 속성 중에 prefers-color-scheme 쓰면 자동으로 OS 테마에 맞춰서 CSS 적용해주는데

유저가 자유자재로 전환도 할 수 있어야하지 않겠습니까

그러니까 다크모드 버튼과 기능을 만들어봅시다.

기능정의

리액트 기초강의에서 귀에 피나게 설명한게 있었는데

리액트에서 동적인 UI 만들려면 남의 코드 따라치는게 아니라

이런 스텝으로 코드짜면 알아서 뭐든 만들 수 있다고 했습니다.

1. state 만들고 거기에 현재 UI의 상태를 저장해둠

2. state에 따라서 UI가 어떻게 보일지 코드짜두기

3. 원할 때 state 변경만 해주기

이러면 끝임

그럼 다크모드 만드는 법은

1. state 하나 만들어두고 현재 다크모드인지 라이트모드인지 여부를 저장해둠

2. state가 다크모드면 배경까매지는 CSS class 부착하라고 코드짜놓으면 끝입니다.

3. 그럼 이제 원할 때 state 변경만 해주면 다크모드/라이트모드 마음대로 전환이 가능합니다.

let [mode, setMode] = useState('light')

<body className={state가 'dark'인 경우 까매지는 클래스명 부착해주세요~~}>
<button onClick={()=>{ setMode('dark') }}>다크모드</button>

▲ 이런 식으로 layout.js를 대충 꾸미면 기능개발 끝입니다.

왜 layout.js냐면 <body>태그에 스타일같은거 추가해야 모든 곳을 까맣게 칠할 수 있지 않겠습니까

그럼 아무튼 layout.js를 client component로 만들고 거기에 useState도 써야할듯 합니다.

하지만 그 경우 단점이 있는데

- state는 영구저장이 안됩니다. 새로고침시 리셋됩니다.

- state 변경함수는 server component, client component 간에 자유롭게 전달하기 어렵습니다.

- client component로 만드는 경우 server component의 캐싱기능이라든지 그런게 사용 불가능해집니다.

가장 큰 이유는 state는 새로고침시 리셋된다는 것인데

그래서 새로고침시 다크모드같은게 풀리면 유저들이 싫어할 것 같습니다.

해결책은 state말고 DB에 다크모드 여부를 영구저장해두는 것이지만

데이터를 더 간단하게 보관하고 싶으면 브라우저 저장공간을 활용해도 좋습니다.

방법 1. localStorage

브라우저 저장공간 중에 localStorage라는 곳이 있습니다.

크롬 개발자도구 Application 탭 들어가면 구경가능함

- 문자나 숫자데이터를 저장할 수 있고

- 사이트마다 5MB의 저장공간이 주어지고

- 유저가 브라우저 청소를 하지 않는 이상 반영구적으로 데이터를 저장가능합니다.

localStorage.setItem('자료이름', '값')
localStorage.getItem('자료이름')
localStorage.removeItem('자료이름')
이런 자바스크립트 코드로 각각 자료입력, 출력, 삭제가 가능합니다.

참고로 object, array도 JSON으로 변환하면 저장가능합니다.

'use client'

function 컴포넌트(){

useEffect(()=>{
if (typeof window != 'undefined') {
let res = localStorage.setItem('이름', 'kim')
}
},[])

return (생략)
}
당연히 자바스크립트 문법이기 때문에 client component에서만 사용가능합니다.

다만 사용시 if (typeof window != 'undefined') 으로 체크한 다음 사용해줘야합니다.

client component도 최대한 서버에서 미리 실행할거 실행하고 html도 렌더링해서 보내주려고 하는데

서버측에서 localStorage 문법을 발견하면 실행이 안되니 에러가 나서 그렇습니다.

그래서

1. 현재 다크모드인지 라이트모드인지 상태를 localStorage에 저장해두고

2. localStorage 안에 있던 내용이 다크면 까매지는 class 부착하라고 코드짜놓기

하면 되는데 심각한 단점이 하나 있습니다.

useEffect에 넣어서 사용해야하는데 useEffect는 html 보여준 다음에 실행되는게 문제입니다.

아마 그래서 위처럼 코드짜면 localStorage에 '다크' 를 저장해놨다고 해도

라이트모드부터 보여주고 1초 후에 다크모드가 될듯요

방법 2. cookie

브라우저에 Cookie 저장소라는 것도 있습니다.

크롬 개발자도구 Application 탭 들어가면 저장된 Cookie 구경 가능함

Cookie는 브라우저에 저장해둘 수 있는 짧은 문자열이고

- 사이트 하나 당 최대 50개, 총합 4kb까지의 문자데이터를 저장할 수 있습니다.

(요즘 브라우저들은 이걸 초과해서 저장해도 봐줌)

- 유효기간을 설정해줄 수 있습니다. 유효기간 지나면 자동으로 삭제됨

- 서버로 GET, POST 등 요청시 자동으로 서버로 전달됩니다.

document.cookie = '쿠키이름=값'
자바스크립트로 이렇게 코드짜면 쿠키 생성이 가능합니다.

귀찮으니까 크롬 콘솔창에서 입력해서 생성되나 확인해봅시다.

document.cookie = '쿠키이름=값; max-age=3600'
max-age=3600 이런 식으로 쿠키의 유효기간을 초 단위로 설정할 수 있습니다.

위 코드 실행하면 24시간 후 쿠키가 삭제됩니다.

- 크롬에선 쿠키 유효기간으로 최대 400일까지만 넣을 수 있습니다.

- 유효기간 안넣는 경우 브라우저 종료시 쿠키는 자동삭제됩니다.

- 값들 사이에 ; 기호로 구분합니다.

import { cookies } from 'next/headers'

export default function 서버컴포넌트(){
let result = cookies().get('쿠키이름')
console.log(result)
}
가장 유용한 점은 server component나 서버 api 에서 쉽게 읽을 수 있다는 것입니다.

쿠키는 GET, POST 등 요청시마다 서버로 전달되어서 그렇습니다.

그래서 브라우저에 저장한 데이터를 DB 데이터처럼 html 렌더링 전에 바로 읽고 싶다면 cookie란에 보관해둬도 됩니다.

그래서 서버사이드렌더링할 때 쿠키같은게 유용합니다.

Cookie의 단점은

단순 문자열만 저장할 수 있다보니까 너무 길고 복잡한 데이터는 보관하기 불편할 수 있고

항상 GET, POST 요청마다 전달되니 쓸데없는 네트워크 호스팅 비용도 늘어나는게 단점입니다.

하지만 지금은 문자 몇개 전달하는 수준이라 그런건 딱히 부담없습니다.

오늘의 결론 :

1. 자바스크립트 잘해야 Next.js도 잘합니다.

2. 실은 자바스크립트 말고 cookie, localStorage 같은 브라우저 API도 많이 알아야 개발을 잘합니다.

3. state나 변수를 영구보관하고 싶으면 DB에 넣어두면 되는데

사소하고 귀찮은 것들은 localStorage 또는 cookies 저장공간을 사용해도 반영구적으로 보관가능

아무튼 다음 시간에 쿠키를 이용해서 다크모드 여부를 저장해볼 것인데

자신있으면 위에서 설명한 동적인 UI만드는 스텝 참고해서 알아서 해보고

의존성 겁쟁이들은 다음강의나 눌러봅시다.

참고)

document.cookie = 'mode=dark; max-age=' + (3600 _ 24 _ 400) + 'path=/'

쿠키생성시 뒤에 path를 적으면 원하는 /URL 접속시에만 해당 쿠키를 전송할 수 있는데

특정 페이지에서는 서버로 쿠키전송이 안되면 path=/ 도 추가합시다.

진짜로 다크모드 버튼과 기능을 만들어봅시다.

저번시간에 따르면

1. 현재 UI 상태 적어둘 cookie 만들기

2. cookie 값에 따라서 UI 어떻게 보여줄지 작성하기

3. 필요할 때 cookie 값 변경하기

이거 그대로 코드짜면 됩니다.

0. 일단 다크모드 버튼부터 만들기

▲ 보이는게 있어야 코드짤 맛이 나니까 다크모드 전환해주는 버튼부터 상단바에 만들어봅시다.

onClick 같은거 넣어야할 것 같으니 client component로 만들어서 넣어야겠군요.

(DarkMode.js)

'use client'

export default function DarkMode(){
return (
<span onClick={()=>{ }}>🌙</span>
)
}
파일만들어서 이렇게 코드짜고 상단바 안에 <DarkMode/> 컴포넌트를 집어넣었습니다.

1. 현재 UI 상태 적어둘 cookie 만들기

지금 라이트모드인지 다크모드인지 적어둘 cookie 하나 만들어주면 됩니다.

cookie 생성은 자바스크립트로 해야하기 때문에 useEffect안에 적으면 적절하겠군요.

물론 서버에서 강제로 쿠키를 만들어서 보내는 문법도 있는데 서버 API를 쓰거나 middleware를 사용해도 쿠키생성이 가능합니다.

그런거 좋아하면 찾아봅시다.

'use client'
import { useEffect } from "react"

export default function DarkMode(){
useEffect(()=>{
document.cookie = 'mode=light; max-age=' + (3600 _ 24 _ 400)
},[])
return (
<span onClick={()=>{ }}> 🌙 </span>
)
}
이 컴포넌트 로드시 쿠키생성하라고 코드짜놨습니다.

근데 그러면 새로고침할 때 마다 mode=light 라는 쿠키가 계속 생성될텐데

"mode라는 쿠키가 이미 있으면 새로 생성하지 마쇼" 라는 코드도 추가하면 좋을 것 같군요.

'use client'
import { useEffect } from "react"

export default function DarkMode(){
useEffect(()=>{
let 쿠키값 = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
if (쿠키값 == '') {
document.cookie = 'mode=light; max-age=' + (3600 _ 24 _ 400)
}
},[])
return (
<span onClick={()=>{ }}> 🌙 </span>
)
}
특정 이름의 쿠키하나가 있는지 확인하려면 매우 길고 귀찮은 코드를 짜야합니다.

저런 이상한 코드를 실행하면 그 자리에 mode라는 이름의 쿠키값이 출력됩니다.

그래서 mode라는 쿠키 출력했을 때 빈칸인 경우에만 쿠키만들라고 코드짜봤습니다.

2. cookie 값에 따라서 UI 어떻게 보여줄지 작성하기

쿠키에 있던 값이 light인 경우 아무것도 안해도 되겠지만

dark인 경우 배경 까만색으로 칠하라고 코드짜면 됩니다.

style 속성 넣는 것 보다는 class 집어넣는게 편하다고 했으니까 class 추가해줍시다.

(layout.js)

import { cookies } from 'next/headers'

export default async function RootLayout({ children }) {
let cookie = cookies().get('mode')

return (
<html>
<body className={
cookie != undefined && cookie.value == 'dark'
? 'dark-mode'
: ''
}>
(생략)
</html>
)
}
서버컴포넌트에선 cookies() 쓰면 쿠키값 출력이 쉽게 가능합니다.

cookie.value가 'dark'로 되어있으면 'dark-mode' 클래스명 넣으라고 코드짜봤습니다.

(globals.css)

.dark-mode .navbar {
background: #222;
}
.dark-mode .navbar a {
color: white;
}
그리고 .dark-mode라는 클래스명 쓰면 어떻게 까맣게 칠할 것인지도 알아서 결정해봅시다.

3. 필요할 때 cookie 값 변경하기

보통 다크모드 버튼은 누를 때 마다 dark모드 / light 모드로 번갈아가며 바뀌는데

그럼 버튼눌렀을 때

cookie 값이 dark면 cookie 값을 light로

cookie 값이 light면 cookie 값을 dark로

바꿔주면 됩니다.

(DarkMode.js)

<span onClick={()=>{

      let 쿠키값 = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
      if (쿠키값 == 'light') {
        document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
      } else {
        document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
      }

}}> 🌙 </span>
Q. 근데 cookie 바꿨는데 class명은 안변하는데요?

- cookie는 바꿨다고 html이 자동으로 재렌더링되지 않습니다.

html 재렌더링하고 싶으면 1. 새로고침하거나 2. state변경하면 됩니다.

근데 state 변경은 그 state가 들어있는 컴포넌트만 새로고침해줌

'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DarkMode(){
let router = useRouter()

useEffect(()=>{
let 쿠키값 = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
if (쿠키값 == '') {
document.cookie = 'mode=light; max-age=' + (3600 _ 24 _ 400)
}
},[])

return (
<span onClick={()=>{
let 쿠키값 = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
if (쿠키값 == 'light') {
document.cookie = 'mode=dark; max-age=' + (3600 _ 24 _ 400)
router.refresh()
} else {
document.cookie = 'mode=light; max-age=' + (3600 _ 24 _ 400)
router.refresh()
}
}}> 🌙 </span>
)
}
▲ 그래서 새로고침해주는 router.refresh() 를 사용해봤습니다.

아무튼 이러면 이제 버튼을 누를 때 마다 쿠키도 변경되고 새로고침됩니다.

오늘의 응용 :

1. 지금 다크모드면 버튼이 '☀️' 글자로 바뀌고

지금 라이트모드면 버튼이 '🌙' 글자로 바뀌는 기능도 만들어봅시다.

2. 지금 쿠키 꺼내는 코드를 매우 자주 사용하고 있군요.

state에 저장해서 쓰거나

부모 컴포넌트에 있는 쿠키를 props로 보내거나 그런 방법도 생각해봅시다.
