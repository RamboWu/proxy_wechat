<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'sessions',
            'currentId',
            // ...
        ]),
    },
    methods: {
        ...mapActions([
            'initData',
            'sendMessage',
            'selectSession',
            'search',
        ]),
    },
};
</script>

<template>
<div class="list">
    <ul>
        <!--TODO 下面的这个是 吴培峰加的，暂时不知道是啥意思 :key="item.id" -->
        <li v-for="item in sessions" :key="item.id" :class="{ active: item.id === currentId }" @click="selectSession(item.id)">
            <!-- :src="item.user.img" -->
            <img class="avatar"  width="30" height="30" :alt="item.user.name" src="~@/assets/logo.png" >
            <p class="name">{{item.user.name}}</p>
        </li>
    </ul>
</div>
</template>

<style scoped lang="less">
.list {
    li {
        padding: 12px 15px;
        border-bottom: 1px solid #292C33;
        cursor: pointer;
        transition: background-color .1s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.03);
        }
        &.active {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
    .avatar, .name {
        vertical-align: middle;
    }
    .avatar {
        border-radius: 2px;
    }
    .name {
        display: inline-block;
        margin: 0 0 0 15px;
    }
}
</style>