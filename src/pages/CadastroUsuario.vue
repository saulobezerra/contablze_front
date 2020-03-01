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
        v-model="usuario.nome"
        label="Nome "
        hint="Nome"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe seu nome.']"
      />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="usuario.userName"
        label="User Name "
        hint="User Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o User Name.']"
      />

      <q-input
        type="email"
        rounded
        filled
        color="pink-10"
        v-model="usuario.email"
        label="E-mail "
        hint="E-mail"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o seu e-mail.']"
      />

      <q-input
        rounded
        filled
        type="password"
        color="pink-10"
        v-model="usuario.senha"
        label="Senha "
        hint="Senha"
        ref="passwordField"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe uma senha.']"
      />

      <q-input v-if="!this.$store.state.modulos.user"
        rounded
        filled
        type="password"
        color="pink-10"
        v-model="confirmaSenha"
        label="Confirme a senha  "
        hint="Confirmação"
        lazy-rules
        :rules="[ val => val && val.length > 0 && this.$refs.passwordField.value == val || 'O valor do campo de ser igual a senha.']"
      />
      
      <div v-if="this.$store.state.modulos.user" class="full-width q-mt-lg q-gutter-x-xs" >
        <!-- <q-btn outline rounded class="glossy half-width" label="Voltar" type="reset" color="pink-10" /> -->
        <q-btn rounded class="glossy full-width" label="Editar" type="submit" color="pink-10"/>
      </div>

      <div v-else class="full-width q-mt-lg q-gutter-x-xs" >
        <q-btn outline rounded class="glossy half-width" label="Cancelar" type="reset" color="pink-10" />
        <q-btn rounded class="glossy half-width" label="Cadastrar" type="submit" color="pink-10"/>
      </div>
    </q-form>

  </div>
</template>
<script>
export default {
  data() {
      return {
        usuario: {
          nome: '',
          userName: '',
          email: '',
          senha: '',
        },
        confirmaSenha: ''
      }
  },
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Cadastro');
      
      if(this.$store.state.modulos.user) {
        this.$store.commit('modulos/setTitulo', 'Meus dados');
        this.usuario = this.$store.getters['modulos/getUsuario']
        this.usuario.senha = '******'
      }
  },
  methods: {
    onSubmit() {
      let user = {
        nome: this.usuario.nome,
        email: this.usuario.email,
        userName: this.usuario.userName,
        senha: btoa(this.usuario.senha)
      }

      this.$store.dispatch('modulos/gravaUsuario', user ).then(r => {
        console.log("Cadastro realizado com sucesso")
        //this.$store.commit('modulos/setMensagemErro', "Cadastro realizado com sucesso");
        this.$router.replace({name: "login"});
      }).catch(e => {
        console.log(e);
      })
      
    },
    onReset() {
      if(this.$store.state.modulos.user) {
        // Caso já esteja logado e acesse "Meus Dados" o botão 'Limpar' torna-se 'Voltar'
        this.$router.replace({name: "menu"});
      }else {
        // Limpando variáveis
        this.usuario.nome = '';
        this.usuario.email = '';
        this.usuario.userName = '';
        this.usuario.senha = '';
        this.confirmaSenha = '';
        this.$router.replace({name: "login"});
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