import React from 'react';
import ChatBot from "react-chatbotify";
import Chatbot2 from "../images/chatbot2.png"
const MyChatbot  = () => {
  const [form, setForm] = React.useState({});

  const formStyle = {
		marginTop: 10,
		marginLeft: 20,
		border: "1px solid #491d8d",
		padding: 10,
		borderRadius: 5,
		maxWidth: 300
	}

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
    tooltip : {
      mode : 'START',
      text: 'Habla conmigo! 😊',
    },
    tooltipStyle: {
      zIndex : 1000,
    },
    headerStyle: {background: "#B01818", color: "#FFFFFF"},
    chatButtonStyle: {backgroundColor: "#FFFFFF",zIndex: 2},
    chatButton: {icon: Chatbot2}
  };

  const helpOptions = ["Información", "Negocios", "Crear Cuenta", "Iniciar Sesión"];
  
	const flow = {
		start: {
			message: "Hola, Soy ChatFood 👋! Bienvenido a Too Good To 😊!",
			transition: {duration: 1000},
			path: "show_options"
		},
		show_options: {
			message: "Parece que aún no has configurado un flujo de conversación. ¡No te preocupes! Aquí hay algunas cosas útiles que puede consultar para comenzar:",
			options: helpOptions,
			path: "process_options"
		},
		prompt_again: {
			message: "¿Necesitas alguna otra ayuda?",
			options: helpOptions,
			path: "process_options"
		},
		unknown_input: {
			message: "Perdón, no entiendo tu mensaje 😢! Si necesitas más ayuda, puedes contactar con soporte",
			options: helpOptions,
			path: "process_options"
		},
		process_options: {
			transition: {duration: 0},
			chatDisabled: true,
			path: async (params) => {
				let link = "";
				switch (params.userInput) {
				case "Información":
					link = "http://localhost:3000/";
					break;
				case "Negocios":
					link = "http://localhost:3000/Inicio";
					break;
				case "Crear Cuenta":
					link = "http://localhost:3000/Registro";
					break;
				case "Iniciar Sesión":
					link = "http://localhost:3000/Login";
					break;
				default:
					return "unknown_input";
				}
				await params.injectMessage("¡Estáte quieto! ¡Te enviaré allí mismo!");
				setTimeout(() => {
					window.open(link);
				}, 1000)
				return "repeat"
			},
		},
		repeat: {
			transition: {duration: 3000},
			path: "prompt_again"
		},
	}

  return (
    <ChatBot options={options} flow={flow}>

    </ChatBot>
  );
};

export default MyChatbot ;
