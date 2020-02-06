<template>
  <div class="q-pa-md q-mt-md" style="max-width: 400px">

    <q-form
      class="q-gutter-y-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-select rounded filled behavior="menu"
         v-model="produto" :options="produtos | namesProd" hint="Produto" label="Produto *" 
         lazy-rules :rules="[ val => val && val.length > 0 || 'Informe o produto da receita.' ]" />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="receita.nomeCliente"
        label="Cliente"
        hint="Nome do Cliente"
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
        v-model="situacao" :options="situacoes" hint="Situação de Pagamento" label="Situação *"
        lazy-rules :rules="[ val => val && val.length > 0 || 'Informe a situação da receita.' ]" />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="receita.observacao"
        label="Observação"
        hint="Observação"
      />

      <q-input 
        type="date"
        rounded
        filled
        color="pink-10"
        v-model="receita.dataReceita" 
        hint="Data da receita" />

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

      <div v-if="$route.name == 'editarReceita'" class="full-width q-mt-lg q-gutter-x-xs" >
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
        receita: {
          nomeCliente: '',
          observacao: '',
          qtdeProduto: null,
          isPago: false,
          dataReceita: '',
          produto: {
            id: null
          }
        },
        produto: null,  
        situacao: '',
        situacoes:['Pendente', 'Pago']
      }
  },
  filters: {
    namesProd(prods) {
      let names = [];
      for (let index = 0; index < prods.length; index++) {
        names.push(prods[index].nome);
      }

      return names;
    }
  },
  computed: {
      produtos() {
          return this.$store.state.modulos.produtos;
      }
  },

  mounted() {
    const that = this
      if (this.$route.name == 'editarReceita') {
        let obj = this.$store.getters['modulos/getReceitas'].find(function(el, i) {
            if (el.id === that.$route.params.id)
              return el;
          })
          this.$store.commit('modulos/setTitulo', 'Editar Receita');

          this.receita.nomeCliente = obj.nomeCliente
          this.receita.produto = obj.produto
          this.receita.qtdeProduto = obj.qtdeProduto
          this.receita.isPago = obj.isPago
          this.receita.observacao = obj.observacao
          this.receita.dataReceita = this.formataData(obj.dataReceita)
          obj.isPago ? this.situacao = this.situacoes[1] : this.situacao = this.situacoes[0]
          this.produto = obj.produto.nome

      }else {
        this.$store.commit('modulos/setTitulo', 'Cadastro de Receita');
        this.dataAtual();
      }
  },
  methods: {
    dataAtual() {
      let dt = new Date();
      let mes = dt.getMonth()+1;
      let dia = dt.getDate();

      dia = (dia < 10 ? '0' + dia : dia);
      mes = (mes < 10 ? '0' + mes : mes);

      this.receita.dataReceita = dt.getFullYear() + "-" + mes + "-" + dia;
    },
    formataData(data) {
      let dt;
      
      if (data) {
        let dataParse = data.split('/');
        dt = new Date(+dataParse[2], dataParse[1]-1, +dataParse[0]);  // Cria um tipo date com o instant 'data' da receita vinda do servidor
      }
      else {
        dt = new Date();  // Cria um tipo date com a data atual
      }

      let mes = dt.getMonth()+1;
      let dia = dt.getDate();

      dia = (dia < 10 ? '0' + dia : dia);
      mes = (mes < 10 ? '0' + mes : mes);

      return dt.getFullYear() + "-" + mes + "-" + dia;
    },

    onSubmit() {
      let objProduto = new Object();
      this.produtos.forEach(element => {
          if(element.nome == this.produto) {
            objProduto = element;
          }
        });
      this.receita.produto  = objProduto;

      this.situacao == 'Pendente' ? this.receita.isPago = false : this.receita.isPago = true;
      
      let parseData = this.receita.dataReceita.split('-'); //yyyy-mm-dd
      this.receita.dataReceita = new Date(+parseData[0], parseData[1]-1, +parseData[2]);
      
      if (this.$route.name == 'editarReceita') {
        let parametrosDaRequisicao = {
          idReceita: this.$route.params.id,
          receita: this.receita
        }
        this.$store.dispatch('modulos/editarReceita', parametrosDaRequisicao)

      }else{
        this.$store.dispatch('modulos/gravaReceita', this.receita)
      }
    
      this.$router.replace({name: "receitas"})
    },
    onReset() {
      if(this.$route.name == 'editarReceita') {
        this.$router.go(-1)
      }else{
        this.receita = {
          nomeCliente: '',
          observacao: '',
          qtdeProduto: null,
          isPago: false,
          produto: {
            id: null
          }
        }
        dataAtual();
        this.produto = null;
        this.situacao = null;
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