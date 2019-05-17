import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {VendasService} from './../service/VendasService';
import {Panel} from 'primereact/panel';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
 

export class VendasPage  extends Component {

    constructor(props){
        super(props);
        this.vendasService = new VendasService();
        this.state = {
            vendas : [], selectedVenda: {produto:"", id:""}
        }	
        //this.handleChange = this.handleChange.bind(this);
        this.handleAddProduto = this.handleAddProduto.bind(this);
    }

   
    
    handleAddProduto(event) {
        event.preventDefault();
        console.log(this.state.selectedVenda.produto);
        const chamada = this.vendasService.add({id:this.state.selectedVenda.id, produto:this.state.selectedVenda.produto})
        chamada.then(()=>this.refresh())
    }

    refresh(){  
        this.vendasService.getVendas().then(response =>{ 
            const vendas = response.data;
            this.setState ( {...this.state, vendas});  
        });
    }
    
    componentDidMount() {
       this.refresh();
    }

    render() {
        return (
        <div >
            <form >
            <Panel header="Venda" >
                    <div className="card card-w-title">
                            <h1>Cadastro</h1>
                            <div className="p-grid">
                                <div className="p-col-12 p-md-2">
                                    <label htmlFor="idInput">ID</label>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <InputText placeholder="id"  id="idInput"  name="idInput"
                                    value={this.state.selectedVenda.id} onChange={(event)=>this.setState({...this.state, selectedVenda:{...this.state.selectedVenda, id:event.target.value}})} />        
                                </div>
                            </div>
                            <div className="p-grid">
                                <div className="p-col-12 p-md-2">
                                    <label htmlFor="produtoInput">Produto</label>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <InputText placeholder="produto"  id="produtoInput"  name="produtoInput"
                                        value={this.state.selectedVenda.produto} onChange={(event)=>this.setState({...this.state, selectedVenda:{...this.state.selectedVenda, produto:event.target.value}})} />        
                                </div>
                            </div>
                    </div>               
                       
                    <Button  label="Salvar" onClick={this.handleAddProduto} />
              
            </Panel>
            </form>
            
            <div className="card">
                <h1 style={{fontSize:'16px'}}>Vendas</h1>
                <DataTable value={this.state.vendas} paginator={true} rows={5}
                 style={{marginBottom: '20px'}} responsive={true}
                    selectionMode="single"  >
                    <Column field="id" header="ID" sortable={true} />
                    <Column field="produto" header="Produto" sortable={true} />
                </DataTable>
            </div>
                        
            
        </div>
        )
       
    }
}
