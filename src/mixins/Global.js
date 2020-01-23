const Global = {

  methods: {
    calculaTotal(params) { //calculaTotal(this.$store.state.modulos.receitas)
      let total = 0;
      params.forEach(element => {
          total += element.valor
      });
      console.log(total, "total");
      return total.toFixed(2);
    },
    getIdUsuario() {
      return 1
    }
  }
}
export default Global;
