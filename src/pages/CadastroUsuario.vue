<template>
  <div class="q-pa-md q-mt-md" style="max-width: 400px">

    <q-form
      class="q-gutter-y-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        class="primeiraLetraMaiuscula"
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
        <q-btn rounded class="glossy full-width" label="Salvar" type="submit" color="pink-10"/>
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
      if(JSON.parse(localStorage.getItem('usuario'))) {
        this.$store.commit('modulos/setTitulo', 'Meus dados');
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
      }
      else {
        this.$store.commit('modulos/setTitulo', 'Cadastro');
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

      if (this.$route.name == 'perfil') {
        this.$store.dispatch('modulos/editarUsuario', user )
      }
      else{
        this.$store.dispatch('modulos/gravaUsuario', user )
      }
    },
    onReset() {
      this.$router.go(-1);
    }
  }
}
</script>

<style>
.half-width{
  width: 48%;
}
</style>