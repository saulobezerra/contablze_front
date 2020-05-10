<template>

  <div class="q-pa-sm q-mt-sm q-gutter-y-xs">

    <div v-for="(lucro, i) in lucros" :key="i">
      <span class="row justify-center text-bold" style="color: rgb(136, 14, 79)"> {{ mes[lucro.mes -1] }} </span>
      <q-list separator inset >

        <q-item clickable v-ripple @click="carregaPagina('receitasPorMes',lucro.mes, lucro.ano)">
          <q-item-section >
            <q-item-label lines="1"> Receitas </q-item-label>
          </q-item-section>
          <q-item-section side center>
            {{lucro.totalReceita | formataDuasCasaDecimais}}
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="carregaPagina('despesasPorMes', lucro.mes, lucro.ano)">
          <q-item-section >
            <q-item-label lines="1"> Despesas </q-item-label>
          </q-item-section>
          <q-item-section side center>
            {{lucro.totalDespesa | formataDuasCasaDecimais}}
          </q-item-section>
        </q-item>
        <!-- <q-separator inset color="pink-10" /> -->
      </q-list>

      <q-list class="total text-bold" style="margin-bottom: 10%">
          <q-item >
          <q-item-section >
            <q-item-label lines="1"> Lucro </q-item-label>
          </q-item-section>
          <q-item-section side center style="color: rgb(136, 14, 79)">
            {{lucro.vLucro | formataDuasCasaDecimais}}
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
    filters: {
      formataDuasCasaDecimais: function (valor) {
        return valor.toFixed(2)
      }
    },
    mounted() {
      this.lucros
      this.$store.commit('modulos/setTitulo', 'Lucros')
      this.$store.dispatch('modulos/getLucrosDefault')
    },

    methods:{
      carregaPagina(pagina, mes, ano) {
        let objMesAno= {
          mes: mes,
          ano: ano
        }
        this.$router.push({name: pagina, params:{mes: mes, ano: ano}});
      }
  }
    
}
</script>
<style>
.total{
  color: rgb(136, 14, 79);
  margin-bottom: 25%;
}

</style>