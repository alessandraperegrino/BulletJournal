import React, {Component} from 'react';

import Label from '../Label';
import Input from '../Input';
import Button from '../Button';
import Toast from '../Toast';
import ImageScroller from '../ImageScroller';

import User from '../../models/User';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: new User(),
      validation: {
        invalidName: false,
      },
      completedFirstView: false,
    };
  }

  updateUserName = (event) => {
    let user = this.state.user;
    user.name = event.target.value;
    this.setState({
      user: user
    });
  }

  

  valid = (e) => {
    e.preventDefault();
    let user = this.state.user;
    let validation = this.state.validation;

    validation.invalidName = ! user.validName();

    let message = '';
    let completedFirstView = false;

    if (validation.invalidName) {
      message = 'Por favor, informe seu nome!!!';
    } else {
      completedFirstView = true;
    }

    if (!completedFirstView) {
      this.props.error(message);
    }

    this.setState({
      validation: validation,
      completedFirstView: completedFirstView
    });
  }

  renderName() {
    return (
      <section>
        <Label 
          htmlFor="name" 
          text="Nome:" 
          invalidValue={this.state.validation.invalidName}
        />
        <Input 
          id="name" 
          placeholder="Digite seu nome" 
          maxLength="50" 
          readOnly={this.state.completedFirstView}
          invalidValue={this.state.validation.invalidName}
          defaultValue={this.state.user.name}
          onChange={this.updateUserName}
        />
      </section>
    );
  }

  renderButtons() {
    if (this.state.completedFirstView) {
      return (
        <section>
          <Button 
            text="Voltar" 
            onClick={event => {
              event.preventDefault();
              let user = this.state.user;
              this.setState({
                user: user,
                completedFirstView: false
              });
            }} 
          />
          <Button main
            text="Salvar" 
            onClick={event => {
              event.preventDefault();
              this.props.onSubmit(this.state.user);
            }}
          />
        </section>
      );
    } else {
      return (
        <section>
          <Button main 
            text="Próximo" 
            onClick={this.valid} />
        </section>
      );
    }
  }

  render() {
    return (
      <div className="center">
        <form className="pure-form pure-form-stacked">
          {this.renderName()}
          {this.renderButtons()}
        </form>
      </div>
    );
  }
}

export default NewUser;