<template>
  <!-- <div class="fixed-center col q-px-xl q-gutter-y-sm "> -->
    <div v-if="exibe" class="fixed-center col-12 largura">
      <q-btn unelevated rounded color="pink-10" label="Produtos" class="full-width q-mt-sm" :to="{name: 'produtos'}" ></q-btn>
      <br>
      <q-btn unelevated rounded color="pink-10" label="Receitas" class="full-width q-mt-sm" :to="{name: 'receitas'}"></q-btn>
      <br>
      <q-btn unelevated rounded color="pink-10" label="Despesas" class="full-width q-mt-sm" :to="{name: 'despesas'}" ></q-btn>
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
        exibe: false
      }
  },

  mounted() {
    //let usuario = this.$store.state.modulos.user;
    if(!JSON.parse(localStorage.getItem('usuario')))
      this.$router.push({name: "login"});
    else{
      this.$store.commit('modulos/setTitulo', 'Menu')
      let usuario = JSON.parse(localStorage.getItem('usuario'))
      if (this.$store.state.modulos.user == undefined) {
        this.$store.dispatch('modulos/loadingApp', usuario.id).then((resp) => {
          this.exibe = true;
          if(resp) 
            this.$store.commit('modulos/setUsuario', usuario)
          else 
            this.$store.commit('modulos/setUsuario', undefined)
        })
        .catch(e => {
          this.exibe = true;
        })
      }else {
        this.exibe = true;
      }
    }
  }
}
</script>

<style>
.largura{
  width: 70%;
}
.totalTela{
  width: 100%;
  height: 100%;
}
</style>