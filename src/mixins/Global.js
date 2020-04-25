const Global = {

  methods: {
    calculaTotal(params) {
      let total = 0;
      params.forEach(element => {
        
        var isReceita = Object.keys(element).find(function(key) { 
          return key == "isPago"; 
        }); 

        if(isReceita) {
          if(element.isPago)
            total += element.valor;
        }else {
          total += element.valor
        }
      });
      return total.toFixed(2);
    },

    getTotalPendentes(receitas) {
      let total = 0;
      receitas.forEach(element => {
        if(!element.isPago)
          total += element.valor;
      })
      return total.toFixed(2);
    },

    getIdUsuario() {
      return 1
    },

    trataErros(error) {
      console.log(error)
      console.log(error.response.data.msg)
      if(error.response == undefined){
        if("Error: Network Error" == error)
          return 'Erro de conexão de rede.'
        else
          return 'Algo deu errado.'
      }
      else{
        if (error.response.data.status == 500)
          return 'Erro interno no servidor.'
        else 
          return error.response.data.msg;
      }
    }
  }
}
export default Global;
