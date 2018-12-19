import React, { Component } from 'react';

import './App.css';

import Header from './components/Header';
import NewUser from './components/NewUser';
import Toast from './components/Toast';
import User from './models/User';

class App extends Component {
  constructor(props) {
    super(props);
    User.load(
      user => {
        this.state = {user: user};
      }, () => {
        this.state = {user: undefined};
      }
    );
  }

  messageToNewUser(user) {
    this.refs.toast.success(`Seja bem vindo, ${user.name}!`);
  }

  renderNewUser() {
    let user = this.state.user;
    if (user) {
      let style = {
        marginTop: '140px',
        textAlign: 'center',
      };

      return (
        <div style={style}>
          <b>Bullet Journal</b><br />
          {user.toString()}
        </div>
      );
    } else {
      return (
        <NewUser 
          onSubmit={user =>{
            user.save(() => {
              this.setState({
                user: user
              }, () => {
                this.messageToNewUser(user)
              });
            });
          }}
          erro={msg => this.refs.toast.erro(msg) }
        />
      );
    }
     
  }

  render() {
    return (
      <div>
        <Header />
        { this.renderNewUser() }
        <Toast ref="toast" />

      </div>
    );
  }

  
}

export default App;
