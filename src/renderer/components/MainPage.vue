<script>
import { mapActions } from 'vuex';

import Card from './MainPage/card';
import List from './MainPage/list';
import TextChat from './MainPage/textchat';
import Message from './MainPage/message';
import Modals from './Modals';
const ipcRenderer = require('electron').ipcRenderer;

export default {
    name: 'main-page',
    components: { Card, List, TextChat, Message, Modals },
    methods: {
        ...mapActions([
            'initData',
            'sendMessage',
            'selectSession',
            'search',
        ]),
        request_login_wechat() {
            // this.$router.push('/main');
            ipcRenderer.send('request_login');
        },
    },
    created() {
        this.initData();
    },
};
</script>

<template>
<div id='main_page'>
    <div class="sidebar">
        <card></card>
        <list></list>
        <button type="button" @click="request_login_wechat">登录微信</button>
        <button type="button">后台管理</button>
    </div>
    <div class="main">
        <message></message>
        <text-chat></text-chat>
    </div>
    <modals></modals>
</div>
</template>

<style lang="less" scoped>
#main_page {
    margin: 20px auto;
    width: 800px;
    height: 600px;

    overflow: hidden;
    border-radius: 3px;

    .sidebar, .main {
        height: 100%;
    }
    .sidebar {
        float: left;
        width: 200px;
        color: #f4f4f4;
        background-color: #2e3238;
    }
    .main {
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }
    .text {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }
    .message {
        height: ~'calc(100% - 160px)';
    }
}
</style>

