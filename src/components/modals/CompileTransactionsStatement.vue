<template>
    <modal name="download-pdf"
           width="700"
           height="auto"
           @opened="initModal"
           @before-open="initPosLabelCurrency"
           @closed="resetLocalData">
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
                                       v-model="selectionTypeStatement"
                                       @change="changeTypeStatement"/>
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
                                       v-model="selectionTypeStatement"
                                       @change="changeTypeStatement"/>
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
                                       v-model="selectionTypeStatement"
                                       @change="changeTypeStatement"/>
                                <div class="control-indicator"></div>
                                <span class="input-label">
                                    Custom
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="modal-control">
                    <div class="modal-wrap">
                        <div class="modal-line">
                            <p class="modal-control__title"
                               :class="{ 'disabled-title': checkDisabled }">
                                Select from where you want to export transactions
                            </p>
                        </div>
                        <div class="modal-control__wrap">
                            <div class="modal-control__block" v-for="wallet in filledWallets">
                                <label class="control control-checkbox"
                                       :class="{ 'disabled-label__control': checkDisabled }">
                                    <input type="checkbox"
                                           class="wallet-names-checkbox"
                                           name="wallet-names"
                                           :disabled="checkDisabled"
                                           :value="wallet.address"
                                           v-model="filterOptions.selectedWallets"
                                           @change="filterTransactions"/>
                                    <div class="control-indicator"></div>
                                    <div class="wrap__input-label">
                                        <span class="input-label"
                                              :class="{ 'disabled-label': checkDisabled }">
                                            {{ wallet.name }}
                                        </span>
                                        <span class="input-label input-label__balance"
                                              :class="{ 'disabled-label__balance': checkDisabled }">
                                            <formatting-price
                                                    :value="wallet.balance"
                                                    :balance="true"
                                            />
                                            &nbsp;ALE
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
                               :class="{ 'disabled-title': checkDisabledByTransactions }">
                            Tag's
                        </label>
                        <input type="text"
                               class="input"
                               placeholder="Type a tag here to choose specific transactions (optional)"
                               :class="{ 'input-disabled': checkDisabledByTransactions }"
                               :disabled="checkDisabledByTransactions">
                    </div>
                </div>

                <div class="modal-control border-none">
                    <div class="modal-wrap">
                        <div class="row-flex" style="align-items: flex-start; margin-bottom: 0;">
                            <div class="col-5" style="padding-top: 20px;">
                                <div class="modal-block">
                                    <div class="modal-line">
                                        <p class="modal-control__title"
                                           :class="{ 'disabled-title': checkDisabledByTransactions }">
                                            Transaction's type
                                        </p>
                                    </div>
                                    <div class="modal-line">
                                        <label class="control control-radio"
                                               :class="{ 'disabled-label__control': checkDisabledByTransactions }">
                                            <input type="radio"
                                                   name="transaction-type"
                                                   value="income"
                                                   v-model="filterOptions.typeTransaction"
                                                   :disabled="checkDisabledByTransactions"
                                                   @change="filterTransactions"/>
                                            <div class="control-indicator"></div>
                                            <span class="input-label"
                                                  :class="{ 'disabled-label': checkDisabledByTransactions }">
                                                Income
                                            </span>
                                        </label>
                                    </div>
                                    <div class="modal-line">
                                        <label class="control control-radio"
                                               :class="{ 'disabled-label__control': checkDisabledByTransactions }">
                                            <input type="radio"
                                                   name="transaction-type"
                                                   value="outcome"
                                                   v-model="filterOptions.typeTransaction"
                                                   :disabled="checkDisabledByTransactions"
                                                   @change="filterTransactions"/>
                                            <div class="control-indicator"></div>
                                            <span class="input-label"
                                                  :class="{ 'disabled-label': checkDisabledByTransactions }">
                                                Outcome
                                            </span>
                                        </label>
                                    </div>
                                    <div class="modal-line m-b-20">
                                        <label class="control control-radio"
                                               :class="{ 'disabled-label__control': checkDisabledByTransactions}">
                                            <input type="radio"
                                                   name="transaction-type"
                                                   value="all"
                                                   v-model="filterOptions.typeTransaction"
                                                   :disabled="checkDisabledByTransactions"
                                                   @change="filterTransactions"/>
                                            <div class="control-indicator"></div>
                                            <span class="input-label"
                                                  :class="{ 'disabled-label': checkDisabledByTransactions}">
                                                All
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="modal-block">
                                    <div class="modal-line">
                                        <p class="modal-control__title"
                                           :class="{ 'disabled-title': checkDisabledByTransactions }">
                                            Transaction's amount range
                                        </p>
                                    </div>
                                    <div class="modal-line">
                                        <div class="wrap-double-input"
                                             :class="{ 'wrap-double-input__disabled': checkDisabledByTransactions }">
                                            <label for="balance-from" class="label-from">from</label>
                                            <input type="number"
                                                   id="balance-from"
                                                   class="input input-from"
                                                   name="transaction-selection"
                                                   v-model="balance.value.from"
                                                   :placeholder="balance.placeholder.from"
                                                   :disabled="checkDisabledByTransactions"
                                                   @input="changeValBalanceFrom">
                                            <span id="label-currency-from"
                                                  class="label-сurrency"
                                                  @click="focusInput('balance-from')">
                                                ALE
                                            </span>
                                        </div>
                                    </div>
                                    <div class="modal-line">
                                        <div class="wrap-double-input"
                                             :class="{'wrap-double-input__disabled': checkDisabledByTransactions }">
                                            <label for="balance-to" class="label-to">to</label>
                                            <input type="number"
                                                   class="input input-to"
                                                   id="balance-to"
                                                   name="transaction-selection"
                                                   v-model="balance.value.to"
                                                   :placeholder="balance.placeholder.to"
                                                   :disabled="checkDisabledByTransactions"
                                                   @input="changeValBalanceTo">
                                            <span id="label-currency-to"
                                                  class="label-сurrency"
                                                  @click="focusInput('balance-to')">
                                                ALE
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <datepicker id="datepicker-filter"
                                            class="datepicker-for-export"
                                            v-model="changingDates"
                                            language="en"
                                            :disabled="disableDatepicker"
                                            :highlighted="highlightDatepicker"
                                            :inline="true"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="dataProcessing" class="wrap-spinner">
                    <spinner/>
                </div>

                <div class="modal-footer">
                    <button class="buttons btn-yellow btn-large"
                            type="submit"
                            :class="{ 'btn-yellow__disabled': countChooseTransactions === 0 }"
                            :disabled="countChooseTransactions === 0">
                        <span v-if="countChooseTransactions > 0">
                            Export
                            <span class="count-transactions">
                                <formatting-price :value="countChooseTransactions"/>
                            </span>
                            transactions
                        </span>
                        <span v-else>
                            You have no transactions
                        </span>
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
        watch: {
            'filterOptions.selectedWallets': function (selectedWallets) {
                // if (selectedWallets.length === 0) {
                //
                // }
            },
            'filterOptions.balance.from': function (val) {
                console.log(val, 'filterOptions.balanceFrom');
            },
            'filterOptions.balance.to': function (val) {
                console.log(val, 'filterOptions.balanceTo');
            },
            dateFrom: function (val) {
                console.log(val, 'date from');
            },
            dateTo: function (val) {
                console.log(val, 'date to');
            },
            changingDates: function (val) {
                if (val) {
                    this.filterTransactions();
                }
            },


            // 'filterOptions.date.secondary.from': function (val) {
            //     console.log(new Date(val), 'check secondary.from');
            // },
            // 'filterOptions.date.secondary.to': function (val) {
            //     console.log(new Date(val), 'check secondary.to');
            // }
        },
        data() {
            return {
                dateFromDatepicker: '',
                dateToDatepicker: '',
                dataProcessing: false,

                haveCurrentTransactions: false,

                selectionTypeStatement: 'optional',
                selectionTypeTransactions: 'all',

                countChooseTransactions: 0,

                countTransactions: {
                    current: 0,
                    all: 0,
                    optional: 0,
                },

                filterOptions: {
                    selectedWallets: [],
                    typeTransaction: 'all',
                    balance: {
                        from: '',
                        to: ''
                    },
                    date: {
                        primary: {
                            from: null,
                            to: null
                        },
                        secondary: {
                            from: null,
                            to: null
                        }
                    }
                },

                prevSelectedWallets: [],

                changingDates: null,

                balance: {
                    value: {
                        from: '',
                        to: ''
                    },
                    placeholder: {
                        from: '',
                        to: ''
                    }
                },

                dateLocalFrom: '',
                dateLocalTo: '',

                constDurationDay: 86400000,

                //мб в одно свойство?
                highlightDatepicker: {
                    from: null,
                    to: null
                },
                disableDatepicker: {
                    from: null,
                    to: null
                },

                heightDoc: 297,
                widthDoc: 210,
                offset: 10,

                titleFontSize: 16,
                dateDayFontSize: 16,
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

                currentSent: 0,
                currentReceived: 0,
                currentTotal: 0,

            }
        },
        computed: {
            ...mapGetters([
                'wallets',
                'filledWallets',
                'currentWallet',
                'transactions',

                'transactionsCount',

                'allTransactions',
                'allTransactionsStatus',

                'minCountAllTransactions',
                'maxCountAllTransactions',

                'dateFrom', //make another getters with date
                'dateTo',
                'countAllTransactions',
                'disabledDate',

                'filteredAllTransactions',

                // 'clearAllTransactions',

                'constantTransactions',
                'constantTransactionsCount',

                'dateFromFilterAllTransactions',
                'dateToFilterAllTransactions',

                'dateFromFilterConstTransactions',
                'dateToFilterConstTransactions',

                'dateIntervalFromFilterAllTransactions',
                'dateIntervalToFilterAllTransactions'
            ]),
            checkDisabled: function () {
                if (this.selectionTypeStatement !== 'optional')
                    return true;
                return false;
            },
            checkDisabledByTransactions: function () {
                if (this.selectionTypeStatement !== 'optional' || this.filterOptions.selectedWallets.length === 0)
                    return true;
                return false;
            },

        },
        methods: {
            makeMinDate: function (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            },
            makeMaxDate: function (date) {
                date.setHours(23);
                date.setMinutes(59);
                date.setSeconds(59);
                date.setMilliseconds(999);
                return date;
            },
            initModal: function () {
                this.makeDisableDatepicker();

                this.filterOptions.date.primary.from = this.dateFromFilterConstTransactions;
                this.filterOptions.date.primary.to = this.dateToFilterConstTransactions;

                this.filterOptions.date.secondary.from = this.dateFromFilterConstTransactions;
                this.filterOptions.date.secondary.to = this.dateToFilterConstTransactions;

                // let datepickerDay = document.getElementsByClassName('day');
                // for (let i = 0; i < datepickerDay.length; i++) {
                //     datepickerDay[i].addEventListener('click', function(e) {
                //         e.preventDefault();
                //         console.log(this);
                //     })
                // }
            },


            closeModal: function (name) {
                this.$modal.hide(name);
            },
            focusInput: function (id) {
                document.getElementById(id).focus();
            },
            checkDisabledWallets: function () {
                let absentWallets = [],
                    existingWallets = [],
                    disabledList = [],
                    enableList = [];

                let itemsWallets = document.getElementsByClassName('wallet-names-checkbox'),
                    addresses = this.wallets.map(wallet => wallet.address);

                if (this.filterOptions.selectedWallets.length !== 0) {
                    absentWallets = this.filterOptions.selectedWallets.filter(wallet => {
                        return !this.filteredAllTransactions.transactions.find(item => wallet === item.address);
                    });

                    existingWallets = this.filterOptions.selectedWallets.filter(wallet => {
                        return this.filteredAllTransactions.transactions.find(item => wallet === item.address);
                    });

                    if (absentWallets.length !== 0) {
                        absentWallets.forEach(item => {
                            disabledList.push(addresses.findIndex(elem => {
                                return elem === item;
                            }));
                        });

                        if (disabledList.length !== 0) {
                            disabledList.forEach(index => {
                                itemsWallets[index].disabled = true;
                            })
                        }
                    }

                    if (existingWallets.length !== 0) {
                        existingWallets.forEach(item => {
                            enableList.push(addresses.findIndex(elem => {
                                return elem === item;
                            }));
                        });

                        if (enableList.length !== 0) {
                            enableList.forEach(index => {
                                itemsWallets[index].disabled = false;
                            })
                        }
                    }
                }
            },

            changeTypeStatement: function () {
                if (this.selectionTypeStatement === 'current') {
                    this.countTransactions.current = this.transactionsCount;
                    this.countChooseTransactions = this.transactionsCount;
                    this.makeDisableDatepicker();
                } else if (this.selectionTypeStatement === 'all') {
                    this.countTransactions.all = this.constantTransactionsCount;
                    this.countChooseTransactions = this.constantTransactionsCount;
                    this.makeDisableDatepicker();
                } else if (this.selectionTypeStatement === 'optional') {
                    this.filterOptions.balance.from = this.minCountAllTransactions;
                    this.filterOptions.balance.to = this.maxCountAllTransactions;
                    this.countChooseTransactions = this.countTransactions.optional;
                    // this.makeEnableDatepicker();
                } else {
                    console.error('YOU CHOOSE A NON-EXISTENT VALUE');
                }
            },
            filterTransactions: function () {

                if (!this.filterOptions.selectedWallets.equals(this.prevSelectedWallets)) {
                    this.changingDates = null;
                }

                //вынести в отдельную функцию
                if (this.changingDates) {
                    let selectDate = this.changingDates,
                        areaFromDate = this.makeMinDate(new Date(this.filterOptions.date.primary.from)),
                        areaToDate = this.makeMaxDate(new Date(this.filterOptions.date.primary.to)),
                        filterFromDate = this.makeMinDate(new Date(this.filterOptions.date.secondary.from)),
                        filterToDate = this.makeMaxDate(new Date(this.filterOptions.date.secondary.to));

                    //проверять ещё на месяца и на года
                    let countToLeft = selectDate.getDay() - filterFromDate.getDay(),
                        countToRight = filterToDate.getDay() - selectDate.getDay(),
                        isFilterLeft = countToLeft === 0,
                        isFilterRight = countToRight === 0,
                        isExtLeft = selectDate.getDay() - areaFromDate.getDay() === 0,
                        isExtRight = areaToDate.getDay() - selectDate.getDay() === 0,
                        isLarge = selectDate.getDay() > filterToDate.getDay(),
                        isLess = selectDate.getDay() < filterFromDate.getDay();

                    //выделять более ярким цветом дни, в которых есть транзакции, а область сделать чуть менее яркой
                    if (!isExtLeft && !isLarge && (countToLeft < countToRight || countToLeft === countToRight) || isExtLeft && isLess) {
                        this.filterOptions.date.secondary.from = this.makeMinDate(selectDate).getTime();
                        console.log('first');

                        if (isFilterLeft) {
                            this.filterOptions.date.secondary.from = this.makeMinDate(selectDate).getTime();
                            this.filterOptions.date.secondary.to = this.makeMaxDate(selectDate).getTime();
                        }

                    } else if (!isExtRight && !isLess && countToRight < countToLeft || isExtRight && isLarge) {
                        this.filterOptions.date.secondary.to = this.makeMaxDate(selectDate).getTime();

                        console.log('second');

                        if (isFilterRight) {
                            this.filterOptions.date.secondary.from = this.makeMinDate(selectDate).getTime();
                            this.filterOptions.date.secondary.to = this.makeMaxDate(selectDate).getTime();
                        }
                    } else if (isExtLeft) {
                        this.filterOptions.date.secondary.from = this.makeMinDate(areaFromDate).getTime();
                        this.filterOptions.date.secondary.to = this.makeMaxDate(areaFromDate).getTime();
                        console.log('third');
                    } else if (isExtRight) {
                        this.filterOptions.date.secondary.from = this.makeMinDate(areaToDate).getTime();
                        this.filterOptions.date.secondary.to = this.makeMaxDate(areaToDate).getTime();
                        console.log('fourth');
                    }

                    this.highlightDatepicker.from = this.filterOptions.date.secondary.from;
                    this.highlightDatepicker.to = this.filterOptions.date.secondary.to;

                    // console.log(new Date(this.filterOptions.date.primary.from), 'primary.from');
                    // console.log(new Date(this.filterOptions.date.primary.to), 'primary.to');
                    // console.log(new Date(this.filterOptions.date.secondary.from), 'secondary.from');
                    // console.log(new Date(this.filterOptions.date.secondary.to), 'secondary.to');
                }

                console.log(new Date(this.filterOptions.date.secondary.from), 'this.filterOptions.date.secondary.from');
                console.log(new Date(this.filterOptions.date.secondary.to), 'this.filterOptions.date.secondary.to');

                this.$store.dispatch('restoreAllTransactions',
                    this.$store.state.Transactions.filteredAllTransactions
                ).then(() => {
                    this.$store.dispatch('filterAllTransactions',
                        this.filterOptions
                    ).then(() => {
                        //в функцию типа changeLocalData
                        //подумать с обработкой пустого массива this.filteredAllTransactions

                        this.balance.placeholder.from = this.filteredAllTransactions.from || this.minCountAllTransactions;
                        this.balance.placeholder.to = this.filteredAllTransactions.to || this.maxCountAllTransactions;
                        this.countChooseTransactions = this.filteredAllTransactions.count;
                        this.countTransactions.optional = this.filteredAllTransactions.count;

                        this.checkDisabledWallets();  //rename

                        if (this.prevSelectedWallets.length === 0) {
                            this.makeEnableDatepicker();
                        }

                        this.filterOptions.date.primary.from = this.dateIntervalFromFilterAllTransactions;
                        this.filterOptions.date.primary.to = this.dateIntervalToFilterAllTransactions;

                        //отсылаем данные выбранной даты и они там меняются на минимальные и максимальные

                        // this.highlightDatepicker.from = this.dateFromFilterAllTransactions;
                        // this.highlightDatepicker.to = this.dateToFilterAllTransactions;


                        //добавить похожее условие наверх к тмп
                        if (!this.filterOptions.selectedWallets.equals(this.prevSelectedWallets)) {
                            this.disableDatepicker.from = new Date(this.dateIntervalToFilterAllTransactions);
                            this.disableDatepicker.to = new Date(this.dateIntervalFromFilterAllTransactions);

                            //добавить обработку готовой области дейтпикера при фильтре по типу и балансу

                            this.filterOptions.date.primary.from = this.dateIntervalFromFilterAllTransactions;
                            this.filterOptions.date.primary.to = this.dateIntervalToFilterAllTransactions;

                            this.highlightDatepicker.from = this.dateFromFilterAllTransactions; //ломается при фильтре дат при переключении
                            this.highlightDatepicker.to = this.dateToFilterAllTransactions;

                            this.filterOptions.date.secondary.from = this.dateFromFilterAllTransactions;
                            this.filterOptions.date.secondary.to = this.dateToFilterAllTransactions;

                            this.prevSelectedWallets = this.filterOptions.selectedWallets;
                        }

                        console.log(new Date(this.dateFromFilterAllTransactions));
                        console.log(new Date(this.dateToFilterAllTransactions));

                    }).catch((err) => {
                        console.log(err);

                        this.balance.placeholder.from = this.minCountAllTransactions;
                        this.balance.placeholder.to = this.maxCountAllTransactions;
                        this.countChooseTransactions = 0;
                        this.countTransactions.optional = 'all';

                        this.makeDisableDatepicker();

                        this.filterOptions.date.primary.from = this.dateFromFilterConstTransactions;
                        this.filterOptions.date.primary.to = this.dateToFilterConstTransactions;

                        this.filterOptions.date.secondary.from = this.dateFromFilterConstTransactions;
                        this.filterOptions.date.secondary.to = this.dateToFilterConstTransactions;

                        this.changingDates = null;

                        this.highlightDatepicker.from = null;
                        this.highlightDatepicker.to = null;

                        if (this.filterOptions.selectedWallets.length === 0) {
                            this.prevSelectedWallets = this.filterOptions.selectedWallets;
                        }
                    });
                }).catch((err) => {
                    console.log(err, 'Restore error');
                });

                // this.highlightDatepicker.from = 1523226797000;//this.dateFromFilterAllTransactions;
                // this.highlightDatepicker.to = 1523882357000; //this.dateToFilterAllTransactions;
            },
            // filterTransactionsByBalance: function () {
            //     this.$store.dispatch('restoreAllTransactions',
            //         this.$store.state.Transactions.filteredAllTransactions
            //     ).then(() => {
            //         this.$store.dispatch('filterAllTransactions',
            //             this.filterOptions
            //         ).then(() => {
            //             this.countChooseTransactions = this.filteredAllTransactions.count;
            //             this.countTransactions.optional = this.filteredAllTransactions.count;
            //
            //             this.checkDisabledWallets();
            //
            //             (this.filteredAllTransactions.transactions.length === 0) ? this.makeDisableDatepicker() : this.makeEnableDatepicker();
            //
            //             this.filterOptions.date.from = this.dateFromFilterAllTransactions;
            //             this.filterOptions.date.to = this.dateToFilterAllTransactions;
            //
            //         }).catch((err) => {
            //             console.log(err, 'Filter error');
            //         });
            //     }).catch((err) => {
            //         console.log(err, 'Restore error');
            //     });
            // },
            initPosLabelCurrency: function () {
                this.filterOptions.balance.from = this.minCountAllTransactions;
                this.balance.placeholder.from = this.minCountAllTransactions;

                this.filterOptions.balance.to = this.maxCountAllTransactions;
                this.balance.placeholder.to = this.maxCountAllTransactions;

                setTimeout(() => {
                    document.getElementById('label-currency-from').style.left = (95 + this.filterOptions.balance.from.toString().length * 8).toString() + 'px';
                    document.getElementById('label-currency-to').style.left = (80 + this.filterOptions.balance.to.toString().length * 8).toString() + 'px';
                }, 40);
            },
            changeValBalanceFrom: function () {
                this.filterOptions.balance.from = this.balance.value.from;
                this.filterTransactions();
                document.getElementById('label-currency-from').style.left = (95 + this.filterOptions.balance.from.toString().length * 8).toString() + 'px';
            },
            changeValBalanceTo: function () {
                this.filterOptions.balance.to = this.balance.value.to;
                this.filterTransactions();
                document.getElementById('label-currency-to').style.left = (80 + this.filterOptions.balance.to.toString().length * 8).toString() + 'px';
            },
            resetLocalData: function () {
                this.dateFromDatepicker = '';
                this.dateToDatepicker = '';
                this.dataProcessing = false;

                this.haveCurrentTransactions = false;

                this.selectionTypeStatement = 'current';
                this.selectionTypeTransactions = 'all';

                this.filterOptions.selectedWallets = [];

                // this.balanceFilter = {
                //     from: '',
                //     to: ''
                // };

                this.dateLocalFrom = '';
                this.dateLocalTo = '';

                this.highlightDatepicker = {
                    from: 0,
                    to: 0
                };
                this.disableDatepicker = {
                    from: '',
                    to: ''
                };
            },
            makeEnableDatepicker: function () {
                this.disableDatepicker.from = null;
                this.disableDatepicker.to = null;

                //сделать выборку элементов календаря через инит document.getElementById('datepicker-filter')

                let prevs = document.getElementsByClassName('prev');
                for (let i = 0; i < prevs.length; i++) {
                    if (prevs[i].classList.contains('disabled')) {
                        prevs[i].classList.remove('disabled');
                    }
                }

                let ups = document.getElementsByClassName('up');
                for (let i = 0; i < ups.length; i++) {
                    if (ups[i].classList.contains('disabled')) {
                        ups[i].classList.remove('disabled');
                    }
                }

                let dayHeaders = document.getElementsByClassName('day-header');
                for (let i = 0; i < dayHeaders.length; i++) {
                    dayHeaders[i].classList.remove('day-disable');
                }
            },
            makeDisableDatepicker: function () {
                this.disableDatepicker.from = new Date(0);
                this.disableDatepicker.to = new Date(2147483647000);

                let prevs = document.getElementsByClassName('prev');
                for (let i = 0; i < prevs.length; i++) {
                    if (!prevs[i].classList.contains('disabled')) {
                        prevs[i].classList.add('disabled');
                    }
                }

                let ups = document.getElementsByClassName('up');
                for (let i = 0; i < ups.length; i++) {
                    if (!ups[i].classList.contains('disabled')) {
                        ups[i].classList.add('disabled');
                    }
                }

                let dayHeaders = document.getElementsByClassName('day-header');
                for (let i = 0; i < dayHeaders.length; i++) {
                    dayHeaders[i].classList.add('day-disable');
                }
            },
            // setStateDatepicker: function () {
            //     if (this.selectionTypeStatement !== 'optional') {
            //         this.disableDatepicker.from = new Date(0);
            //         this.disableDatepicker.to = new Date(2147483647000);
            //
            //         let prevs = document.getElementsByClassName('prev');
            //         for (let i = 0; i < prevs.length; i++) {
            //             if (!prevs[i].classList.contains('disabled')) {
            //                 prevs[i].classList.add('disabled');
            //             }
            //         }
            //
            //         let ups = document.getElementsByClassName('up');
            //         for (let i = 0; i < ups.length; i++) {
            //             if (!ups[i].classList.contains('disabled')) {
            //                 ups[i].classList.add('disabled');
            //             }
            //         }
            //
            //         let dayHeaders = document.getElementsByClassName('day-header');
            //         for (let i = 0; i < dayHeaders.length; i++) {
            //             dayHeaders[i].classList.add('day-disable');
            //         }
            //     }
            // },
            // setBalanceValues: function () {
            //     // this.balanceFilter.from = this.currentChooseTransactions.reduce((prev, curr) => {
            //     //     return Math.min(prev.count, curr.count);
            //     // });
            //     // this.balanceFilter.to = this.currentChooseTransactions.reduce((prev, curr) => {
            //     //     return Math.max(prev.count, curr.count);
            //     // });
            //
            //     let min = this.currentChooseTransactions[0].count,
            //         max = this.currentChooseTransactions[0].count;
            //     this.currentChooseTransactions.forEach(item => {
            //         if (item.count < min)
            //             min = item.count;
            //         if (item.count > max)
            //             max = item.count;
            //     });
            //     // this.balanceFilter.from = min;
            //     // this.balanceFilter.to = max;
            // },
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

            /**
             * @return {Boolean}
             */

            makePDF: function () {
                let doc = new JsPDF(),
                    pdfName = 'test',
                    countPage = 1,
                    balancer = 0;

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
                    return true;
                }

                if (this.selectionTypeStatement === 'all') {

                    //обрабатывать на пустые массивы транзакций

                    // this.allTransactions.forEach(function (item, i) {
                    //     console.log(item.transactions[0].timestamp, 'item.transactions[0].timestamp');
                    // });

                    for (let i = 0; i < this.constantTransactions.length; i++) {

                        this.generateHeaderTransactionsStatement(doc, this.constantTransactions[i].address);
                        this.generateDateTransactions(doc, Moment(this.constantTransactions[i].transactions[0].timestamp).format("DD.MM.YYYY"), 0);

                        for (let k = 0, factor = 0; k < this.constantTransactions[i].transactions.length; k++, factor = k - balancer) {

                            let count = this.constantTransactions[i].transactions[k].count,
                                time = Moment(this.constantTransactions[i].transactions[k].timestamp).format("HH:mm:ss"),
                                date = Moment(this.constantTransactions[i].transactions[k].timestamp).format("DD.MM.YYYY"),
                                walletAddress = this.constantTransactions[i].transactions[k].walletAddress,
                                walletDestination = this.constantTransactions[i].transactions[k].walletDestination;


                            if (this.offset + 25 * factor > this.heightDoc - 25) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = k;
                                factor = 0;
                                this.offset = 10;
                            }

                            if (k !== 0 && date !== Moment(this.constantTransactions[i].transactions[k - 1].timestamp).format("DD.MM.YYYY")) {
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

                            this.calcBalanceAll(this.constantTransactions[i].transactions[k].balanceInfo, count);
                            this.generateTransaction(doc, this.getTypeTransactionAll(this.constantTransactions[i].transactions[k].balanceInfo),
                                count, date, time, walletAddress, walletDestination, factor);


                            if (this.offset + 25 * factor > this.heightDoc - 25) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = k;
                                factor = 0;
                                this.offset = 10;
                            }


                            if (k === this.constantTransactions[i].transactions.length - 1) {
                                this.calcBalanceAll(this.constantTransactions[i].transactions[k].balanceInfo, count);
                                this.generateTransactionsDayStatement(doc, factor, true);

                                this.currentReceived = 0;
                                this.currentSent = 0;
                            }

                            if (k === this.constantTransactions[i].transactions.length - 1 && i !== this.constantTransactions.length - 1) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = 0;
                                factor = 0;
                                this.offset = 10;
                            }
                        }

                        if (i === this.constantTransactions.length - 1) {

                        }
                    }

                    doc.save(pdfName + '.pdf');
                    return true;
                }

                if (this.selectionTypeStatement === 'optional') {

                    console.log(this.filteredAllTransactions.transactions, 'this.filteredAllTransactions.transactions');

                    for (let i = 0; i < this.filteredAllTransactions.transactions.length; i++) {

                        // console.log(this.filteredAllTransactions.transactions[i].transactions[0].timestamp, 'this.filteredAllTransactions.transactions[i].transactions[0].timestamp');

                        this.generateHeaderTransactionsStatement(doc, this.filteredAllTransactions.transactions[i].address);
                        this.generateDateTransactions(doc, Moment(this.filteredAllTransactions.transactions[i].transactions[0].timestamp).format("DD.MM.YYYY"), 0);

                        for (let k = 0, factor = 0; k < this.filteredAllTransactions.transactions[i].transactions.length; k++, factor = k - balancer) {

                            let count = this.filteredAllTransactions.transactions[i].transactions[k].count,
                                time = Moment(this.filteredAllTransactions.transactions[i].transactions[k].timestamp).format("HH:mm:ss"),
                                date = Moment(this.filteredAllTransactions.transactions[i].transactions[k].timestamp).format("DD.MM.YYYY"),
                                walletAddress = this.filteredAllTransactions.transactions[i].transactions[k].walletAddress,
                                walletDestination = this.filteredAllTransactions.transactions[i].transactions[k].walletDestination;


                            if (this.offset + 25 * factor > this.heightDoc - 25) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = k;
                                factor = 0;
                                this.offset = 10;
                            }


                            if (k !== 0 && date !== Moment(this.filteredAllTransactions.transactions[i].transactions[k - 1].timestamp).format("DD.MM.YYYY")) {

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

                            this.calcBalanceAll(this.filteredAllTransactions.transactions[i].transactions[k].balanceInfo, count);
                            this.generateTransaction(doc, this.getTypeTransactionAll(this.filteredAllTransactions.transactions[i].transactions[k].balanceInfo),
                                count, date, time, walletAddress, walletDestination, factor);


                            if (this.offset + 25 * factor > this.heightDoc - 25) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = k;
                                factor = 0;
                                this.offset = 10;
                            }


                            if (k === this.filteredAllTransactions.transactions[i].transactions.length - 1) {
                                this.calcBalanceAll(this.filteredAllTransactions.transactions[i].transactions[k].balanceInfo, count);
                                this.generateTransactionsDayStatement(doc, factor, true);

                                this.currentReceived = 0;
                                this.currentSent = 0;
                            }

                            if (k === this.filteredAllTransactions.transactions[i].transactions.length - 1 && i !== this.filteredAllTransactions.transactions.length - 1) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = 0;
                                factor = 0;
                                this.offset = 10;
                            }
                        }

                        if (i === this.filteredAllTransactions.transactions.length - 1) {

                        }
                    }

                    doc.save(pdfName + '.pdf');
                    return true;
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

                    // let walletsAddressList = this.wallets.map(function (wallet) {
                    //     return wallet.address;
                    // });

                    // this.$store.dispatch('allTransactionsRequest', {
                    //     addresses: walletsAddressList
                    // }).then(() => {
                    this.makePDF();
                    this.dataProcessing = false;
                    this.closeModal('download-pdf');
                    // }).catch(() => {
                    //     this.$toasted.show('An error occurred while loading transactions statement', {
                    //         duration: 10000,
                    //         type: 'error',
                    //     });
                    // });

                    //после тестирования перенести в then() =>
                    // setTimeout(() => {
                    //     if (this.allTransactionsStatus === 'success') {
                    //         this.makePDF();
                    //         this.closeModal('download-pdf');
                    //     }
                    // }, 150);
                }

                if (this.selectionTypeStatement === 'optional') {
                    this.dataProcessing = true;

                    this.makePDF();

                    this.dataProcessing = false;
                }
            }
        },
        created() {
            this.dateFromDatepicker = this.dateFrom;
            this.dateToDatepicker = this.dateTo;
        },
        mounted() {

            // this.makeDisableDatepicker();

            // this.$store.dispatch('copyAllTransactions',
            //     this.allTransactions
            // ).then(() => {
            //
            // }).catch(() => {
            //
            // });
        }
    }
</script>

<style lang="stylus">
    .datepicker-for-export
        .vdp-datepicker__calendar
            box-shadow none
            background-color #fafafa

            .day.selected, .day.highlighted
                background-color #ffd24f !important
            & :hover
                border none !important

            .day-disable
                color #ddd !important


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
                top 5.5px
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
                    label.label-to,
                    .label-сurrency,
                    .input.input-from,
                    .input.input-to
                        color #979797 !important
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

                    .label-сurrency
                        font-family MuseoSansCyrl500
                        font-size 13px
                        position absolute

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

            .btn-yellow__disabled
                cursor default
                opacity 0.4

            .buttons

                .count-transactions
                    font-weight 700

</style>