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
        v-model="receita.nome"
        label="Nome *"
        hint="Nome da receita"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe um nome para sua receita.']"
      />

      <q-input
        filled
        rounded
        type="number"
        step=".01"
        color="pink-10"
        v-model="receita.valor"
        label="Valor *"
        hint="Valor da receita"
        lazy-rules
        :rules="[
          val => val > 0 || 'Informe o valor da sua receita'
        ]"
      />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="receita.comprador"
        label="Comprador"
        hint="Comprador"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o lugar da receita.']"
      />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="receita.data"
        label="Data"
        hint="Data da receita"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe a data da sua receita.']"
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
        receita: {
          nome: '',
          comprador: '',
          valor: null,
          data: ''
        }  
      }
  },
  
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Cadastro de Receita');
  },
  methods: {
    onSubmit() {
      this.receita.valor = parseFloat(this.receita.valor);
      this.$store.commit('modulos/addReceita', this.receita );
      this.$router.replace({name: "receitas"})
    },
    onReset() {
      this.receita.nome = '';
      this.receita.valor = null;
      this.receita.comprador = '';
      this.receita.data = '';
    }
  }
}
</script>

<style>
.half-width{
  width: 48%;
}
</style>