<template>
    <div class="newoffer">
        <Navbar
                :title="$t('pages.newOffer.navbarTitle')"
                :isNavigate="true"
                :isBalance="false"
                :isBack="true"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">

                            <Panel-heading
                                    :title="$t('pages.newOffer.panelHeadings.generel')"
                                    :isTop="true"
                            />

                            <div class="form">

                                <input-control
                                        :label-value="$t('pages.newOffer.fields.name.label')"
                                        :input-id="'title'"
                                        :input-type="'text'"
                                        :placeholder="$t('pages.newOffer.fields.name.placeholder')"
                                />

                                <price-control
                                        :label-title="$t('pages.newOffer.fields.price.label')"
                                        :input-id="'price'"
                                        :placeholder="$t('pages.newOffer.fields.price.placeholder')"
                                />


                                <textarea-control
                                        :label-value="$t('pages.newOffer.fields.description.label')"
                                        :textarea-id="'description'"
                                        :placeholder="$t('pages.newOffer.fields.description.placeholder')"
                                />

                                <autocomplete-requirements-control
                                        :label-value="$t('pages.newOffer.fields.requirements.label')"
                                        :placeholder="$t('pages.newOffer.fields.requirements.placeholder')"
                                        :autocomplete-id="'autocomplete-req-input'"
                                        :input-value="[]"
                                />

                                <datepicker-control
                                        :placeholder-date="$t('pages.newOffer.fields.deadline.placeholder')"
                                        :placeholder-time="'00:00'"
                                        :is-create="true"
                                />

                            </div>

                            <div class="col-8 marginTop">
                                <Panel-heading
                                        :title="$t('pages.newOffer.panelHeadings.specification')"
                                        :isTop="true"
                                />

                                <table class="table table-gray table-bordered">
                                    <tbody>
                                    <tr>
                                        <th class="inline">
                                            {{ $t('pages.newOffer.fields.uploadFile.title') }}
                                            <input type="file" id="fileUpload"/>
                                            <div class="uploadfile" id="customButton">
                                                <span id="uploadField">{{ $t('pages.newOffer.fields.uploadFile.btntext') }}</span>
                                            </div>
                                        </th>
                                        <td class="full-btn">
                                            <button class="btn btn-yellow btn-upload" @click="uploadFile" :disabled="checkFileSolution">{{ $t('pages.newOffer.buttons.upload') }}</button>
                                        </td>
                                    </tr>
                                    <!--<tr class="separator">-->
                                        <!--<td colspan="2">-->
                                            <!--<div class="line"></div>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                        <!--<th class="inline">-->
                                            <!--<div class="square">-->
                                                <!--<span>01</span>-->
                                            <!--</div>-->
                                            <!--A+B Test-->
                                        <!--</th>-->
                                        <!--<td class="full-btn">-->

                                        <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr class="separator">-->
                                        <!--<td colspan="2">-->
                                            <!--<div class="line"></div>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                        <!--<th class="inline">-->
                                            <!--<div class="square">-->
                                                <!--<span>02</span>-->
                                            <!--</div>-->
                                            <!--Message receive Test-->
                                        <!--</th>-->
                                        <!--<td class="full-btn"></td>-->
                                    <!--</tr>-->
                                    <!--<tr class="separator">-->
                                        <!--<td colspan="2">-->
                                            <!--<div class="line"></div>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                        <!--<th class="inline">-->
                                            <!--<div class="square">-->
                                                <!--<span>03</span>-->
                                            <!--</div>-->
                                            <!--Notification broadcast Test-->
                                        <!--</th>-->
                                        <!--<td class="full-btn"></td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </div>

                            <div class="col-4 marginTop">
                                <Panel-heading
                                        :title="$t('pages.newOffer.panelHeadings.actions')"
                                        :isTop="true"
                                />

                                <div class="apply-panel">
                                    <button class="btn btn-yellow btn-block btn-create" @click="createNewOffer">
                                        {{ $t('pages.newOffer.buttons.publish') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import PanelHeading from './layouts/PanelHeading';
    import InputControl from './layouts/forms/InputControl';
    import TextareaControl from './layouts/forms/TextareaControl';
    import AutocompleteRequirementsControl from './layouts/forms/AutocompleteRequirementsControl';
    import DatepickerControl from './layouts/forms/DatepickerControl';
    import ActionPanel from './layouts/ActionPanel';
    import PriceControl from './layouts/forms/PriceControl';

    import {mapMutations} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        name: 'dashboard',
        components: {
            Navbar,
            PanelHeading,
            InputControl,
            ActionPanel,
            TextareaControl,
            AutocompleteRequirementsControl,
            DatepickerControl,
            PriceControl
        },
        data() {
            return {
                //wallet забирать у текущего user'a
                time: null,
                date: null,
                tmpFileSolution: '',
                offer: {
                    title: '',
                    description: '',
                    price: '',
                    requirements: '',
                    deadline: '',
                    tests: ['poka pusto', 'hz che tut budet'] // file solution?
                }
            }
        },
        computed: {
            ...mapGetters([
                'getCountOfferList'
            ]),
            getUserId: function () {
                return localStorage.getItem('id');
            },
            getCurrentUser: function () {
                return this.$store.state.Users.testAccounts.find(el => {
                    return parseInt(el.id) === parseInt(this.getUserId);
                });
            },
            getUserRating: function () {
                return this.getCurrentUser.rating;
            },
            getCurrentWallet: function () {
                return this.$store.state.Wallets.currentWallet;
            },
            getCurrentWalletAddress: function () {
                return this.getCurrentWallet.address;
            },
            checkFileSolution: function () {
                if (this.tmpFileSolution !== '')
                    return false;
                return true;
            }
        },
        methods: {
            ...mapMutations({
                addNewOffer: 'ADD_NEW_OFFER',
                addWalletOffer: 'ADD_WALLET_OFFER'
            }),
            checkFillTitleField: function () {
                if (this.offer.title.length === 0) {
                    this.$toasted.show("Fill out the OFFER NAME field", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
            },
            checkFillPriceField: function () {
                if (this.offer.price.length === 0) {
                    this.$toasted.show("Fill out the PRICE field", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                if (parseInt(this.offer.price) === 0) {
                    this.$toasted.show("You can not set the value of the PRICE field to zero", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
            },
            checkFillDescField: function () {
                if (this.offer.description.length === 0) {
                    this.$toasted.show("Fill out the DESCRIPTION field", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
            },
            checkFillReqsField: function () {
                if (this.offer.requirements.length === 0) {
                    this.$toasted.show("Fill out the REQUIREMENTS field", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
            },
            checkFillDateField: function () {
                if (this.offer.deadline.length === 0) {
                    this.$toasted.show("Fill out the DEADLINE field", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
            },
            checkFillFileSolution: function () {
                if (this.tmpFileSolution === '') {
                    this.$toasted.show("You should select the UPLOAD file", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                } else if (this.offer.tests === '' && this.tmpFileSolution !== '') {
                    this.$toasted.show("You should click the UPLOAD file buttone", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
            },
            uploadFile: function () {
                if (this.tmpFileSolution !== '') {
                    this.offer.tests = this.tmpFileSolution;
                    this.$toasted.show("Selected file was successfully uploaded", {
                        duration: 5000,
                        type: 'success',
                    });
                }
            },
            setOfferDesc: function (value) {
                this.offer.description = value;
            },
            setOfferPrice: function (value) {
                this.offer.price = value;
            },
            setOfferReqs: function (value) {
                this.offer.requirements = value;
            },
            setOfferDate: function (value) {
                this.offer.deadline = value;
            },
            fileUploader: function () {
                document.getElementById('customButton').addEventListener('click', function () {
                    document.getElementById('fileUpload').click();
                });

                let _this  = this;

                document.getElementById('fileUpload').addEventListener('change', function () {
                    let fullPath = document.getElementById('fileUpload').value;
                    if (fullPath !== '') {
                        _this.tmpFileSolution = fullPath;
                        document.getElementById('uploadField').innerHTML = fullPath.split(/(\\|\/)/g).pop();
                    }
                }, false);
            },
            createNewOffer: function () {
                if (this.checkFillTitleField() && this.checkFillPriceField() && this.checkFillDescField() &&
                    this.checkFillReqsField() && this.checkFillDateField() && this.checkFillFileSolution()) {
                    return this.newOfferCreate();
                    this.$router.push('/offers/' + this.offer.id);
                }
            },
            newOfferCreate () {
                this.$store.dispatch('createOffer', this.offer).then(() => {
                    
                });
            }
        },
        mounted() {
            this.fileUploader();

            this.$on('imitVModel', function (value, id) {
                this.offer[id] = value;
            });

            this.$on('receiveDescriptionOffer', function (desc) {
                this.setOfferDesc(desc);
            });

            this.$on('receiveRequirementsOffer', function (reqs) {
                this.setOfferReqs(reqs);
            });

            this.$on('receiveDateOffer', function (date) {
                this.date = date;
                this.setOfferDate(parseInt(date) + parseInt(this.time));
            });

            this.$on('receiveTimeOffer', function (time) {
                this.time = null;
                this.time = time;
                this.setOfferDate(parseInt(this.date) + parseInt(time));
            });

            this.$on('receivePriceOffer', function (price) {
                this.setOfferPrice(price);
            });

        }
    }
</script>

<style lang="stylus" scoped>
    #fileUpload
        display none

    .d-none
        display none

    .btn-upload
        line-height 1.17

    @media (max-width: 768px)
        .col-8
            width 100%

        .col-4
            width 100%
    @media (max-width: 425px)
        .table
            tbody
                .uploadfile
                    margin 5px 0 0

                tr
                    display flex
                    flex-direction column

                    td
                        padding-top 0

                    th
                        display flex
                        flex-direction column
                        align-items flex-start
        .form
            width 100%

            .control
                .wrap-input
                    padding-left 0

</style>