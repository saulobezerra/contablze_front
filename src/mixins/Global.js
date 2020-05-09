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
    }
  }
}
export default Global;
