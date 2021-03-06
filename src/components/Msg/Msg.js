import axios from 'axios'

export default {
    name: 'Msg',
    data() {
        return {
            msg: {
                hasnot_read_messages: [],
                has_read_messages: []
            },
            tag: 'unread'
        }
    },
    computed: {
        skinColor() {
            return this.$store.state.skinColor;
        },
        at() {
            return this.$store.state.at;
        },
        msgReadTabs() {
            return [
                {title: '未读消息', tag: 'unread', messages:  this.msg.hasnot_read_messages.length},
                {title: '已读消息', tag: 'read', messages: this.msg.has_read_messages.length },
            ]
        }
    },
    created() {
        if(!this.at) {
            this.$router.push({name: 'Login'});
            return ;
        }
        axios.get(`https://cnodejs.org/api/v1/messages?accesstoken=${this.at}`)
             .then(result => result.data.data)
             .then(msg => this.msg = msg)
             .then(msg => {
                 this.$store.commit('updateMsgCount', msg.hasnot_read_messages.length);
             })
    },
    methods: {
        hiddenMsg() {
            this.$router.go(-1);
        },
        changeTab(tag) {
            this.tag = tag;
        },
        markOne(id) {
             axios.post(`https://cnodejs.org/api/v1//message/mark_one/${id}`, {
                 accesstoken: this.at
             }).then(result => {
                 if(result.data.success) {
                  axios.get(`https://cnodejs.org/api/v1/message/count?accesstoken=${this.at}`)
                        .then(result => result.data) 
                        .then(data => {
                            if(data.success) {
                                this.$store.commit('updateMsgCount', data.data);
                            }
                        })
                }
             })
        }
    }
}