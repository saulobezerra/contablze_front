import Vue from 'vue'
import Axios from 'axios';
import {Loading} from 'quasar';

const axios = Axios.create({
    baseURL: 'https://contablz-e.herokuapp.com',
    // baseURL: 'http://localhost:8080',
    // baseURL: 'http://192.168.0.103:8080',
    timeout: 35000,
    headers: {
        'Authorization': ''
    }
    //{'X-Custom-Header': 'foobar'}
});

axios.interceptors.response.use(
    function (response) {
        Loading.hide();

        return response;
    }, 
    function (error) {
        // console.log(error.response)
        Loading.hide()
        let objErro;
        if (error.response != undefined || error.response != null){
            if(error.response.status >= 500) {
                objErro = {
                    msg: "Error ao executar a operação.",
                    acao: 'erro',
                    status: error.response.status
                }
            }else if(error.response.status == 403) {
                objErro = {
                    msg: '',
                    acao: '',
                    status: 0
                }
            } else {
                objErro = {
                    msg: error.response.data.message || "Erro desconhecido",
                    acao: 'erro',
                    status: error.response.status
                }
            }
            Vue.prototype.$store.commit('modulos/setObjMensagem', objErro);
        }else {
            objErro = {msg: "Erro de conexão.", acao: 'erro'}
            Vue.prototype.$store.commit('modulos/setObjMensagem', objErro);
        }

        return Promise.reject(objErro);
    }
);

axios.interceptors.request.use(
    function (response) {
        // console.log(response);
        if (response.url.indexOf("login") < 0) {
            response.headers.Authorization = localStorage.getItem('token');
        }

        if (response.url.indexOf("loadingInicial") < 0) {
            Loading.show({
                spinnerSize: 50,
                spinnerColor: 'yellow'
            })
        } else {
            Loading.show({
                spinnerSize: 50,
                spinnerColor: 'yellow',
                customClass: 'classLoading'
            })
            response.url = response.url.replace('loadingInicial', 'usuarios/usuarioLogado')
            
        }
        return response;
    }, 
    function (error) {
        // console.log(error)
        return Promise.reject(error);
    }
);

export default axios;
