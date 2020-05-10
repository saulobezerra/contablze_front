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
            <span class="text-weight-bold text-body2">Quantidade: </span>
            <span class="text-body2"> {{receita.qtdeProduto}} </span>
            <br>
            <span class="text-weight-bold text-body2">Comprador: </span>
            <span class="text-body2"> {{receita.nomeCliente}} </span>
            <br>
            <span class="text-weight-bold text-body2">Data: </span>
            <span class="text-body2"> {{receita.dataReceita}} </span>    
            <br>   
            <span class="text-weight-bold text-body2">Situação: </span>
            <span v-if="receita.isPago" class="text-body2"> Pago </span>
            <span v-else class="text-body2" style="color: red"> Pendente </span>
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

        <q-item-section v-if="receita.isPago" side center>
          R$ {{receita.valor.toFixed(2)}}
          <!-- <q-item-label>
            <span class="text-body2"> {{receita.isPago }} </span>
          </q-item-label> -->
        </q-item-section>
        <q-item-section v-else side center style="color: red">
          R$ {{receita.valor.toFixed(2)}}
        </q-item-section>
        
      </q-item>
      <!-- <q-separator inset color="pink-10" /> -->
    </q-list>

    <q-separator color="pink-10" />
    
    <q-list v-if="receitas.length > 0" :class="{'total text-bold':true, 'background-Color': true}">
        <q-item v-if="totalReceitasPendentes != 0">
            <q-item-section >
                <q-item-label lines="1"> Total Pendentes </q-item-label>
            </q-item-section>
            <q-item-section side center>
                R$ {{totalReceitasPendentes}}
            </q-item-section>
        </q-item>    
        <q-item>
            <q-item-section >
                <q-item-label lines="1"> Total Pago </q-item-label>
            </q-item-section>
            <q-item-section side center>
                R$ {{totalReceitas}}
            </q-item-section>
        </q-item>    
    </q-list>
    
    <q-page-sticky v-if="buttonAdd" position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="pink-10" :to="{name: 'cadastraReceita'}" />
    </q-page-sticky>

    <q-dialog v-if="0 == this.receitas.length" v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row">
          <q-avatar icon="delete" color="pink-10" text-color="white" />
          <span class="col-9 q-ml-sm q-mt-sm  ">Você não possui receitas cadastradas. Deseja cadastrar?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Não" color="pink-10" v-close-popup @click="$router.go(-1)" />
          <q-btn flat label="Sim" color="pink-10" v-close-popup :to="{name: 'cadastraReceita'}" />
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
      receitas() {
          return this.$store.getters['modulos/getReceitas']
      },
      totalReceitas() {
          return this.$store.getters['modulos/getTotalReceitas']
      },
      totalReceitasPendentes() {
          return this.$store.getters['modulos/getTotalReceitasPendentes']
      }
  },
  mounted() {
      this.receitas
      this.$store.commit('modulos/setTitulo', 'Receitas')

      if(this.$route.params.mes && this.$route.params.ano ){
        this.$store.dispatch('modulos/getReceitasPorMes', this.$route.params).then(qtdeReceitas => {
          this.confirm = 0 == qtdeReceitas;
        })
      }else{
        this.$store.dispatch('modulos/getReceitas').then(qtdeReceitas => {
          this.confirm = 0 == qtdeReceitas;
        })
      }
  }
}
</script>

<style>

.total{
  margin-bottom: 25%;
  color: rgb(136, 14, 79);
}
.background-Color {
  background-color: rgb(250, 222, 100);
  
}
.alturaLabelItem{
  height: 60px;
}
</style>