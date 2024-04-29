# SWR(stale-while-revalidate)이 무엇인가요?

데이터 가져오기를 위한 React Hooks

stale-while-revalidate 전략은 캐시(stale)로부터 데이터를 반환한 후, fetch 요청(revalidate)을 하고, 최종적으로 최신화된 데이터를 가져오는 전략인데 그것을 사용한 서버 상태 관리 라이브러리

## 특징

- 빠르고, 가볍고, 재사용 가능한 데이터 가져오기
- 내장된 캐시 및 요청 중복 제거
- 실시간 경험
- 전송 및 프로토콜에 구애받지 않음
- SSR / ISR / SSG 지원
- TypeScript 지원
- React Native

## SWR은 원격상태와 로컬상태를 하나로 통합.

SWR은 해당 데이터를 마치 원격상태와 연결된 데이터 스트림으로서 바라볼 수 있도록 데이터 fetching 단계를 추상화
SWR은 내부적으로 적절한 타이밍에 지속적으로 데이터를 업데이트해줍니다. 실시간은 아닐 수 있겠지만, 적절한 타이밍에 데이터를 폴링하기 때문에 최신상태를 유지

## SWR로 상태관리가 가능할까?

SWR은 상태관리용 라이브러리가 아닌 데이터 가져오기(fetch)용 라이브러리이다.

하지만, useSWR을 모듈화 하여 독립된 함수로 처리하면, 여러 컴포넌트들에서 필요한 상태를 가져와 사용할 수가 있으며,

이러한 컴포넌트간 전역 상태를 공유할 수 있다는 특성 덕분에 기존 상태관리 라이브러리를 대체할 수 있다.

## Q.리액트쿼리와 차이점은 무엇일까요?

SWR은 먼저 캐시에서 데이터를 반환한 다음, 서버에 데이터를 가져오는 요청을 보내고, 마지막으로 최신 데이터를 제공하는 전략이다.

swr자체의 인터페이스가 아니라 한번 랩핑한 라이브러리이기때문에 커스터마이징이나 동작을 예측하는데에 내부 구현을 파악해야하는 등기존 인터페이스에는 불편한 부분이 있었습니다.

React Query는 React 어플리케이션에 서버 상태를 가져오고, 캐싱하고, 동기화하고, 업데이트하는 것을 쉽게 해 준다.

​

### Provider의 유무

React-Query는 \_app 컴포넌트에 전용 Provider을 wrapping해줘야, 자식 컴포넌트에서 활용 가능한 반면, SWR은 그대로 fetching을 해주면 된다.

### fetcher 정의

useSWR, useQuery 모두 두 번째 인자로 fetcher를 받는다. 차이점이 있다면 SWR은 fetcher의 인자로 useSWR의 첫 번째 인자를 넘겨 주고, useQuery는 fetcher에 url을 직접 전달해야 한다는 점이다. 또한 SWR은 전역 설정을 통해 fetcher를 정해 둘 수 있지만, React Query는 항상 두 번째 인자에 fetcher를 넘겨 줘야 한다.

### Status

SWR은 isValidating을 이용해 상태를 표현하는 데 반해, React Query는 isLoading, isFetching을 통해 데이터의 상태를 보여 준다. 특히 isFetching은 첫 번째 로드를 제외한 데이터 업데이트 시의 상태를 나타내는 값으로 모든 데이터 로드 상태를 나타내는 isValidating과 구별된다.

### Mutation

SWR과 React Query는 모두 뮤테이션이라는 개념을 가지고 있다. 하지만 두 라이브러리에게 있어 이 개념은 다르게 작용한다. 둘 다 변형시킨다는 의미에서는 같지만, React Query의 뮤테이션은 post/patch/put/delete를 통해 서버의 상태를 변형시키는 것이고, SWR의 뮤테이션은 useSWR()을 통해 받아온 데이터를 클라이언트 사이드에서 변형시켜 업데이트해 주는 개념이다.

### Data Optimization

React Query는 렌더링 퍼포먼스 측면에서도 뛰어난 라이브러리다. 쿼리가 업데이트될 때만 컴포넌트를 업데이트한다. 또한 여러 컴포넌트가 같은 쿼리를 사용하고 있을 때는 한꺼번에 묶어 업데이트해 준다. 이 항목은 SWR에는 해당되지 않는다.

### Lagged Query Data

React Query는 다음 데이터를 불러오기까지 현재 데이터를 표시해 준다. 예를 들면 페이지네이션에서 다음 페이지를 불러오는 동안 보여 줄 데이터가 없을 때 현재 캐싱되어 있는 데이터를 자동으로 렌더링하는 것이다. 이는 페이지네이션에서 꽤 유용하게 사용된다. SWR이 기본적으로 지원하고 있는 기능은 아니지만 부가적인 코드 작성을 통해 구현 가능하다.

### 캐시관리

두 번째는 캐시 키 관리입니다. 앞서 보았듯이 swr의 경우에는 조건에 맞는 캐시를 한번의 invalidate로 갱신하기 위해서는 함수로 갱신해야합니다. (원래 사용하고있던 1.0에서는 지원하지 않았던 기능이기도 했습니다.)

react-query에서는 캐시를 invalidate하는 메서드에서 key를 배열로 받아 배열의 순서에 따른 동일성 체크를 수행합니다. 이때 키가 객체일때는 완벽하게 동일한지 체크하지 않고 부분적으로 일치하는지 체크하는 점이 상당히 매력적으로 다가왔습니다.

### 서버에서의 요청

swr은 완벽하게 리액트 생태계 안에서만 동작하게 만들어져있지만 react-query는 아닙니다. tanstack query라는 이름으로 라이브러리 독립적인 쿼리 클라이언트가 있고, 이걸 리액트용으로 한번 감싸서 제공하기때문에 queryClient는 서버에서도 사용할 수 있습니다.

이는 곧 queryKey와 queryFn을 서버에서도 동일한 사용성을 유지하고 사용할 수 있다는 뜻으로 서버와 클라이언트에서 다른 로직을 사용할 필요가 없다

## Reference

https://doqtqu.tistory.com/329

https://velog.io/@dea8307/SWRstale-while-revalidate%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC

https://velog.io/@turtlemana/SWR-vs-React-Query-%EC%84%9C%EB%B2%84%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EB%A6%AC

https://blog.naver.com/naverfinancial/223304774047

https://fe-developers.kakaoent.com/2022/220224-data-fetching-libs/
