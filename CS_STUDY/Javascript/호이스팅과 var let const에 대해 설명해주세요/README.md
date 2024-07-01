# 호이스팅 일어나는 이유

JavaScript 호이스팅은 인터프리터가 코드를 실행하기 전에 함수, 변수, 클래스 또는 임포트(import)의 선언문을 해당 범위의 맨 위로 끌어올리는 것처럼 보이는 현상을 뜻한다.

## var, let, const

세 가지 모두 최상위로 호이스팅된다. 하지만 var 변수만 undefined(정의되지 않음)으로 초기화되고 let과 const 변수는 초기화되지 않는다. let 변수를 사용하려고 시도한다면 Reference Error(참조 오류)발생한다.

var와 let은 초기화하지 않은 상태에서 선언할 수 있지만, const는 선언 중에 초기화해야한다.

- Var : 전역 범위 또는 함수 범위(전체 윈도우),범위 내에서 업데이트 및 재선언할 수 있다
- let : 블록 범위,업데이트할 수 있지만, 재선언은 할 수 없다
- const : 블록 범위,업데이트와 재선언 둘 다 불가능

## 일시적 사각지대 ( Temporal Dead Zone(TDZ))는 무엇인가요?

선언 전에 변수를 사용하는 것을 비 허용하는 개념상의 공간

let과 const는 var와는 다르게 선언단계와 초기화 단계가 따로 분리되어 실행된다.
그래서 선언 단계와 초기화 단계 사이에서는 실행 컨텍스트에는 변수를 등록했지만 메모리가 할당되지 않은 상태라 ReferenceError 가 나오는 것이다.
이런 사각지대를 TDZ(Temporal Dead Zone) 라고 하는 것이다

변수가 먼저 선언이 된 경우, 초기화에 따라서 TDZ가 생깁니다. 특히 let,const와 var는 초기화 시점이 다릅니다. var는 암묵적으로 undefined로 초기화 된 상태에서 자바스크립트 코드를 읽기 때문에, TDZ에서 에러가 나지 않습니다.

## 함수 스코프 블록 스코프 
## 함수 표현식과 함수 선언식

https://velog.io/@jangwonyoon/%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85%EA%B3%BC-TDZ%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%B4%EA%B3%A0-%EC%96%B4%EB%96%A4-%EC%97%B0%EA%B4%80%EC%9D%B4-%EC%9E%88%EC%9D%84%EA%B9%8C%EC%9A%94

https://developer.mozilla.org/ko/docs/Glossary/Hoisting
