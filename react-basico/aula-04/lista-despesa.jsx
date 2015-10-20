import React from 'react';
import EditorDespesa from './editor-despesa.jsx';

class ListaDespesa extends React.Component{

	constructor(){
		super();
		this.state = {
			despesaEditando: null,
			despesaEditandoIndex: null
		}
	}

	_onClickRemover(index)	{
		if (!this.props.onRemoverDespesa)
		{
			return
		}
		this.props.onRemoverDespesa(index);
	}

	_onClickSalvar(index, despesaEditando)	{
		if (!this.props.onSalvarDespesa)
		{
			return
		}
		this.props.onSalvarDespesa(index, despesaEditando);
		this.setState({
			despesaEditandoIndex: null,
			despesaEditando: null,
		});
	}
	_onChangeDescricaoEditando(e){
		var despesaEditando = this.state.despesaEditando;
		despesaEditando.descricao = e.target.value;
		this.setState({despesaEditando: despesaEditando})
	}
	_onChangeValorEditando(e){
		if (!/^[0-9]*$/.test(e.target.value)){
			return;
		}

		var despesaEditando = this.state.despesaEditando;
		despesaEditando.valor = e.target.value;
		this.setState({despesaEditando: despesaEditando})
	}

	_cancelarEdicao(){
		this.setState({
			despesaEditando: null,
			despesaEditandoIndex: null,
		})
	}


	_editarDespesa(index){
		var despesaEditando = {
			descricao: this.props.despesas[index].descricao,
			valor: this.props.despesas[index].valor,
		}
		this.setState({
			despesaEditandoIndex: index,
			despesaEditando: despesaEditando,
		});
	}

	_alterarDespesa(descricao, valor, index){

	}

  render(){
      var total = this.props.despesas.reduce(function(xpto, item){
        return  xpto + parseInt(item.valor)
      } , 0);
      return(

        <div>
        <ul>
					{this.props.despesas.map((item, index) =>{

						if (index == this.state.despesaEditandoIndex){
							return <li key={index}>
									<EditorDespesa descricao={this.props.despesas[index].descricao} valor={this.props.despesas[index].valor} index={index} onAlterar={(index, despesaEditando) => this._onClickSalvar(index, despesaEditando)} onCancelar={() => this._cancelarEdicao()}></EditorDespesa>
							</li>
						}
						return <li key={index}>
							<button onClick={() => this._onClickRemover(index)}>Remover</button>
							<button onClick={() => this._editarDespesa(index)}>Alterar</button>
							<span>{`${item.descricao} - ${item.valor}`}</span>
						</li>
					})}
				</ul>
				<strong>{`Valor total gasto é ${total}`}</strong>
        </div>
      )
  }

}

export default ListaDespesa;
