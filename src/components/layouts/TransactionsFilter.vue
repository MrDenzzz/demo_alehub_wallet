<template>
    <div style="display: flex; justify-content: space-between;">
        <div style="width: 15%;">
            <div>
                <button class="buttons btn-yellow" @click="openModal('send')">
                    <img src="../../assets/img/send.svg" width="18" height="15" class="icon">
                    {{ $t('pages.summary.buttons.send') }}
                </button>
            </div>
            <div>
                <button class="buttons btn-default" @click="openModal('request')">
                    <img src="../../assets/img/receive.svg" width="18" height="15" class="icon">
                    {{ $t('pages.summary.buttons.request') }}
                </button>
            </div>
        </div>
        <div style="justify-content: flex-start; width: 20%;">
            <div>
                <div>
                    <div>
                        <datepicker
                                id="datepickerFrom"
                                v-model="dateFrom"
                                language="en"
                                :placeholder="placeholderDateFrom"
                        />
                    </div>
                    <div>
                        <datepicker
                                id="datepickerTo"
                                v-model="dateTo"
                                language="en"
                                :placeholder="placeholderDateTo"
                        />
                    </div>
                </div>
            </div>
            <div>
                purpose
            </div>
        </div>
        <div style="justify-content: flex-start; width: 20%;">
            <div>
                было 100000 АЛЕ
            </div>
            <div>
                стало {{ currentBalance }} ALE
            </div>
            <div>
                отправил 100000 АЛЕ
            </div>
            <div>
                получил 10000 АЛЕ
            </div>
        </div>
        <div style="width: 100%; justify-content: flex-end; display: flex;">
            <div>
                <div>
                    выгрузить в пдф
                </div>
                <div>
                    отправить
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: "transactions-filter",
        components: {
            Datepicker
        },
        data() {
            return {
                dateFrom: null,
                dateTo: null,
                placeholderDateFrom: 'Date from',
                placeholderDateTo: 'Date to',
            }
        },
        computed: {
            currentBalance: function () {
                return this.$store.state.Wallets.currentWallet.balance;
            }
        },
        methods: {
            currentBalanceBeginPeriod: function () {

            },
            currentBalanceEndPeriod: function () {

            },
            numberSentCoin: function () {

            },
            numberReceiveCoin: function () {

            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>