<template>
    <div class="body">
        <div class="modal-warning agreed-border">
            <p class="agreed">
                {{ $t('modals.newWallet.recovery.finish.each') }}
            </p>
        </div>

        <div class="modal-control modal-control-noMargin">
            <div class="modal-input input-phrase">
                <label class="title">
                    {{ $t('modals.newWallet.recovery.finish.fields.phrase.title') }}
                </label>
                <div class="badge-control"
                    v-if="mnemonicsRecovery.length !== 0">
                    <span class="badge"
                        v-for="mnemonic in mnemonicsRecovery">
                        {{ mnemonic }}
                    </span>
                </div>
                <input id="input-to-mnemonic-recovery"
                    type="text"
                    class="input"
                    :placeholder="$t('modals.newWallet.recovery.finish.fields.phrase.placeholder')"
                    v-on:keyup.188="addMnemonicRecovery"
                    v-model="mnemonicFieldRecovery"
                    @keyup.enter="addMnemonicRecovery"
                    @keyup.delete="removeMnemonicRecovery"
                    @keyup.space="addMnemonicRecovery"
                    @blur="addMnemonicRecovery"/>
            </div>
        </div>

        <div class="modal-warning">
            <label class="control control-checkbox">
                <span>{{ $t('modals.newWallet.recovery.finish.fields.deviceOnly') }}</span>
                <input type="checkbox"
                    class="type_project_arr"
                    :checked="restorationAgreements.deviceOnly"
                    @click="changeCheck('deviceOnly')"/>
                <div class="control-indicator"></div>
            </label>

            <label class="control control-checkbox">
                <span>{{ $t('modals.newWallet.recovery.finish.fields.secure') }}</span>
                <input type="checkbox"
                    class="type_project_arr"
                    :checked="restorationAgreements.phraseSecure"
                    @click="changeCheck('phraseSecure')"/>
                <div class="control-indicator"></div>
            </label>
        </div>

        <div class="wrap-spinner"
            v-if="dataProcessing">
            <spinner/>
        </div>

        <div class="modal-btn text-center">
            <button class="btn btn-default btn-large"
                :class="{ 'disabled': mnemonicsRecovery.length === 0 || dataProcessing}"
                @click="clearRecoveryPhrase"
                :disabled="mnemonicsRecovery.length === 0 || dataProcessing">
                {{ $t('modals.newWallet.recovery.finish.btn.clear') }}
            </button>
            <button id="create-new-wallet"
                class="btn btn-yellow btn-large"
                :class="{ 'disabled': isConfirmRecovery || dataProcessing}"
                :disabled="isConfirmRecovery || dataProcessing"
                @click="newCreateWallet">
                {{ $t('modals.newWallet.recovery.finish.btn.confirm') }}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewWalletRecoveryStep1",
        props: {
            dataProcessing: {
                type: Boolean,
                required: true,
            },
            mnemonicsRecovery: {
                type: Array,
                required: true,
            },
            restorationAgreements: {
                type: Object,
                required: true,
            },
            isConfirmRecovery: {
                type: Boolean,
                required: true,
            }
        },
        data () {
            return {
                mnemonicFieldRecovery: '',
            }
        },
        watch: {
            mnemonicFieldRecovery: function () {
                this.reactiveMnemonicFieldRecovery();
            },
        },
        methods: {
            reactiveMnemonicFieldRecovery: function () {
                this.$parent.$parent.$emit('changeMnemonicFieldRecovery', this.mnemonicFieldRecovery);
            },
            addMnemonicRecovery: function () {
                let newMnemonic = this.mnemonicFieldRecovery.replace(/,/g, ' ');
                if (newMnemonic === '')
                    return false;

                newMnemonic = newMnemonic.split(' ');
                for (let i = 0; i < newMnemonic.length; i++) {
                    if (newMnemonic[i] !== '')
                        this.pushMnemonicRecovery(newMnemonic[i]);
                }
                this.mnemonicFieldRecovery = '';
            },
            pushMnemonicRecovery: function (mnemonic) {
                this.$parent.$parent.$emit('pushMnemonicRecovery', mnemonic);
            },
            removeMnemonicRecovery: function () {
                if (this.mnemonicFieldRecovery !== '' || this.mnemonicsRecovery.length === '')
                    return false;
                this.mnemonicFieldRecovery = this.mnemonicsRecovery[this.mnemonicsRecovery.length - 1];
                this.popMnemonicRecovery();
            },
            popMnemonicRecovery: function () {
                this.$parent.$parent.$emit('popMnemonicRecovery');
            },
            changeCheck: function (data) {
                this.$parent.$parent.$emit('changeRestorationAgreements', data)
            },
            clearRecoveryPhrase: function () {
                this.$parent.$parent.$emit('clearRecoveryPhrase');
            },
            newCreateWallet: function () {
                this.$parent.$parent.$emit('newCreateWallet')
            }
        },
    }
</script>