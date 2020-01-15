// import Vue from 'vue'
import Axios from "axios";

const axios = Axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 20000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

export function someAction (/* context */) {
}

export function login(state, dadosLogin) {

    return new Promise((resolve, reject) => {    
        let login = dadosLogin.login;
        let senha = dadosLogin.senha;
        axios.get('/usuarios/login/'+login+'/'+senha).then((resp) => {
            resp.data.senha = '******'
            state.commit('setUsuario', resp.data)
            resolve(true)
        })
        .catch(function (error) {
            reject(error)
        })
    })
}

export function gravaUsuario(state, usuario) {
    console.log(usuario)
    return new Promise((resolve, reject) => {
        
        axios.post('/usuarios', usuario).then((resp) => {
            console.log("Cadastro realizado com sucesso", resp.data);
            //Pode já gravar no state em user
            resolve(true)
        })
        .catch( (error) => {
            //console.log(error);
            reject(error)
        })
    }) 
}

export function getUsers() {
    console.log("request users");
    axios.get('/users').then((resp) => {
        console.log(resp.data);
    });
}

export function getReceitas (state) {
	axios.get('/receitas')
	.then((resp) => {
		state.commit('setReceitas', resp.data)
	})
	.catch(function (error) {
    	console.log(error);
  });
}

export function gravaProduto(state, produto) {
    produto['usuario'] = state.getters['getUsuario']
    axios.post('/produtos', produto)
    .then(resp => {
        console.log(resp)
        state.commit('addProduto', resp.data)
    })
    .catch(error => {
        console.log(error)
    })
}

export function editaProduto(state, parametrosDaRequisicao) {
    console.log(state.getters['getUsuario'])
    parametrosDaRequisicao['produto']['usuario'] = state.getters['getUsuario']
    console.log(parametrosDaRequisicao)
    axios.put('/produtos/'+parametrosDaRequisicao.idProd, parametrosDaRequisicao.produto)
    .then((resp) => {
        state.dispatch('getProdutos')
    })
    .catch(error => {
        console.log(error)
    })
}

export function getProdutos(state) {
    let idUsuario = state.getters['getUsuarioId']
    axios.get('/produtos/usuario/'+ idUsuario)
    .then((resp) => {
        state.commit('setProdutos', resp.data)
    })
    .catch(error => {
        console.log(error)
    })
}
