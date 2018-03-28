<template>
    <div class="bottom">
        <div class="date">
            <h3 class="date-title">
                {{ $t('pages.summary.searchPanel.dateRange') }}
            </h3>
            <div class="datepicker-wrap">
                <datepicker
                        id="datepickerFrom"
                        v-model="dateFromDatepicker"
                        language="en"
                        :placeholder="'Date from'"
                />

                <datepicker
                        id="datepickerTo"
                        v-model="dateToDatepicker"
                        language="en"
                        :placeholder="'Date to'"
                />
            </div>
        </div>
        <div class="docs">
            <button
                    class="buttons btn-default"
                    :class="{'disable-gray-button': currentTransactions.length === 0}"
                    @click="createPDF"
                    :disabled="currentTransactions.length === 0">
                {{ $t('pages.summary.searchPanel.buttons.download') }}
            </button>
            <button
                    class="buttons btn-default"
                    :class="{'disable-gray-button': currentTransactions.length === 0}"
                    @click="openModal('shareTransactions')"
                    :disabled="currentTransactions.length === 0">
                {{ $t('pages.summary.searchPanel.buttons.share') }}
            </button>
        </div>
        <div class="info">
            <div class="stats-col">
                <div class="title-opt-span">
                        <span class="title">
                            {{ $t('pages.summary.searchPanel.info.received') }}
                        </span>
                </div>
                <div class="title-opt-span sent">
                        <span class="title">
                            {{ $t('pages.summary.searchPanel.info.sent') }}
                        </span>
                </div>
                <div class="title-opt-span">
                        <span class="title">
                            {{ $t('pages.summary.searchPanel.info.starting') }}
                        </span>
                </div>
                <div class="title-opt-span">
                        <span class="title">
                            {{ $t('pages.summary.searchPanel.info.total') }}
                        </span>
                </div>
            </div>
            <div class="stats-col">
                <div class="result-opt-span">
                        <span class="count">
                            <formatting-price
                                    :value="currentReceivedBalance"
                            />
                        </span>
                    ALC
                </div>
                <div class="result-opt-span sent">
                        <span class="count">
                            <formatting-price
                                    :value="currentSentBalance"
                            />
                        </span>
                    ALC
                </div>
                <div class="result-opt-span">
                        <span class="count">
                            <formatting-price
                                    :value="currentBalanceBeginPeriod"
                            />
                        </span>
                    ALC
                </div>
                <div class="result-opt-span">
                        <span class="count">
                            <formatting-price
                                    :value="currentBalanceEndPeriod"
                            />
                        </span>
                    ALC
                </div>
            </div>
        </div>

        <modal-share-transactions/>

    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import FormattingPrice from '../layouts/FormattingPrice';
    import ModalShareTransactions from '../modals/ShareTransactions';

    import JsPDF from 'jspdf';
    import Moment from 'moment';

    import {mapGetters} from 'vuex';

    export default {
        name: 'transactions-tool-panel-filter',
        components: {
            Datepicker,
            FormattingPrice,
            ModalShareTransactions
        },
        props: {
            currentTransactions: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                dateFromDatepicker: '',
                dateToDatepicker: ''
            }
        },
        watch: {
            dateFromDatepicker: function (val) {
                this.$store.dispatch('changeDateFrom',
                    val
                ).then(() => {
                    console.log('Success change date from');
                }).catch(() => {
                    console.log('Error change date from');
                });
            },
            dateToDatepicker: function (val) {
                this.$store.dispatch('changeDateTo',
                    val
                ).then(() => {
                    console.log('Success change date to');
                }).catch(() => {
                    console.log('Error change date to');
                });
            }
        },
        computed: {
            ...mapGetters([
                'transactions',
                'currentWallet',
                'dateFrom',
                'dateTo'
            ]),
            currentBalanceBeginPeriod: function () {
                this.watchResetStateDate();
                return (this.currentTransactions.length !== 0) ? this.currentTransactions[this.currentTransactions.length - 1].balanceInfo.before : 0;
            },
            currentBalanceEndPeriod: function () {
                return (this.currentTransactions.length !== 0) ? this.currentTransactions[0].balanceInfo.after : 0;
            },
            currentSentBalance: function () {
                let sentTransactions = this.currentTransactions.filter(item => {
                    return item.balanceInfo.after - item.balanceInfo.before < 0;
                });

                if (sentTransactions.length > 1) {
                    let sum = 0;
                    for (let i = 0; i < sentTransactions.length; i++)
                        sum += sentTransactions[i].count;
                    return sum;
                } else if (sentTransactions.length === 1)
                    return sentTransactions[0].count;

                return 0;
            },
            currentReceivedBalance: function () {
                let receiveTransactions = this.currentTransactions.filter(item => {
                    return item.balanceInfo.after - item.balanceInfo.before > 0;
                });

                if (receiveTransactions.length > 1) {
                    let sum = 0;
                    for (let i = 0; i < receiveTransactions.length; i++)
                        sum += receiveTransactions[i].count;
                    return sum;
                } else if (receiveTransactions.length === 1)
                    return receiveTransactions[0].count;

                return 0;
            },
        },
        methods: {
            openModal: function (name) {
                this.$modal.show(name);
            },
            watchResetStateDate: function () {
                this.dateFromDatepicker = this.dateFrom;
                this.dateToDatepicker = this.dateTo;
            },
            createPDF: function () {
                let pdfName = 'test';
                let doc = new JsPDF();

                const height = 297,
                    width = 210;

                let countPage = 1;

                console.log(this.transactions, 'this.transactions');
                let summaryString = '',
                    summaryBalance = '',
                    summaryTitle = '',
                    stringOfAle = '';

                doc.setFontSize(20);
                doc.text(this.currentWallet.name, 90, 10);

                doc.setFontSize(12);

                summaryTitle = 'Starting' + '\n' + 'Total';

                doc.setTextColor(75, 177, 3);
                doc.text('Received', 130, 20);
                doc.text(this.currentReceivedBalance.toString(), 160, 20);
                doc.text('ALE', 175, 20);

                doc.setTextColor(177, 3, 3);
                doc.text('Send', 130, 25);
                doc.text(this.currentSentBalance.toString(), 160, 25);
                doc.text('ALE', 175, 25);

                doc.setTextColor(0, 0, 0);
                doc.text(summaryTitle, 130, 30);
                summaryBalance = this.currentBalanceBeginPeriod + '\n' +
                    this.currentBalanceEndPeriod;

                stringOfAle = 'ALE' + '\n' + 'ALE';

                doc.text(summaryBalance, 160, 30);
                doc.text(stringOfAle, 175, 30);

                let balancer = 0;
                let offset = 50;

                let currentSent = 0;
                let currentReceived = 0;
                let currentTotal = 0;

                for (let i = 0; i < this.transactions.length; i++) {

                    let j = i - balancer;
                    let type = '';

                    if (this.transactions[i].balanceInfo.after - this.transactions[i].balanceInfo.before > 0)
                        type = 'RECEIVED';
                    else
                        type = 'SEND';

                    let count = this.transactions[i].count;
                    let time = Moment(this.transactions[i].timestamp).format("HH:mm:ss");
                    let date = Moment(this.transactions[i].timestamp).format("D.M.YYYY");
                    let walletAddress = this.transactions[i].walletAddress;
                    let walletDestination = this.transactions[i].walletDestination;

                    if (i === 0 || date !== Moment(this.transactions[i - 1].timestamp).format("D.M.YYYY")) {
                        doc.setFontSize(16);

                        if (countPage === 1) {
                            doc.text(date, 10, 40 * (j + 1));
                        } else {

                            currentTotal = this.transactions[i - 1].balanceInfo.after;

                            doc.setFontSize(12);

                            let currentTransactionsSummaryTitle = 'Received' + '\n' + 'Sent' + '\n' + 'Total';
                            doc.text(currentTransactionsSummaryTitle, 130, offset + 25 * j);

                            doc.text(currentReceived.toString(), 160, offset + 25 * j);
                            doc.setTextColor(177, 3, 3);
                            doc.text(currentSent.toString(), 160, offset + 5 + 25 * j);
                            doc.setTextColor(0, 0, 0);
                            doc.text(currentTotal.toString(), 160, offset + 10 + 25 * j);

                            currentSent = 0;
                            currentReceived = 0;

                            doc.text('ALE', 175, offset + 25 * j);
                            doc.setTextColor(177, 3, 3);
                            doc.text('ALE', 175, offset + 5 + 25 * j);
                            doc.setTextColor(0, 0, 0);
                            doc.text('ALE', 175, offset + 10 + 25 * j);

                            doc.setFontSize(16);
                            doc.text(date, 10, offset + 20 + 25 * j);
                            offset += 30;

                        }
                    }

                    if (type === 'SEND') {
                        currentSent += count;
                        if (offset + 25 * j > height - 20) {
                            doc.addPage();
                            countPage++;
                            doc.setPage(countPage);
                            balancer = i;
                            j = i - balancer;
                            offset = 10;
                        }

                        doc.setFontSize(12);
                        doc.setTextColor(177, 3, 3);
                        doc.text(type, 10, offset + 25 * j);

                        summaryString = count + ' ALE' + '\n' +
                            date + ' - ' + time + '\n' +
                            'wallet address: ' + walletAddress + '\n' +
                            'wallet destination: ' + walletDestination + '\n\n';

                        doc.setTextColor(0, 0, 0);
                        doc.text(summaryString, 40, offset + 25 * j);

                    } else {
                        currentReceived += count;
                        if (offset + 25 * j > height - 20) {
                            doc.addPage();
                            countPage++;
                            doc.setPage(countPage);
                            balancer = i;
                            j = i - balancer;
                            offset = 10;
                        }

                        doc.setFontSize(12);
                        doc.setTextColor(75, 177, 3);
                        doc.text(type, 10, offset + 25 * j);

                        summaryString = count + ' ALE' + '\n' +
                            date + ' - ' + time + '\n' +
                            'wallet address: ' + walletAddress + '\n' +
                            'wallet destination: ' + walletDestination + '\n\n';

                        doc.setTextColor(0, 0, 0);
                        doc.text(summaryString, 40, offset + 25 * j);
                    }

                    if (i === this.transactions.length - 1) {
                        offset += 25;
                        currentTotal = this.transactions[i].balanceInfo.after;

                        doc.setFontSize(12);

                        let currentTransactionsSummaryTitle = 'Received' + '\n' + 'Sent' + '\n' + 'Total';
                        doc.text(currentTransactionsSummaryTitle, 130, offset + 25 * j);

                        doc.text(currentReceived.toString(), 160, offset + 25 * j);
                        doc.setTextColor(177, 3, 3);
                        doc.text(currentSent.toString(), 160, offset + 5 + 25 * j);
                        doc.setTextColor(0, 0, 0);
                        doc.text(currentTotal.toString(), 160, offset + 10 + 25 * j);

                        currentSent = 0;
                        currentReceived = 0;

                        doc.text('ALE', 175, offset + 25 * j);
                        doc.setTextColor(177, 3, 3);
                        doc.text('ALE', 175, offset + 5 + 25 * j);
                        doc.setTextColor(0, 0, 0);
                        doc.text('ALE', 175, offset + 10 + 25 * j);
                    }
                }

                doc.save(pdfName + '.pdf');
            }
        },
        created() {
            this.dateFromDatepicker = this.dateFrom;
            this.dateToDatepicker = this.dateTo;
        },
    }
</script>

