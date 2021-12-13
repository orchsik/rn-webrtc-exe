### WebSocket

- It is the protoco which is established over the TCP connection.
- It provides full duplex communication on TCP connections.
- Proxy and load balancer are not supported in WebSocket.
- It doesn't support broadcasting.
- It doesn't have fallback option.

### Socket.io

- It is library to work with WebSocket.
- It provides the event based communication between browser and server.
- Connection can be established in the presence of proxies and load balancers.
- It supports broadcasting.
- It supports fallback options.
- Socket.IO는 node.js 기반으로 만들어진 기술로, 거의 모든 웹 브라우저와 모바일 장치를 지원하는 실시간 웹 애플리케이션 지원 라이브러리이다.
- 100% 자바스크립트로 구현되어 있으며, WebSocket, FlashSocket, AJAX Long Polling, AJAX Multi part Streaming, IFrame, JSONP Polling 등
- 현존하는 대부분의 실시간 웹 기술들을 추상화해 놓았다.
- 다시 말해, Socket.IO는 자바스크립트를 이용하여 브라우저 종류에 상관없이 실시간 웹을 구현할 수 있도록 한 기술이다.
- Socket.IO는 웹 브라우저와 웹 서버의 종류와 버전을 파악하여 가장 적합한 기술을 선택하여 사용한다.
- 만약 브라우저에 FlashSocket이라는 기술을 지원하는 플러그인이 설치되어 있으면 그것을 사용하고 플러그인이 없으면 AJAX Long Polling 방식을 사용하도록 하는 식이다.
