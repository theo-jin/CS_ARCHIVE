# 리액트에서 자주쓰는 if문 작성패턴 5개

## 1. 컴포넌트 안에서 쓰는 if/else

```ts
function Component() {
  if ( true ) {
    return <p>참이면 보여줄 HTML</p>;
  } else {
    return null;
  }
}
```

자바스크립트 if문은 return () 안의 JSX 내에서는 사용 불가능

```ts
function Component() {
  if ( true ) {
    return <p>참이면 보여줄 HTML</p>;
  } else {
    return null;
  }
}
```

## 2.JSX안에서 쓰는 삼항연산자

```ts
function Component() {
  return <div>{1 === 1 ? <p>참이면 보여줄 HTML</p> : null}</div>;
}
```

```ts
function Component() {
  return (
    <div>
      {1 === 1 ? (
        <p>참이면 보여줄 HTML</p>
      ) : 2 === 2 ? (
        <p>안녕</p>
      ) : (
        <p>반갑</p>
      )}
    </div>
  );
}
```

## 4.switch / case 조건문

```ts
function Component2() {
  var user = 'seller';
  if (user === 'seller') {
    return <h4>판매자 로그인</h4>;
  } else if (user === 'customer') {
    return <h4>구매자 로그인</h4>;
  } else {
    return <h4>그냥 로그인</h4>;
  }
}
```

```ts
function Component2() {
  var user = 'seller';
  switch (user) {
    case 'seller':
      return <h4>판매자 로그인</h4>;
    case 'customer':
      return <h4>구매자 로그인</h4>;
    default:
      return <h4>그냥 로그인</h4>;
  }
}
```
