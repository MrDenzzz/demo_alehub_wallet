<template>
    <div class="create-offer">
        <navbar :title="$t('pages.newOffer.navbarTitle')"
                :isNavigate="true"
                :isBalance="false"/>

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="form">
                                <input-control :labelValue="'Offer Name'"
                                               :inputId="'offerName'"
                                               :placeholder="'Enter the name of the offer'"
                                               :fullWidth="true"/>
                                <textarea-control :label-value="$t('pages.newOffer.fields.description.label')"
                                                  :textarea-id="'description'"
                                                  :placeholder="'Type your description here'"
                                                  :fullWidth="true"/>
                                <div class="control">
                                    <div class="wrap-input datepick">
                                        <label for="datepicker-from">Start Date</label>
                                        <datepicker id="datepicker-from"
                                                    v-model="newOffer.date.from"
                                                    language="en"
                                                    :placeholder="'Choose start time'"/>
                                    </div>
                                </div>
                                <div class="control">
                                    <div class="wrap-input datepick">
                                        <label for="datepicker-to">Final Date</label>
                                        <datepicker id="datepicker-to"
                                                    v-model="newOffer.date.to"
                                                    language="en"
                                                    :placeholder="'Choose final time'"/>
                                    </div>
                                </div>
                                <input-control :labelValue="'Offer Price'"
                                               :inputId="'offerPrice'"
                                               :placeholder="'Enter the price of the offer'"
                                               :fullWidth="true"
                                               :inputType="'number'"/>
                            </div>
                            <!--@click="toggleAdd"-->
                            <div class="additional"
                                 >
                                Additional
                            </div>
                            <!--:class="{'add-opened': isOpened}"-->
                            <div class="form addition add-opened" style="height: auto;">
                                <div class="outer">

                                    <!--<input-control :labelValue="'Project Name'"-->
                                                   <!--:inputId="'projectName'"-->
                                                   <!--:placeholder="'Enter the name of the project'"-->
                                                   <!--:fullWidth="true"/>-->

                                    <offer-create-input-file-dropzone/>


                                    <offer-create-reqs-input-autocomplete
                                            :title-control="'Autocomplete requirements and requirements'"
                                            :placeholder="'Enter the requirements and requirements'"
                                            :input-id="'autocomplete-reqs-1'"
                                            :requirementsList="requirementsList"/>

                                    <offer-create-input-positions :positions="positionsOfferContractors"/>

                                </div>
                            </div>
                            <button class="buttons btn btn-yellow"
                                    :class="{disabled: !checkFields}"
                                    :disabled="!checkFields"
                                    @click="createNewOffer(newOffer)">
                                Create Offer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import TextareaControl from './layouts/forms/TextareaControl';
    import InputControl from './layouts/forms/InputControl';
    import Datepicker from 'vuejs-datepicker';
    import OfferCreateReqsInputAutocomplete from './layouts/offers/offer-create/OfferCreateReqsInputAutocomplete';
    import OfferCreateInputPositions from './layouts/offers/offer-create/OfferCreateInputPositions';
    import OfferCreateInputFileDropzone from './layouts/offers/offer-create/OfferCreateInputFileDropzone';

    import {mapGetters} from 'vuex';

    export default {
        name: 'CreateOffer',
        components: {
            Navbar,
            TextareaControl,
            InputControl,
            Datepicker,
            OfferCreateReqsInputAutocomplete,
            OfferCreateInputPositions,
            OfferCreateInputFileDropzone,

        },
        data() {
            return {
                newOffer: {
                    name: '13123',
                    description: 'descriptionasdasd  asd asd ',
                    projectName: 'asd as asd asd sad',
                    companyName: '', // take from current user
                    companyLogo: '', // take from current user
                    date: {
                        from: 1527014933000,
                        to: 1537014933000,
                    },
                    requirements: [
                        {
                            id: 1,
                            label: 'JavaScript',
                            title: 'JavaScript'
                        },
                        {
                            id: 2,
                            label: 'Java',
                            title: 'Java'
                        },
                        {
                            id: 3,
                            label: 'C++',
                            title: 'C++'
                        }
                    ],
                    price: 666,
                    positions: []
                },
                isOpened: true
            }
        },
        computed: {
            ...mapGetters(
                [
                    'requirementsList',
                    'positionsOfferContractors'
                ]
            ),
            checkFields: function () {
                return true;
                // return this.newOffer.name && this.newOffer.description && this.newOffer.startDate && this.newOffer.finalDate && this.newOffer.price;
            }
        },
        methods: {
            toggleAdd: function () {
                this.isOpened = !this.isOpened;
                if (this.isOpened) {
                    document.querySelector('.addition').style.height = document.querySelector('.addition .outer').scrollHeight + 'px';
                } else {
                    document.querySelector('.addition').style.height = '0px';
                }
            },
            createNewOffer: function (dataNewOffer) {
                this.$store.dispatch('addNewOffer',
                    dataNewOffer
                ).then(resp => {
                    console.log(resp);
                    this.$router.push('/offers');
                }).catch(err => {

                });
            }
        },
        mounted() {
            this.$on('imitVModel', function (value, id) {
                if (id === 'offerName')
                    this.newOffer.name = value;

                if (id === 'offerPrice')
                    this.newOffer.price = value;

                if (id === 'projectName')
                    this.newOffer.projectName = value;

                if (id === 'reqs')
                    this.newOffer.requirements = value;
            });

            this.$on('receiveDescriptionOffer', function (value) {
                this.newOffer.description = value;
            });

            this.$on('returnCreateOfferRequirements', offerRequirementsList => {
                this.newOffer.requirements = offerRequirementsList;
            });

            this.$on('returnSelectedPositions', selectedPositions => {
                this.newOffer.positions = selectedPositions;
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .form
        margin-bottom 24px

    .control
        .wrap-input
            width 100%

            input
                opacity 1

        &:last-child
            border none !important

    .additional
        text-align center
        text-transform uppercase
        font-size 14px
        font-family MuseoSansCyrl500
        padding 15px
        background-color #f0f0f0
        margin-top -20px
        margin-bottom 4px
        cursor pointer

    .addition
        height 0px
        overflow-y hidden
        padding 0 16px
        transition all 0.3s linear

        &.add-opened
            padding 16px

    .buttons
        &:disabled
            opacity 0.4
            border-radius 2px
            background-color rgba(13, 23, 23, 0.08) !important
</style>

<style lang="stylus">
    .control
        .datepick
            input
                opacity 1 !important
</style>

