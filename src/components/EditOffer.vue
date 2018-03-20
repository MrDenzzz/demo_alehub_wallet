<template>
    <div class="edit-offer">
        <Navbar
                :title="'Edit offer'"
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
                                    :title="'General info'"
                                    :isTop="true"
                            />

                            <div class="form">

                                <input-control
                                        :label-value="'Offer name'"
                                        :input-id="'offername'"
                                        :input-type="'text'"
                                        :placeholder="'Type offer name here'"
                                        :input-value="getOfferName"
                                />

                                <price-control
                                        :label-title="'Price, ALC'"
                                        :input-id="'price'"
                                        :placeholder="'Set your price'"
                                        :input-value="getOfferPrice"
                                />


                                <textarea-control
                                        :label-value="'Description'"
                                        :textarea-id="'description'"
                                        :placeholder="'Type your description here. You can stylize text only by using *bold* and _italic_ modificators'"
                                        :input-value="getOfferDesc"
                                />

                                <autocomplete-requirements-control
                                        :label-value="'Requirements'"
                                        :placeholder="'Add skills and requirements'"
                                        :autocomplete-id="'autocomplete-req-input'"
                                        :input-value="getOfferReqs"
                                />

                                <datepicker-control
                                        :placeholder-date="'Select Date'"
                                        :placeholder-time="'00:00'"
                                        :input-value="getOfferDate"
                                />

                            </div>

                            <div class="col-8 marginTop">
                                <Panel-heading
                                        :title="'Specification'"
                                        :isTop="true"
                                />

                                <table class="table table-gray table-bordered">
                                    <tbody>
                                    <tr>
                                        <th class="inline">
                                            Upload your specification file here
                                            <input type="file" id="fileUpload"/>
                                            <div class="uploadfile" id="customButton">
                                                <span id="uploadField">Choose file...</span>
                                            </div>
                                        </th>
                                        <td class="full-btn">
                                            <button class="btn btn-yellow btn-upload" @click="uploadFile" :disabled="checkFileSolution">Upload</button>
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
                                        :title="'Actions'"
                                        :isTop="true"
                                />

                                <div class="apply-panel">
                                    <button class="btn btn-yellow btn-block btn-create" @click="updateCurrentOffer">
                                        Update offer
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
        name: "edit-offer",
        components: {
            Navbar,
            PanelHeading,
            InputControl,
            TextareaControl,
            AutocompleteRequirementsControl,
            DatepickerControl,
            ActionPanel,
            PriceControl,
        },
        data() {
            return {
                tmpFileSolution: '',
                offer: {
                    id: null,
                    ownerId: null,
                    contractorId: 0,
                    title: '',
                    wallet: "0xpUbliCk3Y4c0mp4Ny",
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

            ]),
            getCurrentOffer: function () {
                return this.$store.state.Offers.offersList.find(item => {
                    return parseInt(item.id) === parseInt(this.$route.params.id);
                });
            },
            getOfferName: function () {
                return this.getCurrentOffer.title;
            },
            getOfferPrice: function () {
                return this.getCurrentOffer.price;
            },
            getOfferDesc: function () {
                return this.getCurrentOffer.desc;
            },
            getOfferReqs: function () {
                return this.getCurrentOffer.reqs;
            },
            getOfferDate: function () {
                return this.getCurrentOffer.date;
            },
            getOfferFileSolution: function () {
                return this.getCurrentOffer.fileSolution;
            },
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
            checkFileSolution: function () {
                if (this.tmpFileSolution !== '') {
                    return false;
                }
                console.log('не пустой');
                return true;
            }
        },
        methods: {
            ...mapMutations({
                updateOffersList: 'UPDATE_OFFERS_LIST',
                setCurrentOffer: 'SET_CURRENT_OFFER'
            }),
            setOfferId: function () {
                this.offer.id = parseInt(this.$route.params.id);
            },
            setOfferOwnerId: function () {
                this.offer.ownerId = parseInt(this.getUserId);
            },
            setOfferTitle: function (value) {
                this.offer.title = value;
            },
            setUploadFile: function (value) {
                this.offer.fileSolution = value;
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
            setFileNameToButton: function () {
                document.getElementById("uploadField").innerHTML = this.offer.fileSolution.split(/(\\|\/)/g).pop();
            },
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
                    this.$toasted.show("You should click the UPLOAD file button", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
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
            uploadFile: function () {
                if (this.tmpFileSolution !== '') {
                    this.offer.fileSolution = this.tmpFileSolution;
                    this.startNotification("Selected file was successfully uploaded", true);
                }
            },
            updateCurrentOffer: function () {
                if (this.checkFillTitleField() && this.checkFillPriceField() && this.checkFillDescField() &&
                    this.checkFillReqsField() && this.checkFillDateField()) {
                    this.updateOffersList(this.offer);
                    this.setCurrentOffer(this.offer);
                    this.$router.push('/offers/' + this.offer.id);
                }
            }

        },
        created() {
            this.setOfferTitle(this.getOfferName);
            this.setOfferPrice(this.getOfferPrice);
            this.setOfferDesc(this.getOfferDesc);
            this.setOfferReqs(this.getOfferReqs);
            this.setOfferDate(this.getOfferDate);
            this.setUploadFile(this.getOfferFileSolution);
        },
        mounted() {
            this.setOfferId();

            this.setOfferOwnerId();

            this.setOfferRating();

            this.$on('receiveTitleOffer', function (title) {
                this.setOfferTitle(title);
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

            this.fileUploader();

            this.setFileNameToButton();
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