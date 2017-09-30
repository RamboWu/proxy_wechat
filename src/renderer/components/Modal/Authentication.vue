<template>
  <modal name="authentication-modal" @before-open="start_auth" @before-close="close_auth">
    <qrcode 
        :value='qrcode_url'
        :options="{ size: 170 }">
    </qrcode>
    <!--div v-if="loading">
      <div class="loader-inner ball-scale">
        <div></div>
      </div>

      <p>Waiting for authentication to be finished...</p>
    </div>
    <div v-else>
      <p>This is the modal that is shown when no accounts were added, basically your first start.</p> 
    </div-->
  </modal>  
</template>

<script>
// script 代码
import Qrcode from '@xkeshi/vue-qrcode';

export default {
    components: { Qrcode },
    name: 'authentication-modal',
    data() {
        return {
            qrcode_url: '',
            loading: false,
            services: [],
        };
    },
    methods: {
        start_auth() {
            console.log('auth showed!');
            this.$electron.ipcRenderer.send('qrcode_auth_opened');
        },
        close_auth() {
            this.$electron.ipcRenderer.send('qrcode_auth_closed');
        },
        authenticate(identifier) {
            /* this.$electron.ipcRenderer.send('surfbird:authentication:start', { service: identifier });
            this.loading = true; */
        },
        beforeClose(e) {
            /* if (this.$store.state.accounts.all.length < 1) {
                e.stop();
            } */
        },
    },
    created() {
        this.$electron.ipcRenderer.on('weixinbot:qrcode', (e, qrcodeUrl) => {
            this.qrcode_url = qrcodeUrl;
        });
    },
};
</script>

<style lang="scss">
.ball-scale > div {
  background-color: #2196F3;
}
</style>
