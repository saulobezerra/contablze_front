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
    let login = dadosLogin.login;
    let senha = dadosLogin.senha;
    console.log(dadosLogin)
    axios.get('/usuarios/login/'+login+'/'+senha).then((resp) => {
        resp.data.senha = '******'
        state.commit('setUsuario', resp.data)
    })
    .catch(function (error) {
        console.log(error);
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

