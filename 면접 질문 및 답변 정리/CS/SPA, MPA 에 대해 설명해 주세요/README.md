# SPA, MPA 에 대해 설명해 주세요

## SPA vs MPA
- SPA(Single Page Application)는 한 개(Single)의 Page로 구성된 Application이다.
- MPA(Multiple Page Application)는 여러 개(Single)의 Page로 구성된 Application이다.
- MPA는 새로운 페이지를 요청할 때마다 정적 리소스가 다운로드된다. 매번 전체 페이지가 다시 렌더링 된다.
- 반면 SPA는 웹 에플리케이션에 필요한 모든 정적 리소스를 최초 한 번에 다운로드한다.
그 이후 새로운 페이지 요청이 있을 때, 페이지 갱신에 필요한 데이터만 전달 받아서 페이지를 갱신  

그래서 SPA를 CSR(Client Side Rendering) 방식으로 렌더링한다고 말한다.
그래서 MPA를 SSR(Server Side Rendering) 방식으로 렌더링한다고 말한다.


## MPA(Multiple Page Application)
- 전통적인 웹사이트들은 모두 MPA 형태로 서비스
- 여러 개(Single)의 Page로 구성된 Application이다.
- MPA는 SSR(Server Side Application) 방식으로 렌더링한다.
새로운 페이지를 요청할 때마다 서버에서 렌더링된 정적 리소스(HTML, CSS, JavaScript)가 다운로드된다.
페이지 이동하거나 새로고침하면 전체 페이지를 다시 렌더링한다.


## SPA(Single Page Application)
- 한 개(Single)의 Page로 구성된 Application이다.
- SPA는 CSR(Client Side Rendering) 방식으로 렌더링한다.
- 단 한 번만 리소스(HTML, CSS, JavaScript)를 로딩한다.그 후에는 데이터를 받아올 때만 서버와 통신한다.
- 즉, 첫 요청시 딱 한 페이지만 불러오고 페이지 이동 시 기존 페이지의 내부를 수정해서 보여주는 방식이다.
- 이를 클라이언트 관점에서 말하자면 최초 페이지를 로딩한 시점부터는 페이지 리로딩 없이 필요한 부분만 서버로 부터 받아서 화면을 갱신하는 것이다.
- 필요한 부분만 갱신하기 때문에 네이티브 앱에 가까운 자연스러운 페이지 이동과 사용자 경험(UX)을 제공할 수 있다.


### TTI (Time To Interactive)

사용자가 웹브라우저에서 인터랙션 할 수 있는 시점

상호 작용을 평가할 수 있는 메트릭

 사용자 경험과 밀접하게 연결되어 있으며 웹 성능을 모니터링할 때 반드시 고려해야 합니다.
- 페이지 렌더링을 차단할 수 있는 JavaScript 스크립트의 직접적인 영향을 받습니다.
 - 스크립트가 많을수록 TTI에 대한 지연이 커집니다.

 - 스크립트 성능이 장치마다 상당히 다르기 때문에 이는 영향 측면에서 장치마다 다를 수 있습니다. 프로세서가 느릴수록 스크립트를 분석하고 컴파일하는 데 더 많은 시간이 소요됩니다.

## TTV (Time To View)

사용자가 웹브라우저에서 내용을 볼 수 있는 시점


## Reference
https://hanamon.kr/spa-mpa-ssr-csr-%EC%9E%A5%EB%8B%A8%EC%A0%90-%EB%9C%BB%EC%A0%95%EB%A6%AC/

https://velog.io/@corone_hi/SPA-CSR-SSR-TTI-TTV#tti-time-to-interactive-ttv-time-to-view