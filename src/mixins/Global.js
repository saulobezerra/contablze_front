const Global = {
  methods: {
    calculaTotal(params) { //calculaTotal(this.$store.state.modulos.receitas)
      let total = 0;
      params.forEach(element => {
          total += element.valor
      });
      return total.toFixed(2);
    }
  }
}
export default Global;
