<template>
    <modal name="download-pdf"
           width="700"
           height="auto"
           @opened="initModal"
           @before-open="initPosLabelCurrency"
           @closed="resetLocalData">
        <div class="heading">
            <p class="title">{{ $t('modals.pdf.title') }}</p>
            <i class="close" @click="closeModal('download-pdf')"></i>
        </div>
        <div class="body">
            <form @submit.prevent="downloadPDF">
                <div class="modal-control">
                    <div class="modal-wrap">
                        <div class="modal-line">
                            <p class="modal-control__title">
                                {{ $t('modals.pdf.firstDesc') }}
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
                                    {{ $t('modals.pdf.firstRadio.first') }}
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
                                    {{ $t('modals.pdf.firstRadio.second') }}
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
                                    {{ $t('modals.pdf.firstRadio.third') }}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="modal-control">
                    <div class="modal-wrap">
                        <div class="modal-line modal-line__between">
                            <p class="modal-control__title"
                               :class="{ 'disabled-title': checkDisabled }">
                                {{ $t('modals.pdf.secondDesc') }}
                            </p>
                            <label class="control control-checkbox"
                                   :class="{ 'disabled-label__control': checkDisabled }">
                                <input type="checkbox"
                                       name="select-all-wallets"
                                       :disabled="checkDisabled"
                                       v-model="isAllWallets"
                                       @change="setAllWallets"/>
                                <div class="control-indicator control-indicator__mini"></div>
                                <div class="wrap__input-label">
                                    <span class="input-label"
                                          :class="{ 'disabled-label': checkDisabled }">
                                         {{ $t('modals.pdf.selectAll') }}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div class="modal-control__wrap wrap__wallets">
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
                                            <formatting-price :value="wallet.balance"
                                                              :balance="true"/>
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
                            {{ $t('modals.pdf.tags') }}
                        </label>
                        <input type="text"
                               class="input"
                               :placeholder= "$t('modals.pdf.thirdDesc')"
                               :class="{ 'input-disabled': checkDisabledByTransactions }"
                               :disabled="checkDisabledByTransactions">
                    </div>
                </div>

                <div class="modal-control border-none">
                    <div class="modal-wrap">
                        <div class="row-flex row-flex__top">
                            <div class="col-5 modal-blocks">
                                <div class="modal-block">
                                    <div class="modal-line">
                                        <p class="modal-control__title"
                                           :class="{ 'disabled-title': checkDisabledByTransactions }">
                                            {{ $t('modals.pdf.TransactionsType') }}
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
                                                 {{ $t('modals.pdf.secondRadio.first') }}
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
                                                {{ $t('modals.pdf.secondRadio.second') }}
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
                                                {{ $t('modals.pdf.secondRadio.third') }}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="modal-block">
                                    <div class="modal-line">
                                        <p class="modal-control__title"
                                           :class="{ 'disabled-title': checkDisabledByTransactions }">
                                            {{ $t('modals.pdf.range') }}
                                        </p>
                                    </div>
                                    <div class="modal-line">
                                        <div class="wrap-double-input"
                                             :class="{ 'wrap-double-input__disabled': checkDisabledByTransactions }">
                                            <label for="balance-from" class="label-from">
                                                {{ $t('modals.pdf.from') }}
                                            </label>
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
                                            <label for="balance-to" class="label-to">{{ $t('modals.pdf.to') }}</label>
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
                                            :language="$t('modals.pdf.lang')"
                                            :disabled="disableDatepicker"
                                            :highlighted="highlightDatepicker"
                                            :marked="marked"
                                            :inline="true"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="dataProcessing" class="wrap-spinner">
                    <spinner/>
                </div>

                <div class="modal-footer">
                    <button class="buttons btn-default btn-large"
                            type="button"
                            @click="resetFilters"
                            :disabled="checkDisabled">
                        {{ $t('modals.pdf.button.reset') }}
                    </button>
                    <button class="buttons btn-yellow btn-large"
                            type="submit"
                            :class="{ 'btn-yellow__disabled': countChooseTransactions === 0 }"
                            :disabled="countChooseTransactions === 0">
                        <span v-if="countChooseTransactions > 0">
                            {{ $t('modals.pdf.button.export1') }}
                            <span class="count-transactions">
                                <formatting-price :value="countChooseTransactions"/>
                            </span>
                            {{ $t('modals.pdf.button.export2') }}
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
    import Datepicker from 'zhiskar-vuejs-datepicker';
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
        data() {
            return {
                dateFromDatepicker: '',
                dateToDatepicker: '',
                dataProcessing: false,

                selectionTypeStatement: 'current',
                selectionTypeTransactions: 'all',

                countChooseTransactions: 0,

                countTransactions: {
                    current: 0,
                    all: 0,
                    optional: 0,
                },

                isAllWallets: false,

                marked: [],

                transactionsByDay: [],

                filterOptions: {
                    selectedWallets: [],
                    typeTransaction: 'all',
                    balance: {
                        from: '',
                        to: ''
                    },
                    date: {
                        primary: {
                            from: null,  //set 0 instead null
                            to: null
                        },
                        secondary: {
                            from: null,
                            to: null
                        }
                    }
                },

                prevSelectedWallets: [],

                dateFromPick: null,
                dateToPick: null,
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

                red: [177, 3, 3],
                green: [75, 177, 3],
                black: [0, 0, 0],

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
        watch: {
            changingDates: function (val) {
                if (!this.dateFromPick && !this.dateToPick) {
                    this.dateFromPick = this.makeMinDate(val).getTime();
                } else if (this.dateFromPick && !this.dateToPick) {
                    if (this.makeMinDate(val).getTime() < this.dateFromPick) {
                        this.dateToPick = this.makeMaxDate(new Date(this.dateFromPick)).getTime();
                        this.dateFromPick = this.makeMinDate(val).getTime();
                    } else {
                        this.dateToPick = this.makeMaxDate(val).getTime();
                    }
                }

                if (val && this.dateFromPick && this.dateToPick) {
                    this.setDateFilterInterval();
                    if (val && this.filterOptions.selectedWallets.length !== 0) {
                        this.filterTransactions();
                    }
                }

                if (this.dateFromPick && this.dateToPick) {
                    if (val && this.filterOptions.selectedWallets.length !== 0) {
                        this.filterTransactions();
                    }
                }
            },
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

                'constantTransactions',
                'constantTransactionsCount',

                'dateFromFilterAllTransactions',
                'dateToFilterAllTransactions',

                'dateFromFilterConstTransactions',
                'dateToFilterConstTransactions',

                'dateIntervalFromFilterAllTransactions',
                'dateIntervalToFilterAllTransactions',

                'disableFieldsFilter'
            ]),
            checkDisabled: function () {
                return (this.selectionTypeStatement !== 'optional');
            },
            //replace
            checkDisabledByTransactions: function () {
                return (this.selectionTypeStatement !== 'optional');
            },
            /*
            * */
            listWalletAddress: function () {
                let list = [];
                this.constantTransactions.forEach(item => {
                    list.push(item.address);
                });
                return list;
            },
        },
        methods: {
            /*
            * */
            resetFilters: function () {
                let checkboxes = document.getElementsByClassName('wallet-names-checkbox');

                for (let i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked)
                        checkboxes[i].click();
                }

                this.countChooseTransactions = 0;
                this.countTransactions.optional = 0;

                this.filterOptions.selectedWallets = [];
                this.filterOptions.typeTransaction = 'all';
                this.filterOptions.balance.from = this.minCountAllTransactions;
                this.filterOptions.balance.to = this.maxCountAllTransactions;
                this.balance.value.from = '';
                this.balance.value.to = '';
                this.filterOptions.date.secondary = {
                    from: null,
                    to: null
                };

                this.marked = [];

                this.isAllWallets = false;

                this.highlightDatepicker = {
                    from: null,
                    to: null
                };

                this.disableDatepicker = {
                    from: null,
                    to: null
                };

                this.prevSelectedWallets = [];
            },
            setAllWallets: function () {
                let checkboxes = document.getElementsByClassName('wallet-names-checkbox');

                for (let i = 0; i < checkboxes.length; i++) {
                    if (this.isAllWallets && !checkboxes[i].checked)
                        checkboxes[i].click();
                    else if (!this.isAllWallets && checkboxes[i].checked)
                        checkboxes[i].click();
                }
            },
            initModal: function () {
                if (this.selectionTypeStatement === 'current') {
                    this.countTransactions.current = this.transactionsCount;
                    this.countChooseTransactions = this.transactionsCount;
                    this.makeDisableDatepicker();
                }
                this.filterOptions.date.primary.from = this.dateFromFilterConstTransactions;
                this.filterOptions.date.primary.to = this.dateToFilterConstTransactions;
            },
            closeModal: function (name) {
                this.$modal.hide(name);
            },
            focusInput: function (id) {
                document.getElementById(id).focus();
            },
            /*
            * */
            checkDisabledWallets: function () {
                //хранить эти данные локально
                let absentWallets = [],
                    existingWallets = [],
                    disabledList = [],
                    enableList = [];

                //вынести во вьюкс
                let fullWallets = this.wallets.filter(wallet => {
                    return wallet.total_transactions !== 0;
                });

                let itemsWallets = document.getElementsByClassName('wallet-names-checkbox'),
                    controlIndicators = document.querySelectorAll('.wallet-names-checkbox + .control-indicator'),
                    addresses = fullWallets.map(wallet => wallet.address);


                for (let i = 0; i < itemsWallets.length; i++) {
                    if (!itemsWallets[i].checked && controlIndicators[i].classList.contains('control-indicator__disable')) {
                        controlIndicators[i].classList.remove('control-indicator__disable');
                    }
                }

                if (this.filterOptions.selectedWallets.length !== 0) {
                    absentWallets = this.filterOptions.selectedWallets.filter(wallet =>
                        !this.filteredAllTransactions.transactions.find(item => wallet === item.address)
                    );

                    existingWallets = this.filterOptions.selectedWallets.filter(wallet =>
                        this.filteredAllTransactions.transactions.find(item => wallet === item.address)
                    );


                    //rename absent to empty
                    if (absentWallets.length !== 0) {
                        absentWallets.forEach(item => {
                            disabledList.push(addresses.findIndex(elem =>
                                elem === item
                            ));
                        });


                        if (disabledList.length !== 0) {
                            disabledList.forEach(index => {
                                // if (itemsWallets[index].checked) {
                                controlIndicators[index].classList.add('control-indicator__disable')
                                // }
                                // itemsWallets[index].disabled = true;
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
                                controlIndicators[index].classList.remove('control-indicator__disable')
                            })
                        }
                    }
                }
            },
            /*
            * */
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
                    this.makeEnableDatepicker();
                } else {
                    console.error('YOU CHOOSE A NON-EXISTENT VALUE');
                }
            },
            checkNotNull: function (val) {
                return (val !== null);
            },
            //записать обработку если дается таймштамп, а не дата
            makeMinDate: function (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            },
            //записать обработку если дается таймштамп, а не дата
            makeMaxDate: function (date) {
                date.setHours(23);
                date.setMinutes(59);
                date.setSeconds(59);
                date.setMilliseconds(999);
                return date;
            },
            makeInitSelectDate: function () {
                // this.dateFromPick = this.makeMinDate(this.changingDates).getTime();
                this.filterOptions.date.secondary.from = this.makeMinDate(this.changingDates).getTime();
                this.filterOptions.date.secondary.to = this.makeMaxDate(this.changingDates).getTime();
                this.highlightDatepicker.from = this.filterOptions.date.secondary.from;
                this.highlightDatepicker.to = this.filterOptions.date.secondary.to;
            },
            calcSerialDay: function (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            },
            //добавить комплексную функцию проверок на undefined, null и пр прототипы в main.js
            setDateFilterInterval: function () {
                this.filterOptions.date.secondary.from = this.dateFromPick;
                this.filterOptions.date.secondary.to = this.dateToPick;
                this.highlightDatepicker.from = this.dateFromPick;
                this.highlightDatepicker.to = this.dateToPick;
                this.dateFromPick = null;
                this.dateToPick = null;
            },
            filterTransactions: function () {
                if (!this.filterOptions.selectedWallets.equals(this.prevSelectedWallets)) {
                    this.filterOptions.date.primary.from = this.dateFromFilterConstTransactions;
                    this.filterOptions.date.primary.to = this.dateToFilterConstTransactions;
                }

                if (this.isAllWallets && !this.listWalletAddress.equals(this.filterOptions.selectedWallets) &&
                    this.listWalletAddress.equals(this.prevSelectedWallets)) {
                    this.isAllWallets = false;
                }

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

                        if (this.filteredAllTransactions.transactions.length !== 0) {
                            this.filterOptions.date.primary.from = this.dateIntervalFromFilterAllTransactions;
                            this.filterOptions.date.primary.to = this.dateIntervalToFilterAllTransactions;
                        }

                        //REFACTOR

                        let a = '';

                        this.transactionsByDay = this.filteredAllTransactions.transactions.map(item => {
                            return item.transactions;
                        }).reduce((prev, curr) => {
                            return prev.concat(curr)
                        }).map(item => {
                            a = new Date(item.timestamp);
                            a.setHours(0);
                            a.setMinutes(0);
                            a.setSeconds(0);
                            a.setMilliseconds(0);
                            return a.getTime();
                        });

                        let days = [],
                            count = 1;

                        for (let i = 0; i < this.transactionsByDay.length; i++) {
                            if (i === 0) {
                                // count++;
                            }
                            if (i !== 0 && this.transactionsByDay[i] === this.transactionsByDay[i - 1]) {
                                count++;
                            } else if (i !== 0 && this.transactionsByDay[i] !== this.transactionsByDay[i - 1]) {
                                days.push({date: this.transactionsByDay[i - 1], density: count});
                                count = 1;
                            }
                            //если текущий элемент массива - последний или массив состоит всего из одного элемента
                            if (i === this.transactionsByDay.length - 1) {
                                days.push({date: this.transactionsByDay[i], density: count});
                            }
                        }

                        let max = days[0].density, min = days[0].density;
                        days.forEach(item => {
                            if (item.density < min)
                                min = item.density;
                            if (item.density > max)
                                max = item.density;
                        });

                        days.forEach(item => {
                            if (item.density === max) {
                                item.density = 1;
                            } else if (item.density < max && item.density >= max - (max - min) / 4) {
                                item.density = 0.75;
                            } else if (item.density < max - (max - min) / 4 && item.density >= max - (max - min) / 2) {
                                item.density = 0.5;
                            } else if (item.density < max - (max - min) / 2 && item.density >= max - 3 * (max - min) / 4) {
                                item.density = 0.25;
                            } else if (item.density < max - 3 * (max - min) / 4 && item.density >= min) {
                                item.density = 0;
                            }
                        });

                        this.marked = days;

                        //добавить похожее условие наверх к тмп
                        if (!this.filterOptions.selectedWallets.equals(this.prevSelectedWallets)) {
                            //добавить обработку готовой области дейтпикера при фильтре по типу и балансу
                            this.filterOptions.date.primary.from = this.dateIntervalFromFilterAllTransactions;
                            this.filterOptions.date.primary.to = this.dateIntervalToFilterAllTransactions;

                            if (!this.filterOptions.date.secondary.from && !this.filterOptions.date.secondary.to) {
                                this.highlightDatepicker.from = this.dateIntervalFromFilterAllTransactions;
                                this.highlightDatepicker.to = this.dateIntervalToFilterAllTransactions;
                            }

                            this.prevSelectedWallets = this.filterOptions.selectedWallets;
                        }
                    }).catch((err) => {
                        console.log(err);

                        this.balance.placeholder.from = this.minCountAllTransactions;
                        this.balance.placeholder.to = this.maxCountAllTransactions;
                        this.countChooseTransactions = 0;
                        this.countTransactions.optional = 'all';

                        this.filterOptions.date.primary.from = this.dateFromFilterConstTransactions;
                        this.filterOptions.date.primary.to = this.dateToFilterConstTransactions;

                        this.checkDisabledWallets();

                        this.marked = [];

                        if (this.filterOptions.selectedWallets.length === 0) {
                            this.prevSelectedWallets = this.filterOptions.selectedWallets;
                        }
                    });
                }).catch((err) => {
                    console.log(err, 'Restore error');
                });
            },
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

                this.selectionTypeStatement = 'current';
                this.selectionTypeTransactions = 'all';

                this.countChooseTransactions = 0;

                this.countTransactions = {
                    current: 0,
                    all: 0,
                    optional: 0,
                };

                this.marked = [];

                this.filterOptions = {
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
                };

                this.prevSelectedWallets = [];

                this.balance = {
                    value: {
                        from: '',
                        to: ''
                    },
                    placeholder: {
                        from: '',
                        to: ''
                    }
                };

                //мб в одно свойство?
                this.highlightDatepicker = {
                    from: null,
                    to: null
                };
                this.disableDatepicker = {
                    from: null,
                    to: null
                };
            },
            makeEnableDatepicker: function () {
                this.disableDatepicker.from = null;
                this.disableDatepicker.to = null;

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

            //rec - recognize
            recTypeTransaction: function (i) { //переделать получение как в getTypeTransactionAll
                return (this.transactions[i].balanceInfo.after - this.transactions[i].balanceInfo.before > 0);
            },

            //tmp solution
            recTypeTransactionAll: function (item) {
                return (item.after - item.before > 0);
            },

            calcBalance: function (i, count) {
                this.currentTotal = this.transactions[i].balanceInfo.after;
                (this.recTypeTransaction(i)) ? this.currentReceived += count : this.currentSent += count;
            },

            calcBalanceAll: function (item, count) {
                this.currentTotal = item.after;
                (this.recTypeTransactionAll(item)) ? this.currentReceived += count : this.currentSent += count;
            },

            generateHeaderTransactionsStatement: function (doc, wallet, balanceStats) {
                doc.setFontSize(this.titleFontSize);

                doc.text(wallet.name, 10, this.offset);
                this.offset += 7.5;
                doc.text(wallet.address, 10, this.offset);
                this.offset += 10;
                //add date range

                //разбить эти блоки на ещё функции

                doc.setFontSize(this.normalFontSize);
                doc.setTextColor(...this.green);
                doc.text(this.receivedText, this.xPositionSummaryAction, this.offset);
                doc.text(balanceStats.received.toString(), this.xPositionSummaryCount, this.offset);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset);
                this.offset += 5;

                doc.setTextColor(...this.red);
                doc.text(this.sentText, this.xPositionSummaryAction, this.offset);
                doc.text(balanceStats.sent.toString(), this.xPositionSummaryCount, this.offset);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset);
                this.offset += 5;

                doc.setTextColor(...this.black);
                doc.text(this.startingText, this.xPositionSummaryAction, this.offset);
                doc.text(balanceStats.starting.toString(), this.xPositionSummaryCount, this.offset);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset);
                this.offset += 5;

                doc.text(this.totalText, this.xPositionSummaryAction, this.offset);
                doc.text(balanceStats.total.toString(), this.xPositionSummaryCount, this.offset);
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

                doc.setTextColor(...this.green);
                doc.text(this.receivedText, this.xPositionSummaryAction, this.offset + 25 * j);
                doc.text(this.currentReceived.toString(), this.xPositionSummaryCount, this.offset + 25 * j);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset + 25 * j);
                this.offset += 5;

                doc.setTextColor(...this.red);
                doc.text(this.sentText, this.xPositionSummaryAction, this.offset + 25 * j);
                doc.text(this.currentSent.toString(), this.xPositionSummaryCount, this.offset + 25 * j);
                doc.text(this.currencyText, this.xPositionSummaryCurrency, this.offset + 25 * j);
                this.offset += 5;

                doc.setTextColor(...this.black);
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

                (type) ? doc.setTextColor(...this.green) : doc.setTextColor(...this.red);
                doc.text((type) ? this.receivedText : this.sentText, this.xPositionTransactionType, this.offset + 25 * j);

                doc.setTextColor(...this.black);
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

                    //написать свой модуль для подсчёта всех входящих денег из переданного массива транзакций
                    let currDayBalanceStats = {
                            received: 0,
                            sent: 0,
                            starting: 0,
                            total: 0
                        },
                        currTransactions = this.transactions,
                        walletAttr = {
                            name: '',
                            address: ''
                        };

                    currDayBalanceStats.starting = currTransactions[0].balanceInfo.before;
                    currDayBalanceStats.total = currTransactions[0].balanceInfo.after;

                    currTransactions.forEach((item, i, arr) => {
                        if (item.balanceInfo.after - item.balanceInfo.before > 0)
                            currDayBalanceStats.received += item.count;

                        if (item.balanceInfo.after - item.balanceInfo.before < 0)
                            currDayBalanceStats.sent += item.count;

                        if (i !== 0 && item.timestamp < arr[i - 1].timestamp)
                            currDayBalanceStats.starting = item.balanceInfo.before;

                        if (i !== 0 && item.timestamp > arr[i - 1].timestamp)
                            currDayBalanceStats.total = item.balanceInfo.after;

                    });

                    walletAttr.address = this.currentWallet.address;
                    walletAttr.name = this.currentWallet.name;

                    this.generateHeaderTransactionsStatement(doc, walletAttr, currDayBalanceStats);
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
                        this.generateTransaction(doc, this.recTypeTransaction(i), count, date, time, walletAddress, walletDestination, j);

                        if (i === this.transactions.length - 1) {
                            i === 0 || this.calcBalance(i - 1, count);
                            this.generateTransactionsDayStatement(doc, j, true);
                        }
                    }

                    this.offset = 10;

                    doc.save(pdfName + '.pdf');
                    return true;
                }

                if (this.selectionTypeStatement === 'all') {

                    for (let i = 0; i < this.constantTransactions.length; i++) {

                        //написать свой модуль для подсчёта всех входящих денег из переданного массива транзакций
                        let currDayBalanceStats = {
                                received: 0,
                                sent: 0,
                                starting: 0,
                                total: 0
                            },
                            currTransactions = this.constantTransactions[i].transactions,
                            walletAttr = {
                                name: '',
                                address: ''
                            };

                        currDayBalanceStats.starting = currTransactions[0].balanceInfo.before;
                        currDayBalanceStats.total = currTransactions[0].balanceInfo.after;

                        currTransactions.forEach((item, i, arr) => {
                            if (item.balanceInfo.after - item.balanceInfo.before > 0)
                                currDayBalanceStats.received += item.count;

                            if (item.balanceInfo.after - item.balanceInfo.before < 0)
                                currDayBalanceStats.sent += item.count;

                            if (i !== 0 && item.timestamp < arr[i - 1].timestamp)
                                currDayBalanceStats.starting = item.balanceInfo.before;

                            if (i !== 0 && item.timestamp > arr[i - 1].timestamp)
                                currDayBalanceStats.total = item.balanceInfo.after;

                        });

                        walletAttr.address = this.constantTransactions[i].address;
                        walletAttr.name = this.wallets.find(item => {
                            return item.address === walletAttr.address;
                        }).name;


                        this.generateHeaderTransactionsStatement(doc, walletAttr, currDayBalanceStats);
                        this.generateDateTransactions(doc, Moment(currTransactions[0].timestamp).format("DD.MM.YYYY"), 0);

                        for (let k = 0, factor = 0; k < currTransactions.length; k++, factor = k - balancer) {

                            let count = currTransactions[k].count,
                                time = Moment(currTransactions[k].timestamp).format("HH:mm:ss"),
                                date = Moment(currTransactions[k].timestamp).format("DD.MM.YYYY"),
                                walletAddress = currTransactions[k].walletAddress,
                                walletDestination = currTransactions[k].walletDestination;


                            if (this.offset + 25 * factor > this.heightDoc - 25) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = k;
                                factor = 0;
                                this.offset = 10;
                            }

                            if (k !== 0 && date !== Moment(currTransactions[k - 1].timestamp).format("DD.MM.YYYY")) {
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

                            this.calcBalanceAll(currTransactions[k].balanceInfo, count);

                            this.generateTransaction(doc, this.getTypeTransactionAll(currTransactions[k].balanceInfo),
                                count, date, time, walletAddress, walletDestination, factor);


                            if (this.offset + 25 * factor > this.heightDoc - 25) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = k;
                                factor = 0;
                                this.offset = 10;
                            }


                            if (k === currTransactions.length - 1) {
                                this.generateTransactionsDayStatement(doc, factor, true);

                                this.currentReceived = 0;
                                this.currentSent = 0;
                            }

                            if (k === currTransactions.length - 1 && i !== this.constantTransactions.length - 1) {
                                doc.addPage();
                                countPage++;
                                doc.setPage(countPage);
                                balancer = 0;
                                factor = 0;
                                this.offset = 10;
                            }
                        }
                    }

                    this.offset = 10;

                    doc.save(pdfName + '.pdf');
                    return true;
                }

                if (this.selectionTypeStatement === 'optional') {

                    for (let i = 0; i < this.filteredAllTransactions.transactions.length; i++) {

                        //написать свой модуль для подсчёта всех входящих денег из переданного массива транзакций
                        let currDayBalanceStats = {
                                received: 0,
                                sent: 0,
                                starting: 0,
                                total: 0
                            },
                            currTransactions = this.filteredAllTransactions.transactions[i].transactions,
                            walletAttr = {
                                name: '',
                                address: ''
                            };

                        currDayBalanceStats.starting = currTransactions[0].balanceInfo.before;
                        currDayBalanceStats.total = currTransactions[0].balanceInfo.after;

                        currTransactions.forEach((item, i, arr) => {
                            if (item.balanceInfo.after - item.balanceInfo.before > 0)
                                currDayBalanceStats.received += item.count;

                            if (item.balanceInfo.after - item.balanceInfo.before < 0)
                                currDayBalanceStats.sent += item.count;

                            if (i !== 0 && item.timestamp < arr[i - 1].timestamp)
                                currDayBalanceStats.starting = item.balanceInfo.before;

                            if (i !== 0 && item.timestamp > arr[i - 1].timestamp)
                                currDayBalanceStats.total = item.balanceInfo.after;

                        });

                        walletAttr.address = this.filteredAllTransactions.transactions[i].address;
                        walletAttr.name = this.wallets.find(item => {
                            return item.address === walletAttr.address;
                        }).name;

                        this.generateHeaderTransactionsStatement(doc, walletAttr, currDayBalanceStats);
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
                    }

                    this.offset = 10;

                    doc.save(pdfName + '.pdf');
                    return true;
                }
            },

            downloadPDF: function () {
                if (this.selectionTypeStatement === 'current') {
                    this.makePDF();
                    // this.closeModal('download-pdf');
                } else if (this.selectionTypeStatement === 'all') {
                    this.dataProcessing = true;
                    this.makePDF();
                    this.dataProcessing = false;
                } else if (this.selectionTypeStatement === 'optional') {
                    this.dataProcessing = true;
                    this.makePDF();
                    this.dataProcessing = false;
                    // this.closeModal('download-pdf');
                }
            }
        },
        created() {
            this.dateFromDatepicker = this.dateFrom;
            this.dateToDatepicker = this.dateTo;
        }
    }
</script>

<style lang="stylus">
//     .vdp-datepicker
//         user-select none
//     .datepicker-for-export
//         .vdp-datepicker__calendar
//             box-shadow none
//             background-color #fafafa

//             /*.day.selected, .day.highlighted*/
//             /*background-color #fce9b5 !important*/
//             & :hover
//                 border none !important

//             .day-disable
//                 color #ddd !important

//     @media (max-width: 320px)
//         .datepicker-for-export
//             .vdp-datepicker__calendar
//                 width auto
// </style>

// <style lang="stylus" scoped>
//     .row-flex.row-flex__top
//         align-items flex-start
//         margin-bottom 0

//     .btn-default
//         &:disabled
//             background-color rgba(13, 23, 23, 0.08)
//             opacity 0.4 !important

//     .disabled-label__control
//         cursor default

//     .control-indicator__disable
//         opacity 0.6

//     .control-radio
//         width auto
//         display flex
//         align-items center

//         .input-label
//             font-size 13px
//             line-height 1.2
//             padding-left 10px

//         .control-indicator
//             position relative
//             height 18px
//             width 18px
//             top auto

//             &:after
//                 top 5.5px
//                 left 6px
//                 width 6px
//                 height 6px

//     .control-checkbox
//         width auto
//         display flex
//         align-items center

//         .wrap__input-label
//             padding-left 10px
//             display flex
//             flex-direction column
//             justify-content center

//             .input-label
//                 font-size 13px

//             .input-label, .input-label__balance
//                 line-height 1.2

//             .input-label__balance
//                 font-size 10px
//                 color #979797 !important
//                 font-weight 700 !important
//         .control-indicator
//             position relative
//             height 18px
//             width 18px
//             top auto

//             &:after
//                 top 2.5px
//                 left 6px
//                 width 4px
//                 height 8px

//         .control-indicator__mini
//             height 14px
//             width 14px

//             &:after
//                 top 2px
//                 left 4px
//                 width 2px
//                 height 6px

//     .m-b-20
//         margin-bottom 20px

//     .border-none
//         border-bottom none !important

//     .body
//         .modal-control
//             .modal-wrap
//                 margin 0 18px

//                 .modal-blocks
//                     padding-top 20px

//             .modal-control__title
//                 margin 0
//                 font-family MuseoSansCyrl500
//                 font-weight 700
//                 font-size 13px
//                 color #34343e

//             .modal-control__wrap.wrap__wallets
//                 max-height 130px
//                 overflow-y scroll

//             .modal-control__wrap
//                 display flex
//                 justify-content flex-start
//                 flex-wrap wrap

//             .modal-control__block
//                 width 33.3%

//             .modal-line
//                 .wrap-double-input__disabled
//                     background-color #ececec
//                     cursor default

//                     label.label-from,
//                     label.label-to,
//                     .label-сurrency,
//                     .input.input-from,
//                     .input.input-to
//                         color #979797 !important
//                         cursor default

//                 .wrap-double-input
//                     border solid 1px #979797
//                     border-radius 2px
//                     display flex
//                     align-items center
//                     padding-left 8px

//                     label.label-from,
//                     label.label-to
//                         font-family MuseoSansCyrl700
//                         font-size 13px
//                         font-weight bold
//                         line-height 1.08
//                         color #34343e
//                         margin-bottom 0

//                     .input.input-from,
//                     .input.input-to
//                         flex-grow 1
//                         background-color transparent
//                         border none
//                         padding 6px 8px
//                         font-family MuseoSansCyrl700
//                         font-size 12px
//                         font-weight 500
//                         line-height 1.17
//                         color #979797

//                     .input.input-from:focus,
//                     .input.input-to:focus
//                         color #34343e

//                     .label-сurrency
//                         font-family MuseoSansCyrl500
//                         font-size 13px
//                         position absolute

//             .modal-line.modal-line__between
//                 display flex
//                 justify-content space-between

//             .modal-line:not(:last-child), .modal-control__block:not(:last-child)
//                 margin-bottom 10px

//             .modal-input
//                 .input-disabled
//                     cursor default
//                 .title
//                     text-transform none !important
//                 .input::-webkit-input-placeholder
//                     text-decoration none !important
//                     font-family MuseoSansCyrl500
//                 .input::-moz-placeholder
//                     text-decoration none !important
//                     font-family MuseoSansCyrl500
//                 .input:-ms-input-placeholder
//                     text-decoration none !important
//                     font-family MuseoSansCyrl500
//                 .input:-moz-placeholder
//                     text-decoration none !important
//                     font-family MuseoSansCyrl500

//             .disabled-label, .disabled-title
//                 color #979797 !important
//                 cursor default

//             .disabled-label__balance
//                 color #b3b3b3 !important
//                 cursor default

//             .input-label
//                 font-family MuseoSansCyrl500
//                 font-weight 500;
//                 color #34343e

//         .modal-footer
//             display flex
//             justify-content center
//             margin-top 0 !important

//             .btn-yellow__disabled
//                 cursor default
//                 opacity 0.4

//             .buttons
//                 &:first-child
//                     margin-right 12px
//                 .count-transactions
//                     font-weight 700

//     // @media(max-width: 660px)

//     @media (max-width: 425px)
//         .v--modal-overlay
//             & .v--modal-box
//                 & .body
//                     & .modal-control
//                         &.border-none
//                             padding-top 0

//                         & .modal-line
//                             flex-direction column

//                             & .control-checkbox
//                                 margin-top 8px
                        
//                     & .modal-footer
//                         margin-right 42px
//                         margin-left 42px

//         .row-flex
//             flex-direction column

//         .m-b-20
//             margin-bottom 0

//         .body
//             .modal-control
//                 &.border-none
//                     padding-top 0

//                 .modal-control__block
//                     margin-right 10px
//                     width auto

//                 .modal-wrap
//                     margin-right 5px
//                     margin-left 5px

//                     .modal-blocks
//                         padding-top 0

//                         .modal-block
//                             border-bottom 1px solid #d1d1d1
//                             padding-top 18px
//                             padding-bottom 18px

//                     .modal-block:last-child
//                         border-bottom none

//                 .modal-line
//                     width 100%

//                     .wrap-double-input
//                         max-width 200px

//         .col-5, .col-6
//             width 100%

//         .border-none
//             &.modal-control
//                 padding-top 0

//         .vdp-datepicker
//             padding-top 18px
//             padding-bottom 18px

//         .modal-footer
//             display flex
//             flex-direction column

//             & button
//                 margin-right 0
//                 margin-left 0
//                 padding 0

//     @media (max-width: 320px)
//         .v--modal-overlay
//             & .v--modal-box
//                 & .body
//                     .modal-control
//                         .modal-line
//                             .wrap-double-input
//                                 max-width 100%

//                     & .modal-footer
//                         margin-right 20px
//                         margin-left 20px

//                         & button 
//                             margin-bottom 12px

</style>