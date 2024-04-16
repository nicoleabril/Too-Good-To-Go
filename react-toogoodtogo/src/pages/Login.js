import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  

  render() {


    return (
      <>
        <div>
            <h1>Hola, esta es la pagina de Login de Too Good To Go</h1>
        </div>
      </>
    );
  }
}