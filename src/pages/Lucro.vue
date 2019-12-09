<template>

  <div class="q-pa-sm q-mt-sm q-gutter-y-xs">
    <q-list separator inset >

      <q-item clickable v-ripple @click="$router.push({name: 'receita'})">

        <q-item-section >
          <q-item-label lines="1"> Receitas </q-item-label>
        </q-item-section>

        <q-item-section side center>
          {{$store.state.modulos.totalReceitas}}
        </q-item-section>
        
      </q-item>

      <q-item clickable v-ripple @click="$router.push({name: 'despesas'})">

        <q-item-section >
          <q-item-label lines="1"> Despesas </q-item-label>
        </q-item-section>

        <q-item-section side center>
          {{$store.state.modulos.totalDespesas}}
        </q-item-section>
        
      </q-item>
      <!-- <q-separator inset color="pink-10" /> -->
    </q-list>

    <q-separator color="pink-10" />
    
    <q-list class="total text-bold">
        <q-item >

        <q-item-section >
          <q-item-label lines="1"> Lucro </q-item-label>
        </q-item-section>

        <q-item-section side center>
          {{lucro}}
        </q-item-section>
        
      </q-item>    
    </q-list>
  </div>
</template>
<script>
import Global from '../mixins/Global'
export default {
    mixins: [Global],
    computed: {
        lucro() {
            return this.$store.state.modulos.totalReceitas - this.$store.state.modulos.totalDespesas;
        }
    },
    mounted() {
        this.$store.commit('modulos/totalReceitas', this.calculaTotal(this.$store.state.modulos.receitas))
        this.$store.commit('modulos/totalDespesas', this.calculaTotal(this.$store.state.modulos.despesas)); 
    }
}
</script>
<style>

.corAzul{
    background-color: blue
}
.total{
  background-color: rgb(253, 216, 53);
  margin-bottom: 25%;
}

</style>