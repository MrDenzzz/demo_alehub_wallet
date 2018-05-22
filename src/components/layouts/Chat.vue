<template>
    <div class="chat">
        <transition name="fade">
            <div class="chat-panel" v-if="isOpenChatPanel">
                <div class="panel-heading" @click="toggleActionsPanel">
                    <div class="panel-wrap">
                        <div class="panel-info">
                            <img src="../../../static/img/avatar.svg" alt="" class="panel-picture" />
                            <div class="panel-title">
                                <h3 class="title">Tim Colleg</h3>
                                <span class="subtitle">Quality Assurance</span>
                            </div>
                        </div>
                        <div class="close-panel" @click="toggleChatPanel"></div>
                    </div>
                    <div class="divider" v-if="showActionsPanel"></div>
                    <div class="panel-actions" v-if="showActionsPanel" @click.stop.prevent>
                        <div class="actions-btn" v-if="!showSearch">
                            <div class="search-btn" @click="showSearch = !showSearch">
                                <img src="../../../static/img/search.svg" alt="" width="15px" height="15px">
                                <span>Search</span>
                            </div>
                            <div class="parameters-btn">
                                <img src="../../../static/img/parameters.svg" alt="">
                                <span>Parameters</span>
                            </div>
                        </div>
                        <div class="chat-search" v-if="showSearch">
                            <div class="search">
                                <img src="../../../static/img/search.svg" alt="" width="15px" height="15px">
                                <input type="text" placeholder="Search in chat...">
                            </div>
                            <div class="search-btn">
                                <div class="cancel">
                                    Cancel
                                </div>
                                <img src="../../../static/img/next.svg" alt="">
                                <img src="../../../static/img/prev.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel-body" id="chat-panel">
                    <div class="panel-messages">
                        <p class="date">30 Mar</p>

                        <div class="message" v-for="(message, messageIndex) in data" :class="{ 'message-sender': message.isMyMessage === true, 'message-receiver': message.isMyMessage !== true}">
                            <img src="../../../static/img/avatar.svg" alt="" class="sender-avatar" v-if="message.isMyMessage" />
                            <div class="data">
                                <p class="text">{{ message.text }}</p>
                                <div class="message-status">
                                    <div class="time">{{ message.time }}</div>
                                </div>
                            </div>
                            <img src="../../../static/img/avatar.png" alt="" class="receiver-avatar" v-if="!message.isMyMessage" />
                        </div>

                    </div>
                </div>
                <div class="panel-footer">
                    <div class="panel-form">
                        <div class="form-message">
                            <div class="file-upload">
                                <label for="upload-file">
                                    <div class="attach-file"></div>
                                </label>
                                <input type="file" id="upload-file" @change="sendFile($event)">
                            </div>
                            <input type="text" class="input-panel" placeholder="Write a message..." @keyup.enter="sendMessage" v-model="messageText" />
                        </div>
                        <div class="send" @click="sendMessage"></div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="buttons-group">
            <div class="chats" v-if="showChats && !isOpenChatPanel">
                <div class="chats-item" v-for="chat in chats" :key="chat.id">
                    <div class="chats-info">
                        <div class="title">{{ chat.name }}</div>
                        <div class="subtitle" v-if="chat.numberOfParticipants">{{ chat.numberOfParticipants }} participants</div>
                        <div class="subtitle" v-else>{{ chat.type }}</div>
                    </div>
                    <div class="circle" v-if="chat.bg" :style="{'background-image': 'linear-gradient(' + chat.bg + ')'}">
                        <span>{{ chat.abbr }}</span>
                    </div>
                    <div class="circle" v-else>
                        <img :src="chat.avatar" alt="" width="48px">
                    </div>
                </div>
                <div class="chats-item">
                    <div class="circle">
                        <div class="add-icon"></div>
                    </div>
                </div>
            </div>
            <div class="triangle-top" v-if="!showChats && !isOpenChatPanel" @click="showChats = !showChats"></div>
            <div class="toggle-chat" @click="toggleChatPanel" :class="{ 'pulse-anime': isNewMessage === true}">
                <div class="chat-icon"></div>
            </div>
            <div class="triangle-bottom" v-if="showChats && !isOpenChatPanel" @click="showChats = !showChats"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Chat',
    props: ['data'],
    data () {
        return {
            isOpenChatPanel: false,
            messageText: '',
            isNewMessage: false,
            showChats: false,
            showActionsPanel: false,
            showSearch: false,
            chats: [
                {
                    name: 'Masters of sync',
                    numberOfParticipants: 3,
                    bg: 'to right, #73d7ff, #2ba3f7',
                    abbr: 'MS'
                },
                {
                    name: 'After party',
                    numberOfParticipants: 5,
                    bg: 'to right, #a1df7e, #56d36a',
                    abbr: 'AP'
                },
                {
                    name: 'Gathering requirements',
                    numberOfParticipants: 17,
                    bg: 'to right, #c07b44, #b63c2c',
                    abbr: 'GR'
                },
                {
                    name: 'Re-Calculations',
                    numberOfParticipants: 3,
                    bg: 'to right, #b46dd0, #7e20c0',
                    abbr: 'RC'
                },
                {
                    name: 'Tim Colleg',
                    type: 'Quality Assurance',
                    avatar: '../../../static/img/avatars/qa.svg'
                },
                {
                    name: 'Thorsten & Co',
                    type: 'Check'
                },
                {
                    name: 'Al & Co',
                    type: 'TS execution'
                }
            ]
        }
    },
    watch: {
        data: function (val) {
            if(!this.isOpenChatPanel) {
                this.isNewMessage = true;
            }
        }
    },
    methods: {
        sendFile (e) {
            return this.$parent.$emit('newMessageToChat', `Uploaded file - ${e.target.files[0].name}`);
        },
        toggleChatPanel () {
            if(!this.isOpenChatPanel) {
                this.isNewMessage = false;
            }
            this.isOpenChatPanel = !this.isOpenChatPanel;
            this.showChats = false;
            this.showActionsPanel = false;
            this.showSearch = false;
        },
        toggleActionsPanel: function() {
            this.showActionsPanel = !this.showActionsPanel;
            this.showSearch = false;
        },
        sendMessage () {
            if(this.messageText.length === 0) {
                return false;
            } else {
                this.$parent.$emit('newMessageToChat', this.messageText);
                return this.messageText = '';
            }
        }
    }
}
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
</style>

<style lang="stylus" scoped>
    .chat
        position fixed
        z-index 5
        right 24px
        bottom 24px
        display flex
        align-items flex-end
        cursor pointer

        .buttons-group
            position relative

            .triangle-top
                border 6px solid transparent
                border-bottom 6px solid #aab7c7 
                position absolute
                top -18px
                left 18px 

            .triangle-bottom
                border 6px solid transparent
                border-top 6px solid #aab7c7 
                position absolute
                bottom -18px
                left 18px 

            .chats
                display flex
                flex-direction column
                position absolute 
                bottom 58px
                right 0

                .chats-item
                    display flex
                    justify-content space-between
                    align-items center
                    margin-top 12px

                    &:last-child
                        justify-content flex-end

                    .chats-info
                        display flex
                        flex-direction column
                        align-items flex-end
                        font-family MuseoSansCyrl500
                        font-weight 500
                        color #34343e
                        width 140px
                        margin-right 8px

                        .title
                            font-size 12px
                            white-space nowrap

                        .subtitle
                            font-size 8px
                            white-space nowrap

                    .circle
                        box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)

                        span 
                            font-family MuseoSansCyrl500
                            font-size 16px
                            color #fcfcfc

                .add-icon
                    width 20px
                    height 20px
                    background-image url('../../../static/img/add-ic.svg')
                    background-size contain
                    background-repeat no-repeat

            .toggle-chat
                width 48px
                height 48px
                background-color #aab7c7
                box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24);
                border-radius 50%
                display flex
                justify-content center
                align-items center

                &.pulse-anime
                    animation pulse 1s linear infinite

                .chat-icon
                    width 24px
                    height 24px
                    background-image url('../../../static/img/chat-ic.svg')
                    background-size contain
                    background-repeat no-repeat

                @keyframes pulse
                    0%
                        transform: scale(1, 1)
                    50%
                        transform: scale(1.1, 1.1)
                    100%
                        transform: scale(1, 1)

                &:hover
                    box-shadow 0 0 16px 0 rgba(0, 0, 0, 0.12), 0 2px 8px 0 rgba(0, 0, 0, 0.24)

        .chat-panel
            width 340px
            height 530px
            margin-right 18px
            border-radius 8px
            background-image linear-gradient(to right, #6b6b6b, #222222)
            box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)

            .panel-heading
                width 100%
                height auto
                padding 12px
                display flex
                flex-direction column

                .divider
                    height 1px
                    background-color #e5e9ed
                    opacity 0.3
                    margin 12px 0

                .panel-actions
                    height 22px

                    .actions-btn
                        align-items center
                        display flex
                    
                        .search-btn, .parameters-btn
                            width 50%
                            display flex
                            justify-content center
                            align-items center
                            font-family MuseoSansCyrl300
                            font-size 14px
                            opacity 0.8
                            color #ffffff

                            img
                                margin-right 6px
                                
                    .chat-search
                        display flex
                        align-items center
                        justify-content space-between
                        color #ffffff

                        .cansel
                            font-family MuseoSansCyrl500
                            font-size 12px

                        .search
                            display flex
                            align-items center

                            input 
                                opacity 0.5
                                font-family MuseoSansCyrl300
                                font-size 14px
                                font-weight 300
                                color #ffffff
                                border none!important
                                outline none
                                margin-left 14px
                                background transparent

                                &::-webkit-input-placeholder
                                    color #ffffff

                        .search-btn
                            display flex
                            align-items center

                            img
                                margin-left 8px
                    
                .panel-wrap
                    display flex
                    justify-content space-between

                    .close-panel
                        width 15px
                        height 15px
                        background-image url('../../../static/img/close-ic.svg')
                        background-size contain
                        background-repeat no-repeat

                    .panel-info
                        display flex

                        .panel-picture
                            width 48px
                            height 48px

                        .panel-title
                            margin-left 18px

                            .title
                                margin 0
                                font-family MuseoSansCyrl300
                                font-size 21px
                                font-weight bold
                                line-height 1.29
                                color #ffffff

                            .subtitle
                                opacity 0.8
                                font-family: MuseoSansCyrl300
                                font-size 15px
                                font-weight 500
                                color #ffffff

            .panel-body
                background-color #ffffff
                width 100%
                height calc(100% - 115px)
                display flex
                flex-direction column
                overflow-x scroll

                .panel-messages
                    width 100%
                    height 100%

                    .date
                        font-family MuseoSansCyrl500
                        font-size 12px
                        color #34343e
                        margin 0
                        padding 9px 12px
                        text-align center

                    .message
                        margin 12px 12px 20px 12px
                        display flex
                        align-items flex-end
                        justify-content flex-start

                        .sender-avatar
                            min-width 36px
                            min-height 36px

                        .data
                            background-color rgba(139, 55, 255, 0.3)
                            padding 4px 16px
                            display flex
                            align-items flex-end
                            margin-left 8px
                            border-radius 15px
                            
                            .text
                                font-family MuseoSansCyrl300
                                font-size 16px
                                line-height 1.33
                                color #34343e
                                margin 0

                            .message-status
                                display flex
                                margin-left 6px

                                .time
                                    font-family MuseoSansCyrl300
                                    font-size 12px
                                    color #34343e

                        /*&::before
                            content url('../../../static/img/bubble.svg')
                            position relative
                            left -20px
                            top 7px*/

                        &.message-receiver
                            justify-content flex-end

                            .data
                                margin-left 0
                                margin-right 8px
                                background-color rgba(168, 184, 200, 0.3)

                                &::before
                                    content ''

                            .receiver-avatar
                                min-width 36px
                                min-height 36px

            .panel-footer
                border-radius 0 0 8px 8px
                background-color #ffffff

                .panel-form
                    display flex
                    justify-content space-between
                    padding 10px 12px
                    border-top 2px solid #e5e9ed

                    .form-message
                        display flex
                        align-items center

                        #upload-file
                            display none

                        .attach-file
                            width 18px
                            height 19.5px
                            background-image url('../../../static/img/attachments-ic.svg')
                            background-repeat no-repeat
                            background-size contain

                        .input-panel
                            opacity 0.5
                            font-family: MuseoSansCyrl300
                            font-size 16px
                            font-weight 300
                            color #34343e
                            border none!important
                            outline none
                            margin-left 12px

                    .send
                        width 21px
                        height 21px
                        background-image url('../../../static/img/send-ic.svg')
                        background-size contain
                        background-repeat no-repeat

    .circle
        border-radius 50%
        width 48px
        height 48px
        background-image none 
        background-color #aab7c7
        box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)
        display flex
        justify-content center
        align-items center
    
</style>