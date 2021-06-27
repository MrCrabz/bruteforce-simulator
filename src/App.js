import React, { useState, useEffect, Component } from 'react';

import parse from 'html-react-parser';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          plainText: '',
          outputCipher: [],
          cypherMax: 26,
      };
      this.capturePlainText = this.capturePlainText.bind(this);
      this.caesarCipher = this.caesarCipher.bind(this);
    }


  capturePlainText(event) {
    this.setState({plainText: event.target.value});
  }

  caesarCipher() {
    let arrayofCiphers = [];
    for (var cypherLevel = 1; cypherLevel < this.state.cypherMax; cypherLevel++) {

      // list of answers array
      // Captures the given plain text
      let currentPlainText = this.state.plainText;
      // Removes the spaces from the given plain text
      currentPlainText = currentPlainText.replace(/\s/g, '');
      // Decomposes the word into individual letters
      let arrayofLetters = currentPlainText.split('');

      // Cipher output
      let cipherOutput = '';

      // Magic Sauce
      // Go through each character
      for (var i = 0; i < currentPlainText.length; i++) {
        // Get the character we'll be appending
        var c = arrayofLetters[i];

        // If it's a letter...
        if (c.match(/[a-z]/i)) {
          // Get its code
          var code = currentPlainText.charCodeAt(i);

          // Uppercase letters
          if (code >= 65 && code <= 90) {
            c = String.fromCharCode(((code - 65 + cypherLevel) % 26) + 65);
          }

          // Lowercase letters
          else if (code >= 97 && code <= 122) {
            c = String.fromCharCode(((code - 97 + cypherLevel) % 26) + 97);
          }
        }

        // Append
        cipherOutput += c;
      }

      arrayofCiphers[cypherLevel-1] = "<p class='outputLine' id='output1'><span class='decryptionLevel dark'>K" + cypherLevel + ":</span><span class='decryptionOutput dark'>" + cipherOutput + "</span></p>";

    }
    this.setState({outputCipher: arrayofCiphers});
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="lateral lateralLeft col-lg-6 col-12">

              <div className="encryptionInput">
                <input
                  type="text"
                  id="plainText"
                  placeholder="Type a phrase to..."
                  value={this.state.plainText}
                  onChange={this.capturePlainText}
                />
                <button
                  id="executionButton"
                  className="button"
                  onClick={this.caesarCipher}
                >
                  Encrypt
                </button>
              </div>

            </div>

            <div className="lateral lateralRight col-lg-6 col-12">

              <div className="outputBox">
                {parse(this.state.outputCipher.join(" ").toString())}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default App;
