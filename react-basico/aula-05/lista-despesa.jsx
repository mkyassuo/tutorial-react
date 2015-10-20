import React from 'react';
import EditorDespesa from './editor-despesa.jsx';
import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';

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
				<div className='row'>
					<Label className='col-md-2 col-xs-12'>Todas as Despesas</Label>
				</div>
				<br />
        <div className='container-fluid'>
					<div className='row'>
						<Label className='col-md-2 col-xs-12'>Item</Label>
						<Label className='col-md-2 col-xs-12'>Alterar</Label>
						<Label className='col-md-2 col-xs-12'>Remover</Label>
					</div>
					<div>
					{this.props.despesas.map((item, index) =>{

						if (index == this.state.despesaEditandoIndex){
							return <div key={index} className='row'>
									<EditorDespesa descricao={this.props.despesas[index].descricao} valor={this.props.despesas[index].valor} index={index} onAlterar={(index, despesaEditando) => this._onClickSalvar(index, despesaEditando)} onCancelar={() => this._cancelarEdicao()}></EditorDespesa>
							</div>
						}
						return <div key={index} className='row'>
							<span className= 'col-md-2 col-xs-12'>{`${item.descricao} - ${item.valor}`}</span>
							<Button className= 'col-md-2 col-xs-12' onClick={() => this._onClickRemover(index)}>Remover</Button>
							<Button className= 'col-md-2 col-xs-12' onClick={() => this._editarDespesa(index)}>Alterar</Button>
						</div>
					})}
					</div>
				</div>
				<br/>
				<br/>
				<br/>
				<div className='row'>
				<Label bsSize="large">Valor total gasto é</Label>{
				//if (total == 0){
					<Label bsSize="large" bsStyle="success"><strong>{` ${total}`}</strong></Label>
				//}
			//	else {
			//		return <Label bsSize="large" bsStyle="danger"><strong>{` ${total}`}</strong></Label>
			//	}
				}
				</div>
        </div>
      )
  }

}

export default ListaDespesa;
