# TanstackQuery에서 캐싱과 data fetching의 메커니즘

Tanstack Query (이전 React Query)에서 캐싱은 서버에서 가져온 데이터를 로컬에 저장하는 기능입니다.
이렇게 저장된 데이터를 캐시라고 합니다. 캐싱 덕분에 동일한 데이터를 반복적으로 요청할 때 서버에 다시 요청하지 않고 로컬에 저장된 캐시 데이터를 사용할 수 있어 성능을 크게 향상시킬 수 있습니다.

## data fetching

### useQuery 훅 사용

데이터를 가져오기 위해 useQuery 훅을 사용합니다. 이 훅은 쿼리 키와 쿼리 함수를 인자로 받습니다.

### queryFn

- queryFn은 쿼리함수 의미
- 쿼리 함수: 비동기 함수로, 데이터를 가져오는 역할을 합니다.주로 API 요청을 처리합니다.   

### queryKey

queryKey 프로퍼티:useQuery를 사용할 때 모든 쿼리 전송하는 모든 fetch 요청

즉, 전송하는 모든 GET HTTP 요청에는 쿼리 키가 있다.Tanstack 쿼리는 내부에서 이 쿼리 키를 이용해 요청으로 생성된 데이터를 캐시 처리한다

그래서 나중에 동일한 요청을 전송하면 이전 요청의 응답을 재사용할 수 있다.
![alt text](image.png)
키는 배열이다.이 값의 배열을 리액트 쿼리는 내부적으로 저장한다. 그래서 유사한 값으로 이루어진

유사한 배열을 사용할 때마다 리액트 쿼리는 이 배열을 확인하고 기존 데이터를 재사용 가능

키는 배열이며, 문자열로 국한되지않음 객체를 사용하거나 중첩 배열이나 다른 종류의 값을 사용할 수도 있다.

## Tanstack Query는 다음과 같은 다양한 캐싱 기능을 제공합니다.

- 자동 캐싱: 컴포넌트가 마운트되거나 업데이트될 때 지정된 쿼리 함수를 사용하여 자동으로 데이터를 패칭하고 캐싱합니다.
- 데이터 무효화: 캐시된 데이터가 만료되거나 특정 조건을 충족할 경우 자동으로 새 데이터를 요청하여 캐시를 최신 상태로 유지합니다.
- 사용자 정의 캐싱: 캐싱 키, 만료 시간, 캐싱 전후 처리 등을 자세히 제어할 수 있습니다.
- 쿼리 결과 캐싱: 쿼리 결과 자체뿐만 아니라 쿼리 실행 시 발생하는 오류나 로딩 상태도 캐싱할 수 있습니다.

자동 캐싱: 데이터를 자동으로 캐싱하여 불필요한 API 요청을 줄이고 성능을 향상시킵니다.

stale-while-revalidate: 최신 데이터를 보장하면서 성능을 최적화하는 전략을 제공합니다.

요청 병합: 여러 컴포넌트에서 동일한 데이터를 요청하는 경우 요청을 병합하여 서버 부하를 줄입니다.

## Tanstack Query 장점

- 성능 향상: 서버 요청 수를 줄여 응답 속도를 높일 수 있습니다.
- 데이터 사용량 감소: 네트워크 트래픽을 줄여 데이터 사용량을 절감할 수 있습니다.
- 오프라인 사용 가능: 인터넷 연결이 없어도 캐시된 데이터를 사용하여 앱을 사용할 수 있습니다.
- 사용자 경험 향상: 데이터 로딩 속도가 빨라져 사용자 경험을 향상시킬 수 있습니다.
- Tanstack Query의 캐싱 기능은 웹 애플리케이션의 성능과 사용자 경험을 크게 향상시킬 수 있는 강력한 도구입니다.

## 데이터 라이프 사이클

1. fresh
   신선한 상태 : staleTime이 지나지 않은 데이터
   이러한 상태의 데이터를 다시 요청하면, 이 데이터를 그대로 반환한다.
2. fetching
   데이터를 불러오는 중인 상태
   서버에 API를 날리고 기다리는 중이라고 보면 될 것 같다.
3. stale
   상한 상태 : staleTime이 지난 데이터
   이러한 상태의 데이터를 다시 요청하면, 서버에 api를 다시 요청한다.
4. inactive
   쿼리가 실행된 컴포넌트가 unmount됐을 때, 해당 컴포넌트에서 불러와졌던 데이터들은 inactive상태가 된다. 즉, 사용되지는 않지만 캐싱이 되어 있는 상태(메모리에 남아 있는 상태)인 것이다.
5. delete
   캡쳐한 화면에는 없지만, cacheTime이 지나서 아예 삭제된 상태도 있다.
   inactive한 데이터가 cacheTime이 지나면 가비지 컬렉터에 의해 메모리에서 아예 제거된다.

## Tanstack Query 라이프 사이클

gcTime의 기본값 5분, staleTime 기본값 0초를 가정하고 라이프 사이클을 설명한다.

1. A라는 queryKey를 가진 A 쿼리 인스턴스가 mount됨
2. 네트워크에서 데이터 fetch하고, 불러온 데이터는 A라는 queryKey로 캐싱함
3. 이 데이터는 fresh상태에서 staleTime(기본값 0) 이후 stale 상태로 변경됨
4. A 쿼리 인스턴스가 unmount됨
5. 캐시는 gcTime(기본값 5min) 만큼 유지되다가 가비지 콜렉터(GC)로 수집됨
6. 만일, gcTime 지나기 전이고, A 쿼리 인스턴스 fresh한 상태라면 새롭게 mount되면 캐시 데이터를 보여준다.(stalet상태일때 쿼리 인ㅅ)

```ts
  staleTime: 5000, //캐시에 데이터가 있을 때 업데이트된 데이터를 가져오기 위한 요청을 자체적으로 전송하기 전에 기다릴 시간을 설정
    gcTime: 40000, //가비지 수집 시간을 의미. 데이터와 캐시를 얼마나 오랫동안 보관할지를 제어.기본값 5분
```

## Reference

https://tanstack.com/query/v4/docs/reference/QueryCache

https://github.com/ssi02014/react-query-tutorial?
tab=readme-ov-file#%EC%BA%90%EC%8B%B1-%EB%9D%BC%EC%9D%B4%ED%94%84-%EC%82%AC%EC%9D%B4%ED%81%B4
