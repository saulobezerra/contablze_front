<template>
  <!-- <div class="fixed-center col q-px-xl q-gutter-y-sm "> -->
  <!-- <div class="fixed-center col-12 largura">
  </div> -->
  <div class="q-pa-sm q-mt-sm q-gutter-y-xs">
    <q-list separator inset >

      <q-item clickable v-ripple v-for="(despesa,i) in despesas" :key="i">
        <!-- <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section> -->

        <q-item-section >
          <q-item-label lines="1"> {{despesa.nome}} </q-item-label>
          <q-item-label caption lines="2" >
            <span class="text-weight-bold">Local: </span>
            {{despesa.local}}
            <br>
            <span class="text-weight-bold">Data: </span>
            {{despesa.data}}
          </q-item-label>
        </q-item-section>

        <q-item-section side center>
          R$ {{despesa.valor}}
        </q-item-section>
        
      </q-item>

      <!-- <q-separator inset color="pink-10" /> -->
    </q-list>

    <q-separator color="pink-10" />
    
    <q-list class="total text-bold">
        <q-item >
            <q-item-section>
                <q-item-label lines="1"> Total </q-item-label>
            </q-item-section>
            <q-item-section side center>
                R$ {{$store.state.modulos.totalDespesas}}
            </q-item-section>
        </q-item>    
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="pink-10" :to="{name: 'cadastraDespesa'}" />
    </q-page-sticky>
  </div>
</template>

<script>
import Global from '../mixins/Global'
export default {
  mixins:[Global],
  data() {
      return {
      }
  },
  computed: {
      despesas() {
          return this.$store.state.modulos.despesas;
      }
  },
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Despesas');
      this.$store.commit('modulos/totalDespesas', this.calculaTotal(this.$store.state.modulos.despesas)); 
  }
}
</script>

<style>
.largura{
  width: 70%;
}
.total{
  background-color: rgb(253, 216, 53);
  margin-bottom: 25%;
}
</style>