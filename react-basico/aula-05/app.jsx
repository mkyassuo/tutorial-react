import React from 'react';
import EditorDespesa from './editor-despesa.jsx'
import ListaDespesa from './lista-despesa.jsx'
import Panel from 'react-bootstrap/lib/Panel';
import Label from 'react-bootstrap/lib/Label';

class App04 extends React.Component{

	constructor(){
		super();
		this.state = {
			lista:[],
		}
	}

	_incluirDespesa(descricao, valor){
		var lista = this.state.lista;
		lista.push({
			descricao: descricao,
			valor:  valor,
		})

		this.setState({
			lista: lista
		})
	}

	_salvarEdicao(index, despesaEditando){
		var lista = this.state.lista;
		lista[index] = despesaEditando;
		this.setState({
			lista: lista,
		})
	}

	_removerDespesa(index){
		var lista = this.state.lista
		lista.splice(index,1);
		this.setState({
			lista: lista,
		})
	}

	render(){
		var total = this.state.lista.reduce((total, item)=> total + parseInt(item.valor), 0);
		return (
			<Panel header={'Aula React'} bsStyle="primary">
				<div className='container-fluid'>
				<div className='row'>
					<Label className='col-md-2 col-xs-12'>Despesas</Label>
				</div>
				<br />
				<EditorDespesa onIncluir={(descricao, valor) => this._incluirDespesa(descricao,valor)}></EditorDespesa>
				<br/>
				<ListaDespesa despesas={this.state.lista}
											onRemoverDespesa={(index) => this._removerDespesa(index)}
											onSalvarDespesa={(index, despesaEditando) => this._salvarEdicao(index, despesaEditando)} >
				</ListaDespesa>
				</div>
			</Panel>
		);
	}
}
export default App04;
