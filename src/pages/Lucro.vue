<template>

  <div class="q-pa-sm q-mt-sm q-gutter-y-xs">

    <div v-for="(lucro, i) in lucros" :key="i">
      <span class="text-bold"> {{ mes[lucro.mes -1] }} </span>
      <q-list separator inset >

        <q-item clickable v-ripple @click="$router.push({name: 'receita'})">
          <q-item-section >
            <q-item-label lines="1"> Receitas </q-item-label>
          </q-item-section>
          <q-item-section side center>
            {{lucro.totalReceita}}
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="$router.push({name: 'despesas'})">
          <q-item-section >
            <q-item-label lines="1"> Despesas </q-item-label>
          </q-item-section>
          <q-item-section side center>
            {{lucro.totalDespesa}}
          </q-item-section>
        </q-item>
        <!-- <q-separator inset color="pink-10" /> -->
      </q-list>

      <q-list class="total text-bold" style="margin-bottom: 10%">
          <q-item >
          <q-item-section >
            <q-item-label lines="1"> Lucro </q-item-label>
          </q-item-section>
          <q-item-section side center>
            {{lucro.vLucro}}
          </q-item-section>        
        </q-item>
        <q-separator color="pink-10" />
      </q-list>

    </div>

  </div>
</template>
<script>

export default {

  data(){
    return {
      mes:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
          'Novembro', 'Dezembro']
    }
  },

    computed: {
        lucros() {
          return this.$store.getters['modulos/getLucrosDefault']
        }
    },
    mounted() {
      this.lucros;
      this.$store.commit('modulos/setTitulo', 'Lucros')
      this.$store.dispatch('modulos/getLucrosDefault');
    }
}
</script>
<style>

.corAzul{
    background-color: blue
}
.total{
  /* background-color: rgb(253, 250, 53); */
  margin-bottom: 25%;
}

</style>