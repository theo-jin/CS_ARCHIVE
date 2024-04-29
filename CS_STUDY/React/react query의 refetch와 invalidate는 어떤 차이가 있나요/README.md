# react query의 refetch와 invalidate는 어떤 차이가 있나요

React Query에서 refetch와 invalidate는 데이터를 관리하고 업데이트하는 데 사용되는 두 가지 주요 메소드입니다
refetch 는 enabled 옵션과 상관없이 무조건 queryFn을 수행한다.
따라서 enabled 옵션을 고려하는 invalidateQueries 가 조금 더 스마트한 리패치 방식이다.

하지만, invalidateQueries 는 data 가 있는 컴포넌트를 볼때만 리패치를 수행하므로, 백그라운드 리패치를 통해서 조금 더 매끄러운 UI 를 제공하려면 refetch 를 사용할 수 있겠다.


## refetch
- refetch 메소드는 항상 데이터를 다시 가져와서 갱신합니다.
- 쿼리에 대한 옵저버가 없어도 리페칭한다.
- 특정 쿼리를 다시 실행하여 최신 데이터를 가져오는 데 사용
- 예를 들어, 특정 버튼 클릭 또는 특정 이벤트 발생 시에 refetch를 호출하여 해당 데이터를 새로 고칠 수 있습니다.

## invalidate
- invalidate는 쿼리를 stale하게 만든다.쿼리가 stale 상태로 변경된다고 바로 데이터를 다시 가져오지 않는다. 
- invalidateQueries 함수를 사용하여 특정 쿼리나 쿼리 그룹을 무효화할 수 있습니다.
- 이는 해당 쿼리의 데이터를 무효화하고, 다음에 해당 쿼리를 다시 실행할 때 새로운 데이터를 가져오도록 강제합니다.

해당 Key를 가진 query는 stale 취급되고, 현재 rendering 되고 있는 query들은 백그라운드에서 refetch 됩니다.
cache 되어 있는 데이터들을 invalidate 하여( 무효로 하다 )  다시 refetch 시킬 수 있습니다.


## stale
React Query에서 "stale"은 캐시된 데이터가 최신이 아니라는 상태를 나타낸다.
"stale" 상태에서는 해당 데이터가 최신 데이터로 갱신되어야 하는 것을 나타내며, 이 상태에서는 기본적으로 이전에 캐시된 데이터를 사용하면서 백그라운드에서 데이터를 갱신하는 작업이 진행

- Immediate Rendering:
"stale" 상태의 데이터는 즉시 사용됩니다. 이전에 캐시된 데이터를 UI에 표시하면서 백그라운드에서 데이터를 다시 가져오는 작업이 시작됩니다.

- Refetching in the Background:
"stale" 상태에서 해당 데이터를 사용하는 동안 백그라운드에서 데이터를 다시 가져오는(refetch) 작업이 진행됩니다. 이 작업은 네트워크 요청 등을 통해 서버로부터 최신 데이터를 가져옵니다.

- Optimistic Updates:
"stale" 상태에서 데이터를 사용하면서 백그라운드에서 데이터를 다시 가져올 때, React Query는 최신 데이터를 가져오기 전에 사용자에게 최적화된 업데이트를 제공할 수 있습니다. 이를 "optimistic updates"라고 합니다.


### 여담.
쿼리가 invalidateQueries 메서드로 무효화될때 다음과 같은 두 가지 상황이 발생한다.

쿼리가 오래된 것으로 표시된다. 오래된 상태는 useQuery 또는 관련 훅에서 사용 중인 모든 staleTime 구성에 오버라이드한다.
만약 useQuery 나 관련 훅을 통해 쿼리가 렌더링되고 있다면 백그라운드에서도 refetch한다.

## Reference
https://github.com/TanStack/query/discussions/2468
https://hjk329.github.io/react/react-query-query-invalidation/