<template>
  <!-- <div class="fixed-center col q-px-xl q-gutter-y-sm "> -->
  <div class="fixed-center col-12 largura">
      <q-btn unelevated rounded color="pink-10" label="Receitas" class="full-width q-mt-sm" :to="{name: 'receitas'}"></q-btn>
      <br>
      <q-btn unelevated rounded color="pink-10" label="Despesas" class="full-width q-mt-sm" :to="{name: 'despesas'}" ></q-btn>
      <br>
      <q-btn unelevated rounded color="pink-10" label="Produtos" class="full-width q-mt-sm" :to="{name: 'produtos'}" ></q-btn>
      <br>
      <q-btn unelevated rounded color="pink-10" label="Lucros"  class="full-width q-mt-sm" :to="{name: 'lucro'}" ></q-btn>
      <br>
      <q-btn unelevated rounded color="pink-10" label="Meus Dados" class="full-width q-mt-sm" :to="{name: 'perfil'}" ></q-btn>
      <br>
  </div>
</template>

<script>

import Global from '../mixins/Global'
export default {
  mixins: [Global],
  data() {
      return {
        
      }
  },
  mounted() {
    this.$store.commit('modulos/setTitulo', 'Menu');
    this.$store.commit('modulos/totalReceitas', this.calculaTotal(this.$store.state.modulos.receitas))
    this.$store.commit('modulos/totalDespesas', this.calculaTotal(this.$store.state.modulos.despesas));

    this.$store.dispatch('modulos/getProdutos')
  }
}
</script>

<style>
.largura{
  width: 70%;
}
</style>