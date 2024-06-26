# Flex VS Grid

## Flex 정의 및 특징

### 정의

- Flexbox는 한 축(행 또는 열)을 기반으로 요소를 정렬하고 배치하기 위한 레이아웃 모델
- 주로 단일 차원(행 또는 열)에서 유연한 레이아웃을 구현하는 데 사용
- Flex 레이아웃은 플렉스컨테이너안에 있는 플렉스 아이템을 중앙정렬이나 균등하게 설정하기 좋음.

### 특징

- 단일 차원: 주로 한 방향(행 또는 열)으로 레이아웃을 구성합니다.
- 유연한 박스 모델: 요소 간에 유연한 공간 분배를 통해 동적인 레이아웃을 생성합니다.
- 요소 정렬 및 간격: 주축 및 교차축에서 요소를 정렬하고 간격을 조절하는 데 유용합니다.
- 간단한 구조: 작은 규모의 레이아웃을 간편하게 구현할 수 있습니다.

### 어디에 쓰는가?

Flex는 주로 동일한 방향으로 정렬된 요소를 가진 작은 규모의 레이아웃에 적합합니다. 예를 들어, 내비게이션 바나 작은 아이템 목록을 정렬하는 데 유용.

### 방향을 설정하는 방법

flex-direction 을 방향에 따라 설정해주면된다.
row는 ➡️ ➡️ ➡️
row-reverse는 ⬅️ ⬅️ ⬅️
column은 ⬇️ ⬇️ ⬇️
column-reverse는 ⬆️ ⬆️ ⬆️ 이렇게 방향을 설정해줄수있다.

### 정렬하는 방법

가로방향 justify-content 세로방향은 align-items 이 두개로 정렬할수있다.
정렬종류
flex-start (가로 기본값)
가로든 세로든 시작하는부분부터 방향으로 정렬. 가로방향 왼쪽 정렬세로방향 위쪽 정렬
flex-end
가로든 세로든 마무리 부분에 끝쪽에 정렬. 가로방향 오른쪽 정렬 세로방향 아래쪽 정렬
center
중앙 정렬 가운데로부터 양옆으로 간격이 없도록 설정 따로 마진을 주면 띄울수 있음

가로방향에서만 사용 가능한 속성

## Grid의 정의 및 특징

### 정의

- Grid는 행과 열의 2차원 그리드를 사용하여 복잡한 레이아웃을 만들기 위한 레이아웃 시스템
- Flex와 달리 2차원 레이아웃을 제공하여 더 복잡하고 다양한 디자인을 구현할 수있다.

### 특징

- 2차원 레이아웃: 행과 열을 사용하여 요소를 배치하는 데 유용합니다.
- 복잡한 구조: 다양한 디자인 및 복잡한 레이아웃을 구현할 수 있습니다.
- 영역 지정: 각 요소에 대한 정확한 위치와 크기를 설정할 수 있습니다.
- Responsiveness: 반응형 웹 디자인에 적합하며 다양한 디바이스에 대응할 수 있습니다.

### 어디에 쓰는가?

- Grid는 주로 복잡하고 다양한 레이아웃을 필요로 하는 경우에 적합
- 큰 규모의 웹 페이지나 앱의 전체적인 구조를 설계할 때 효과적으로 사용

Grid는 카드형식으로 되어있는 신문형식의 레이아웃을 쉽게 만들수있고 여백을 쉽게 조절할수 있음.

시작은 플렉스 컨테이너와 비슷하게 display: grid; 를 설정해야한다.

grid는 flex와 row,column 방향이 반대다.

Grid 는 플렉스와는 다르게 방향을 설정하지않고 각 아이템 크기를 설정할 수 있다.

gap
사이공간 조정.

## Reference

https://velog.io/@kfbkhw/Flex-Grid-%EB%B9%84%EA%B5%90-%EC%A0%81%ED%95%A9%ED%95%9C-%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83
https://velog.io/@ikkim01/CSS-Flex-VS-Grid  
https://studiomeal.com/archives/533  
https://studiomeal.com/archives/197
