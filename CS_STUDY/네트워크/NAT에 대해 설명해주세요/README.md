# NAT(Network Address Translation)
- NAT(Network Address Translation)패킷이 라우팅 장치를 통해 전송되는 동안 패킷의 ip주소를 수정하여 ip주소를 다른주소로 매핑하는 방법.ipv4주소 체계만으로는 많은 주소들을 감당하지 못하는 단점이 있는데, 이를 해결하기위해 NAT로 공인ip 와 사설ip로 나눠서 많은 주소를 처리. 

-  **공인 IP는 한정되어있기 때문에, 사설 IP의 개념이 필요하게 되었고, 공인IP를 가지고 있는 공유기 , 기계를 통해서 사설IP를 할당해준 다음 사설 IP를 가지고 외부의 네트워크와 통신할 때 필요한 기술**이다.

ex) 공유기(공인IP) 와이파이(사설IP)에 접속해서 인터넷(공인IP)을 한다.
요약하면 여러 대의 호스트가 하나의 공인 IP주소를 사용하여 인터넷에 접속하기 위한 경우이다.
다만 단점은 사설IP의 개념 자체가 중복되는 IP가 엄청 많기 때문에, 외부에서 사설 IP로 접근할 수 없다.
=> 이를 보안하기 위해서 나온 개념이 Port Forwarding이다

## 포트 포워딩
- Port Forwarding: NAT기술의 응용 으로서, 패킷이 라우터나 방화벽과 같은 네트워크 장비를 가로지르는 동안 특정 ip주소와 포트 번호의 통신 요청을 특정 다른 IP와 포트번호로 넘겨주는 이 기법은 게이트웨이의 반대쪽에 위치한 사설 네트워크에 상주하는 호스트에 대한 서비스를 생성하기 위해 흔히 사용된다.
- 사설 IP의 단점은 IP를 알아볼 수 없기 때문에, 요청을 보내고 싶어도 보낼 수 없다는 단점이 있다. 따라서 클라이언트가 먼저 요청을 보내는데 이때 서버의 사설 IP로 직접 요청을 보내는 것이 아니라 공인 IP로 요청을 보낸다. 그리고 이 공유기의 포트 포워딩 설정을 하면 특정 포트로 들어온 요청을 다른 특정 사설 IP의 특정 포트로 전송한다.
이때 포트번호는 포트포워딩을 하는 사용자의 마음대로 설정할 수 있다.

## NAT의 종류?
### 1. Full Cone NAT
가장 간단한 NAT 방식이다.
private ip/port와 public ip/port가 매핑되면, 누구든 간에 그 public ip/port로 접근 시, host에게 통신을 시도할 수 있는 방식
Host의 Private IP와 Port가 Router나 L3 Switch를 통해 Public IP와 Port로 매핑이 되면,
매핑된 정보를 토대로 Host가 Service A로 통신을 시도했을때, Service A도 마찬가지로 매핑된 정보를 토대로 Host에게 패킷을 보낼 수 있고, 이는 Router 또는 L3 Switch를 통해 Host에게 전달이 가능

### 2. Restricted Cone NAT
 Full Cone NAT에 비해 통신이 제한되는 부분이 있다
  기존에 통신하던 Service의 IP가 아니라면 Host에게로 패킷이 도달하지 않는다

### 3. Port Restricted Cone NAT
Port Restricted Cone은 여기에 host와 통신을 하던 Service의 Server IP, Port가 전부 동일하지 않다면, Host로의 패킷 전달을 차단한다
즉, 기존에 통신하던 Service가 아니면 Host에게 패킷을 직접적으로 보낼 수 없는 환경.

### 4. Symmetric NAT
Symmetric 방식은 통신하는 Service의 IP/Port 를 기반으로, 매핑정보를 달리한다.
Host가 통신하는 대상에 따라 각각 다른 매핑정보를 가져간다. 매핑정보가 계속해서 변하는 방식

https://tomatohj.tistory.com/42