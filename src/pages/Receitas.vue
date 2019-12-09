<template>
  <!-- <div class="fixed-center col q-px-xl q-gutter-y-sm "> -->
  <div class="q-pa-sm q-mt-sm q-gutter-y-xs">
    <q-list separator inset >

      <q-item clickable v-ripple v-for="(receita,i) in receitas" :key="i">
        <!-- <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section> -->

        <q-item-section >
          <q-item-label lines="1"> {{receita.nome}} </q-item-label>
          <q-item-label caption lines="2" >
            <span class="text-weight-bold">Comprador: </span>
            {{receita.comprador}}
            <br>
            <span class="text-weight-bold">Data: </span>
            {{receita.data}}
          </q-item-label>
        </q-item-section>

        <q-item-section side center>
          R$ {{receita.valor.toFixed(2)}}
        </q-item-section>
        
      </q-item>

      <!-- <q-separator inset color="pink-10" /> -->
    </q-list>

    <q-separator color="pink-10" />
    
    <q-list :class="{'total text-bold':buttonAdd, 'background-Color': true}">
        <q-item color="dark">
            <q-item-section >
                <q-item-label lines="1"> Total </q-item-label>
            </q-item-section>
            <q-item-section side center>
                R$ {{$store.state.modulos.totalReceitas}}
            </q-item-section>
        </q-item>    
    </q-list>
    
    <q-page-sticky v-if="buttonAdd" position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="pink-10" :to="{name: 'cadastraReceita'}" />
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
      receitas() {
          return this.$store.state.modulos.receitas;
      }
  },
  beforeMount() {
    this.buttonAdd = this.$route.path.search('lucro') >= 0 ? false : true;
  },
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Receitas')
      this.$store.commit('modulos/totalReceitas', this.calculaTotal(this.$store.state.modulos.receitas))
  }
}
</script>

<style>
.largura{
  width: 70%;
}
.total{
  margin-bottom: 25%;
}
.background-Color {
  background-color: rgb(253, 216, 53);
  
}

</style>