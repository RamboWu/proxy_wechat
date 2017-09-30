<template>
  <modal name="authentication-modal" @before-open="start_auth" @before-close="close_auth">
    <div v-if="login_step === 1">
        <qrcode 
            :value='qrcode_url'
            :options="{ size: 170 }">
        </qrcode>
    </div>
    <div v-else-if="login_step === 2">
        <p>请在手机点击确定</p>
    </div>
    <div v-else-if="login_step === 3">
        <p>已经登录</p>
    </div>
    <div v-else>
      Not A/B/C
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
            login_step: 1,
        };
    },
    methods: {
        start_auth() {
            this.login_step = 1;
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
        this.$electron.ipcRenderer.on('weixinbot:qrcode_scaned', () => {
            console.log('二维码已经扫描');
            this.login_step = 2;
        });

        this.$electron.ipcRenderer.on('weixinbot:login_confirmed', () => {
            console.log('用户已经登录');
            this.login_step = 3;
        });
    },
};
</script>

<style lang="scss">
.ball-scale > div {
  background-color: #2196F3;
}
</style>
