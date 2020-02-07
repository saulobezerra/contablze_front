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
        v-model="produto.nome"
        label="Nome *"
        hint="Nome do produto/serviço"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o nome do produto/serviço.']"
      />

      <q-input
        filled
        rounded
        type="number"
        step=".01"
        color="pink-10"
        v-model="produto.valor"
        label="Valor *"
        hint="Valor do produto"
        lazy-rules
        :rules="[
          val => val > 0 || 'Informe o valor do produto'
        ]"
      />

      <div v-if="$route.name == 'editarProduto'" class="full-width q-mt-lg q-gutter-x-xs" >
        <q-btn outline rounded class="glossy half-width" label="Excluir" type="reset" color="pink-10" />
        <q-btn rounded class="glossy half-width" label="Salvar" type="submit" color="pink-10"/>
      </div>

      <div v-else class="full-width q-mt-lg q-gutter-x-xs" >
        <q-btn outline rounded class="glossy half-width" label="Limpar" type="reset" color="pink-10" />
        <q-btn rounded class="glossy half-width" label="Cadastrar" type="submit" color="pink-10"/>
      </div>

    </q-form>

        <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <span class="q-ml-sm">Você deseja realmente excluir esse produto?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Não" color="primary" v-close-popup />
          <q-btn flat label="Sim" color="primary" v-close-popup @click="excluiProduto" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<script>
export default {
  data() {
      return {
        produto: {
            nome: '',
            valor: null
        },
        confirm: false
      }
  },
  
  mounted() {
    const that = this
      if (this.$route.name == 'editarProduto') {
        let obj = this.$store.getters['modulos/getProdutos'].find(function(el, i) {
            if (el.id === that.$route.params.id)
              return el;
          })
          this.$store.commit('modulos/setTitulo', 'Editar Produto');
          this.produto.nome = obj.nome
          this.produto.valor = obj.valor
      }else {
          this.$store.commit('modulos/setTitulo', 'Cadastrar Produto');
      }
  },
  methods: {
    excluiProduto() {
      console.log(this.$route.params.id)
      this.$store.dispatch('modulos/deletarProduto', this.$route.params.id).then(() => {
        this.$router.go(-1);
      }).catch(error => {
        console.log("Erro na exclusão",error);
      });
    },

    onSubmit() {
      this.produto.valor = parseFloat(this.produto.valor);
      
      if (this.$route.name == 'editarProduto'){
          let parametrosDaRequisicao = {
            idProd: this.$route.params.id,
            produto: this.produto
          }
          this.$store.dispatch('modulos/editaProduto', parametrosDaRequisicao );
      }else {
          this.$store.dispatch('modulos/gravaProduto', this.produto )
      }
      this.$router.go(-1)
    },
    onReset() {
      if (this.$route.name == 'editarProduto') {
        this.confirm = true
      }else {
        this.produto.nome = '';
        this.produto.valor = null;
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