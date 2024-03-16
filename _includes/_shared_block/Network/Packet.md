패킷(Packet)이란 네트워크에서 출발지와 목적지간에 라우팅 되는 데이터 단위입니다. 네트워크 패킷은 사용자 데이터와 제어정보로 이루어지며, 사용자 데이터는 페이로드라고 합니다. 제어 정보는 페이로드를 전달하기 위한 정보입니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/a5eede84-9f17-483a-b12d-08d5c5fd7f45)

* 해더(Header)는 소스 주소, 대상 주소, 프로토콜 및 패킷 번호가 포함됩니다. 패킷의 출처를 나타내는 소스 주소와 수신 IP 주소를 나타내는 대상 주소, 프로토콜 및 패킷 번호가 포함됩니다.
* 페이로드(Payload)는 패킷에 의해 전송되는 실제 데이터를 나타내는 것으로 데이터라고도 합니다. 네트워크에 따라 크기는 48Byte ~ 4KByte까지 다양합니다. 페이로드는 헤더 정보가 목적지에 도달할 때 패킷에서 제거되므로 소스 및 목적지에서 수신하는 유일한 데이터입니다.
* 트레일러는 각 네트워크 유형에 따라 다르며 일반적으로 트레일러에는 수신 장치에 패킷 끝까지 도달했음을 알리는 몇 비트와 컴퓨터가 모든 패킷이 완전히 수신되었는지 확인할 수 있는 CRC(Cycle Redundancy Check)가 포함되어 있습니다.

Data가 Encapsulation되고 Decapsulation 되는 과정을 표현하면 다음과 같습니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/aeb0f4f4-855e-459e-9d7d-8b143f2804d8)

* Encapsulation(캡슐화, 압축)는 송신 장비가 상대방에게 보낼 때 프로토콜 정보와 관련된 Header 정보를 씌워주는 과정을 말합니다.

1. 송신 장비가 보내려는 최초의 데이터입니다. 실제 데이터를 응용 계층에 넘기며, 데이터를 암호화하고 수신자와의 통신을 위한 세션을 맺을 준비를 합니다.
2. Transport 계층(4계층)에서 TCP Header 값이 붙습니다. 이 정보는 Port 정보입니다.
3. Internet 계층(3계층)에서 IP Header를 Segment에 붙입니다. 여기서 붙는 Header의 정보는 송신 장비와 수신 장비의 IP 정보가 들어가게 됩니다.
4. Network 계층(2계층)에서 Ethernet Header와 Trail(CRC)이 붙습니다.
5. Physical 게층(1계층)에서 물리신호로 전환되어 상대방을 향하여 전달됩니다.
6. Physical 계층(1계층)에서 송신자에게 전파받은 2진수 값을 2진 데이터 값으로 변환합니다.
7. Nework 게층(2계층)에서 Ethernet Header를 검사합니다.
8. Internet 계층(3계층)에서 IP Header를 검사합니다.
9. Transport 계층(4계층)에서 TCP Header 값을 검사합니다.
10. Application 계층(5~7계층)에서 세션을 맺고 암호화된 데이터를 복호화하며 실제 사용자에게 데이터를 넘깁니다.

![image](https://github.com/kbmhansungb/kbmhansungb.github.io/assets/56149613/a081ff4d-c1ca-42f9-b396-702884455620)


Encapsulation되고 Decapsulation되는 과정 5~6사이에 라우터가 존재할 경우 동작 과정은 다음과 같습니다.

3. Router의 Network 계층에서 Header 정보를 보고 Destination MAC address가 자신의 MAC address와 동일한지 확인합니다.
4. Router의 internet 게층에서 Header 정보를 봅니다. 또한, 자신의 Routing table을 보며 수신자의 IP 주소가 있는지 확인합니다.
5. Router의 Network 계층에서 Header 정보를 바꿉니다.
