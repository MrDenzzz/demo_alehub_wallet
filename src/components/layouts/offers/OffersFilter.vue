<template>
    <transition name="fade-bottom">
        <div class="filter-dialog"
             id="filter-dialog"
             :style="{ 'top': offsetTop }">

            <button type="button" class="close"
                    @click="closeFilterDialog">
                <img src="../../../../static/img/close-dark-ic.svg"
                     alt="close">
            </button>

            <form @submit.prevent="filterOffers">
                <input-name :title="$t('offersFilter.name.title')"
                            :clear="clear"/>

                <input-double-rating :title="$t('offersFilter.rating.title')"
                                     :from="$t('offersFilter.rating.from')"
                                     :to="$t('offersFilter.rating.to')"
                                     :clear="clear"/>

                <input-double-price :title="$t('offersFilter.price.title')"
                                    :from="$t('offersFilter.price.from')"
                                    :to="$t('offersFilter.price.to')"
                                    :clear="clear"/>

                <input-prompt-checkbox-list :title="$t('offersFilter.country.title')"
                                            :list="$t('countries')"
                                            :select-all="$t('offersFilter.country.selectAll')"
                                            :clear="clear"/>

                <input-certification-list :title="$t('offersFilter.certification.title')"
                                          :options="$t('offersFilter.certification.options')"
                                          :clear="clear"/>

                <input-verified-list :title="$t('offersFilter.verified.title')"
                                     :options="$t('offersFilter.verified.options')"
                                     :clear="clear"/>

                <button type="button"
                        class="buttons btn btn-default m-b-10"
                        @click="clearFilterOffers">
                    {{ $t('offersFilter.buttons.clear') }}
                </button>

                <button type="submit"
                        class="buttons btn btn-yellow">
                    {{ $t('offersFilter.buttons.search') }}
                </button>
            </form>
        </div>
    </transition>
</template>

<script>
    import InputName from '../forms/InputFilter';
    import InputDoubleRating from '../forms/InputFilterDoubleRating';
    import InputDoublePrice from '../forms/InputFilterDoublePrice';
    import InputPromptCheckboxList from '../forms/InputFilterPromptCheckboxList';
    import InputCertificationList from '../forms/InputFilterCertificationList';
    import InputVerifiedList from '../forms/InputFilterVerifiedList';

    import {mapGetters} from 'vuex';

    export default {
        name: 'OffersFilter',
        components: {
            InputName,
            InputDoubleRating,
            InputDoublePrice,
            InputPromptCheckboxList,
            InputVerifiedList,
            InputCertificationList
        },
        props: {
            typeId: {
                type: Number,
                required: true
            },
            offsetTop: {
                type: [Boolean, String, Number],
                required: true
            }
        },
        watch: {},
        data() {
            return {
                filter: {
                    name: '',
                    ratingFrom: 0,
                    ratingTo: 0,
                    priceFrom: 0,
                    priceTo: 0,
                    certificatesId: [],
                    verified: []
                },
                clear: false
            }
        },
        computed: {
            ...mapGetters(
                [
                    // 'filters'
                ]
            )
        },
        methods: {
            /**
             * clear all fields of this offers filter
             */
            clearFilterOffers: function () {
                this.clear = true;
            },
            /**
             *
             */
            filterOffers: function () {
                this.$store.dispatch('makeFilterOffers', {
                    typeId: this.typeId,
                    name: this.filter.name,
                    ratingFrom: this.filter.ratingFrom,
                    ratingTo: this.filter.ratingTo,
                    priceFrom: this.filter.priceFrom,
                    priceTo: this.filter.priceTo,
                    certificatesId: this.filter.certificatesId,
                    verified: this.filter.verified
                }).then(resp => {
                    console.log('success filter offers');
                    this.closeFilterDialog();
                }).catch(err => {
                    console.log('error filter offers');
                });
            },
            /**
             *
             */
            closeFilterDialog: function () {
                this.$store.dispatch('closeFilterDialog',
                    this.id
                ).then(resp => {

                }).catch(err => {

                });
            }
        },
        mounted() {
            this.$on('changeName', name => {
                this.filter.name = name;
                // this.filterOffers();
                // this.clear = false;
                // this.dispatchMakeFilter();
            });
            this.$on('changeRatingFrom', ratingFrom => {
                this.filter.ratingFrom = ratingFrom;
                // this.filterOffers();
                // this.clear = false;
                // this.dispatchMakeFilter();
            });
            this.$on('changeRatingTo', ratingTo => {
                this.filter.ratingTo = ratingTo;
                // this.clear = false;
                // this.dispatchMakeFilter();
            });
            this.$on('changePriceFrom', priceFrom => {
                this.filter.priceFrom = priceFrom;
                // this.clear = false;
                // this.dispatchMakeFilter();
            });
            this.$on('changePriceTo', priceTo => {
                this.filter.priceTo = priceTo;
                // this.clear = false;
                // this.dispatchMakeFilter();
            });
            this.$on('changeCertification', certificatesId => {
                this.filter.certificatesId = certificatesId;
                // this.clear = false;
                // this.dispatchMakeFilter();
            });
            this.$on('changeVerified', verified => {
                this.filter.verified = verified;
                this.clear = false;
                // this.dispatchMakeFilter();
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .m-b-10
        margin-bottom 10px

    .fade-bottom-enter-active
        transition all .2s ease-out

    .fade-bottom-leave-active
        transition all .2s ease-in

    .fade-bottom-enter, .fade-bottom-leave-to
        transform translateY(30px)
        opacity 0

    .filter-dialog
        width 208px
        border-radius 4px
        background-color #fafafa
        position absolute
        z-index 5
        box-shadow 0 4px 16px 0 rgba(0, 0, 0, 0.24)
        left 54px
        padding 16px

        .close
            cursor pointer
            position absolute
            right 10px
            top 10px
            background-color transparent
            border none
            width 25px

            &:focus
                outline none

            img
                width 100%

        .btn
            margin-left 0
            width 100%
            height 26px
            padding 0
            font-size 12px
            color #34343e

        .form-group
            display flex
            flex-direction column
            align-items flex-start
            margin-bottom 24px

            label
                margin-bottom 12px
                font-family MuseoSansCyrl500
                font-size 13px
                font-weight bold
                color #34343e

            input
                border-radius 2px
                background-color #f7f7f7
                border solid 1px #979797
                width 100%
                padding 6px 8px
                font-family MuseoSansCyrl500
                font-size 12px
                color #34343e

            .one-line
                width 100%
                display flex
                justify-content space-between
                align-items flex-start

                button
                    padding 0
                    border none
                    background-color transparent
                    font-family MuseoSansCyrl500
                    font-size 12px
                    color #34343e
                    opacity 0.5

            .double-input-block
                display flex

                .double-input
                    position relative
                    display flex
                    align-items center
                    border 1px solid #979797
                    border-radius 2px
                    padding-left 8px

                    label
                        margin-bottom 0
                        font-family MuseoSansCyrl500
                        font-size 12px
                        line-height 1.17
                        color #34343e

                    input
                        border none
                        flex-grow 1
                        background-color transparent
                        font-family MuseoSansCyrl700
                        color #979797
                        font-size 12px

                    &:first-child
                        margin-right 12px

            .form-checkbox.country
                overflow-y scroll
                max-height 140px

            .form-checkbox, .form-radio
                width 100%

                .control
                    input:checked ~ .control-indicator
                        border solid 0.6px #979797

                .control-checkbox, .control-radio
                    display flex
                    align-items center
                    justify-content flex-start
                    width 100%

                    &:last-child
                        margin-bottom 0

                    span
                        padding-left 22px
                        font-family MuseoSansCyrl500
                        font-size 12px
                        color #34343e
                        font-weight 500

                        &.bold-text
                            font-size 13px
                            font-weight bold

                &.country
                    margin-top 12px

                    label
                        span:first-letter
                            color #ab7713
</style>