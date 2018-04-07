<template>
    <modal name="download-pdf" width="700" height="auto">
        <div class="heading">
            <p class="title">Export to PDF</p>
            <i class="close" @click="closeModal('download-pdf')"></i>
        </div>
        <div class="body">
            <form @submit.prevent="downloadPDF">
                <div class="modal-control">
                    <div class="modal-wrap">
                        <div class="modal-line">
                            <p class="modal-control__title">
                                Select from where you want to export transactions
                            </p>
                        </div>
                        <div class="modal-line">

                            <label class="control control-radio">
                                <input type="radio"
                                       name="transaction-selection"
                                       value="current"
                                       v-model="selectionTypeStatement"/>
                                <div class="control-indicator"></div>
                                <span class="input-label">
                                    Current wallet transactions
                                </span>
                            </label>
                        </div>
                        <div class="modal-line">
                            <label class="control control-radio">
                                <input type="radio"
                                       name="transaction-selection"
                                       value="all"
                                       v-model="selectionTypeStatement"/>
                                <div class="control-indicator"></div>
                                <span class="input-label">
                                    All wallets transactions
                                </span>
                            </label>
                        </div>
                        <div class="modal-line">
                            <label class="control control-radio">
                                <input type="radio"
                                       name="transaction-selection"
                                       value="optional"
                                       v-model="selectionTypeStatement"/>
                                <div class="control-indicator"></div>
                                <span class="input-label">
                                    Custom
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <!--<div v-if="true" :class="'disable-area'" style="background-color: rgba(30, 30, 30, 0.2);">-->
                <!--</div>-->

                <div class="modal-control">
                    <div class="modal-wrap">
                        <div class="modal-line">
                            <p class="modal-control__title"
                               :class="{ 'disabled-title': selectionTypeStatement !== 'optional' }">
                                Select from where you want to export transactions
                            </p>
                        </div>
                        <div class="modal-control__wrap">
                            <div class="modal-control__block" v-for="wallet in wallets">
                                <label class="control control-checkbox"
                                       :class="{ 'disabled-label__control': selectionTypeStatement !== 'optional' }">
                                    <input type="checkbox"
                                           name="wallet-names"
                                           :disabled="selectionTypeStatement !== 'optional'"/>
                                    <div class="control-indicator"></div>
                                    <div class="wrap__input-label">
                                        <span class="input-label"
                                              :class="{ 'disabled-label': selectionTypeStatement !== 'optional' }">
                                            {{ wallet.name }}
                                        </span>
                                        <span class="input-label input-label__balance"
                                              :class="{ 'disabled-label__balance': selectionTypeStatement !== 'optional' }">
                                            23 ALE
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-control">
                    <div class="modal-input">
                        <label class="title"
                               :class="{ 'disabled-title': selectionTypeStatement !== 'optional' }">
                            Tag's
                        </label>
                        <input type="text"
                               class="input"
                               placeholder="Type a tag here to choose specific transactions (optional)"
                               :class="{ 'input-disabled': selectionTypeStatement !== 'optional' }"
                               :disabled="selectionTypeStatement !== 'optional'">
                    </div>
                </div>

                <div class="modal-control border-none">
                    <div class="modal-wrap">
                        <div class="row-flex" style="align-items: flex-start; margin-bottom: 0;">
                            <div class="col-5" style="padding-top: 20px;">
                                <div class="modal-block">
                                    <div class="modal-line">
                                        <p class="modal-control__title"
                                           :class="{ 'disabled-title': selectionTypeStatement !== 'optional' }">
                                            Transaction's type
                                        </p>
                                    </div>
                                    <div class="modal-line">
                                        <label class="control control-radio"
                                               :class="{ 'disabled-label__control': selectionTypeStatement !== 'optional' }">
                                            <input type="radio"
                                                   name="transaction-type"
                                                   value="income"
                                                   :disabled="selectionTypeStatement !== 'optional'"
                                                   v-model="selectionTypeTransactions"/>
                                            <div class="control-indicator"></div>
                                            <span class="input-label"
                                                  :class="{ 'disabled-label': selectionTypeStatement !== 'optional' }">
                                                Income
                                            </span>
                                        </label>
                                    </div>
                                    <div class="modal-line">
                                        <label class="control control-radio"
                                               :class="{ 'disabled-label__control': selectionTypeStatement !== 'optional' }">
                                            <input type="radio"
                                                   name="transaction-type"
                                                   value="outcome"
                                                   :disabled="selectionTypeStatement !== 'optional'"
                                                   v-model="selectionTypeTransactions"/>
                                            <div class="control-indicator"></div>
                                            <span class="input-label"
                                                  :class="{ 'disabled-label': selectionTypeStatement !== 'optional' }">
                                                Outcome
                                            </span>
                                        </label>
                                    </div>
                                    <div class="modal-line m-b-20">
                                        <label class="control control-radio"
                                               :class="{ 'disabled-label__control': selectionTypeStatement !== 'optional' }">
                                            <input type="radio"
                                                   name="transaction-type"
                                                   value="all"
                                                   :disabled="selectionTypeStatement !== 'optional'"
                                                   v-model="selectionTypeTransactions"/>
                                            <div class="control-indicator"></div>
                                            <span class="input-label"
                                                  :class="{ 'disabled-label': selectionTypeStatement !== 'optional' }">
                                                All
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="modal-block">
                                    <div class="modal-line">
                                        <p class="modal-control__title"
                                           :class="{ 'disabled-title': selectionTypeStatement !== 'optional' }">
                                            Transaction's amount range
                                        </p>
                                    </div>
                                    <div class="modal-line">
                                        <div class="wrap-double-input"
                                             :class="{'wrap-double-input__disabled': selectionTypeStatement !== 'optional'}">
                                            <label for="balance-from" class="label-from">from</label>
                                            <input type="number"
                                                   id="balance-from"
                                                   class="input input-from"
                                                   name="transaction-selection"
                                                   value="income"
                                                   placeholder="2000"
                                                   v-model="balanceFilter.from"
                                                   :disabled="selectionTypeStatement !== 'optional'">
                                        </div>
                                    </div>
                                    <div class="modal-line">
                                        <div class="wrap-double-input"
                                             :class="{'wrap-double-input__disabled': selectionTypeStatement !== 'optional'}">
                                            <label for="balance-to" class="label-to">to</label>
                                            <input type="number"
                                                   class="input input-to"
                                                   id="balance-to"
                                                   name="transaction-selection"
                                                   value="outcome"
                                                   placeholder="9123445"
                                                   v-model="balanceFilter.to"
                                                   :disabled="selectionTypeStatement !== 'optional'">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <datepicker id="datepickerFrom1"
                                            class="datepicker-for-export"
                                            v-model="dateFromDatepicker"
                                            language="en"
                                            :inline="true"
                                            :placeholder="'Date from'"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div v-if="dataProcessing" class="wrap-spinner">
                    <spinner/>
                </div>

                <div class="modal-footer">
                    <button class="buttons btn-yellow btn-large" type="submit">
                        Export <span style="font-weight: 700;">{{5}}</span> transactions
                    </button>
                </div>
            </form>
        </div>
    </modal>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import Spinner from '../layouts/Spinner';
    import FormattingPrice from '../layouts/FormattingPrice';

    import JsPDF from 'jspdf';
    import Moment from 'moment';

    import {mapGetters} from 'vuex';

    export default {
        name: 'customization-download-pdf',
        components: {
            Datepicker,
            Spinner,
            FormattingPrice
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
                selectionTypeTransactions: 'all',

                balanceFilter: {
                    from: '',
                    to: ''
                },


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
                        this.makePDF();
                        this.closeModal('download-pdf');
                    }).catch(() => {
                        this.$toasted.show('An error occurred while loading transactions statement', {
                            duration: 10000,
                            type: 'error',
                        });
                    });

                    //после тестирования перенести в then() =>
                    // setTimeout(() => {
                    //     if (this.allTransactionsStatus === 'success') {
                    //         this.makePDF();
                    //         this.closeModal('download-pdf');
                    //     }
                    // }, 150);
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
    .datepicker-for-export
        .vdp-datepicker__calendar
            box-shadow none
            background-color #fafafa

            .day.selected
                background-color #ffd24f !important

</style>

<style lang="stylus" scoped>
    .disabled-label__control
        cursor default

    .control-radio
        width auto
        display flex
        align-items center

        .input-label
            font-size 13px
            line-height 1.2
            padding-left 10px

        .control-indicator
            position relative
            height 18px
            width 18px
            top auto

            &:after
                top 5px
                left 6px
                width 6px
                height 6px

    .control-checkbox
        width auto
        display flex
        align-items center

        .wrap__input-label
            padding-left 10px
            display flex
            flex-direction column
            justify-content center

            .input-label
                font-size 13px

            .input-label, .input-label__balance
                line-height 1.2

            .input-label__balance
                font-size 10px
                color #979797 !important
                font-weight 700 !important

        .control-indicator
            position relative
            height 18px
            width 18px
            top auto

            &:after
                top 2.5px
                left 6px
                width 4px
                height 8px

    .m-b-20
        margin-bottom 20px

    .border-none
        border-bottom none !important

    .body
        .modal-control
            .modal-wrap
                margin 0 18px

            .modal-control__title
                margin 0
                font-family MuseoSansCyrl500
                font-weight 700
                font-size 13px
                color #34343e

            .modal-control__wrap
                display flex
                justify-content flex-start
                flex-wrap wrap

            .modal-control__block
                width 33.3%

            .modal-line
                .wrap-double-input__disabled
                    background-color #ececec
                    cursor default

                    label.label-from,
                    label.label-to
                        color #979797 !important
                        cursor default

                    .input.input-from,
                    .input.input-to
                        cursor default

                .wrap-double-input
                    border solid 1px #979797
                    border-radius 2px
                    display flex
                    align-items center
                    padding-left 8px

                    label.label-from,
                    label.label-to
                        font-family MuseoSansCyrl700
                        font-size 13px
                        font-weight bold
                        line-height 1.08
                        color #34343e
                        margin-bottom 0

                    .input.input-from,
                    .input.input-to
                        flex-grow 1
                        background-color transparent
                        border none
                        padding 6px 8px
                        font-family MuseoSansCyrl700
                        font-size 12px
                        font-weight 500
                        line-height 1.17
                        color #34343e

            .modal-line:not(:last-child), .modal-control__block:not(:last-child)
                margin-bottom 10px

            .modal-input
                .input-disabled
                    cursor default
                .title
                    text-transform none !important
                .input::-webkit-input-placeholder
                    text-decoration none !important
                    font-family MuseoSansCyrl500
                .input::-moz-placeholder
                    text-decoration none !important
                    font-family MuseoSansCyrl500
                .input:-ms-input-placeholder
                    text-decoration none !important
                    font-family MuseoSansCyrl500
                .input:-moz-placeholder
                    text-decoration none !important
                    font-family MuseoSansCyrl500

            .disabled-label, .disabled-title
                color #979797 !important
                cursor default

             .disabled-label__balance
                 color #b3b3b3 !important
                 cursor default

            .input-label
                font-family MuseoSansCyrl500
                font-weight 500;
                color #34343e

        .modal-footer
            display flex
            justify-content center
            margin-top 0 !important

</style>