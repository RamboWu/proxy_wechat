<template>
  <modal name="authentication-modal" @before-open="start_auth" @before-close="close_auth">

    <div v-if="scaned">
        <p>请在手机点击确定</p>
    </div>
    <div v-else>
        <qrcode 
            :value='qrcode_url'
            :options="{ size: 170 }">
        </qrcode>
    </div>
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
            scaned: false,
        };
    },
    methods: {
        start_auth() {
            this.$electron.ipcRenderer.send('qrcode_auth_opened');
        },
        close_auth() {
            this.$electron.ipcRenderer.send('qrcode_auth_closed');
        },
    },
    created() {
        this.$electron.ipcRenderer.on('weixinbot:qrcode', (e, qrcodeUrl) => {
            this.qrcode_url = qrcodeUrl;
        });
        /* this.$electron.ipcRenderer.on('weixinbot:qrcode_scaned', (e) => {
            this.logged_in = true;
        }); */ 
    },
};
</script>

<style lang="scss">
.ball-scale > div {
  background-color: #2196F3;
}
</style>
