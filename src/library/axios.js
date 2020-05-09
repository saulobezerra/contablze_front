import Vue from 'vue'
import Axios from 'axios';
import {Loading} from 'quasar';

const axios = Axios.create({
    //baseURL: 'https://contablz-e.herokuapp.com',
    baseURL: 'http://localhost:8080',
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
        Loading.hide()
        let objErro;
        console.log(error.response)
        if (error.response != undefined || error.response != null){
            console.log(error.response.data.message)
            if(error.response.data.status >= 500) {
                objErro = {
                    msg: "Error ao executar a operação.",
                    acao: 'erro',
                    status: error.response.data.status
                }
            }else {
                objErro = {
                    msg: error.response.data.message,
                    acao: 'erro',
                    status: error.response.data.status
                }
            }
            Vue.prototype.$store.commit('modulos/setObjMensagem', objErro);
        }else {
            console.log(error.response, "Erro não definido")
            objErro = {msg: "Erro durante a comunicação.", acao: 'erro'}
            Vue.prototype.$store.commit('modulos/setObjMensagem', objErro);
        }

        return Promise.reject(objErro);
    }
);

axios.interceptors.request.use(
    function (response) {
        console.log(response);
        if (response.url.indexOf("login") < 0) {
            response.headers.Authorization = localStorage.getItem('token');
        }

        if (response.url.indexOf("loadingApp") < 0) {
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
            response.url = response.url.replace('loadingApp', 'usuarioLogado')
        }

        return response;
    }, 
    function (error) {
        return Promise.reject(error);
    }
);

export default axios;
