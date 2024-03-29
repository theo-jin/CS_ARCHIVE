# Webpack, Babel, Polyfill

## Webpack이란?
```
Webpack은 JavaScript 모듈 번들러로 JavaScript 파일을 포함한 에셋을 컴파일, 번들링 하는 데 사용됩니다. 명령어 환경(CLI) 또는 Webpack 구성 파일을 통해 Webpack을 사용할 수 있습니다.
```

웹팩(Webpack)은 모듈을 번들시켜주는 역할을 한다. 빌드라는 과정을 통해 하나의 파일로 만들어 주는데,빌드란 소스코드 파일을 실행가능한 소프트웨어 산출물로 만드는 과정으로 컴파일, 배포 등의 과정이 있다.즉, 여러 개로 퍼져있는 파일들을 하나로 번들링 하는 데에(묶는 데에) 사용이 된다고 볼 수 있습니다

바벨을 사용하려면 Node.js가 되어있어야 하고 터미널에서 웹팩 관련된 것들을 설치해준다.

모듈을 통해 개발하고 배포할 때 사용자들에게 빠르게 전달을 하기 위해 많은 모듈들을 하나의 파일로 묶어서 제공을 할 수 있습니다. 그렇게 되면 사용자가 요청하는 파일의 수는 적어지기 때문에 사용자 경험도 훨씬 개선이 됩니다. 하나로 모듈을 묶는 작업을 번들링이라 하고, 여러 개의 파일을 하나로 묶어주는 도구를 모듈 번들러라 하고 합니다. 그리고 대표적인 모듈 번들러로 웹팩이 있습니다.

웹팩의 장점은 아래와 같다.

- 서드파티 라이브러리 관리, CSS 전처리, 이미지 에셋 관리 유리
- 코드 스플리팅에 있어 롤업과 파셀이 더 뛰어나지만 안정성이 높아 코드 스플리팅이 활성화된 단계에서는 빌드 시간이 웹팩이 가장 빠름
- 웹 애플리케이션에서 사용하는 CSS나 이미지 에세들을 JS 코드로 변환하고 이를 분석해서 번들링
- 구성이 복잡하고 설정할 게 많음
개발 서버가 뛰어남 라이브리로딩, HMR 기능 지원
webpack-dev-server 플러그인 설치시 동작
트리 쉐이킹 지원 but commonJS to ES6, 별도의 플러그인 설치 필요

### Rollup
- ES6 모듈 형식으로 빌드 결과물을 출력할 수 있어 라이브러리나 패키지 개발에 활용이 가능하다.
- 웹팩과 파셀과 달리 자체 로더가 아닌 ES6 모듈을 기본으로 한다.
- 코드 스플리팅에 강점을 가지며 중복 제거에 특화되어 있고 특히 entry point가 여러 개 있을 경우 이 부분이 두드러진다.
- 웹팩에 대한 최소한의 대안이며 소규모 프로젝트에 적합하다.
- 규모가 커질수록 설정이 복잡해진다.
### Pacel
- zero-configuration으로 설정없이도 동작하며 빌드를 위해 번들러를 학습하는 시간을 줄일 수 있음
- javascript 엔트리 포인트를 지정해주는 것이 아닌 애플리케이션 진입을 위한 HTML 파일을 읽어 나가며 js, css, image asset 등을 직접 참조함
- ES6, commonJS 모듈 모두에 대해 트리 쉐이킹을 지원한다.
- HMR 지원

## Babel이란?
 
```
컴파일(Compile)은 주어진 language로 작성된 컴퓨터 프로그램을 다른 언어의 동등한 프로그램으로 변환하는 프로세스입니다.
```
바벨은 자바스크립트 컴파일러로 새로운 방식의 자바스크립트로 개발 후,

배포할 때에는 예전 방식의 자바스크립트로 변환해서 배포하려고 쓴다.

최신 버젼의 자바스크립트가 실행이 안되는 구버젼 웹브라우저를 대응하기 위해서이다.

ES6 코드를 ES5 코드로 변환해주는 일에서 리액트의 JSX문법, 타입스크립트, 코드 압축, Proposal 까지 처리해준다.




##  Polyfill이란?
 
크로스 브라우징 문제를 해결해 주는 기술 

폴리필(Polyfill)은 최신 ECMAScript 환경을 만들어 준다. 바벨은 ES6 => ES5로 변환할 수 있는 것들만 변환을 하는데,

ES6에서 비동기 처리를 위해 등장한 Promise와 같이 ES5에서 변환할 수 있는 대상이 없는 경우 에러가 발생한다.

이러한 경우 우리는 Polyfill을 이용해서 이슈를 해결할 수 있다.

## Reference
https://iancoding.tistory.com/175

https://velog.io/@hozzijeong/WebPack%EA%B3%BC-Babel-%EA%B7%B8%EB%A6%AC%EA%B3%A0-Polyfill%EC%97%90-%EB%8C%80%ED%95%B4