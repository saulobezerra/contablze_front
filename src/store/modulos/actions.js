// import Vue from 'vue'
import Axios from "axios";

const axios = Axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 20000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

export function someAction (/* context */) {
}

export function getUsers() {
    console.log("request users");
    axios.get('/users').then((resp) => {
        console.log(resp.data);
    });
}


