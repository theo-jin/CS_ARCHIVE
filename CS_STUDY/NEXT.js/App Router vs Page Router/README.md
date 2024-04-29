# App Router vs Page Router 

## 1. 라우팅 디렉토리 및 파일규칙
- App Router:디렉토리 단위로 적용되는 layout이 생겼다.app 디렉토리 내에 root layout을 필수로 포함해야한다. 파일경로와 이름에 따라 사이트 주소가 설정되는 규칙도, 디렉토리구조로 경로를 구분하고 파일은 page라는 이름을 가지도록 변경 
- Page Router:정적인 공통마크업 _document에 작성, 모든페이지가 공유하는 로직은 _app에 작성. 

## 2.메타데이터 적용방법 
SEO에 필수적인 메타태그 적용방법 다름.
- App Router: 레이아웃 및 페이지 파일에서 별도로 Metadata를 export하도록 만듦.그래서 앱라우터에서는 메타태그를 따로 작성 불가, next/head의 Head태그 사용 불가.

- Page Router:일반적인HTML과 유사하게 헤드태그에 메타태그 작성. 

## 3.서버사이드 렌더링 
- App Router :  일반적인 fetch 를 페이지에서 비동기로 사용 하여 서버사이드 렌더링 구현
- Page Router : 여기서 서버사이드 렌더링 구하기 위해서는 getServerSideProps 함수 사용했어야함. 
    - getinitialProps : 이미 서버에 있는 데이터를 이용해서 서버 사이드 렌더링을 할 떄 사용합니다
    - getServerSIdeProps : 페이지 접근할 때 마다 서버 사이드 렌더링에 필요한 데이터를 가져올 때 사용합니다(최신 데이터가 필요할 때)
    - getStaticProps : next build 시 정적 페이지를 생성할 때 필요한 데이터를 가져올 때 사용합니다

## 4.라우팅
- App Router
서버 중심 라우팅
    - react server components를 기반으로 구축.
    - 서버 데이터 가져오기에 맞춰져 있습니다.
    - 하지만 경로 이동시 페이지를 다시 렌더링하지 않고, SPA처럼 URL만 업데이트하고 next는 변경된 세그먼트만 렌더링합니다. 

- Pages Router
클라이언트 중심 라우팅
## Reference
https://yozm.wishket.com/magazine/detail/2324/