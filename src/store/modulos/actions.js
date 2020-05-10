import axios from "../../library/axios";
import Global from '../../mixins/Global'
import VueJwtDecode from 'vue-jwt-decode'

var idUsuario;

export function login(state, dadosLogin) {

    return new Promise((resolve, reject) => {
        let objLogin = {
            email: dadosLogin.login,
            senha: dadosLogin.senha
        }
        axios.post('/login', objLogin).then((resp) => {
            state.commit('setToken', resp.headers.authorization);
            resolve()
        })
        .catch(function (error) {
            reject(error)
        })
    })
}

export function gravaUsuario(state, usuario) {
    console.log(usuario)
    return new Promise((resolve, reject) => {
        
        axios.post('/usuarios', usuario).then(() => {
            let objMsg = {
                msg: 'Cadastro realizado com sucesso!',
                acao: 'confirma'
            }
            state.commit('setObjMensagem', objMsg);
            resolve()
        })
        .catch( (error) => {
            console.log(error)
            reject()
        })
    }) 
}

export function editarUsuario (state, user) {
    console.log(idUsuario)
    axios.put('/usuarios/' + idUsuario, user)
    .then((resp) => {
        state.commit('setUsuario', resp.data)
        let objMsg = {
            msg: 'Dados atualizados com sucesso!',
            acao: 'confirma'
        }
        state.commit('setObjMensagem', objMsg);
    })
    .catch(() => {
        reject()
    })
}

export function getUsuario(state) {
    return new Promise((resolve, reject) => {
        axios.get('usuarios/usuarioLogado')
        .then((resp) => {
            idUsuario = resp.data.id;
            state.commit('setUsuario', resp.data);
            resolve()
       })
       .catch(() => {
            reject()
       });
    })
}

export function loadingApp() {
    console.log("request users");
    return new Promise((resolve, reject) => {
        axios.get('/loadingApp/'+idUsuario)
        .then((resp) => {
            if((resp.data.email == usuarioGlobal.email) && (resp.data.userName == usuarioGlobal.userName))
                resolve(true)
            else
                resolve(false)
        }).catch(() => {
            reject()
       });
    })
}

export function getReceitas (state) {
    return new Promise((resolve) => {
        axios.get('/receitas')
        .then((resp) => {
            state.commit('setReceitas', resp.data)
            state.commit('totalReceitas', Global.methods.calculaTotal(resp.data) )
            state.commit('setTotalReceitasPendentes', Global.methods.getTotalPendentes(resp.data) )
            resolve(resp.data.length)
        })
        .catch(() => {
            reject()
      });
    })
}

export function getReceitasPorMes (state, periodo) {
    return new Promise((resolve) => {
        axios.get('/receitas/periodo?mes='+periodo.mes+'&ano='+periodo.ano)
        .then((resp) => {
            state.commit('setReceitas', resp.data)
            state.commit('totalReceitas', Global.methods.calculaTotal(resp.data) )
            state.commit('setTotalReceitasPendentes', Global.methods.getTotalPendentes(resp.data) )
            resolve(resp.data.length);
        })
        .catch(() => {
            reject()
        });
    })
}

export function gravaReceita (state, receita) {
    receita['usuario'] = new Object();
    receita['usuario']['id'] = idUsuario;
    axios.post('/receitas', receita)
    .then(resp => {
        console.log('Receita cadastrada com sucesso' , resp)
        let objMsg = {
            msg: 'Receita cadastrada com sucesso!',
            acao: 'confirma'
        }
        state.commit('setObjMensagem', objMsg);
    })
    .catch(() => {
    })
}

export function editarReceita (state, parametrosDaRequisicao) {
    console.log(parametrosDaRequisicao)
    axios.put('/receitas/' + parametrosDaRequisicao.idReceita, parametrosDaRequisicao.receita)
    .then(() => {
        state.dispatch('getReceitas')
    })
}

export function editarDespesa (state, parametrosDaRequisicao) {
    axios.put('/despesas/' + parametrosDaRequisicao.idDespesa, parametrosDaRequisicao.despesa)
    .then(resp => {
        //state.commit('addProduto', resp.data)
        state.dispatch('getDespesas')
        console.log('Despesa alterada com sucesso', resp.data)
        let objMsg = {
            msg: 'Despesa atualizada com sucesso!',
            acao: 'confirma'
        }
        state.commit('setObjMensagem', objMsg);
    })
}

export function gravaProduto(state, produto) {
    produto['usuario'] = new Object();
    produto['usuario']['id'] = idUsuario;

    axios.post('/produtos', produto)
    .then(() => {
        //state.commit('addProduto', resp.data)
        let objMsg = {
            msg: 'Produto cadastrado com sucesso!',
            acao: 'confirma'
        }
        state.commit('setObjMensagem', objMsg);
    })
}

export function gravaDespesa(state, despesa) {
    despesa['usuario'] = new Object();
    despesa['usuario']['id'] = idUsuario;
    console.log(despesa)
    axios.post('/despesas', despesa)
    .then(resp => {
        let objMsg = {
            msg: 'Despesa cadastrada com sucesso!',
            acao: 'confirma'
        }
        state.commit('setObjMensagem', objMsg);
    })
}

export function getDespesas(state) {
    return new Promise((resolve) => {
        axios.get('/despesas')
        .then(resp => {
            let despesas = resp.data;
            state.commit('setDespesas', despesas)
            state.commit('totalDespesas', Global.methods.calculaTotal(despesas) )
            resolve(despesas.length)
        })
        .catch(error => {
            reject(error)
        })
    })
} 

export function getDespesasPorMes(state, periodo) {
    return new Promise((resolve) => {
        axios.get('/despesas/periodo?mes=' + periodo.mes + '&ano=' + periodo.ano)
        .then(resp => {
            state.commit('setDespesas', resp.data)
            state.commit('totalDespesas', Global.methods.calculaTotal(resp.data) )
            resolve(resp.data.length)
        })
        .catch(error => {
            reject(error)
        })
    })
} 

export function deletarDespesa(state, idDespesa) {

    return new Promise((resolve, reject) => {  
        axios.delete('/despesas/'+idDespesa)
        .then( () => {
            let objMsg = {
                msg: 'Despesa excluída!',
                acao: 'confirma'
            }
            state.commit('setObjMensagem', objMsg);
            resolve()
        })
        .catch(() => {
            reject()
        })
    }) 
}

export function deletarReceita(state, idReceita) {

    return new Promise((resolve, reject) => {  
        axios.delete('/receitas/'+idReceita)
        .then( () => {
            let objMsg = {
                msg: 'Receita excluída!',
                acao: 'confirma'
            }
            state.commit('setObjMensagem', objMsg);
            resolve()
        })
        .catch(() => {
            reject()
        })
    }) 
}

export function deletarProduto(state, idProduto) {

    return new Promise((resolve, reject) => {  
        axios.delete('/produtos/'+idProduto)
        .then( () => {
            let objMsg = {
                msg: 'Produto excluído!',
                acao: 'confirma'
            }
            state.commit('setObjMensagem', objMsg);
            resolve()
        })
        .catch(error => {
            reject(error)
        })
    }) 
} 

export function getTiposDespesas (state) {
    axios.get('/tiposDespesa')
    .then(resp => {
        console.log(resp)
        state.commit('setTiposDespesa', resp.data)

    })
}

export function editaProduto(state, parametrosDaRequisicao) {
    axios.put('/produtos/'+parametrosDaRequisicao.idProd, parametrosDaRequisicao.produto)
    .then((resp) => {
        state.dispatch('getProdutos')
    })
}

export function getProdutos(state) {
    return new Promise((resolve, reject) => {
        axios.get('/produtos')
        .then((resp) => {
            state.commit('setProdutos', resp.data)
            console.log(resp.data)
            resolve(resp.data.length);
        })
        .catch(error => {
            reject();
        })
    } ) 
}

export function getLucrosDefault(state) {
    axios.get('/lucros')
    .then(resp => {
        state.commit('setLucrosDefault', resp.data)
    })
}

export function inspectToken(state){
    let token = (localStorage.getItem('token'));
    console.log("Verificando token ", token)
    if(token){
        token = token.substring(7);
        let decoded = VueJwtDecode.decode(token);
        let exp = decoded.exp;
        // let email = decoded.sub;
        // let alg = decoded.alg;
        let tempoExpiracao = exp - (Date.now()/1000)
        if(tempoExpiracao >= 0 && tempoExpiracao < 60){
            console.log("rerfes")
            refreshToken(state)
        }
    }
}

export function refreshToken(state) {
    axios.post('/auth/refresh_token')
    .then(resp => {
        console.log("refreh token Sucess", resp.headers.authorization)
        state.commit('setToken', resp.headers.authorization)
    })
    .catch(error => {
        console.log("refreh token Fail")
        console.log(error)
    })
}