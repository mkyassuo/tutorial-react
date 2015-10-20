import React from 'react';
import EditorDespesa from './editor-despesa.jsx'
import ListaDespesa from './lista-despesa.jsx'

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
			<div>
				<EditorDespesa onIncluir={(descricao, valor) => this._incluirDespesa(descricao,valor)}></EditorDespesa>
				<br/>
				<ListaDespesa despesas={this.state.lista} 
											onRemoverDespesa={(index) => this._removerDespesa(index)}
											onSalvarDespesa={(index, despesaEditando) => this._salvarEdicao(index, despesaEditando)} >
				</ListaDespesa>
			</div>
		);
	}
}
export default App04;
