/*
保存聊天会话列表
*/
const state = {
    // 会话列表
    all_sessions: [
        {
            wechat_id: 1,
            // 会话列表
            sessions: [
                {
                    wechat_id: 2,
                    is_proxied: false,
                    is_proxy: false,
                    unread_msg_count: 2,
                    last_unread_msg: 'CNMB',
                    last_msg_time: 123213213,
                },
                {
                    wechat_id: 3,
                    is_proxied: true,
                    is_proxy: false,
                    unread_msg_count: 2,
                    last_unread_msg: 'CNMB',
                    last_msg_time: 123213213,
                },
            ],
        },
        {
            wechat_id: 2,
            // 会话列表
            sessions: [],
        },
    ],
};

const mutations = {
};

const actions = {
};

export default {
    state,
    mutations,
    actions,
};
