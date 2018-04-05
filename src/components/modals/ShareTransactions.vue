<template>
    <modal name="share-transactions" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">{{ $t('modals.share.title') }}</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">
            <div class="modal-control double">
                <div class="modal-input modal-input-textarea">
                    <div class="control">
                        <label class="title">{{ $t('modals.share.label') }}</label>
                    </div>
                    <textarea-control
                        :textarea-id="'comment'"
                        :placeholder="$t('modals.share.label')"
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

