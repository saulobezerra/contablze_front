<template>
  <!-- <div class="fixed-center col q-px-xl q-gutter-y-sm "> -->
  <div class="q-pa-sm q-mt-sm q-gutter-y-xs">
    <q-list separator inset >

      <q-item clickable v-ripple v-for="receita in receitas" :key="receita.id" 
      :to="{name: 'editarReceita', params:{id: receita.id}}" >
        <!-- <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section> -->

        <q-item-section >
          <!-- <q-radio dense v-model="shape" val="line" label="Line" /> -->
          <q-item-label lines="1" class="text-weight-bold text-body1"> {{receita.produto.nome}} </q-item-label>
          <q-item-label caption lines="4">
            <span class="text-weight-bold text-body2">Comprador: </span>
            <span class="text-body2"> {{receita.nomeCliente}} </span>
            <br>
            <span class="text-weight-bold text-body2">Data: </span>
            <span class="text-body2"> {{receita.dataReceita}} </span>    
            <br>   
            <span class="text-weight-bold text-body2">Situação: </span>
            <span class="text-body2"> {{ receita.isPago ? "Pago" : "Pendente" }} </span>
            <br>
            <div v-if="receita.observacao">
              <span class="text-weight-bold text-body2">Obs.: </span>
              <span class="text-body2"> {{receita.observacao}} </span>   
            </div>
          </q-item-label>
        </q-item-section>
        
        <!-- <q-item-section>
          <q-item-label caption lines="3">
            <span class="text-weight-bold">Situação: </span>
            {{receita.isPago }}
            <br>
            <span class="text-weight-bold">Obs.: </span>
            {{receita.observacao}}
          </q-item-label>
        </q-item-section> -->

        <q-item-section side center>
          R$ {{receita.valor.toFixed(2)}}
          <!-- <q-item-label>
            <span class="text-body2"> {{receita.isPago }} </span>
          </q-item-label> -->
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
                R$ {{totalReceitas}}
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
        buttonAdd: true,
        // shape: ''
      }
  },
  computed: {
      receitas() {
          return this.$store.getters['modulos/getReceitas']
      },
      totalReceitas() {
          return this.$store.getters['modulos/getTotalReceitas']
      }
  },
  beforeMount() {
    this.buttonAdd = this.$route.path.search('lucro') >= 0 ? false : true;
  },
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Receitas')
      this.$store.dispatch('modulos/getReceitas')
  }
}
</script>

<style>

.total{
  margin-bottom: 25%;
}
.background-Color {
  background-color: rgb(253, 216, 53);
  
}
.alturaLabelItem{
  height: 60px;
}
</style>