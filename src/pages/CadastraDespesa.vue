<template>
  <div class="q-pa-md q-mt-md" style="max-width: 400px">

    <q-form
      class="q-gutter-y-md"
      @submit="onSubmit"
      @reset="onReset"
    >
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
        v-model="despesa.valor"
        label="Valor *"
        hint="Valor da despesa"
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
        rounded
        filled
        color="pink-10"
        v-model="despesa.data"
        label="Data"
        hint="Data da despesa"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe a data da sua despesa.']"
      />

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
          nome: '',
          local: '',
          valor: null,
          data: ''
        }  
      }
  },
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Cadastro de Despesa');
  },
  methods: {
    onSubmit() {
      this.despesa.valor = parseFloat(this.despesa.valor);
      this.$store.commit('modulos/addDespesa', this.despesa );
      this.$router.replace({name: "despesas"})
    },
    onReset() {
      this.despesa.nome = '';
      this.despesa.valor = null;
      this.despesa.local = '';
      this.despesa.data = '';
    }
  }
}
</script>

<style>
.half-width{
  width: 48%;
}
</style>