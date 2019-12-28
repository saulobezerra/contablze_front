<template>
  <div class="q-pa-md q-mt-md" style="max-width: 400px">

    <q-form
      class="q-gutter-y-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-select rounded filled behavior="menu" color="pink-10"
        v-model="despesa.tipo" :options="tiposDespesa | tipos" hint="Tipo da despesa" label="Tipo *" />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="despesa.nome"
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
        v-model="despesa.qtdeInsumo"
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
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o lugar da despesa.']"
      />

      <q-input 
        type="date"
        rounded
        filled
        color="pink-10"
        v-model="despesa.data" 
        hint="Data da despesa" />

      <div class="full-width q-mt-lg q-gutter-x-xs" >
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
          nome: '',
          qtdeInsumo: null,
          local: '',
          valorUnitario: null,
          data: new Date()
        },
      }
  },
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Cadastro de Despesa');
      this.dataAtual();
  },

  computed: {
      tiposDespesa() {
        console.log(this.$store.state.modulos.tiposDespesa);
          return this.$store.state.modulos.tiposDespesa;
      }
  },
  filters: {
    tipos(tiposDesp) {
      let names = [];
      for (let index = 0; index < tiposDesp.length; index++) {
        names.push(tiposDesp[index].descricao);
      }
      console.log(names);
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

    onSubmit() {
      
      this.tiposDespesa.forEach(element => {
        if(element.descricao == this.despesa.tipo) {
          console.log(this.despesa, element);
          this.despesa.tipo = element;
        }
        console.log(this.despesa);
        
      });

      this.despesa.valorUnitario = parseFloat(this.despesa.valorUnitario);
      this.$store.commit('modulos/addDespesa', this.despesa );
      this.$router.replace({name: "despesas"})
    },
    
    onReset() {
      this.despesa.nome = '';
      this.despesa.qtdeInsumo = null;
      this.despesa.valorUnitario = null;
      this.despesa.local = '';
      this.dataAtual();
    }
  }
}
</script>

<style>
.half-width{
  width: 48%;
}
</style>