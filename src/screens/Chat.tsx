import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  EventOnCandidate,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import * as io from 'socket.io-client';

import { AppRouteProp } from 'App';

const Chat = () => {
  const route = useRoute<AppRouteProp<'Chat'>>();
  const { roomID } = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);

  const socketRef = useRef<io.Socket | undefined>();
  const peerRef = useRef<RTCPeerConnection>();
  const otherUser = useRef();
  const sendChannel = useRef();

  const handleICECandidateEvent = (e: EventOnCandidate) => {
    if (!e.candidate) {
      return console.log('not found candidate !!!');
    }
    if (!socketRef.current) {
      return console.log('not connected socket.io');
    }

    socketRef.current.emit('ice-candidate', {
      target: otherUser.current,
      candidate: e.candidate,
    });
  };

  const handleNegotiationNeededEvent = async (userID: string) => {
    try {
      if (!peerRef.current) {
        throw Error('not found peer');
      }
      if (!socketRef.current) {
        throw Error('not found peer');
      }

      const offer = await peerRef.current.createOffer();
      peerRef.current.setLocalDescription(offer);
      socketRef.current.emit('offer', {
        target: userID,
        caller: socketRef.current?.id,
        sdp: peerRef.current?.localDescription,
      });
    } catch (err) {
      console.log('Error handling negotiation needed event', err);
    }
  };

  const asyn_handleNegotiationNeededEvent = useCallback((userID: string) => {
    handleNegotiationNeededEvent(userID);
  }, []);

  const handleReceiveMessage = (e) => {
    console.log('[INFO] Message received from peer', e.data);
    const msg = [
      {
        _id: Math.floor(Math.random() * 1000).toString(),
        text: e.data,
        createdAt: new Date(),
        user: { _id: 2 },
      },
    ];
    setMessages((prevMsg) => GiftedChat.append(prevMsg, msg));
  };

  const Peer = useCallback(
    (userID: string) => {
      const peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: ['stun:'],
          },
          {
            urls: ['turn'],
            credential: 'khc',
            username: 'khc@wow.com',
          },
        ],
      });
      peer.onicecandidate = handleICECandidateEvent;
      peer.onnegotiationneeded = () =>
        asyn_handleNegotiationNeededEvent(userID);
      return peer;
    },
    [asyn_handleNegotiationNeededEvent],
  );

  const callUser = useCallback(
    (userID: string) => {
      console.log('[INFO] Initiated a call');
      peerRef.current = Peer(userID);
      // CCC
      sendChannel.current = peerRef.current.createDataChannel('sendChannel');
      // listen to incoming messages
      sendChannel.current.onmessage = handleReceiveMessage;
    },
    [Peer],
  );

  const handleOffer = (incoming: RTCSessionDescriptionType) => {
    // Handle Offer made by the initiating peer
    console.log('[INFO] Handling Offer');
    // peerRef.current = Peer();
    peerRef.current?.ondatachannel = (event) => {
      sendChannel.current = event.channel;
      sendChannel.current.onmessage = handleReceiveMessage;
      console.log('[SUCCESS] Connection established');
    };

    const desc = new RTCSessionDescription({
      sdp: incoming.sdp,
      type: 'undefined',
    });
    peerRef.current
      ?.setRemoteDescription(desc)
      .then((answer: RTCSessionDescriptionType) => {
        return peerRef.current?.setLocalDescription(answer);
      });
  };

  const handleAnswer = () => {};

  const handleNewICECandidateMsg = () => {};

  useEffect(() => {
    socketRef.current = io.connect('http://127.0.0.1:9000');
    socketRef.current.emit('join room', roomID);
    socketRef.current.on('other user', (userID) => {
      callUser(userID);
      otherUser.current = userID;
    });
    socketRef.current.on('user joined', (userID) => {
      otherUser.current = userID;
    });
    socketRef.current.on('offer', handleOffer);
    socketRef.current.on('answer', handleAnswer);
    socketRef.current.on('ice-candidate', handleNewICECandidateMsg);
  }, [callUser, roomID]);

  const sendMessage = (_messages: IMessage[]) => {
    console.log({ _messages });
    sendChannel.current.send(_messages[0].text);
    setMessages((prevMsg) => GiftedChat.append(prevMsg, _messages));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(_messages) => sendMessage(_messages)}
      user={{ _id: 1 }}
    />
  );
};

export default Chat;
