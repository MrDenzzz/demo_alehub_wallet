<template>
    <div class="offers-filter">
        <h3 class="offers-filter-title">
            {{ $t('components.offersFilter.title') }}
        </h3>
        <div class="offers-filter-container">
            <form @submit.prevent="filter">
                <input-name :title="$t('offersFilter.name.title')"
                            :clear="clearing"/>

                <input-double-rating :title="$t('offersFilter.rating.title')"
                                     :from="$t('offersFilter.rating.from')"
                                     :to="$t('offersFilter.rating.to')"
                                     :clear="clearing"/>

                <input-double-price :title="$t('offersFilter.price.title')"
                                    :from="$t('offersFilter.price.from')"
                                    :to="$t('offersFilter.price.to')"
                                    :clear="clearing"/>

                <input-prompt-checkbox-list :title="$t('offersFilter.country.title')"
                                            :list="$t('countries')"
                                            :select-all="$t('offersFilter.country.selectAll')"
                                            :clear="clearing"/>

                <input-certification-list :title="$t('offersFilter.certification.title')"
                                          :options="$t('offersFilter.certification.options')"
                                          :clear="clearing"/>

                <input-verified-list :title="$t('offersFilter.verified.title')"
                                     :options="$t('offersFilter.verified.options')"
                                     :clear="clearing"/>

                <div class="offers-filter-container-footer">
                    <button type="button"
                            class="buttons btn btn-default"
                            @click="clear">
                        {{ $t('offersFilter.buttons.clear') }}
                    </button>

                    <button type="submit"
                            class="buttons btn btn-yellow">
                        {{ $t('offersFilter.buttons.search') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import InputName from '../forms/InputNameFilter';
    import InputDoubleRating from '../forms/InputFilterDoubleRating';
    import InputDoublePrice from '../forms/InputFilterDoublePrice';
    import InputPromptCheckboxList from '../forms/InputFilterPromptCheckboxList';
    import InputCertificationList from '../forms/InputFilterCertificationList';
    import InputVerifiedList from '../forms/InputFilterVerifiedList';

    export default {
        name: 'OfferFilterNew',
        components: {
            InputName,
            InputDoubleRating,
            InputDoublePrice,
            InputPromptCheckboxList,
            InputCertificationList,
            InputVerifiedList
        },
        data() {
            return {
                clearing: false,
                filterData: {
                    name: '',
                    ratingFrom: '',
                    ratingTo: '',
                    priceFrom: '',
                    priceTo: ''
                }
            }
        },
        computed: {},
        methods: {
            filter: function () {
                this.$store.dispatch('filterOffersRequest',
                    this.filterData
                ).then(resp => {

                }).catch(err => {

                });
            },
            reset: function () {
                this.$store.dispatch('resetOffersRequest'
                ).then(resp => {

                }).catch(err => {

                });
            },
            clear: function () {
                this.clearing = true;
            }
        },
        mounted() {
            this.$on('changeName', value => {
                this.filterData.name = value.name;
                if (value.reset) {
                    this.clearing = false;
                    this.reset();
                }
            });

            this.$on('changeRatingFrom', ratingFrom => {
                this.filterData.ratingFrom = ratingFrom;
            });

            this.$on('changeRatingTo', ratingTo => {
                this.filterData.ratingTo = ratingTo;
            });

            this.$on('changePriceFrom', priceFrom => {
                this.filterData.priceFrom = priceFrom;
            });

            this.$on('changePriceTo', priceTo => {
                this.filterData.priceTo = priceTo;
            });
        }
    }
</script>

<style lang="stylus" scoped>
    $title-m-t = 24px
    $title-p-l = 16px
    $title-f-s = 14px
    $title-letter-s = 0.5px
    $title-line-h = 1.29
    $title-color = #818686

    $container-p = 16px
    $container-background = #f0f0f0

    .offers-filter
        .offers-filter-title
            font-family MuseoSansCyrl300
            text-transform uppercase
            color $title-color
            letter-spacing $title-letter-s
            line-height $title-line-h
            font-size $title-f-s
            margin-top $title-m-t
            padding-left $title-p-l

        .offers-filter-container
            padding $container-p
            background-color $container-background

            .offers-filter-container-footer
                display flex
                justify-content space-between

                button
                    height 36px
                    padding 2px 10px


</style>