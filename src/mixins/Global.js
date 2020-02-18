const Global = {

  methods: {
    calculaTotal(params) { //calculaTotal(this.$store.state.modulos.receitas)
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
    getIdUsuario() {
      return 1
    }
  }
}
export default Global;
