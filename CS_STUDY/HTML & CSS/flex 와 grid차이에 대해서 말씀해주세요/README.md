# Flex VS Grid

Flex 는 1차원 적인 부분만 고려한 레이아웃이다
Grid 는 2차원 적인 부분도 고려한 레이아웃이다.

Flex는 한방향으로만 진행
Gird는 신문에 각 부분처럼 공간을 나눔


## Flex 특징 및 사용방법
    Flex 레이아웃은 플렉스컨테이너안에 있는 플렉스 아이템을 중앙정렬이나 균등하게 설정하기 좋음.
복잡한 레이아웃도 적은코드로 간결하게 설정이 가능하다.

시작은 플렉스 컨테이너에
display: flex; 를 설정해야한다.

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
## Grid의 특징 및 사용방법.
Grid는 카드형식으로 되어있는 신문형식의 레이아웃을 쉽게 만들수있고
여백을 쉽게 조절할수 있음.

시작은 플렉스 컨테이너와 비슷하게
display: grid; 를 설정해야한다.

grid는 flex와 row,column 방향이 반대다.

Grid 는 플렉스와는 다르게 방향을 설정하지않고
각 아이템 크기를 설정할 수 있다.

gap
사이공간 조정.
https://velog.io/@ikkim01/CSS-Flex-VS-Grid  
https://studiomeal.com/archives/533  
https://studiomeal.com/archives/197