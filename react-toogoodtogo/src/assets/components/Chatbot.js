import React, { useEffect } from 'react';
import ChatBot from "react-chatbotify";
import Chatbot from "../images/chatbot.png"
import Chatbot2 from "../images/chatbot2.png"
const MyChatbot  = () => {

  const options = {
    // ...other configurations
    theme: {
			primaryColor: "#B01818",
			secondaryColor: "#B01818",
		},
    header : {
      title : <b>ChatFood</b>,
      avatar: Chatbot2,
    },
    chatButton: {
      icon: Chatbot2,
    },
    tooltipStyle: {
      zIndex : 1000,
    },
    chatButtonStyle: {
      backgroundColor: '#ffffff',
      border: '4px solid #ffffff',
    },
  };

  return (
    <ChatBot options={options}>

    </ChatBot>
  );
};

export default MyChatbot ;
