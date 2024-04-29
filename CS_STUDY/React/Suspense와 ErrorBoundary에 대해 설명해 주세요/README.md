## Suspense

Suspense를 이용하면 Loading 상태를 선언적으로 관리할 수 있다.
Suspense는 아직 렌더링이 준비되지 않은 컴포넌트가 있을때 로딩 화면을 보여주고 로딩이 완료되면 해당 컴포넌트를 보여주는 React에 내장되어 있는 기능 이를 이용해서 컴포넌트 렌더링을 어떤 작업이 끝날 때까지 잠시 중단시키고, 다른 컴포넌트를 먼저 렌더링할 수 있다.

`<Suspense>`를 사용하면 자식 컴포넌트가 로딩이 완료될 때까지 fallback UI를 표시할 수 있다.

### 핵심원리

컴포넌트는 가장 가까운 Parent에 위치한 Suspense에게 Promise를 throw합니다.
Promise의 상태가 pending인 경우에는 fallback props에 전달된 컴포넌트를 렌더링하고
Promise의 상태가 resolve가 되면, 해당 컴포넌트를 렌더링합니다.
Suspense를 사용한 경우

```ts
// MyPage.tsx
function MyPage() {
  const info = useUserInfo();

  return <div>{info.data.name}님 안녕하세요.</div>;
}
// App.tsx
<ErrorBoundary fallback={<MyErrorPage />}>
  // 에러 처리
  <Suspense fallback={<Loader />}>
    // 로딩 처리
    <MyPage />
  </Suspense>
</ErrorBoundary>;
```

Suspense를 사용한 경우엔 MyPage에서는 컴포넌트의 주된 목적인 "사용자가 필요한 정보"를 보여주기만 하면 된다.
데이터의 로딩과 에러 상태는 MyPage 컴포넌트를 사용하는 상위 컴포넌트에서 fallback 으로 처리할 수 있다.
이렇듯 Suspense, ErrorBoundary 를 사용하면 데이터 요청 상태에 따른 처리를 관심사의 분리와 함께 선언적으로 처리할 수 있다.

## ErrorBoundary

ErrorBoundary는 하위 컴포넌트 트리의 렌더링 중 발생한 에러를 감지하여 컴포넌트 트리 대신 폴백 UI를 보여줄 수 있는 컴포넌트다. 아래 컴포넌트에서 에러 발생 시 throw 하여 에러에 관한 책임을 Error Boundary가 갖도록 한다.

```ts
function Fetcher({ children }) {
  const dispatch = useDispatch();
  const { isLoading, error, data } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchComments);
  }, []);

  if (error) {
    throw error;
  }

  if (isLoading) {
    return <Loading />;
  }

  return children;
}
```

### 핵심 동작 원리

핵심 원리는 Suspense와 마찬가지로 하위 컴포넌트에서 throw된 에러를 catch합니다.
에러 catch가 가능한 이유는 class 컴포넌트의 생명주기 중 에러와 관련된 메서드 덕분이다.

#### getDerivedStateFromError

- 자식 컴포넌트에서 오류가 발생했을 때 호출됨
- 주의할 점은 에러를 throw 받은 시점인 render 단계에서 호출되기 때문에 side effects를 발생시키면 안된다.throw된 에러를 catch하고 return 한 값을 기반으로 setState를 실행합니다.
- 여기서 다음 렌더링에서 폴백 UI가 보이도록 에러에 관한 state를 업데이트할 수 있다.

#### componentDidCatch:

- render 이후의 side effects를 다루는 메서드입니다.
- 에러 로그 기록과 같은 추가적인 로직을 작성할 수 있다.

주의할 점은, 다음과 같은 에러는 포착할 수 없다.

이벤트 핸들러
비동기 코드 (setTimeout 또는 requestAnimationFrame 콜백)
SSR
자식 컴포넌트에서가 아닌 Error Boundary 자체에서 발생하는 에러

## Reference

https://enjoydev.life/blog/frontend/12-suspense-errorboundary#errorboundary%EC%9D%98-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC

https://velog.io/@shinoung2360/SuspenseErrorBoundary
