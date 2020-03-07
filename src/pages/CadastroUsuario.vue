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
        <q-btn rounded class="glossy full-width" label="Salvar" type="submit" color="pink-10"/>
      </div>

      <div v-else class="full-width q-mt-lg q-gutter-x-xs" >
        <q-btn outline rounded class="glossy half-width" label="Cancelar" type="reset" color="pink-10" />
        <q-btn rounded class="glossy half-width" label="Cadastrar" type="submit" color="pink-10"/>
      </div>
    </q-form>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row">
          <q-avatar icon="delete" color="pink-10" text-color="white" />
          <span class="col-9 q-ml-sm q-mt-sm  ">{{msgModal}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Ok" color="pink-10" v-close-popup @click="$router.go(-1)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
        confirmaSenha: '',
        confirm: false,
        msgModal: ''
      }
  },
  mounted() {
      this.$store.commit('modulos/setTitulo', 'Cadastro');
      if(this.$store.getters['modulos/getUsuario']) {
        this.$store.commit('modulos/setTitulo', 'Meus dados');
        this.usuario = this.$store.getters['modulos/getUsuario']
        this.usuario.senha = '******'
      }else if(JSON.parse(localStorage.getItem('usuario'))) {
        this.usuario = JSON.parse(localStorage.getItem('usuario'))
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
        msgModal = 'Cadastro realizado com sucesso!'
        confirm = true
      }).catch(e => {
        msgModal = 'Erro ao realizar cadastro'
        confirm = true
      })
      
    },
    onReset() {
      if(this.$store.state.modulos.user) {
        // Caso já esteja logado e acesse "Meus Dados" o botão 'Cancelar' torna-se 'Voltar'
        //this.$router.go(-1);
      }else {
        this.usuario.nome = '';
        this.usuario.email = '';
        this.usuario.userName = '';
        this.usuario.senha = '';
        this.confirmaSenha = '';
        this.$router.go(-1);
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