<template>
  <!-- <div class="fixed-center col q-px-xl q-gutter-y-sm "> -->
  <div class="q-pa-sm q-mt-sm q-gutter-y-xs">
    <q-list separator inset >

      <q-item clickable v-ripple v-for="(produto) in produtos" :key="produto.id" :to="{name: 'editarProduto', params:{id: produto.id}}">
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

     <q-dialog v-if="0 == produtos.length" v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row">
          <q-avatar icon="delete" color="pink-10" text-color="white" />
          <span class="col-9 q-ml-sm q-mt-sm  ">Você não possui produto cadastrado. Deseja cadastrar?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Não" color="pink-10" v-close-popup @click="$router.go(-1)" />
          <q-btn flat label="Sim" color="pink-10" v-close-popup :to="{name: 'cadastraProduto'}" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import Global from '../mixins/Global'
export default {
  mixins: [Global],
  data() {
      return {
        buttonAdd: true, 
        confirm: false
      }
  },
  computed: {
      produtos() {
          return this.$store.getters['modulos/getProdutos']
      }
  },
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Produtos')
      this.$store.dispatch('modulos/getProdutos').then(qtdeProdutos => {
        this.confirm = 0 == qtdeProdutos;
      })
  },
}
</script>

<style>

</style>