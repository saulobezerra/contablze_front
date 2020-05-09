<template>
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 95%">  
        <q-card-section align="center" class="col">
          <q-avatar :icon="icone" color="pink-10" text-color="white" />
          <!-- <q-avatar v-else icon="ok" color="pink-10" text-color="white" /> -->
          <span class="row justify-center q-mt-sm">{{objMensagem.msg}}</span>
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
      confirm: false,
      icone: ''
    }
  },

  computed: {
    objMensagem() {
      return this.$store.getters['modulos/getObjMensagem'];
    }
  },

  watch: {
    objMensagem: function(val) {
      console.log(val)
      if (val.msg)
        this.confirm = true
      else
        this.confirm  = false
      
      let acao = val.acao;
      console.log(acao)
      if(acao == 'erro')
        this.icone = 'error'
      else if (acao == 'confirma')
        this.icone = 'check'
      else if (acao == 'delete')
        this.icone = 'delete'
      else if (acao == 'info')
        this.icone = 'info'
    }
  },

  methods: {
    zeraMsgErro() {
      if (this.objMensagem.acao == 'confirma') {
        this.$store.commit['modulos/setObjMensagem', {msg:'', acao: '', status: 0}];
        this.$router.go(-1);
      }
      else {
        this.$store.commit['modulos/setObjMensagem', {msg:'', acao: '', status: 0}];
        if(this.objMensagem.status == 403) {
          this.$router.push({name: 'login'});
        }
      }
    }
  }

}
</script>