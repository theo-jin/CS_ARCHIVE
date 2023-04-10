# 타입 선언과 @types

### item 45 devDependencies에 typescript와 @types 추가하기
* 타입스크립트를 시스템 레벨로 설치하면 안된다. 타입스크립트를 프로젝트의 devDependencies에 포함시키고 팀원 모두가 동일한 버전 사용하도록 해야한다. 
* @types의존성은 dependencies가 아니라 devDependencies에 포함시켜야한다. 런타임에 @types가 필요한 경우라면 별도의 작업이 필요할 수 있다.
