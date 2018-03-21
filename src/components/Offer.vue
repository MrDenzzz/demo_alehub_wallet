<template>
    <div class="offer">

        <Navbar
                :title="$t('pages.jobOffer.navbarTitle')"
                :isNavigate="true"
                :isBalance="false"
                :rightMenu="rightMenu"
                :isBack="true"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-9">
                            <div class="offer-page">
                                <div class="heading">
                                    <h1 class="title">{{ getCurrentOffer.title }}</h1>
                                    <div class="save" @click="saveOffer" :class="{'active': isSave }">
                                        <span>Save</span>
                                        <div class="icon"></div>
                                    </div>
                                </div>
                                <p class="subtitle">
                                    {{ getCurrentOffer.wallet }}
                                    <!--<span class="badge">{{ getCurrentOffer.rating }}</span>-->
                                </p>
                                <h3>{{ $t('pages.jobOffer.fields.description') }}:</h3>
                                <p class="description">
                                    {{ getCurrentOffer.desc }}
                                </p>

                                <h3>{{ $t('pages.jobOffer.fields.requirements') }}:</h3>
                                <div class="tags-list">
                                    <div class="tag" v-for="req in this.getCurrentOffer.reqs">
                                        <span>{{ req }}</span>
                                    </div>
                                </div>

                                <h3>{{ $t('pages.jobOffer.fields.deadline.title') }}:</h3>
                                {{ formattedDate }}<span class="muted"> (ends in <b>{{ endsIn }} days</b>)</span>
                            </div>

                            <div class="col-8 marginTop"
                                 v-if="checkContractor && checkApply && !checkSubmit">
                                <div class="list-panel-heading">
                                    <h3>Test cases</h3>
                                </div>

                                <table class="table table-gray table-bordered"
                                       v-if="checkContractor && checkApply && !checkSubmit">
                                    <tbody>
                                    <tr>
                                        <th class="inline">
                                            Upload your solution
                                            <input type="file" id="fileUpload"/>
                                            <div class="uploadfile" id="customButton">
                                                <span>Choose file...</span>
                                            </div>
                                        </th>
                                        <!--<td class="full-btn">-->
                                        <!--<button class="btn btn-yellow btn-play">-->
                                        <!--<img class="play-icon" src="../assets/img/play-ic.svg" alt="">-->
                                        <!--<span>-->
                                        <!--Play all testcase-->
                                        <!--</span>-->
                                        <!--</button>-->
                                        <!--</td>-->
                                    </tr>
                                    <!--<tr class="separator">-->
                                    <!--<td colspan="2">-->
                                    <!--<div class="line"></div>-->
                                    <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                    <!--<th class="inline">-->
                                    <!--<div class="square square-red">-->
                                    <!--<span>01</span>-->
                                    <!--</div>-->
                                    <!--A+B Test-->
                                    <!--</th>-->
                                    <!--<td class="full-btn">-->
                                    <!--<button class="btn btn-default btn-play">-->
                                    <!--<img class="play-icon" src="../assets/img/play-ic.svg" alt="">-->
                                    <!--<span>-->
                                    <!--Play testcase-->
                                    <!--</span>-->
                                    <!--</button>-->
                                    <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr class="separator">-->
                                    <!--<td colspan="2">-->
                                    <!--<div class="line"></div>-->
                                    <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                    <!--<th class="inline">-->
                                    <!--<div class="square square-green">-->
                                    <!--<span>02</span>-->
                                    <!--</div>-->
                                    <!--Message receive Test-->
                                    <!--</th>-->
                                    <!--<td class="full-btn">-->
                                    <!--<button class="btn btn-default btn-play">-->
                                    <!--<img class="play-icon" src="../assets/img/play-ic.svg" alt="">-->
                                    <!--<span>-->
                                    <!--Play testcase-->
                                    <!--</span>-->
                                    <!--</button>-->
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
                                    <!--<span>03</span>-->
                                    <!--</div>-->
                                    <!--Notification broadcast Test-->
                                    <!--</th>-->
                                    <!--<td class="full-btn">-->
                                    <!--<button class="btn btn-default btn-play">-->
                                    <!--<img class="play-icon" src="../assets/img/play-ic.svg" alt="">-->
                                    <!--<span>-->
                                    <!--Play testcase-->
                                    <!--</span>-->
                                    <!--</button>-->
                                    <!--</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>

                            </div>

                            <div class="col-4 marginTop"
                                 v-if="checkContractor && checkApply && !checkSubmit">
                                <div class="list-panel-heading">
                                    <h3>Actions</h3>
                                </div>

                                <action-panel
                                        btnText="Submit"
                                        isSubmit="true"
                                />

                            </div>

                            <div class="col-12 marginTop" v-if="checkAcceptCompletePanel">
                                <div class="list-panel-heading">
                                    <h3>Solution</h3>
                                </div>

                                <table class="table table-gray table-bordered">
                                    <tbody>
                                    <tr>
                                        <th class="inline">
                                            <b>@{{ getContractorInfo.name }}</b>submited solution
                                        </th>
                                        <td class="full-btn">
                                            <button class="btn btn-yellow btn-play">
                                                <span>
                                                    View solution
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                    <!--<tr class="separator">-->
                                    <!--<td colspan="2">-->
                                    <!--<div class="line"></div>-->
                                    <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                    <!--<th class="inline">-->
                                    <!--<div class="square square-green">-->
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
                                    <!--<div class="square square-green">-->
                                    <!--<span>02</span>-->
                                    <!--</div>-->
                                    <!--Message receive Test-->
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
                                    <!--<div class="square square-green">-->
                                    <!--<span>03</span>-->
                                    <!--</div>-->
                                    <!--Notification broadcast Test-->
                                    <!--</th>-->
                                    <!--<td class="full-btn">-->

                                    <!--</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>

                            </div>

                        </div>

                        <div class="col-3">
                            <action-panel
                                    v-if="checkContractor || (getCurrentOffer.contractorId == 0 && !checkOwner)"
                                    btnText="Apply"
                                    actionText="contact employer"
                                    isAction="true"
                                    :price="getCurrentOffer.price"
                                    :wallet="getCurrentOffer.wallet"
                                    text="You will get this amount after completing your work, submiting results to the automatic checking system and passing all the tests."
                                    text-muted='Please note that you will be charged this.formatingReservedBalance ALC as a refundable deposit.'
                                    :apply-offer="getCurrentOffer.apply"
                                    :mailto="getOwnerInfo.email"
                                    :reserved-balance="formatingReservedBalance"
                            />
                            <employer-edit-panel
                                    v-if="checkEditPanel"
                                    :btnText="employerBtnText"
                                    :price="formattingPrice"
                                    :text="employerText"
                                    :offerId="getCurrentOffer.id"
                            />
                            <employer-contact-panel
                                    v-if="checkContactPanel"
                                    :btnText="employerBtnText"
                                    :text="employerText"
                                    :offerId="getCurrentOffer.id"
                                    :to="getOwnerInfo.email"
                                    :contractorName="getCurrentOffer.contractorId !== 0 ? getContractorInfo.name : ''"
                            />
                            <employer-accept-panel
                                    v-if="checkAcceptPanel"
                                    :btnText="employerBtnText"
                                    :text="employerText"
                                    :offerId="getCurrentOffer.id"
                                    :to="getOwnerInfo.email"
                                    :contractorName="getCurrentOffer.contractorId !== 0 ? getContractorInfo.name : ''"
                                    :actionText="'ask for fixes'"
                            />
                            <employer-complete-panel
                                v-if="checkCompletePanel"
                                :contractorName="getCurrentOffer.contractorId !== 0 ? getContractorInfo.name : ''"
                            />
                            <apply-offer
                                    :price="getCurrentOffer.price"
                                    :wallet="getCurrentOffer.wallet"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import ActionPanel from './layouts/ActionPanel';
    import ApplyOffer from './modals/ApplyOffer';
    import ContactContractor from './modals/ContactContractor';
    import moment from 'moment';
    import EmployerEditPanel from './layouts/EmployerEditPanel'
    import EmployerContactPanel from './layouts/EmployerContactPanel'
    import EmployerAcceptPanel from './layouts/EmployerAcceptPanel'
    import EmployerCompletePanel from './layouts/EmployerCompletePanel';

    import {mapMutations} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        name: 'offer',
        components: {
            ActionPanel,
            Navbar,
            ApplyOffer,
            ContactContractor,
            EmployerEditPanel,
            EmployerContactPanel,
            EmployerAcceptPanel,
            EmployerCompletePanel
        },
        data() {
            return {
                isSave: false,
                fileSolution: '',
                rightMenu: {
                    horizontal: false,
                    list: [
                        {
                            type: 'modal',
                            name: 'Apply',
                            target: '/wallet',
                            isHide: false
                        }, {
                            type: 'modal',
                            name: 'Contact employer',
                            target: 'send',
                            isHide: false
                        }, {
                            type: 'modal',
                            name: 'Upload solution',
                            target: 'recive',
                            isHide: false
                        }, {
                            type: 'link',
                            name: 'Play all testcases',
                            target: '',
                            isHide: false
                        }, {
                            type: 'link',
                            name: 'Submit solution',
                            target: '/wallet/trading',
                            isHide: false
                        },
                    ]
                }
            }
        },
        watch: {
            fileSolution: function (item) {
                console.log(item);
            }
        },
        computed: {
            ...mapGetters([
                'getCurrentOffer',
                'getReservedBalance'
            ]),
            formattedDate: function () {
                return moment(this.getCurrentOffer.date).format("D of MMMM, YYYY @ h:mm");
            },
            endsIn: function () {
                let now = moment(),
                    date = moment(this.getCurrentOffer.date);
                return date.diff(now, 'days');
            },

            formattingPrice: function () {
                if (localStorage.getItem('systemLang') === 'eng' || localStorage.getItem('systemLang') === 'china') {
                    let parts = this.getCurrentOffer.price.toString();
                    if (parts.includes('.')) {
                        parts = parts.split('.');
                        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        return parts.join('.');
                    } else
                        return parts.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                if (localStorage.getItem('systemLang') === 'rus') {
                    let parts = this.getCurrentOffer.price.toString().split('.');
                    parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    return parts.join(',') + " " + "ALC";
                }
            },
            formatingReservedBalance: function () {
                if (localStorage.getItem('systemLang') === 'eng' || localStorage.getItem('systemLang') === 'china') {
                    let parts = this.getReservedBalance.toString();
                    if (parts.includes('.')) {
                        parts = parts.split('.');
                        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        return parts.join('.');
                    } else
                        return parts.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                if (localStorage.getItem('systemLang') === 'rus') {
                    let parts = this.getReservedBalance.toString().split('.');
                    parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    return parts.join(',') + " " + "ALC";
                }
            },
            getUserId: function () {
                return localStorage.getItem('id') ? localStorage.getItem('id') : 0;
            },
            getContractorInfo: function () {
                let contractorId = this.getCurrentOffer.contractorId;
                if (contractorId !== 0) {
                    let contractorInfo = this.$store.state.Users.testAccounts.filter(item => {
                        return item.id === contractorId;
                    });
                    return contractorInfo[0];
                }
            },
            getOwnerInfo: function () {
                let ownerId = this.getCurrentOffer.ownerId;
                if (ownerId !== 0) {
                    let ownerInfo = this.$store.state.Users.testAccounts.filter(item => {
                        return item.id === ownerId;
                    });
                    return ownerInfo[0];
                }
            },
            employerBtnText: function () {
                if (!this.getCurrentOffer.apply) return 'Edit';
                if (this.getCurrentOffer.apply && !this.getCurrentOffer.submited) return 'Contact contractor';
                if (this.getCurrentOffer.apply && this.getCurrentOffer.submited) return 'Accept solution';
            },
            employerText: function () {
                if (!this.getCurrentOffer.apply) return 'You will pay this amount to contractor after you approve task completion.';
                if (this.getCurrentOffer.apply && !this.getCurrentOffer.submited) return 'Your task is being executed by';
                if (this.getCurrentOffer.apply && this.getCurrentOffer.submited) return 'have finished task and submitted solution';
            },
            checkEditPanel: function () {
                return this.checkOwner && !this.getCurrentOffer.apply;
            },
            checkContactPanel: function () {
                return this.checkOwner && this.getCurrentOffer.apply && !this.getCurrentOffer.submited;
            },
            checkAcceptPanel: function () {
                return this.checkOwner && this.getCurrentOffer.apply && this.getCurrentOffer.submited && !this.getCurrentOffer.completed;
            },
            checkAcceptCompletePanel: function () {
                return this.checkOwner && this.getCurrentOffer.apply && this.getCurrentOffer.submited;
            },
            checkCompletePanel: function () {
                return this.checkOwner && this.getCurrentOffer.completed;
            },
            checkOwner: function () {
                return parseInt(this.getUserId) === parseInt(this.getCurrentOffer.ownerId);
            },
            checkContractor: function () {
                return parseInt(this.getUserId) === parseInt(this.getCurrentOffer.contractorId);
            },
            checkApply: function () {
                this.newRightMenu();
                return this.getCurrentOffer.apply;
            },
            checkSubmit: function () {
                this.newRightMenu();
                return this.getCurrentOffer.submited;
            },
            checkComplete: function () {
                this.newRightMenu();
                return this.getCurrentOffer.completed;
            }
        },
        methods: {
            ...mapMutations({
                setCurrentOffer: 'SET_CURRENT_OFFER',
                setSavedElementInOffersList: 'SET_SAVED_ELEMENT_IN_OFFERS_LIST',
                unsetSavedElementFromOfferList: 'UNSET_SAVED_ELEMENT_FROM_OFFER_LIST',
                acceptSolution: 'ACCEPT_SOLUTION',
                submitSolution: 'SUBMIT_SOLUTION'
            }),
            checkFillFileUpload: function () {
                if (this.fileSolution === '') {
                    this.$toasted.show("Upload your SOLUTION before SUBMIT", {
                        duration: 10000,
                        type: 'error',
                    });
                    return false;
                }
                return true;
            },
            submitOffer: function () {
                if (this.checkFillFileUpload()) {
                    this.submitSolution({
                        id: this.getCurrentOffer.id,
                        solution: this.fileSolution
                    });
                    this.newRightMenu()
                }
            },
            fileUploader: function () {
                if (this.getCurrentOffer.employerId == this.getUserId || !this.getCurrentOffer.apply)
                    return false;
                document.getElementById("customButton").addEventListener("click", function () {
                    document.getElementById("fileUpload").click();
                });

                var _this = this;

                document.getElementById("fileUpload").addEventListener("change", function () {
                    let fullPath = document.getElementById('fileUpload').value;
                    _this.fileSolution = fullPath;
                    document.getElementById("customButton").innerHTML = fullPath.split(/(\\|\/)/g).pop();
                }, false);
            },
            saveOffer: function () {
                this.isSave = !this.isSave;
                if (this.isSave) {
                    this.$toasted.show("Offer saved", {
                        duration: 5000,
                        type: 'success',
                    });
                    this.setSavedElementInOffersList(this.getCurrentOffer.id);
                } else {
                    this.$toasted.show("Offer was removed from saved", {
                        duration: 5000,
                        type: 'success',
                    });
                    this.unsetSavedElementFromOfferList(this.getCurrentOffer.id);
                }
            },
            newRightMenu: function () {

                if (this.checkOwner) {
                    if (this.checkEditPanel) {
                        this.rightMenu = {
                            list: [{
                                type: 'link',
                                name: 'Edit',
                                link: '/offers/edit/' + this.$route.params.id
                            }]
                        };
                        return false
                    }

                    if (this.checkAcceptPanel) {
                        this.rightMenu = {
                            list: [{
                                type: 'link',
                                name: 'View solution',
                                target: ''
                            }, {
                                type: 'link',
                                name: 'Ask for fixes',
                                mail: this.getContractorInfo.email
                            }, {
                                type: 'link',
                                name: 'Accept solution',
                                target: ''
                            }]
                        };
                        return false
                    }

                    if (this.checkContactPanel) {
                        this.rightMenu = {
                            list: [{
                                type: 'link',
                                name: 'Contact cantractor',
                                mail: this.getContractorInfo.email
                            }]
                        };
                        return false
                    }
                }

                if (this.checkContractor) {
                    if (!this.getCurrentOffer.apply && !this.getCurrentOffer.submited && !this.getCurrentOffer.completed) {
                        this.rightMenu = {
                            list: [{
                                type: 'modal',
                                name: 'Apply',
                                target: 'applyOffer'
                            }, {
                                type: 'link',
                                name: 'Contact employer',
                                mail: this.getOwnerInfo.email
                            }]
                        };
                        return false
                    }

                    if (this.getCurrentOffer.apply && !this.getCurrentOffer.submited && !this.getCurrentOffer.completed) {
                        this.rightMenu = {
                            list: [{
                                type: 'event',
                                name: 'Submit',
                                function: 'submitOffer'
                            }, {
                                type: 'link',
                                name: 'Contact employer',
                                mail: this.getOwnerInfo.email
                            }]
                        };
                        return false
                    }

                    if (this.getCurrentOffer.apply && this.getCurrentOffer.submited && !this.getCurrentOffer.completed) {
                        this.rightMenu = {
                            list: [{
                                type: 'link',
                                name: 'Contact employer',
                                mail: this.getOwnerInfo.email
                            }]
                        }
                    }

                    if (this.getCurrentOffer.apply && this.getCurrentOffer.submited && this.getCurrentOffer.completed) {
                        this.rightMenu = {
                            list: [{
                                type: 'link',
                                name: 'Contact employer',
                                mail: this.getOwnerInfo.email
                            }]
                        }
                    }
                }
            }
        },
        mounted() {
            console.log(this.getCurrentOffer)
            if (document.getElementById('fileUpload'))
                this.fileUploader();

            this.$on("acceptSolution", function (id) {
                this.acceptSolution(id);
            });
            this.$on("submitOffer", function () {
                this.submitOffer();
            });
        },
        created() {
            this.setCurrentOffer(this.$route.params.id);

            if (this.getCurrentOffer.saved) {
                this.isSave = true;
            }

            this.$on('setApplyState', function (applyState) {
                this.getCurrentOffer.apply = applyState;
                this.getCurrentOffer.contractorId = this.getUserId;
                this.$modal.hide('applyOffer');
            });

            this.newRightMenu();
        }
    }
</script>

<style lang="stylus" scoped>
    #fileUpload
        display none

    .table
        tbody
            .uploadfile
                padding 4px 10px 4px 10px;

    .offer-page .heading .active .icon
        background-image url('../assets/img/star-on.svg')

    .play-icon
        width 6px
        height 8px
        margin-right 6px
        margin-bottom 2px

    .btn-play
        display flex
        align-items center
        justify-content center

    .offer-page
        -webkit-touch-callout text
        -webkit-user-select text
        -khtml-user-select text
        -moz-user-select text
        -ms-user-select text
        user-select text

    .table
        .inline
            line-height 2

            b
                font-family MuseoSansCyrl700
                margin-right 4px
</style>