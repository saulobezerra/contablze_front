<template>
  <div class="q-pa-md q-mt-md" style="max-width: 400px">

    <q-form
      class="q-gutter-y-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        rounded
        filled
        color="pink-10"
        v-model="produto.nome"
        label="Nome *"
        hint="Nome do produto/serviço"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o nome do produto/serviço.']"
      />

      <q-input
        filled
        rounded
        type="number"
        step=".01"
        color="pink-10"
        v-model="produto.valor"
        label="Valor *"
        hint="Valor do produto"
        lazy-rules
        :rules="[
          val => val > 0 || 'Informe o valor d0 produto'
        ]"
      />

      <div class="full-width q-mt-lg q-gutter-x-xs" >
        <q-btn outline rounded class="glossy half-width" label="Limpar" type="reset" color="pink-10" />
        <q-btn rounded class="glossy half-width" label="Cadastrar" type="submit" color="pink-10"/>
      </div>
    </q-form>

  </div>
</template>
<script>
export default {
  data() {
      return {
        produto: {
            id: null,
            nome: '',
            valor: null
        }  
      }
  },
  
  mounted() {
      if (this.$route.name == 'editarProduto') {
          this.$store.commit('modulos/setTitulo', 'Editar Produto');
          this.produto.id = this.$store.getters['modulos/getProdutos'][this.$route.params.id].id
          this.produto.nome = this.$store.getters['modulos/getProdutos'][this.$route.params.id].nome
          this.produto.valor = this.$store.getters['modulos/getProdutos'][this.$route.params.id].valor
      }else {
          this.$store.commit('modulos/setTitulo', 'Cadastrar Produto');
      }
  },
  methods: {
    onSubmit() {
      this.produto.valor = parseFloat(this.produto.valor);
      if (this.$route.name == 'editarProduto'){
          this.$store.commit('modulos/editaProduto', this.produto );
      }else {
          this.produto.id = this.$store.getters['modulos/getProdutos'].length;
          // console.log(this.$store.getters['modulos/getProdutos'].length, this.produto.id);
          this.$store.commit('modulos/addProduto', this.produto );
      }
      this.$router.replace({name: "produtos"})
    },
    onReset() {
      this.produto.nome = '';
      this.produto.valor = null;
    }
  }
}
</script>

<style>
.half-width{
  width: 48%;
}
</style>