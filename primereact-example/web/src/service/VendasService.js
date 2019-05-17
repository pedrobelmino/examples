import axios from 'axios';

export class VendasService {
    
    getVendas() {
        
        return axios.get('http://localhost:9001/vendas');
    }

    add(venda) {
        return axios.post('http://localhost:9001/vendas', venda);
    }
}