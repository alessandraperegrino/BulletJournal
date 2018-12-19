import React, {Component} from 'react';

import Label from '../Label';

class TextBox extends Component {
  render() {
    return (
      <div className="center">
        <form className="pure-form pure-form-stacked">
          <p>Titulo da nota:</p>
        </form>
      </div>
    );
  }
}

export default TextBox;
