<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <div>
        <div class="modal-warning">
            <p class="agreed">
                {{ $t('modals.newWallet.recovery.mnemonic.text') }}
            </p>
        </div>

        <div class="phrase">
            <span class="mnemonic-phrase"
                v-for="(mnemonic, index) in recoveryMnemonicPhrase" :key="index">
                {{ mnemonic }}
            </span>
        </div>

        <div class="modal-btn text-center">
            <button id="copy-mnemonic"
                type="button"
                class="buttons button-copy btn-default"
                v-clipboard:copy="copyMnemonic()"
                @click="successCopyMnemonic">
                <img class="icon-copy"
                    :src="getIcon('tmp_copy_icon')">
                {{ $t('modals.newWallet.recovery.mnemonic.btnCopy') }}
            </button>
            <button class="btn btn-yellow btn-large btn-bottom"
                @click="changeRecoveryStep('next')">
                {{ $t('modals.newWallet.recovery.mnemonic.btn') }}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewWalletRecoveryStep1",
        props: {
            recoveryMnemonicPhrase: {
                type: [Array, String],
                required: true,
            },
        },
        methods: {
            changeRecoveryStep: function (data) {
                this.$parent.$parent.$emit('changeRecoveryStep', data);
            },
            copyMnemonic: function () {
                return this.recoveryMnemonicPhrase.join(' ');
            },
            successCopyMnemonic: function () {
                this.$toasted.show(this.$t('modals.newWallet.recovery.mnemonic.toastedSuccessMnemonic'), {
                    duration: 5000,
                    type: 'success',
                });
            },
            getIcon: function (name) {
                if (this.selectedTheme === "dark")
                    return require(`../../../assets/img/${name}_dark.svg`);
                else if (this.selectedTheme === "white")
                    return require(`../../../assets/img/${name}_dark.svg`);
                else return require(`../../../assets/img/${name}.svg`);
            }
        },
    }
</script>