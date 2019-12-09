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
        label="Nome *"
        hint="Nome"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe seu nome.']"
      />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="usuario.userName"
        label="User Name *"
        hint="User Name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe o User Name.']"
      />

      <q-input
        rounded
        filled
        color="pink-10"
        v-model="usuario.email"
        label="E-mail *"
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
        label="Senha *"
        hint="Senha"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Informe uma senha.']"
      />

      <q-input v-if="!this.$store.state.modulos.user"
        rounded
        filled
        type="password"
        color="pink-10"
        v-model="confirmaSenha"
        label="Confirme a senha  *"
        hint="Confirmação"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Cofirme sua senha.']"
      />
      
      <div v-if="this.$store.state.modulos.user" class="full-width q-mt-lg q-gutter-x-xs" >
        <q-btn outline rounded class="glossy half-width" label="Voltar" type="reset" color="pink-10" />
        <q-btn rounded class="glossy half-width" label="Editar" type="submit" color="pink-10"/>
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
        this.usuario = this.$store.state.modulos.user;
      }
  },
  methods: {
    onSubmit() {
      this.$store.commit('modulos/registraUsuario', this.usuario );
      this.$router.replace({name: "login"});
    },
    onReset() {
      if(this.$store.state.modulos.user) {
        this.$router.replace({name: "menu"});
      }else {
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