# PWA(Progressive Web App)

웹사이트를 안드로이드/iOS 모바일 앱처럼 사용할 수 있게 만드는 일종의 웹개발 기술입니다

## PWA장점

1. 스마트폰, 태블릿 바탕화면에 여러분 웹사이트를 설치 가능합니다.

(저거 설치된 앱 누르면 상단 URL바가 제거된 크롬 브라우저가 뜹니다. 일반 사용자는 앱이랑 구분을 못함)

2. 오프라인에서도 동작할 수 있습니다.

service-worker.js 라는 파일과 브라우저의 Cache storage 덕분에 그렇습니다.

자바스크립트로 게임만들 때 유용하겠네요.

3. 설치 유도 비용이 매우 적습니다.

앱설치를 유도하는 마케팅 비용이 적게들어 좋다는 겁니다.

구글플레이 스토어 방문해서 앱 설치하고 다운받게 하는건 항상 매우 높은 마케팅비용이 듭니다.

근데 PWA라면 웹사이트 방문자들에게 간단한 팝업을 띄워서 설치유도할 수 있으니 훨씬 적은 마케팅 비용이 들고요.

그래서 미국에선 PWA를 적극 이용하고 있는 쇼핑몰들이 많습니다. 4. 푸시알림, 센서

## PWA 생성방법

```
 npx create-react-app 프로젝트명 --template cra-template-pwa
```

로 만들고 파일 2개를 사이트 로컬경로에 있으면 브라우저가 PWA로 인식합니다. (그리고 HTTPS 사이트여야합니다)

manifest.json과 service-worker.js 라는 이름의 파일 두개를 만든다.

## manifest.json 파일 살펴보기

build 하고 나면 build 폴더 내에 이 파일들이 있다.manifest.json 파일은 웹앱의 아이콘, 이름, 테마색 이런걸 결정하는 부분

```ts
{
  "version" : "여러분앱의 버전.. 예를 들면 1.12 이런거",
  "short_name" : "설치후 앱런처나 바탕화면에 표시할 짧은 12자 이름",
  "name" : "기본이름",
  "icons" : { 여러가지 사이즈별 아이콘 이미지 경로 },
  "start_url" : "앱아이콘 눌렀을 시 보여줄 메인페이지 경로",
  "display" : "standalone 아니면 fullscreen",
  "background_color" : "앱 처음 실행시 잠깐 뜨는 splashscreen의 배경색",
  "theme_color" : "상단 탭색상 등 원하는 테마색상",
}
```

그리고 이 파일은 웹앱에서 사용하는 모든 html 안에 이런 식으로 집어넣으면 된다.

```ts
<link rel="manifest" href="/manifest.webmanifest">
```

하지만 리액트에서 이런 설치는 알아서 했음.

## service-worker.js 살펴보기

service-worker.js 의 목적은 오프라인에서도 사이트를 열 수 있게 도와준다.
설치 방법은 파일들 중에 index.js 하단에 보면

```
serviceWorkerRegistration.unregister();
```

이 부분을

```
serviceWorkerRegistration.register();
```

이렇게 바꾸자.그럼 이제 yarn build / npm run build 했을 때 아까 그 manifest.json과 service-worker.js 파일이 자동으로 생성

그냥 쌩으로 service worker 파일을 만들고 싶다면 구글 공식 튜토리얼이나 크롬브라우저 권장 튜토리얼을 참고하자.
service worker 제작에 필요한 문법이 따로 있고 그걸 학습해야한다.

(공식 튜토리얼) https://developers.google.com/web/fundamentals/primers/service-workers

(샘플) https://googlechrome.github.io/samples/service-worker/basic/

## PWA구동확인

build된걸 VScode로 오픈해서 index.html미리보기 띄우거나 VScode 익스텐션에서 라이브 서버 돌리기.
또한 개발자도구의 Application에서 PWA설정확인이 가능하다.거기서 캐싱하고 있는거 확인 가능

### 기존의 프로젝트 PWA로 만들려면??

```
기존의 프로젝트 PWA로 만들려면??
>>그냥 새 PWA프로젝트 만들고 복붙해야한다.
1. 다른 폴더에 위 명령어를 이용해 프로젝트 새로 하나 만든 다음에

2. 기존 프로젝트의 App.js App.css index.js 이런 파일들을 새 프로젝트로 복붙하시면 됩니다.

여러분이 건드린 파일은 다 복붙하셈 근데 index.js 파일은 많이 바뀐점이 좀 있어서 차이점만 잘 복붙하시면 될듯합니다.

3. router, redux 이런 라이브러리를 설치했다면 그것도 새프로젝트에서 다시 설치하시면 됩니다.
```

그리고 파일들 중에 index.js 하단에 보시면

```
serviceWorkerRegistration.unregister();
```

이 부분을

```
serviceWorkerRegistration.register();
```

이렇게 바꾸면 끝 그럼 이제 yarn build / npm run build 했을 때 아까 그 manifest.json과 service-worker.js 파일이 자동으로 생성
