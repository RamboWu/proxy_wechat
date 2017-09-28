/*
保存当前聊天消息内容
*/
const state = {
    // 会话列表
    wechat_id_user: 123,
    wechat_id_contact: 456,
    messages: [
        {
            content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
            date: 1234,
        },
        {
            content: '项目地址: https://github.com/coffcer/vue-chat',
            date: 12345,
        },
    ],
};

const mutations = {
    // 会有 选择 某个会话的 mutation
};

const actions = {
};

export default {
    state,
    mutations,
    actions,
};
