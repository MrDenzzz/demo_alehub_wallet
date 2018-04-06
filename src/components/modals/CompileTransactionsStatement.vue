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

                <div class="modal-control">
                    <div class="modal-input__pdf">
                        <input class="search-transactions" type="text" placeholder="Search transactions">
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

                selectionTypeStatement: 'all',


                heightDoc: 297,
                widthDoc: 210,

                titleFontSize: 20,
                dateDayFontSize: 16,
                normalFontSize: 12,

                offset: 10,

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

            //в computed
            checkTypeTransaction: function (type) {
                if (type === 'SEND')
                    return true;
                return false;
            },

            getTypeTransaction: function (i) { //переделать получение как в getTypeTransactionAll
                if (this.transactions[i].balanceInfo.after - this.transactions[i].balanceInfo.before > 0)
                    return 'RECEIVED';
                return 'SEND';
            },

            //tmp solution
            getTypeTransactionAll: function (item) {
                if (item.after - item.before > 0)
                    return 'RECEIVED';
                return 'SEND';
            },

            calcBalance: function (i, count) {
                this.currentTotal = this.transactions[i].balanceInfo.after;
                if (this.checkTypeTransaction(this.getTypeTransaction(i)))
                    this.currentSent += count;
                else
                    this.currentReceived += count;
            },

            calcBalanceAll: function (item, count) {
                this.currentTotal = item.after;
                if (this.checkTypeTransaction(this.getTypeTransactionAll(item)))
                    this.currentSent += count;
                else
                    this.currentReceived += count;
            },

            generateHeaderTransactionsStatement: function (doc, name) {
                doc.setFontSize(this.titleFontSize);
                // doc.text(this.currentWallet.name, 90, 10);

                //написать рассчёт положения начала названия по оси Х в зависимости от длины названия кошелька
                doc.text(name, 10, this.offset);

                //add date range

                //разбить эти блоки на ещё функции

                doc.setFontSize(this.normalFontSize);
                doc.setTextColor(75, 177, 3);
                this.offset += 10;
                doc.text(this.receivedText, this.xPositionSummaryAction, this.offset);
                doc.text(this.currentReceivedBalance.toString(), this.xPositionSummaryCount, this.offset);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset);

                doc.setTextColor(177, 3, 3);
                this.offset += 5;
                doc.text(this.sentText, this.xPositionSummaryAction, this.offset);
                doc.text(this.currentSentBalance.toString(), this.xPositionSummaryCount, this.offset);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset);

                doc.setTextColor(0, 0, 0);
                this.offset += 5;
                doc.text(this.startingText, this.xPositionSummaryAction, this.offset);
                doc.text(this.currentBalanceBeginPeriod.toString(), this.xPositionSummaryCount, this.offset);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset);

                this.offset += 5;
                doc.text(this.totalText, this.xPositionSummaryAction, this.offset);
                doc.text(this.currentBalanceEndPeriod.toString(), this.xPositionSummaryCount, this.offset);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset);

                this.offset += 15;
            },

            generateDateTransactions: function (doc, date, j) {
                doc.setFontSize(this.dateDayFontSize);
                doc.text(date, this.xPositionDateTitleDay, this.offset + 25 * j);
                this.offset += 15;
            },

            generateTransactionsDayStatement: function (doc, j, isLast) {
                if (isLast)
                    this.offset += 25;

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

                this.offset += 15;
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

            makePDF: function () {
                let doc = new JsPDF(),
                    pdfName = 'test',
                    countPage = 1,
                    balancer = 0;

                if (this.selectionTypeStatement === 'all') {

                    //обрабатывать на пустые массивы транзакций

                    // this.allTransactions.forEach(function (item, i) {
                    //     console.log(item.transactions[0].timestamp, 'item.transactions[0].timestamp');
                    // });

                    console.log(this.allTransactions, 'this.allTransactions');

                    for (let i = 0; i < this.allTransactions.length; i++) {

                        this.generateHeaderTransactionsStatement(doc, this.allTransactions[i].address);
                        this.generateDateTransactions(doc, Moment(this.allTransactions[i].transactions[0].timestamp).format("DD.MM.YYYY"), 0);

                        for (let k = 0, factor = 0; k < this.allTransactions[i].transactions.length; k++, factor = k - balancer) {

                            let count = this.allTransactions[i].transactions[k].count,
                                time = Moment(this.allTransactions[i].transactions[k].timestamp).format("HH:mm:ss"),
                                date = Moment(this.allTransactions[i].transactions[k].timestamp).format("DD.MM.YYYY"),
                                walletAddress = this.allTransactions[i].transactions[k].walletAddress,
                                walletDestination = this.allTransactions[i].transactions[k].walletDestination;


                            if (this.offset + 25 * factor > this.heightDoc - 25) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = k;
                                factor = 0;
                                this.offset = 10;
                            }


                            if (k !== 0 && date !== Moment(this.allTransactions[i].transactions[k - 1].timestamp).format("DD.MM.YYYY")) {

                                this.generateTransactionsDayStatement(doc, factor, false);
                                this.generateDateTransactions(doc, date, factor);

                                this.currentReceived = 0;
                                this.currentSent = 0;
                            }

                            if (this.offset + 25 * factor > this.heightDoc - 25) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = k;
                                factor = 0;
                                this.offset = 10;
                            }

                            this.calcBalanceAll(this.allTransactions[i].transactions[k].balanceInfo, count);
                            this.generateTransaction(doc, this.getTypeTransactionAll(this.allTransactions[i].transactions[k].balanceInfo),
                                count, date, time, walletAddress, walletDestination, factor);


                            if (this.offset + 25 * factor > this.heightDoc - 25) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = k;
                                factor = 0;
                                this.offset = 10;
                            }


                            if (k === this.allTransactions[i].transactions.length - 1) {
                                this.calcBalanceAll(this.allTransactions[i].transactions[k].balanceInfo, count);
                                this.generateTransactionsDayStatement(doc, factor, true);

                                this.currentReceived = 0;
                                this.currentSent = 0;
                            }

                            if (k === this.allTransactions[i].transactions.length - 1 && i !== this.allTransactions.length - 1) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = 0;
                                factor = 0;
                                this.offset = 10;
                            }
                        }

                        if (i === this.allTransactions.length - 1) {

                        }
                    }

                    doc.save(pdfName + '.pdf');
                    return;
                }


                if (this.selectionTypeStatement === 'current') {

                    console.log(this.transactions, 'this.transactions');
                    console.log(this.transactions.length, 'this.transactions.length');

                    this.generateHeaderTransactionsStatement(doc, this.currentWallet.name);
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
                            // j = i - balancer;
                            j = 0;
                            this.offset = 25;
                        }


                        if (i !== 0 && date !== Moment(this.transactions[i - 1].timestamp).format("DD.MM.YYYY")) {

                            this.generateTransactionsDayStatement(doc, j, false);
                            this.generateDateTransactions(doc, date, j);

                            this.currentReceived = 0;
                            this.currentSent = 0;
                        }


                        this.calcBalance(i, count);
                        this.generateTransaction(doc, this.getTypeTransaction(i), count, date, time, walletAddress, walletDestination, j);


                        if (i === this.transactions.length - 1) {
                            this.calcBalance(i - 1, count);
                            this.generateTransactionsDayStatement(doc, j, true);
                        }
                    }

                    doc.save(pdfName + '.pdf');
                    return;
                }
            },

            downloadPDF: function () {

                if (this.selectionTypeStatement === 'current') {
                    this.makePDF();
                    this.closeModal('download-pdf');
                }

                if (this.selectionTypeStatement === 'all') {
                    // if (получены не все транзакции в списке кошельков)

                    this.dataProcessing = true;

                    let walletsAddressList = this.wallets.map(function (wallet) {
                        return wallet.address;
                    });

                    this.$store.dispatch('allTransactionsRequest', {
                        addresses: walletsAddressList
                    }).then(() => {
                        this.dataProcessing = false;
                    }).catch(() => {
                        this.$toasted.show('An error occurred while loading transactions statement', {
                            duration: 10000,
                            type: 'error',
                        });
                    });

                    //после тестирования перенести в then() =>
                    setTimeout(() => {
                        if (this.allTransactionsStatus === 'success') {
                            this.makePDF();
                            // this.closeModal('download-pdf');
                        }
                    }, 150);
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
    .search-transactions
        background-color transparent
        border none
        border-bottom 1px solid #ccc

    .body
        .modal-control
            .modal-input__pdf
                justify-content center

        .modal-footer
            display flex
            justify-content center

</style>