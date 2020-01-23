// import Vue from 'vue'
import Axios from "axios";
import Global from '../../mixins/Global'
import { setDespesas } from "./mutations";

const axios = Axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 20000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

var idUsuario = 0;

export function someAction (/* context */) {
}

export function login(state, dadosLogin) {

    return new Promise((resolve, reject) => {    
        let login = dadosLogin.login;
        let senha = dadosLogin.senha;
        axios.get('/usuarios/login/'+login+'/'+senha).then((resp) => {
            console.log(resp.data)
            state.commit('setUsuario', resp.data)
            idUsuario = state.getters['getUsuarioId']
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
    axios.get('/receitas/usuario/'+idUsuario)
	.then((resp) => {
        console.log(resp.data)
        state.commit('setReceitas', resp.data)
        state.commit( 'totalReceitas', Global.methods.calculaTotal(resp.data) )
	})
	.catch(function (error) {
    	console.log(error);
  });
}

export function gravaReceita (state, receita) {
    receita['usuario'] = new Object();
    receita['usuario']['id'] = idUsuario;

    axios.post('/receitas', receita)
    .then(resp => {
        console.log('Receita cadastrada com sucesso' , resp)
        state.dispatch('getReceitas')
    })
    .catch(error => {
        console.Global(error)
    })
}

export function gravaProduto(state, produto) {
    produto['usuario'] = new Object();
    produto['usuario']['id'] = idUsuario;

    axios.post('/produtos', produto)
    .then(resp => {
        console.log(resp)
        state.commit('addProduto', resp.data)
    })
    .catch(error => {
        console.log(error)
    })
}

export function gravaDespesa(state, despesa) {
    despesa['usuario'] = new Object();
    despesa['usuario']['id'] = idUsuario;
    console.log(despesa)
    axios.post('/despesas', despesa)
    .then(resp => {
        console.log(resp.data)
        state.dispatch('getDespesas')
    })
    .catch(error => {
        console.log(error)
    })
}

export function getDespesas(state) {
    idUsuario =  Global.methods.getIdUsuario()
    axios.get('/despesas/usuario/' + idUsuario)
    .then(resp => {
        console.log(resp)
        state.commit('setDespesas', resp.data)
        state.commit('totalDespesas', Global.methods.calculaTotal(resp.data) )
    })
    .catch(error => {
        console.log(error)
    })
}

export function getTiposDespesas (state) {
    axios.get('/tiposDespesa')
    .then(resp => {
        console.log(resp)
        state.commit('setTiposDespesa', resp.data)

    })
    .catch(error => {
        console.log(error);
    })
}

export function editaProduto(state, parametrosDaRequisicao) {
    console.log(state.getters['getUsuario'])
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
    axios.get('/produtos/usuario/'+ idUsuario)
    .then((resp) => {
        state.commit('setProdutos', resp.data)
    })
    .catch(error => {
        console.log(error)
    })
}
