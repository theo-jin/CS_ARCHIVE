# Node+Express 서버와 React 연동

## 서버설치

1. 구글검색해서 nodejs 설치

2. 작업폴더만들고 에디터로 오픈

3. server.js 파일을 만들고 아래 코드 작성

```ts
const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function () {
  console.log('listening on 8080');
});
```

4. 터미널을 열어서 npm init -y 입력

5. npm install express 이것도 입력

리액트는 개발이 끝나면 build해야 html파일이 나옴

```
npm run build
```

그러면 build폴더에 리액트로 만든 html있음.

그리고 리액트 프로젝트폴더를 서버 프로젝트폴더안에 넣음 그리고 사이트 접속시 리액트로 만든 html보내주면 끝

```ts
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.listen(8080, function () {
  console.log('listening on 8080');
});
app.use(express.static(path.join(__dirname, '리액트로만든 html파일경로')));

app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});

//DB데이터 어떻게 리액트에서 보여줌???

app.get('/product', function (요청, 응답) {
  응답.json({ name: 'black shoes' }); //리액트파일에서 상품데이터 필요하면 /product로 GET요청하면 끝
});
//리액트 라우터를 쓰는경우 최하단에 이 코드 추가하는게 좋음 여기서 별표는 모든 경로
app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});
```

### DB데이터 어떻게 리액트에서 보여줌???

DB에 있는 상품목록을 가져와서 리액트에서 보여주고 싶으면

이런 식으로 코드를 짭니다.

1. 서버는 누군가 /product로 GET요청을 하면 DB에서 데이터 꺼내서 보내주라고 API를 짜놓습니다.

2. 리액트는 상품목록을 보여주고 싶을 때 서버 /product 주소로 GET요청 날리면 됩니다.

3. 그럼 데이터 받아오겠죠? 그걸 가지고 html에 집어넣든 맘대로 개발하면 됩니다.

그래서 리액트는 서버와의 통신은 거의 ajax로 진행합니다.

POST요청, 로그인해서 세션만들기 이런것도 ajax로 잘됩니다.

nodejs 서버파일 상단에

```ts
app.use(express.json());
var cors = require('cors');
app.use(cors());
```

이 코드 넣고 시작하셔야 리액트와 nodejs 서버간 ajax 요청 잘됩니다.
이거 쓰려면 서버프로젝트 터미널에서 npm install cors 설치해야합니다.
express.json() 은 유저가 보낸 array/object 데이터를 출력해보기 위해 필요하고
cors는 다른 도메인주소끼리 ajax 요청 주고받을 때 필요합니다.

## Q. 리액트프로젝트 코드 수정할 때 마다 build 작업을 해야하나?

그럴 필요 없습니다.

그건 나중에 사이트를 aws, google cloud 이런 곳에 발행할 때만 한 번 해주면 됩니다.

평소에 개발할 땐

리액트도 localhost로 미리보기 띄워놓고, 서버도 localhost로 미리보기를 띄워두고 개발 진행하면 별 문제 없습니다.

- 다만 리액트 -> 서버 ajax 요청시 /product 이렇게 말고 http://서버주소/product 잘 입력하고

- 서버에 cors 옵션 잘 켜놓으면 됩니다.

서버주소 입력하는게 귀찮으면

리액트에서 package.json이라는 파일을 열어서 proxy라는 부분 설정을

서버 미리보기 띄우던 localhost:어쩌구 주소로 설정해주면 됩니다.

그러면 리액트에서 ajax 요청 대충해도 localhost:어쩌구 주소로 ajax 요청을 알아서 보내줍니다.

https://create-react-app.dev/docs/proxying-api-requests-in-development/

이걸 참고합시다.

## 서브디렉토리에 리액트앱 발행하고 싶은 경우

지금 메인페이지가 리액트앱인데 그거 말고

/react 이렇게 접속하면 리액트로 만든 html

/ 이렇게 접속하면 public 폴더에 있던 그냥 main.html

보여주고 싶은 경우 어떻게 하냐면

```ts
server.js;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/react', express.static(path.join(__dirname, 'react-project/build')));

app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, 'public/main.html'));
});
app.get('/react', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, 'react-project/build/index.html'));
});
```

▲ server.js 라우팅을 이렇게 바꿔주고

```ts
(리액트프로젝트 내의 package.json)
{
  "homepage": "/react",
  "version": "0.1.0",
  ... 등
}
```

▲ 리액트 프로젝트 내의 package.json에 homepage라는 항목을

여러분이 발행을 원하는 서브디렉토리명으로 새로 기입해주면 됩니다.

그럼 방금 server.js 에서 /react 접속시 리액트 프로젝트보내고

/ 접속시 일반 html 파일 보내라고 했으니 정말 그렇게 됩니다.

딱히 쓸 일은 별로 없습니다.

## 여담

server-side rendering은 html을 서버가 만들어서 보내주는 겁니다.

nodejs 강의처럼

1. DB에서 데이터 뽑아서

2. 글목록.html 파일에 꽂아넣고

3. 그 html 파일을 서버에서 보내주는 것임

client-side rendering은 html을 리액트가 브라우저안에서 만드는 겁니다.

1. 리액트가 서버에 GET요청으로 DB데이터를 가져와서

2. 그걸 html로 만들어서 보여주는 것임
