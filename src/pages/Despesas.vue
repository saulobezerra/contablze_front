<template>
  <!-- <div class="fixed-center col q-px-xl q-gutter-y-sm "> -->
  <div class="q-pa-sm q-mt-sm q-gutter-y-xs">
    <q-list separator inset >

      <q-item clickable v-ripple v-for="despesa in despesas" :key="despesa.id" 
      :to="{name: 'editarDespesa', params:{id: despesa.id}}">
        <!-- <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section> -->

        <q-item-section >
          <q-item-label v-if="despesa.descricao" lines="1" class="text-weight-bold text-body1"> {{despesa.descricao}} </q-item-label>
          <q-item-label v-else lines="1" class="text-weight-bold text-body1"> {{despesa.tipo.descricao}} </q-item-label>
          <q-item-label caption lines="4">
            <div>
              <span class="text-weight-bold text-body2">Quantidade: </span>
              <span class="text-body2"> {{despesa.qtde_insumo}} </span>
            </div>
            <div  v-if="despesa.local">
              <span class="text-weight-bold text-body2">Local/Fornec.: </span>
              <span class="text-body2"> {{despesa.local}} </span>
            </div>
            <div>
              <span class="text-weight-bold text-body2">Data: </span>
              <span class="text-body2"> {{despesa.data}} </span>    
            </div>
            <div>
              <span class="text-weight-bold text-body2">Valor Unitário: </span>
              <span class="text-body2"> {{ despesa.valorUnitario.toFixed(2) }} </span>
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side center>
          R$ {{despesa.valor.toFixed(2)}}
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
                R$ {{$store.state.modulos.totalDespesas}}
            </q-item-section>
        </q-item>    
    </q-list>
    
    <q-page-sticky v-if="buttonAdd" position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="pink-10" :to="{name: 'cadastraDespesa'}" />
    </q-page-sticky>

    <q-dialog v-if="0 == this.despesas.length" v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row">
          <q-avatar icon="delete" color="pink-10" text-color="white" />
          <span class="col-9 q-ml-sm q-mt-sm  ">Você não possui receitas cadastradas. Deseja cadastrar?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Não" color="pink-10" v-close-popup @click="$router.go(-1)" />
          <q-btn flat label="Sim" color="pink-10" v-close-popup :to="{name: 'cadastraDespesa'}" />
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
      despesas() {
        return this.$store.getters['modulos/getDespesas']
      },
      totalDespesas() {
          return this.$store.getters['modulos/getTotalDespesas']
      }
  },
  beforeMount() {
    this.buttonAdd = this.$route.path.search('lucro') >= 0 ? false : true;
  },
  mounted() {
      this.despesas
      this.$store.commit('modulos/setTitulo', 'Despesas')

      if(this.$route.params.mes && this.$route.params.ano ){
        this.$store.dispatch('modulos/getDespesasPorMes', this.$route.params).then(qtdeDespesas => {
          this.confirm = 0 == qtdeDespesas;
        })
      }else{
        this.$store.dispatch('modulos/getDespesas').then(qtdeDespesas => {
          this.confirm = 0 == qtdeDespesas;
        })
      }
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