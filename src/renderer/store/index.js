import Vue from 'vue';
import Vuex from 'vuex';

import path from 'path';

// import modules from './modules';

Vue.use(Vuex);

/* export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
}); */

const now = new Date();
const store = new Vuex.Store({
    // modules,
    strict: process.env.NODE_ENV !== 'production',
    state: {
    // 当前用户
        user: {
            name: 'coffce',
            img: path.join(__static, '/1.jpg'),
        },
        // 会话列表
        sessions: [
            {
                id: 1,
                user: {
                    name: '示例介绍',
                    img: 'dist/images/2.png',
                },
                messages: [
                    {
                        content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                        date: now,
                    }, {
                        content: '项目地址: https://github.com/coffcer/vue-chat',
                        date: now,
                    },
                ],
            },
            {
                id: 2,
                user: {
                    name: 'webpack',
                    img: 'dist/images/3.jpg',
                },
                messages: [],
            },
        ],
        // 当前选中的会话
        currentSessionId: 1,
        // 过滤出只包含这个key的会话
        filterKey: '',
    },
    mutations: {
        INIT_DATA(state) {
            const data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // 发送消息
        SEND_MESSAGE({ sessions, currentSessionId }, content) {
            const session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content,
                date: new Date(),
                self: true,
            });
        },
        // 选择会话
        SELECT_SESSION(state, id) {
            state.currentSessionId = id;
        },
        // 搜索
        SET_FILTER_KEY(state, value) {
            state.filterKey = value;
        },
    },
    actions: {
        initData({ commit }) {
            commit('INIT_DATA');
        },
        sendMessage({ commit }, content) {
            commit('SEND_MESSAGE', content);
        },
        selectSession({ commit }, id) {
            commit('SELECT_SESSION', id);
        },
        search({ commit }, value) {
            commit('SET_FILTER_KEY', value);
        },
    },
    getters: {
        user: ({ user }) => user,
        filterKey: ({ filterKey }) => filterKey,
        // 过滤后的会话列表
        sessions: ({ sessions, filterKey }) => {
            const result = sessions.filter(session => session.user.name.includes(filterKey));
            return result;
        },
        // 当前会话index
        currentId: ({ currentSessionId }) => currentSessionId,
        session: ({ sessions, currentSessionId }) =>
            sessions.find(session => session.id === currentSessionId),
    },
});

store.watch(
    state => state.sessions,
    (val) => {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true,
    },
);

export default store;
