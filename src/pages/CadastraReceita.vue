<template>
  <div class="q-pa-md q-mt-md" style="max-width: 400px">

    <q-form
      class="q-gutter-y-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-select rounded filled behavior="menu"
         v-model="produto" :options="produtos | namesProd" hint="Produto" label="Produto *" />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="receita.nomeCliente"
        label="Cliente *"
        hint="Nome do Cliente"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o nome do cliente.']"
      />

      <q-input
        filled
        rounded
        type="number"
        step=".01"
        color="pink-10"
        v-model="receita.qtdeProduto"
        label="Quantidade *"
        hint="Quantidade do Produto"
        lazy-rules
        :rules="[
          val => val > 0 || 'Informe a quantidade do produto'
        ]"
      />

      <q-select rounded filled behavior="menu" color="pink-10"
        v-model="situacao" :options="['Pago', 'Pendente']" hint="Situação de Pagamento" label="Situação *" />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="receita.observacao"
        label="Observação"
        hint="Observação"
      />

      <!-- <q-input
        rounded
        filled
        color="pink-10"
        v-model="receita.data"
        label="Data"
        hint="Data da receita"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe a data da sua receita.']"
      /> -->

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
          nomeCliente: '',
          observacao: '',
          qtdeProduto: null,
          produto: {
            id: null
          },
          usuario: {
            id: null
          }
        },
        produto: null,  
        situacao: '',
      }
  },
  filters: {
    namesProd(prods) {
      let names = [];
      for (let index = 0; index < prods.length; index++) {
        names.push(prods[index].nome);
      }
      console.log(names);
      return names;
    }
  },
  computed: {
      produtos() {
          return this.$store.state.modulos.produtos;
      }
  },

  mounted() {
      this.$store.commit('modulos/setTitulo', 'Cadastro de Receita');
  },
  methods: {
    onSubmit() {
      this.produtos.forEach(element => {
        if(element.nome == this.produto) {
          //this.produto = new Object();
          this.produto = element;
          //return
        }
      });
      this.receita.produto  = this.produto;
      console.log(this.receita, "  " ,this.produto, "  ", this.situacao)
      // this.receita.valor = parseFloat(this.receita.valor);
      // this.$store.commit('modulos/addReceita', this.receita );
      // this.$router.replace({name: "receitas"})
    },
    onReset() {
      this. receita = {
        nomeCliente: '',
          observacao: '',
          qtdeProduto: null,
          produto: {
            id: null
          },
          usuario: {
            id: null
          }
      }
      this.produto = null;
      this.situacao = null;
    }
  }
}
</script>

<style>
.half-width{
  width: 48%;
}
</style>