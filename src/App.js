import React, { Component } from 'react';
import './App.css';
import IPFS from './ipfs.js';
import Imagepreview from './Imagepreview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arquivo: '',
      imagem: '',
      ultimoHash : ''
    }
  }

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };

  convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    this.setState({ arquivo: buffer });
  };

  submitForm = async (event) => {
    event.preventDefault();

    //ADICIONA O ARQUIVO NO IPFS
    await IPFS.add(this.state.arquivo,
      (err, ipfsHash) => {
        console.log(err, ipfsHash);
        this.setState({ ultimoHash: ipfsHash[0].hash });
      }
    );
    // THIS.STATE.ULTIMOHASH VAI SER ADICIONADO NO BANCO 
  }

  render() {
    const caminho = "https://ipfs.io/ipfs/" + this.state.ultimoHash;
    return (
      <div className="App">
        Ultimo hash adicionado: <a href={this.state.ultimoHash !== "" ? caminho : "/"}>{this.state.ultimoHash}</a> <br />
        <form onSubmit={this.submitForm.bind(this)}>
          <input type="file" onChange={this.captureFile.bind(this)} />
          <button type="submit">Enviar</button>
        </form>
        {
          this.state.ultimoHash !== ""
            ?
            <Imagepreview hash={this.state.ultimoHash} />
            :
            ""
        }
      </div>
    );
  }
}

export default App;
