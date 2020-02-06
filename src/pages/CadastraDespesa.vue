<template>
  <div class="q-pa-md q-mt-md" style="max-width: 400px">

    <q-form
      class="q-gutter-y-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-select rounded filled behavior="menu" color="pink-10"
        v-model="tipoDespesa" :options="tiposDespesa | tipos" hint="Tipo da despesa" label="Tipo *" />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="despesa.descricao"
        label="Nome *"
        hint="Nome da despesa"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe um nome para sua despesa.']"
      />

      <q-input
        filled
        rounded
        type="number"
        step=".01"
        color="pink-10"
        v-model="despesa.qtde_insumo"
        label="Quantidade *"
        hint="Quantidade da despesa"
        lazy-rules
        :rules="[
          val => val > 0 || 'Informe a quantidade da despesa'
        ]"
      />

      <q-input
        filled
        rounded
        type="number"
        step=".01"
        color="pink-10"
        v-model="despesa.valorUnitario"
        label="Valor *"
        hint="Valor unitário da despesa"
        lazy-rules
        :rules="[
          val => val > 0 || 'Informe o valor da sua despesa'
        ]"
      />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="despesa.local"
        label="Local"
        hint="Local da despesa"
      />

      <q-input 
        type="date"
        rounded
        filled
        color="pink-10"
        v-model="despesa.data" 
        hint="Data da despesa" />

      <div v-if="$route.name == 'editarDespesa'" class="full-width q-mt-lg q-gutter-x-xs" >
        <q-btn outline rounded class="glossy half-width" label="Voltar" type="reset" color="pink-10" />
        <q-btn rounded class="glossy half-width" label="Salvar" type="submit" color="pink-10"/>
      </div>

      <div v-else class="full-width q-mt-lg q-gutter-x-xs" >
        <q-btn outline rounded class="glossy half-width" label="Limpar" type="reset" color="pink-10" />
        <q-btn rounded class="glossy half-width" label="Cadastrar" type="submit" color="pink-10"/>
      </div>
    </q-form>

  </div>
</template>
<script>
export default {
  data() {
      return {
        despesa: {
          tipo: null,
          descricao: '',
          qtde_insumo: null,
          local: '',
          valorUnitario: null,
          data: ''
        },
        tipoDespesa: ''
      }
  },
  mounted() {
    this.$store.dispatch('modulos/getTiposDespesas')
    const that = this
      if (this.$route.name == 'editarDespesa') {
        this.$store.commit('modulos/setTitulo', 'Editar Despesa');

        let obj = this.$store.getters['modulos/getDespesas'].find(function(el, i) {
            if (el.id === that.$route.params.id)
              return el;
          })

          this.despesa.tipo = obj.tipo
          this.despesa.descricao = obj.descricao
          this.despesa.qtde_insumo = obj.qtde_insumo
          this.despesa.local = obj.local
          this.despesa.valorUnitario = obj.valorUnitario
          this.despesa.data = this.formataData(obj.data)

          this.tipoDespesa = obj.tipo.descricao

      }else {
        this.$store.commit('modulos/setTitulo', 'Cadastro de Despesa');
        this.dataAtual();
      }
  },

  computed: {
    tiposDespesa() {
      return this.$store.state.modulos.tiposDespesa;
    }
  },
  filters: {
    tipos(tiposDesp) {
      let names = [];
      for (let index = 0; index < tiposDesp.length; index++) {
        names.push(tiposDesp[index].descricao);
      }
      //console.log(names);
      return names;
    }
  },
  
  methods: {
    dataAtual() {
      let dt = new Date();
      let mes = dt.getMonth()+1;
      let dia = dt.getDate();

      dia = (dia < 10 ? '0' + dia : dia);
      mes = (mes < 10 ? '0' + mes : mes);

      this.despesa.data = dt.getFullYear() + "-" + mes + "-" + dia;
    },
    formataData(data) {
      let parseData = data.split('/'); 
      parseData = parseData[2] + '-' + parseData[1] + '-' + parseData[0]; //yyyy-mm-dd
      return parseData;
    },

    onSubmit() {

      this.tiposDespesa.forEach(element => {
        if(element.descricao == this.tipoDespesa) {
          this.despesa.tipo = element;
        }
      });

      this.despesa.valorUnitario = parseFloat(this.despesa.valorUnitario);

      let parseData = this.despesa.data.split('-'); //yyyy-mm-dd
      this.despesa.data = new Date(+parseData[0], parseData[1]-1, +parseData[2]);

      console.log('1'+2+3);
      console.log(1+2+'3');
      
      console.log(this.despesa.data);
      if (this.$route.name == 'editarDespesa') {
        let parametrosDaRequisicao = {
          idDespesa: this.$route.params.id,
          despesa: this.despesa
        }
        this.$store.dispatch('modulos/editarDespesa', parametrosDaRequisicao)

      }else{
        this.despesa.valorUnitario = parseFloat(this.despesa.valorUnitario);
        this.$store.dispatch('modulos/gravaDespesa', this.despesa);
      }
      
      this.$router.replace({name: "despesas"})
    },
    
    onReset() {
      if(this.$route.name == 'editarDespesa') {
        this.$router.go(-1)
      }else {
        this.despesa.descricao = '';
        this.despesa.qtde_insumo = null;
        this.despesa.valorUnitario = null;
        this.despesa.local = '';
        this.dataAtual();
      }
    }
  }
}
</script>

<style>
.half-width{
  width: 48%;
}
</style>