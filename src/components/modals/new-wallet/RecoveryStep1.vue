<template>
    <div>
        <div class="modal-warning">
            <p class="agreed">
                {{ $t('modals.newWallet.recovery.phrase.text') }}
            </p>

            <label class="control control-checkbox">
                <span>{{ $t('modals.newWallet.recovery.phrase.checkbox') }}</span>
                <input type="checkbox"
                    class="type_project_arr"
                    v-model="isAgreedRecovery"/>
                <div class="control-indicator"></div>
            </label>
        </div>

        <div class="wrap-spinner"
                v-if="dataProcessing">
            <spinner/>
        </div>

        <div class="modal-btn text-center">
            <button id="continue-to-recovery"
                class="btn btn-yellow btn-large btn-bottom btn-timer"
                :disabled="countTimer || !isAgreedRecovery || dataProcessing"
                :class="{ 'disabled': countTimer !== 0 || !isAgreedRecovery || dataProcessing}"
                @click="getRandomSeed()">
                {{ $t('modals.newWallet.recovery.phrase.btn') }}
                <span v-if="countTimer !== 0">
                    ({{ countTimer }})
                </span>
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
            countTimer: {
                type: Number,
                required: true,
            },
        },
        data () {
            return {
                isAgreedRecovery: false,
            }
        },
        watch: {
            isAgreedRecovery: function () {
                this.reactiveAgreedRecovery();
            },
        },
        methods: {
            reactiveAgreedRecovery: function () {
                this.$parent.$parent.$emit('changeAgreedRecovery', this.isAgreedRecovery);
            },
            getRandomSeed: function () {
                this.$parent.$parent.$emit('getRandomSeed');
            },
        },
    }
</script>