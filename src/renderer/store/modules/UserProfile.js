/*
保存登录用户的基本信息
*/

const state = {
    user: [
        {
            wechat_id: 123,
            wechat_name: '微信名',
            wechat_nickname: '昵称',
            img: 'dist/images/2.png',
        }, // ...
    ],
};

const mutations = {
    /* UPDATE_USER_NICK_NAME(state, id, nickname) {
    }, 
    ADD_USER(state, user) {
    }, */
};

const actions = {
    updateUserNickName({ commit }, id, nickname) {
        commit('UPDATE_USER_NICK_NAME', id, nickname);
    },
    addUser({ commit }, user) {
        commit('ADD_USER', user);
    },
};

export default {
    state,
    mutations,
    actions,
};
