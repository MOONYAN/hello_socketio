var app = new Vue({
    el: '#v-app',
    data: {
        title: 'Websockets Testers',
        text: '',
        messages: ['Some message', 'Another message'],
        socket: null
    },
    methods: {
        sendMessage() {
            console.log(`send: ${this.text}`);
            this.socket.emit('msgToServer',this.text);
            this.text = '';
        },
        receiveMessage(msg){
            console.log(`received: ${msg}`)
            this.messages.push(msg);
        }
    },
    created() {
        this.socket = io('ws://localhost:3000',{transports: ['websocket']});
        this.socket.on('msgToClient', msg => {
            console.log(msg);
            this.receiveMessage(msg);
        })
    }
});