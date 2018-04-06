<template>
    <modal name="download-pdf" width="700" height="auto">
        <div class="heading">
            <p class="title">Download statistics</p>
            <i class="close" @click="closeModal('download-pdf')"></i>
        </div>
        <div class="body">
            <form @submit.prevent="makeAndDownloadPDF">
                <div class="modal-control" style="border-bottom: none;">
                    <div class="modal-input__pdf">
                        <input type="radio"
                               id="radio1"
                               name="transaction-selection"
                               value="current"
                               v-model="selectionTypeTransaction">
                        <label for="radio2">Транзакции текущего кошелька</label>
                    </div>
                </div>
                <div class="modal-control" style="border-bottom: none;">
                    <div class="modal-input__pdf">
                        <input
                                type="radio"
                                id="radio2"
                                name="transaction-selection"
                                value="all"
                                v-model="selectionTypeTransaction">
                        <label for="radio1">Все транзакции</label>
                    </div>
                </div>
                <div class="modal-control">
                    <div class="modal-input__pdf">
                        <input
                                type="radio"
                                id="radio3"
                                name="transaction-selection"
                                value="optional"
                                v-model="selectionTypeTransaction">
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

                selectionTypeTransaction: 'current',


                heightDoc: 297,
                widthDoc: 210,

                titleFontSize: 20,
                normalFontSize: 12,

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

            }
        },
        computed: {
            ...mapGetters([
                'wallets',
                'currentWallet',
                'transactions',
                'dateFrom', //make another getters with date
                'dateTo'
            ])

        },
        methods: {
            closeModal: function (name) {
                this.$modal.hide(name);
            },
            checkTypeTransaction: function (i) {
                if (this.transactions[i].balanceInfo.after - this.transactions[i].balanceInfo.before > 0)
                    return 'RECEIVED';
                return 'SEND';
            },
            checkSend: function (type) {
                if (type === 'SEND')
                    return true;
                return false;
            },
            checkReceived: function (type) {
                if (type === 'RECEIVED')
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

            generateDayTransactionsStatement: function (doc, receivedBalance, sentBalance, totalBalance, offset, j) {
                doc.setFontSize(this.normalFontSize);

                doc.setTextColor(75, 177, 3);
                doc.text(this.receivedText, this.xPositionSummaryAction, offset + 25 * j);
                doc.text(receivedBalance.toString(), this.xPositionSummaryCount, offset + 25 * j);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, offset + 25 * j);

                doc.setTextColor(177, 3, 3);
                doc.text(this.sentText, this.xPositionSummaryAction, offset + 5 + 25 * j);
                doc.text(sentBalance.toString(), this.xPositionSummaryCount, offset + 5 + 25 * j);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, offset + 5 + 25 * j);

                doc.setTextColor(0, 0, 0);
                doc.text(this.totalText, this.xPositionSummaryAction, offset + 10 + 25 * j);
                doc.text(totalBalance.toString(), this.xPositionSummaryCount, offset + 10 + 25 * j);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, offset + 10 + 25 * j);
            },

            generateTransaction: function (doc, type, count, date, time, walletAddress, walletDestination, offset, j) {
                let summaryString = count + ' ALE' + '\n' +
                    date + ' - ' + time + '\n' +
                    'wallet address: ' + walletAddress + '\n' +
                    'wallet destination: ' + walletDestination + '\n\n';

                doc.setFontSize(this.normalFontSize);

                (this.checkSend(type)) ? doc.setTextColor(177, 3, 3) : doc.setTextColor(75, 177, 3);
                doc.text(type, this.xPositionTransactionType, offset + 25 * j);

                doc.setTextColor(0, 0, 0);
                doc.text(summaryString, 40, offset + 25 * j);
            },


            makeAndDownloadPDF: function () {
                let doc = new JsPDF(),
                    pdfName = 'test',
                    countPage = 1;

                const height = 297;

                this.generateHeaderTransactionsStatement(doc);


                let balancer = 0;
                let offset = 50;

                let currentSent = 0;
                let currentReceived = 0;
                let currentTotal = 0;

                for (let i = 0; i < this.transactions.length; i++) {

                    let j = i - balancer;
                    let type = '';

                    type = this.checkTypeTransaction(i);

                    let count = this.transactions[i].count;
                    let time = Moment(this.transactions[i].timestamp).format("HH:mm:ss");
                    let date = Moment(this.transactions[i].timestamp).format("DD.MM.YYYY");
                    let walletAddress = this.transactions[i].walletAddress;
                    let walletDestination = this.transactions[i].walletDestination;

                    if (i === 0 || date !== Moment(this.transactions[i - 1].timestamp).format("DD.MM.YYYY")) {
                        doc.setFontSize(16);

                        if (countPage === 1) {

                            doc.text(date, this.xPositionDateTitleDay, 40 * (j + 1));

                        } else {
                            //проверить на целесообразность

                            // currentTotal = this.transactions[i - 1].balanceInfo.after;
                            //
                            // this.generateDayTransactionsStatement(doc, currentReceived, currentSent, currentTotal);
                            //
                            // currentReceived = 0;
                            // currentSent = 0;
                            //
                            // doc.setTextColor(0, 0, 0);
                            // doc.setFontSize(16);
                            // doc.text(date, 10, offset + 20 + 25 * j);
                            // offset += 30;
                        }
                    }


                    if (i !== 0 && date !== Moment(this.transactions[i - 1].timestamp).format("DD.MM.YYYY")) {

                        currentTotal = this.transactions[i - 1].balanceInfo.after;

                        this.generateDayTransactionsStatement(doc, currentReceived, currentSent, currentTotal, offset, j);

                        currentReceived = 0;
                        currentSent = 0;

                        doc.setFontSize(16);
                        doc.text(date, this.xPositionDateTitleDay, offset + 20 + 25 * j);
                        offset += 30;
                    }


                    currentSent += count;

                    if (offset + 25 * j > height - 20) {
                        doc.addPage();
                        countPage++;
                        doc.setPage(countPage);
                        balancer = i;
                        j = i - balancer;
                        offset = 10;
                    }

                    //уменьшить количество аргументов

                    this.generateTransaction(doc, type, count, date, time, walletAddress, walletDestination, offset, j);


                    if (i === this.transactions.length - 1) {

                        offset += 25;
                        currentTotal = this.transactions[i].balanceInfo.after;

                        this.generateDayTransactionsStatement(doc, currentReceived, currentSent, currentTotal, offset, j);
                    }
                }

                doc.save(pdfName + '.pdf');

                this.closeModal('download-pdf');
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