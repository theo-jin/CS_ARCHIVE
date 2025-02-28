# async와 await

## async 함수

- async는 function 앞에 위치 function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환, 프라미스가 아닌 것은 프라미스로 감싸 반환
- 함수 안에서 await를 사용할 수 있습니다.await는 async 함수 안에서만 동작

## await

- 프라미스 앞에 await 키워드를 붙이면 자바스크립트는 프라미스가 처리될 때까지 대기한다.
  (일반 함수엔 await을 사용할 수 없다.await는 최상위 레벨 코드에서 작동하지 않는다. async로 감싸줘야한다.)

- 결과는 그 이후 반환.처리가 완료되면 에러가 발생하느냐 아니냐에 따라 동작이 달라진다.

- 에러 발생시 – 예외가 생성됨(에러가 발생한 장소에서 throw error를 호출한 것과 동일함)

```ts
async function f() {
  await Promise.reject(new Error('에러 발생!'));
}
//위 코드는 아래 코드와 동일합니다.
async function f() {
  throw new Error('에러 발생!');
}
```

- 에러 미발생시 – 프라미스 객체의 result 값을 반환

async/await를 함께 사용하면 읽고, 쓰기 쉬운 비동기 코드를 작성할 수 있다.

async/await을 사용하면 await가 대기를 처리해주기 때문에 .then이 거의 필요하지 않습니다. 여기에 더하여 .catch 대신 일반 try..catch를 사용할 수 있다는 장점도 생긴다.

하지만 가끔 가장 바깥 스코프에서 비동기 처리가 필요할 때같이 promise.then/catch를 써야만 하는 경우가 생기기 때문에 async/await가 프라미스를 기반으로 한다는 사실을 알고 계셔야 합니다.

여러 작업이 있고, 이 작업들이 모두 완료될 때까지 기다리려면 Promise.all을 활용할 수 있다는 점도 알고 계시기 바랍니다.

## Reference

https://ko.javascript.info/async-await
