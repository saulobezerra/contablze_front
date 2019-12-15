<template>
  <!-- <div class="fixed-center col q-px-xl q-gutter-y-sm "> -->
  <div class="q-pa-sm q-mt-sm q-gutter-y-xs">
    <q-list separator inset >

      <q-item clickable v-ripple v-for="(produto,i) in produtos" :key="i" :to="{name: 'editarProduto', params:{id: i}}">
        <!-- <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section> -->

        <q-item-section >
          <q-item-label lines="1"> {{produto.nome}} </q-item-label>
          <q-item-label caption lines="2" >
          </q-item-label>
        </q-item-section>

        <q-item-section side center>
          R$ {{produto.valor.toFixed(2)}}
        </q-item-section>
        
      </q-item>

      <!-- <q-separator inset color="pink-10" /> -->
    </q-list>

    <q-separator color="pink-10" />

    <q-page-sticky v-if="buttonAdd" position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="pink-10" :to="{name: 'cadastraProduto'}" />
    </q-page-sticky>
  </div>
</template>

<script>
import Global from '../mixins/Global'
export default {
  mixins: [Global],
  data() {
      return {
        buttonAdd: true
      }
  },
  computed: {
      produtos() {
          return this.$store.state.modulos.produtos;
      }
  },
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Produtos')
  }
}
</script>

<style>

</style>