<template>
    <div>
        <div class="body"
            v-if="walletType === 'new'">
            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">
                        {{ $t('modals.newWallet.new.fields.title.label') }}
                    </label>
                    <input id="newWalletName"
                        type="text"
                        class="input"
                        v-model="walletName"
                        :placeholder="$t('modals.newWallet.new.fields.title.placeholder')"
                        @keyup.enter="changeStepCreate('next')">
                </div>
            </div>

            <div class="modal-btn text-center">
                <button class="btn btn-yellow btn-large"
                    @click="changeStepCreate('next')"
                    :disabled="checkNewWalletFields"
                    :class="{ 'disabled': checkNewWalletFields }">
                    {{ $t('modals.newWallet.new.button') }}
                </button>
            </div>
        </div>

        <div class="body" v-if="walletType === 'redeem'">
            <div class="modal-control">
                <div class="modal-input input-phrase">
                    <label class="title">
                        {{ $t('modals.newWallet.redeem.fields.decrypt.label') }}
                    </label>
                    <div class="badge-control"
                        v-if="mnemonics.length !== 0">
                        <span class="badge"
                            v-for="(mnemonic, indexMnemonic) in mnemonics" :key="indexMnemonic">
                            {{ mnemonic }}
                        </span>
                    </div>
                    <input id="redemption-key"
                        class="input"
                        type="text"
                        placeholder="Mnemonic phrase"
                        v-on:keyup.188="addMnemonic"
                        v-model="mnemonicField"
                        @keyup.enter="addMnemonic"
                        @keyup.delete="removeMnemonic"
                        @keyup.space="addMnemonic"
                        @blur="onBlurNewWallet"/>
                </div>
            </div>

            <div class="wrap-spinner"
                v-if="dataProcessing">
                <spinner/>
            </div>

            <div class="modal-btn text-center">
                <button id="button-redemption-wallet"
                    class="btn btn-yellow btn-large"
                    @click="redeemCreateWallet"
                    :disabled="!checkFilledRedemption"
                    :class="{ 'disabled': !checkFilledRedemption }">
                    {{ $t('modals.newWallet.redeem.button') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewWalletStep1",
        props: {
            walletType: {
                type: String,
                required: true,
            },
            checkNewWalletFields: {
                type: Boolean,
                required: true,
            },
            mnemonics: {
                type: Array,
                required: true,
            },
            dataProcessing: {
                type: Boolean,
                required: true,
            },
        },
        data () {
            return {
                walletName: '',
                mnemonicField: '',
            }
        },
        computed: {
            checkFilledRedemption: function () {
                if (this.mnemonics.length === 12)
                    return true;
                return false;
            },
        },
        watch: {
            walletName: function () {
                this.reactiveWalletName();
            },
            mnemonicField: function () {
                this.reactiveMnemonicField();
            }
        },
        methods: {
            reactiveWalletName: function () {
                this.$parent.$parent.$emit('changeWalletName', this.walletName);
            },
            reactiveMnemonicField: function () {
                this.$parent.$parent.$emit('changeMnemonicField', this.mnemonicField);
            },
            changeStepCreate: function (data) {
                this.$parent.$parent.$emit('changeStepCreate', data);
            },
            addMnemonic: function () {
                let newMnemonic = this.mnemonicField.replace(/,/g, '');
                if (newMnemonic === '')
                    return false;
                newMnemonic = newMnemonic.split(' ');
                for (let i = 0; i < newMnemonic.length; i++) {
                    if (newMnemonic[i] !== '')
                        this.pushMnemonic(newMnemonic[i]);
                }
                this.mnemonicField = '';
            },
            pushMnemonic: function (mnemonic) {
                this.$parent.$parent.$emit('pushMnemonic', mnemonic);
            },
            removeMnemonic: function () {
                if (this.mnemonics.length === 0 || this.mnemonicField !== '')
                    return false;
                this.mnemonicField = this.mnemonics[this.mnemonics.length - 1];
                this.popMnemonic();
            },
            popMnemonic: function () {
                this.$parent.$parent.$emit('popMnemonic');
            },
            onBlurNewWallet: function () {
                this.mnemonicField = '';
            },
            redeemCreateWallet: function () {
                this.$parent.$parent.$emit('redeemCreateWallet');
            }
        },
    }
</script>