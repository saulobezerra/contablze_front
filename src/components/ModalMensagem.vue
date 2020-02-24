<template>
    <q-dialog v-model="confirm" persistent>
      <q-card>  
        <q-card-section class="row">
          <q-avatar icon="error" color="pink-10" text-color="white" />
          <span class="col-9 q-ml-sm q-mt-sm  ">{{mensagem}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <!-- <q-btn flat label="Não" color="pink-10" v-close-popup /> -->
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
      return this.$store.getters['modulos/getMensagemErro']
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
    }
  }

}
</script>