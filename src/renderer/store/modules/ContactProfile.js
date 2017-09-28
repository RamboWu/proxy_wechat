/*
保存联系人信息
*/

const state = {
    contacts: [
        {
            wechat_id: 123,
            users: [
                {
                    wechat_id: 456,
                    wechat_name: '微信名',
                    wechat_nickname: '昵称',
                    img: 'dist/images/2.png',
                }, // ...
            ],
        },
        // ...
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
