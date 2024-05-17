import React from 'react';
import ChatBot from "react-chatbotify";
import Chatbot2 from "../images/chatbot2.png"
const MyChatbot  = () => {

  const options = {
    // ...other configurations
    theme: {
      primaryColor: '#B01818',
      secondaryColor: '#B01818',
      fontFamily: 'Arial, sans-serif',
    },
    header : {
      title : <b>ChatFood</b>,
      avatar: Chatbot2,
    },
    tooltipStyle: {
      zIndex : 1000,
    },
    headerStyle: {background: "#B01818", color: "#FFFFFF"},
    chatButtonStyle: {backgroundColor: "#FFFFFF",zIndex: 2},
    chatButton: {icon: Chatbot2}
  };

  return (
    <ChatBot options={options}>

    </ChatBot>
  );
};

export default MyChatbot ;
