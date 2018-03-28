<template>
    <modal name="shareTransactions" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">Share</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">
            <div class="modal-control double">
                <div class="modal-input modal-input-textarea">
                    <div class="control">
                        <label class="title">Add your comment</label>
                    </div>
                    <textarea-control
                        :textarea-id="'comment'"
                        :placeholder="'Write your comment here'"
                        :inputValue="inputValue"
                    />
                </div>
            </div>
            <div class="modal-control last">
                <div class="modal-input">
                    <div class="share-area">
                        <div class="row">
                            <button class="buttons button-mail">
                                <i class="button-icon mail-icon"></i>
                                Mail
                            </button>
                            <button class="buttons button-google">
                                <i class="button-icon google-icon"></i>
                                Google+
                            </button>
                            <button class="buttons button-telegram">
                                <i class="button-icon tg-icon"></i>
                                Telegram
                            </button>
                        </div>
                        <div class="row">
                            <button class="buttons button-twitter">
                                <i class="button-icon twitter-icon"></i>
                                Twitter
                            </button>
                            <button class="buttons button-facebook">
                                <i class="button-icon facebook-icon"></i>
                                Facebook
                            </button>
                            <button class="buttons button-vk">
                                <i class="button-icon vk-icon"></i>
                                Vkontakte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
    import TextareaControl from '../layouts/forms/TextareaControl';

    export default {
        name: "share-transactions",
        components: {
            TextareaControl
        },
        data() {
            return {
                inputValue: ''
            }
        },
        methods: {
            closeModal: function() {
                this.$modal.hide('shareTransactions');
            },
            parseBalance: function(balance) {
                return numeral(balance).format('0,0') + " " + "ALC";
            },
            changeApplyState: function() {
                this.$parent.$emit('setApplyState', true);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .modal-input-textarea
        align-items flex-start !important
        border-bottom 1px solid #d1d1d1
        padding-bottom 18px

    .share-area
        display flex
        flex-direction column
        width 100%

        .row
            display flex
            justify-content space-between

            .buttons
                font-family MuseoSansCyrl300
                font-size 16px
                font-weight 300
                line-height 1.25
                display flex
                justify-content center
                align-items center
                flex-grow 1
                margin-right 12px
                border-radius 5px
                cursor pointer
                &:last-of-type
                    margin-right 0

            .button-icon
                display block
                background-size cover
                margin-right 5px

                &.mail-icon
                    width 13.5px
                    height 10px
                    background-image url('../../assets/img/share-icons/mail.svg')

                &.google-icon
                    width 13.5px
                    height 14px
                    background-image url('../../assets/img/share-icons/g-plus.svg')

                &.twitter-icon
                    width 13px
                    height 11px
                    background-image url('../../assets/img/share-icons/twitter.svg')

                &.facebook-icon
                    width 7px
                    height 14px
                    background-image url('../../assets/img/share-icons/fb.svg')

                &.vk-icon
                    width 15.5px
                    height 8.5px
                    background-image url('../../assets/img/share-icons/vk.svg')

                &.tg-icon
                    width 13px
                    height 11px
                    background-image url('../../assets/img/share-icons/telegram-ic.svg')


            .button-mail
                background-color #445b7c
                color #ffffff

            .button-google
                background-color #de0021
                color #ffffff

            .button-telegram
                background-color #2ea1dc
                color #ffffff

            .button-twitter
                background-color #00baf2
                color #ffffff

            .button-facebook
                background-color #3e549c
                color #ffffff

            .button-vk
                background-color #4b6f92
                color #ffffff
</style>
