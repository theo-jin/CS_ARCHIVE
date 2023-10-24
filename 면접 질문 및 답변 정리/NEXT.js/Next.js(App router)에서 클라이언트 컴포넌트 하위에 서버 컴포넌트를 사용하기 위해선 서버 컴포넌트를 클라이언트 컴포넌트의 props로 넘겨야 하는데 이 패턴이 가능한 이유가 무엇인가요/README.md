우리가 서버 컴포넌트 에서 클라이언트 컴포넌트로 props를 전달할때, 서버 컴포넌트들은 serializable (직렬화)가 되어야 한다.
프롭으로 () => {} 같은 화살표 함수를 전달할수 없다.대신에,JSON으로 직렬화될수 있는 프롭스만 전달 할 수 있다.


직렬화 (Serialization)
객체나 데이터 구조를 네트워크나 저장소(예, 배열 버퍼 또는 파일 형식)를 통한 전송에 적합한 형식으로 변환하는 프로세스입니다.

예를 들어, JavaScript에서는 함수 JSON.stringify()를 호출하는 것을 통해 객체를 JSON 문자열로 직렬화할 수 있습니다.

CSS 값은 CSSStyleDeclaration.getPropertyValue() (en-US) 함수를 호출하여 직렬화됩니다.

https://kulkarniankita.com/react/react-server-client-components