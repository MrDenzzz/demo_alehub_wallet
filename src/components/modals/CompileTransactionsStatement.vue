<template>
    <modal name="download-pdf" width="700" height="auto">
        <div class="heading">
            <p class="title">Download statistics</p>
            <i class="close" @click="closeModal('download-pdf')"></i>
        </div>
        <div class="body">
            <form @submit.prevent="downloadPDF">
                <div class="modal-control">
                    <div class="modal-input__pdf">
                        <input type="radio"
                               id="radio1"
                               name="transaction-selection"
                               value="current"
                               v-model="selectionTypeStatement">
                        <label for="radio2">Транзакции текущего кошелька</label>
                    </div>
                <!--</div>-->
                <!--<div class="modal-control" style="border-bottom: none;">-->
                    <div class="modal-input__pdf">
                        <input
                                type="radio"
                                id="radio2"
                                name="transaction-selection"
                                value="all"
                                v-model="selectionTypeStatement">
                        <label for="radio1">Все транзакции</label>
                    </div>
                <!--</div>-->
                <!--<div class="modal-control">-->
                    <div class="modal-input__pdf">
                        <input
                                type="radio"
                                id="radio3"
                                name="transaction-selection"
                                value="optional"
                                v-model="selectionTypeStatement">
                        <label for="radio3">Опционально</label>
                    </div>
                </div>

                <div class="modal-control"
                     style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div class="wrap">
                        <div class="modal-input__pdf" v-for="wallet in wallets">
                            <input type="checkbox" name="wallets">
                            <label>{{ wallet.name }}</label>
                        </div>
                    </div>

                    <div class="modal-input__pdf">
                        <button type="button">
                            Скрыть пустые кошельки
                        </button>
                    </div>
                </div>

                <div class="modal-control">
                    <div class="modal-input">
                        <datepicker
                                id="datepickerFrom1"
                                v-model="dateFromDatepicker"
                                language="en"
                                :inline="true"
                                :placeholder="'Date from'"/>

                        <datepicker
                                id="datepickerTo1"
                                v-model="dateToDatepicker"
                                language="en"
                                :inline="true"
                                :placeholder="'Date to'"/>
                    </div>
                </div>


                <div v-if="dataProcessing" class="wrap-spinner">
                    <spinner/>
                </div>

                <div class="modal-footer">
                    <button class="buttons btn-yellow btn-large" type="submit">
                        Download
                    </button>
                </div>
            </form>
        </div>
    </modal>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import Spinner from '../layouts/Spinner';

    import JsPDF from 'jspdf';
    import Moment from 'moment';

    import {mapGetters} from 'vuex';

    export default {
        name: 'customization-download-pdf',
        components: {
            Datepicker,
            Spinner
        },
        props: {
            currentBalanceBeginPeriod: {
                type: [Number, String],
                required: true
            },
            currentBalanceEndPeriod: {
                type: [Number, String],
                required: true
            },
            currentReceivedBalance: {
                type: [Number, String],
                required: true
            },
            currentSentBalance: {
                type: [Number, String],
                required: true
            }
        },
        data() {
            return {
                dateFromDatepicker: '',
                dateToDatepicker: '',
                dataProcessing: false,

                selectionTypeStatement: 'current',


                heightDoc: 297,
                widthDoc: 210,

                titleFontSize: 20,
                dateDayFontSize: 16,
                normalFontSize: 12,

                offset: 50,

                receivedText: 'Received',
                sentText: 'Sent',
                startingText: 'Starting',
                totalText: 'Total',

                currencyText: 'ALE',

                xPositionSummaryAction: 130,

                xPositionSummaryCount: 160,

                xPositionSummaryCurrency: 175,

                xPositionDateTitleDay: 10,

                xPositionTransactionType: 10,

                currentSent: 0,
                currentReceived: 0,
                currentTotal: 0,

            }
        },
        computed: {
            ...mapGetters([
                'wallets',
                'currentWallet',
                'transactions',
                'allTransactions',
                'allTransactionsStatus',
                'dateFrom', //make another getters with date
                'dateTo'
            ])

        },
        methods: {
            closeModal: function (name) {
                this.$modal.hide(name);
            },
            getTypeTransaction: function (i) {
                if (this.transactions[i].balanceInfo.after - this.transactions[i].balanceInfo.before > 0)
                    return 'RECEIVED';
                return 'SEND';
            },
            checkTypeTransaction: function (type) {
                if (type === 'SEND')
                    return true;
                return false;
            },
            generateHeaderTransactionsStatement: function (doc) {
                doc.setFontSize(this.titleFontSize);
                doc.text(this.currentWallet.name, 90, 10);

                //add date range

                doc.setFontSize(this.normalFontSize);

                //разбить эти блоки на ещё функции

                doc.setTextColor(75, 177, 3);
                doc.text(this.receivedText, this.xPositionSummaryAction, 20);
                doc.text(this.currentReceivedBalance.toString(), this.xPositionSummaryCount, 20);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, 20);

                doc.setTextColor(177, 3, 3);
                doc.text(this.sentText, this.xPositionSummaryAction, 25);
                doc.text(this.currentSentBalance.toString(), this.xPositionSummaryCount, 25);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, 25);

                doc.setTextColor(0, 0, 0);
                doc.text(this.startingText, this.xPositionSummaryAction, 30);
                doc.text(this.currentBalanceBeginPeriod.toString(), this.xPositionSummaryCount, 30);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, 30);

                doc.text(this.totalText, this.xPositionSummaryAction, 35);
                doc.text(this.currentBalanceEndPeriod.toString(), this.xPositionSummaryCount, 35);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, 35);
            },

            generateTransactionsDayStatement: function (doc, j) {
                doc.setFontSize(this.normalFontSize);

                doc.setTextColor(75, 177, 3);
                doc.text(this.receivedText, this.xPositionSummaryAction, this.offset + 25 * j);
                doc.text(this.currentReceived.toString(), this.xPositionSummaryCount, this.offset + 25 * j);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset + 25 * j);
                this.offset += 5;

                doc.setTextColor(177, 3, 3);
                doc.text(this.sentText, this.xPositionSummaryAction, this.offset + 25 * j);
                doc.text(this.currentSent.toString(), this.xPositionSummaryCount, this.offset + 25 * j);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset + 25 * j);
                this.offset += 5;

                doc.setTextColor(0, 0, 0);
                doc.text(this.totalText, this.xPositionSummaryAction, this.offset + 25 * j);
                doc.text(this.currentTotal.toString(), this.xPositionSummaryCount, this.offset + 25 * j);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset + 25 * j);

                this.offset += 25;
            },

            generateTransaction: function (doc, type, count, date, time, walletAddress, walletDestination, j) {
                let summaryString = count + ' ALE' + '\n' +
                    date + ' - ' + time + '\n' +
                    'wallet address: ' + walletAddress + '\n' +
                    'wallet destination: ' + walletDestination + '\n\n';

                doc.setFontSize(this.normalFontSize);

                (this.checkTypeTransaction(type)) ? doc.setTextColor(177, 3, 3) : doc.setTextColor(75, 177, 3);
                doc.text(type, this.xPositionTransactionType, this.offset + 25 * j);

                doc.setTextColor(0, 0, 0);
                doc.text(summaryString, 40, this.offset + 25 * j);
            },

            generateDateTransactions: function (doc, date, j) {
                doc.setFontSize(this.dateDayFontSize);
                doc.text(date, this.xPositionDateTitleDay, this.offset + 25 * j);
                this.offset += 15;
            },

            calcBalance: function (i, count) {
                this.currentTotal = this.transactions[i].balanceInfo.after;
                if (this.checkTypeTransaction(this.getTypeTransaction(i)))
                    this.currentSent += count;
                else
                    this.currentReceived += count;
            },

            makePDF: function () {
                let doc = new JsPDF(),
                    pdfName = 'test',
                    countPage = 1,
                    balancer = 0;

                this.generateHeaderTransactionsStatement(doc);
                this.generateDateTransactions(doc, Moment(this.transactions[0].timestamp).format("DD.MM.YYYY"), 0);

                for (let i = 0, j = 0; i < this.transactions.length; i++, j = i - balancer) {

                    let count = this.transactions[i].count,
                        time = Moment(this.transactions[i].timestamp).format("HH:mm:ss"),
                        date = Moment(this.transactions[i].timestamp).format("DD.MM.YYYY"),
                        walletAddress = this.transactions[i].walletAddress,
                        walletDestination = this.transactions[i].walletDestination;


                    if (this.offset + 25 * j > this.heightDoc - 25) {
                        doc.addPage();
                        countPage++;
                        doc.setPage(countPage);
                        balancer = i;
                        j = i - balancer;
                        this.offset = 25;
                    }


                    if (i !== 0 && date !== Moment(this.transactions[i - 1].timestamp).format("DD.MM.YYYY")) {

                        this.generateTransactionsDayStatement(doc, j);
                        this.generateDateTransactions(doc, date, j);

                        this.currentReceived = 0;
                        this.currentSent = 0;
                    }


                    this.calcBalance(i, count);

                    //уменьшить количество аргументов

                    this.generateTransaction(doc, this.getTypeTransaction(i), count, date, time, walletAddress, walletDestination, j);


                    if (i === this.transactions.length - 1) {

                        this.offset += 25;

                        this.calcBalance(i - 1, count);

                        this.generateTransactionsDayStatement(doc, j);
                    }
                }


                doc.save(pdfName + '.pdf');
            },

            downloadPDF: function () {

                this.dataProcessing = true;

                // if (this.selectionTypeStatement === 'all') {
                if (this.selectionTypeStatement === 'all') {

                    // if (получены не все транзакции в списке кошельков)

                    let walletsAddressList = this.wallets.map(function (wallet) {
                        return wallet.address;
                    });

                    this.$store.dispatch('allTransactionsRequest', {
                        addresses: walletsAddressList
                    }).then(() => {
                        this.dataProcessing = false;
                        this.makePDF();
                        this.closeModal('download-pdf');
                    }).catch(() => {
                        this.$toasted.show('An error occured while loading transactions statement', {
                            duration: 10000,
                            type: 'error',
                        });
                    });
                }

                if (this.selectionTypeStatement === 'optional') {

                }
            }
        },
        created() {
            this.dateFromDatepicker = this.dateFrom;
            this.dateToDatepicker = this.dateTo;
        },
        mounted() {

        }
    }
</script>

<style lang="stylus">
    /*.vdp-datepicker__calendar*/
    /*box-shadow none*/
    /*border 1px solid #ccc !important*/
</style>

<style lang="stylus" scoped>
    .body
        .modal-control
            .modal-input__pdf
                justify-content center

        .modal-footer
            display flex
            justify-content center

</style>