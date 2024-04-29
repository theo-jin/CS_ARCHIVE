# Redux-saga, Redux-Thunk의 차이

## 미들웨어란?

Redux의 모든 과정은 동기적으로 발생하기 때문에, 비동기 통신을 통해 받아 온 결과값으로 state를 업데이트 하기 위해서는 외부 미들웨어 라이브러리를 사용해야 한다.

리덕스 미들웨어는 액션을 디스패치 했을 때 리듀서에서 이를 처리하기 앞서 사전에 지정된 작업들을 실행한다.

미들웨어는 액션과 리듀서 사이 중간자라 볼 수 있다.

리듀서가 액션을 처리하기 전에 미들웨어가 할 수 있는 작업은 여러 가지가 있는데, 
전달받은 액션을 단순히 콘솔에 기록하거나,
전달 받은 액션 정보를 기반으로 액션을 아예 취소하거나, 
다른종류의 액션을 추가로 디스패치 할수 있다.


# Redux-saga, Redux-Thunk의 차이

**요약**
- Redux-Thunk: 비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어. 객체가 아닌 함수형태의 액션을 디스패치할 수 있게 해줌
- Redux-saga:Redux-Thunk 다음으로 가장 많이 사용되는 비동기 작업 관련 미들웨어 라이브러리, 특정액션이 디스패치 되었을때 정해진 로직에 따라 다른 액션을 디스패치 시키는 규칙을 작성하여 비동기 작업을 처리할 수 있게 해 준다. 

```
디스패치(dispatch)

디스패치는 스토어의 내장 함수 중하나, 디스패치는 '액션을 발생시키는 것' 이라고 이해하면 된다. dispatch함수는 dispatch(action) 와 같은  형태로 액션 객체를 파라미터로 넣어서 호출한다. 

이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태로 만들어줌. 
```
## Redux-thunk
thunk란 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것을 의미.

Redux에서는 기본적으로 action 객체를 dispatch하여 특정 action을 reducer에 전달. 그렇지만 Redux-thunk 미들웨어를 사용하면 action 객체 뿐만 아니라, thunk 함수를 만들어서 dispatch 할 수 있다.

즉 thunk 미들웨어에서는 action 안에 type과 payload 뿐만 아니라 API 요청이나 비동기 처리 로직도 들어갈 수 있다.기존의 동기적인 로직을 처리하는 방식과 크게 다르지 않게 비동기적인 로직을 처리할 수 있다.

## Redux-saga
```
보일러 플레이트,러닝커브가 있다. 

```
Redux-saga는 generator 기반으로 동작하는 middleware.
Redux-saga는 제너레이터 함수 문법을 기반으로 비동기 작업을 관리한다. Redux-saga는 우리가 dispatch하는 action을 모니터링해서 그에 따라 필요한 작업을 따로 수행하는 방식으로 동작한다.

Redux-saga를 설명하기 전에, 기본적으로 알아야 할 주요 함수들을 먼저 살펴보자. 'redux-saga/effects' 에는 다양한 util 함수들이 들어있다. 이 중에서 주로 사용되는 delay, call, put, takeEvery, takeLatest에 대해 살펴보자.

delay
파라미터로 넘긴 시간 만큼 delay 되었다가 다시 실행된다.

put
put을 이용하면 새로운 action을 dispatch 할 수 있다.

call
put이 action을 dispatch 해 준다면, call은 함수를 실행할 수 있다. 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인자이다.

takeEvery
특정 action 타입에 대하여 dispatch되는 모든 action들을 처리한다.

takeLatest
특정 action 타입에 대하여 dispatch된 가장 마지막 action만을 처리하는 함수이다. 즉 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다.





## 정리
두 middleware의 가장 큰 차이점은 redux-thunk는 action뿐만 아니라 함수를 dispatch 할 수 있게 해주는 미들웨어라면, redux-saga는 특정 action을 모니터링하고 있다가 action 발생 시 특정 작업을 하는 방식으로 진행된다는 점이다.


주된 차이점을 마지막으로 정리해 보면 다음과 같다.

redux-thunk는 함수를 만들어서 해당 함수에서 비동기 작업을 하고 필요한 시점에 해당 action을 dispatch한다.

redux-saga는 특정 action을 모니터링 하도록 하고, 그 action 발생시 이에 따라 제너레이터 함수를 실행하여 비동기 작업을 처리 후 action을 dispatch 한다.


## Reference
리액트를 다루는 기술

https://velog.io/@seeh_h/Redux-thunk-vs-Redux-Saga