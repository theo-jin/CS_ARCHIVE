
"Stale time"과 "cache time" 두 용어는 일반적으로 캐싱과 관련된 맥락에서 사용되며, 특히 웹 개발에서 자주 등장합니다. 각 용어의 의미와 차이점은 다음과 같습니다:

## Stale time
staleTime: 동일한 queryKey에 대해서 중복요청을 제거할 밀리세컨드 시간, 캐시에 저장된 데이터의 신선도를 의미

- 데이터가 fresh -> stale 상태로 변경되는데 걸리는 시간
- fresh 상태일때는 쿼리 인스턴스가 새롭게 mount 되어도 네트워크 fetch가 일어나지 않는다.
- 데이터가 한번 fetch 되고 나서 staleTime이 지나지 않았다면 unmount 후 mount 되어도 fetch가 일어나지 않는다.

## cacheTime
cacheTime: queryKey를 통해서 불러온 데이터를 캐시에 언제까지 저장할것인지를 지정하는 밀리세컨드 시간, 이 시간이 지나면 가비지 컬렉터(GC)가 캐시안의 데이터를 수집하게된다.
- 데이터가 inactive 상태일 때 캐싱된 상태로 남아있는 시간
- 쿼리 인스턴스가 unmount 되면 데이터는 inactive 상태로 변경되며, 캐시는 cacheTime만큼 유지된다.
- cacheTime이 지나면 가비지 콜렉터로 수집된다.
- cacheTime이 지나기 전에 쿼리 인스턴스가 다시 마운트 되면, 데이터를 fetch하는 동안 캐시 데이터를 보여준다.
- cacheTime은 staleTime과 관계없이, 무조건 inactive 된 시점을 기준으로 캐시 데이터 삭제를 결정한다.