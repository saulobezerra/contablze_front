<template>
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 95%">  
        <q-card-section align="center" class="col">
          <q-avatar v-if="$store.getters['modulos/getMensagemErro']"  icon="error" color="pink-10" text-color="white" />
          <q-avatar v-else icon="ok" color="pink-10" text-color="white" />
          <span class="row justify-center q-mt-sm">{{mensagem}}</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Ok" color="pink-10" v-close-popup @click="zeraMsgErro" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  computed: {
    mensagem() {
      let msg = '';
      msg = this.$store.getters['modulos/getMensagemErro'];
      msg = this.$store.getters['modulos/getMensagemInfo'];
      return msg
    },
    confirm() {
      if(this.mensagem)
        return true;
      else
        return false;
    }
  },
  
  methods: {
    zeraMsgErro() {
      this.$store.commit('modulos/setMensagemErro', '');
      this.$store.commit('modulos/setMensagemInfo', '');
    }
  }

}
</script>