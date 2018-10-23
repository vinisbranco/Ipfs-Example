import React, {Component} from 'react';
import image from './land-fill-icon-hi.png';

export default class Imagepreview extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: true,
        caminho: '',
        imagem: ''
      };
  
    }
  
    componentWillMount() {
      const caminho = "https://ipfs.io/ipfs/" + this.props.hash;
  
      //VALIDA SE É UMA IMAGEM OU OUTRO TIPO DE ARQUIVO
      var img = new Image();
      img.src = caminho;
  
      img.onload = () => {
        this.setValores(caminho, caminho);
      }
      img.onerror = () => {
        this.setValores(caminho, image);
      }
    }
  
    setValores(caminho, imagem) {
      this.setState({ loading: false, caminho: caminho, imagem: imagem });
    }
  
    render() {
      return (
        <div className="row" style={{textAlign : "center", display : "block"}}>
          {
            !this.state.loading
              ?
              <a href={this.state.caminho} target="_blank">
                <img className="img-thumbnail" alt="Foto do Objeto" src={this.state.imagem} style={{ 'width': '160px', 'boxShadow' : '0 1px 3px #ddd'}} />
              </a>
              :
              ""
          }
        </div>
      );
    }
  }