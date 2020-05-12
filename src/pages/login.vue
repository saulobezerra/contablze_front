<template>
  <div class="full-width q-px-lg absolute absolute-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-y-md"
    >
      <q-input
        color="pink-10"
        rounded
        filled
        v-model="login"
        label="E-mail *"
        hint="E-mail"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Favor informar seu e-mail']"
      />

      <q-input
        color="pink-10"
        rounded
        filled
        type="password"
        v-model="senha"
        label="Senha *"
        hint="Senha"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Favor informe sua senha',
          val => val.length >= 6 && val.length <= 32 || 'Senha inválida'
        ]"
      />

      <!-- <q-toggle v-model="accept" color="pink-10" label="Lembrar meus dados" /> -->
      <div class="row justify-end q-ma-xs">
        <a class="column items-end color-text text-bold" @click="$router.push({name: 'cadastroUsuario'})"> Cadastre-se </a>
      </div>
      <div class="full-width q-mt-md q-gutter-x-xs" >
        <q-btn rounded class="glossy half-width float-right" label="Entrar" type="submit" color="pink-10"/>
        <q-btn outline rounded class="glossy half-width" label="Limpar" type="reset" color="pink-10" />
      </div>
    </q-form>
    
  </div>
</template>

<script>
export default {
  login: 'PageIndex',
  data() {
      return {
        login: null,
        senha: null,
        accept: true
      }
  },
  mounted() {
    localStorage.setItem('usuario', JSON.stringify(null));
    this.$store.commit('modulos/setUsuario', null);
    this.$store.commit('modulos/setToken', null);
    this.$store.commit('modulos/setTitulo', 'Login');
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        let dadosLogin ={
          login: this.login,
          senha: btoa(this.senha)
        } 
        this.$store.dispatch('modulos/login', dadosLogin).then(() => {
          this.$store.dispatch('modulos/getUsuario').then(() => {
            this.$router.go(-1) // Volta para Home
          })
        })
      }
    },

    onReset () {
      this.login = null
      this.senha = null
      this.accept = false
    }
  }
}
</script>
<style>
.half-width{
  width: 48%;
}
.color-text{
  color: rgb(136, 14, 79);
}
</style>