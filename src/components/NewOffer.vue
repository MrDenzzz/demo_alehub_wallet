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
                                        :input-id="'offername'"
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
                    id: null,
                    ownerId: null,
                    contractorId: 0,
                    title: '',
                    wallet: '',
                    rating: '',
                    desc: '',
                    price: '',
                    reqs: '',
                    type: [
                        "all",
                        "full project"
                    ],
                    professionalArea: [
                        "all",
                        "Information technology, System integration, Internet",
                        "Medicine research"
                    ],
                    date: '',
                    projectDuration: 301,
                    premium: [
                        "all"
                    ],
                    fileSolution: '',
                    saved: false,
                    apply: false,
                    submited: false,
                    completed: false
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
                if (this.offer.desc.length === 0) {
                    this.$toasted.show("Fill out the DESCRIPTION field", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
            },
            checkFillReqsField: function () {
                if (this.offer.reqs.length === 0) {
                    this.$toasted.show("Fill out the REQUIREMENTS field", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
            },
            checkFillDateField: function () {
                if (this.offer.date.length === 0) {
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
                } else if (this.offer.fileSolution === '' && this.tmpFileSolution !== '') {
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
                    this.offer.fileSolution = this.tmpFileSolution;
                    this.$toasted.show("Selected file was successfully uploaded", {
                        duration: 5000,
                        type: 'success',
                    });
                }
            },
            setOfferId: function () {
                this.offer.id = this.$store.state.Offers.offersList[this.$store.state.Offers.offersList.length - 1].id + 1;
            },
            setOfferOwnerId: function () {
                this.offer.ownerId = parseInt(this.getUserId);
            },
            setOfferTitle: function (value) {
                this.offer.title = value;
            },
            setOfferWallerAddress: function (walletAddress) {
                this.offer.wallet = walletAddress;
            },
            setOfferRating: function () {
                this.offer.rating = this.getUserRating;
            },
            setOfferDesc: function (value) {
                this.offer.desc = value;
            },
            setOfferPrice: function (value) {
                this.offer.price = value;
            },
            setOfferReqs: function (value) {
                this.offer.reqs = value;
            },
            setOfferDate: function (value) {
                this.offer.date = value;
            },
            fileUploader: function () {
                document.getElementById("customButton").addEventListener("click", function () {
                    document.getElementById("fileUpload").click();
                });

                var _this  = this;

                document.getElementById("fileUpload").addEventListener("change", function () {
                    let fullPath = document.getElementById('fileUpload').value;
                    if (fullPath !== '') {
                        _this.tmpFileSolution = fullPath;
                        document.getElementById("uploadField").innerHTML = fullPath.split(/(\\|\/)/g).pop();
                    }
                }, false);
            },
            createNewOffer: function () {
                if (this.checkFillTitleField() && this.checkFillPriceField() && this.checkFillDescField() &&
                    this.checkFillReqsField() && this.checkFillDateField() && this.checkFillFileSolution()) {
                    return this.newOfferCreate();
                    this.addNewOffer(this.offer);
                    this.addWalletOffer({id: this.offer.id});
                    this.$router.push('/offers/' + this.offer.id);
                    console.log(this.$store.state.Wallets.currentWallet);
                }
            },
            newOfferCreate () {
                this.$http.post(`http://localhost:8080/http://localhost:12348/wallets/0eCtiP9kDKWaVOBwpJD8Oo1suoVC6JOU4DYg%2fSa6ZXA=/offers/publish`, {
                        "descr": "aGVsbG93b3JsZAo=",
                        "deadline": "2016-07-22T00:00:00Z",
                        "price": Number(this.offer.price),
                        "reqs": { 'RConst': { 'RBool': false } }
                    }, {
                    headers : {
                        'Content-Type' : 'application/json; charset=UTF-8',
                        'Accept' : 'application/json'
                    }
                }).then(response => {
                    //Уведомить юзера, что все ок и это в нотификашки закинуть.
                    this.$router.push('/offers/');
                    //this.offersListOpen = response.body;
                    console.log('S', response);
                }, response => {
                    console.log('E', response);
                });
            }
        },
        mounted() {
            this.fileUploader();

            this.setOfferId();

            this.setOfferOwnerId();

            this.$on('receiveTitleOffer', function (title) {
                this.setOfferTitle(title);
            });

            this.setOfferRating();

            this.setOfferWallerAddress(this.getCurrentWalletAddress);

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


</style>