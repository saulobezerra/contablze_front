<template>
  <div id="q-app" >
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
  }
}
</script>
