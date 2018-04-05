<template>
    <modal name="download-pdf" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">Download statistics</p>
            <i class="close" @click="closeModal('download-pdf')"></i>
        </div>
        <div class="body">
            <form @submit.prevent="makeAndDownloadPDF">
                <div v-if="dataProcessing" class="wrap-spinner">
                    <spinner/>
                </div>

                <div class="modal-btn">
                    <button class="btn btn-yellow btn-large" type="submit">
                        Download
                    </button>
                </div>
            </form>
        </div>
    </modal>
</template>

<script>
    import Spinner from '../layouts/Spinner';

    import JsPDF from 'jspdf';
    import Moment from 'moment';

    import {mapGetters} from 'vuex';

    export default {
        name: 'customization-download-pdf',
        components: {
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
                dataProcessing: false
            }
        },
        computed: {
            ...mapGetters([
                'currentWallet',
                'transactions'
            ])

        },
        methods: {
            closeModal: function (name) {
                this.$modal.hide(name);
            },

            makeAndDownloadPDF: function () {
                //сделать цифры с нулём в датах,
                let pdfName = 'test';
                let doc = new JsPDF();

                const height = 297,
                    width = 210;

                let countPage = 1;

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
                doc.text('Sent', 130, 25);
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
                    let date = Moment(this.transactions[i].timestamp).format("DD.MM.YYYY");
                    let walletAddress = this.transactions[i].walletAddress;
                    let walletDestination = this.transactions[i].walletDestination;

                    if (i === 0 || date !== Moment(this.transactions[i - 1].timestamp).format("DD.MM.YYYY")) {
                        doc.setFontSize(16);

                        if (countPage === 1) {
                            doc.text(date, 10, 40 * (j + 1));
                        } else {
                            //проверить на целесообразность
                            currentTotal = this.transactions[i - 1].balanceInfo.after;

                            doc.setFontSize(12);

                            doc.setTextColor(75, 177, 3);
                            doc.text('Received', 130, offset + 25 * j);
                            doc.setTextColor(177, 3, 3);
                            doc.text('Sent', 130, offset + 5 + 25 * j);
                            doc.setTextColor(0, 0, 0);
                            doc.text('Total', 130, offset + 10 + 25 * j);

                            doc.text(currentReceived.toString(), 160, offset + 25 * j);
                            doc.setTextColor(177, 3, 3);
                            doc.text(currentSent.toString(), 160, offset + 5 + 25 * j);
                            doc.setTextColor(0, 0, 0);
                            doc.text(currentTotal.toString(), 160, offset + 10 + 25 * j);

                            currentSent = 0;
                            currentReceived = 0;

                            doc.setTextColor(75, 177, 3);
                            doc.text('ALE', 175, offset + 25 * j);
                            doc.setTextColor(177, 3, 3);
                            doc.text('ALE', 175, offset + 5 + 25 * j);
                            doc.setTextColor(0, 0, 0);
                            doc.text('ALE', 175, offset + 10 + 25 * j);

                            doc.setFontSize(16);
                            doc.text(date, 10, offset + 20 + 25 * j);
                            offset += 30;
                        }

                        if (i !== 0 && date !== Moment(this.transactions[i - 1].timestamp).format("DD.MM.YYYY")) {
                            currentTotal = this.transactions[i - 1].balanceInfo.after;

                            doc.setFontSize(12);

                            doc.setTextColor(75, 177, 3);
                            doc.text('Received', 130, offset + 25 * j);
                            doc.setTextColor(177, 3, 3);
                            doc.text('Sent', 130, offset + 5 + 25 * j);
                            doc.setTextColor(0, 0, 0);
                            doc.text('Total', 130, offset + 10 + 25 * j);

                            doc.setTextColor(75, 177, 3);
                            doc.text(currentReceived.toString(), 160, offset + 25 * j);
                            doc.setTextColor(177, 3, 3);
                            doc.text(currentSent.toString(), 160, offset + 5 + 25 * j);
                            doc.setTextColor(0, 0, 0);
                            doc.text(currentTotal.toString(), 160, offset + 10 + 25 * j);

                            currentSent = 0;
                            currentReceived = 0;

                            doc.setTextColor(75, 177, 3);
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

                    } else if (type === 'RECEIVED') {
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

                        doc.setTextColor(75, 177, 3);
                        doc.text('Received', 130, offset + 25 * j);
                        doc.setTextColor(177, 3, 3);
                        doc.text('Sent', 130, offset + 5 + 25 * j);
                        doc.setTextColor(0, 0, 0);
                        doc.text('Total', 130, offset + 10 + 25 * j);

                        doc.setTextColor(75, 177, 3);
                        doc.text(currentReceived.toString(), 160, offset + 25 * j);
                        doc.setTextColor(177, 3, 3);
                        doc.text(currentSent.toString(), 160, offset + 5 + 25 * j);
                        doc.setTextColor(0, 0, 0);
                        doc.text(currentTotal.toString(), 160, offset + 10 + 25 * j);

                        currentSent = 0;
                        currentReceived = 0;

                        doc.setTextColor(75, 177, 3);
                        doc.text('ALE', 175, offset + 25 * j);
                        doc.setTextColor(177, 3, 3);
                        doc.text('ALE', 175, offset + 5 + 25 * j);
                        doc.setTextColor(0, 0, 0);
                        doc.text('ALE', 175, offset + 10 + 25 * j);
                    }
                }

                doc.save(pdfName + '.pdf');

                this.closeModal('download-pdf');
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="stylus" scoped>
    .modal-btn
        display flex
        justify-content center

</style>