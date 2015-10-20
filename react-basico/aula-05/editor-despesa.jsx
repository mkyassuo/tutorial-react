import React from 'react';
import Button from 'react-bootstrap/lib/Button';

class EditorDespesa extends React.Component{

	constructor(props){
		super(props);
		this.state = {
				descricao:props.descricao || '',
				valor: props.valor || 0
		}
	}

	_onClickAlterar(){
     if (!this.props.onAlterar)
      {
        return
      }
			var despesaEditando = {
				descricao: this.state.descricao,
				valor: this.state.valor,
			}
     this.props.onAlterar(this.props.index, despesaEditando);
     this.setState({
         descricao:'',
         valor: 0
     })
  }



	_onClickCancelar(){
		 if (!this.props.onCancelar)
			{
				return
			}
		 this.props.onCancelar();
		 this.setState({
				 descricao:'',
				 valor: 0
		 })
	}

  _onClickIncluir(){
     if (!this.props.onIncluir)
      {
        return
      }
     this.props.onIncluir(this.state.descricao,this.state.valor);
     this.setState({
         descricao:'',
         valor: 0
     })
  }

  _onChangeDescricao(e){
    this.setState({descricao: e.target.value})
  }

  _onChangeValor(e){
    if (!/^[0-9]*$/.test(e.target.value)){
      return;
    }
    this.setState({valor: e.target.value})
  }

  render(){
      return(
				<div>
				<div className='row'>
          <input className='col-md-2 col-xs-12'
            value={this.state.descricao}
            onChange={(e) => this._onChangeDescricao(e)}
            type="text" placeholder="digite aqui o nome da despesa"/>

          <input className='col-md-2 col-xs-12'
            value={this.state.valor}
            onChange={(e) => this._onChangeValor(e)}
            type="text" placeholder="$$$$$"/>

          {
            this.props.onIncluir
              ?
                <Button
                  disabled={this.state.descricao.length == 0 ||
                    parseInt(this.state.valor) <= 0}
                  onClick={() => this._onClickIncluir()}
                  >Incluir</Button>
              :
							<div>
							<Button
								onClick={() => this._onClickAlterar()}
								>Alterar</Button>
								<Button
									onClick={() => this._onClickCancelar()}
									>Cancelar</Button>
							</div>
          }

          </div>
					</div>
      )
  }

}

export default EditorDespesa;
