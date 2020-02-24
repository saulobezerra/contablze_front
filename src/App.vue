<template>
  <div id="q-app">
    <router-view />
    <ModalMsg/>
  </div>
</template>

<script>

import ModalMsg from './components/ModalMensagem'

export default {
  name: 'App',
  components:{
    ModalMsg
  },
  computed: {
    "$store.getters['modulos/getMensagemErro']"() {
      console.log(this.$store.getters['modulos/getMensagemErro'])
      return this.$store.getters['modulos/getMensagemErro']
    }
  },
}
</script>
