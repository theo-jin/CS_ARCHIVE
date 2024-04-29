"Stale time"과 "cache time" 두 용어는 일반적으로 캐싱과 관련된 맥락에서 사용되며, 특히 웹 개발에서 자주 등장합니다. 각 용어의 의미와 차이점은 다음과 같습니다:

```ts
staleTime: 5000, //캐시에 데이터가 있을 때 업데이트된 데이터를 가져오기 위한 요청을 자체적으로 전송하기 전에 기다릴 시간을 설정
gcTime: 40000, //가비지 수집 시간을 의미. 데이터와 캐시를 얼마나 오랫동안 보관할지를 제어
```

## Stale time

staleTime: 동일한 queryKey에 대해서 중복요청을 제거할 밀리세컨드 시간, 캐시에 저장된 데이터의 신선도를 의미

- staleTime은 데이터가 "stale" 상태로 간주되는 기간을 지정
- 데이터가 "stale" 상태란, 이전 쿼리 결과가 캐시되어 있지만, 그 결과가 일정 시간 동안 업데이트되지 않은 상태
- staleTime은 밀리초 단위로 설정되며, 기본값은 0
- staleTime이 0보다 큰 값으로 설정되면, staleTime 이후에도 이전 캐시 결과를 사용할 수 있다. 이렇게 하면 네트워크 요청을 최소화할 수 있다.
- staleTime이 0으로 설정되면, 데이터가 한 번 "stale" 상태가 되면 즉시 다시 쿼리를 수행하여 업데이트된 데이터를 가져오고 받아오는 즉시 stale하다고 판단해서 캐싱 데이터와는 무관하게 계속 fetching을 수행한다. 그러므로 staleTime을 지정하지 않고 사용한다면 React Query의 캐싱 기능을 활용할 수 없다.
- fresh 상태일때는 페이지를 이동했다가 돌아왔을 경우에도 fetch가 일어나지 않는다. 즉, 데이터가 한번 fetch 되고 staleTIme이 지나지 않았다면 unmount 후 mount가 발생해도 다시 fetch가 발생하지 않는다

## cacheTime

cacheTime: queryKey를 통해서 불러온 데이터를 캐시에 언제까지 저장할것인지를 지정하는 밀리세컨드 시간, 이 시간이 지나면 가비지 컬렉터(GC)가 캐시안의 데이터를 수집하게된다.

- cacheTime은 쿼리 결과를 캐시로 저장하는 기간을 지정한다.
- 기본적으로, React Query는 이전 쿼리 결과를 자동으로 캐시하고, 이후 같은 쿼리가 호출될 때 이 캐시를 사용.
- cacheTime은 밀리초 단위로 설정되며, 기본값은 5분(300000 밀리초) cacheTime이 경과하면 React Query는 다시 쿼리를 수행하여 최신 데이터를 가져온다.
- 쿼리 인스턴스가 unmount 되면 데이터는 inactive 상태로 변경되며, 캐시는 cacheTime만큼 유지된다.
- 이걸 cacheTime 만큼 유지시키는 이유는 쿼리 인스턴스가 다시 마운트되면 데이터를 fatch하는 동안 cacheTime이 지나지 않은 캐시 데이터를 보여준다.
- cacheTime이 지나면 가비지 콜렉터로 삭제가 된다.

https://growing-jiwoo.tistory.com/103
