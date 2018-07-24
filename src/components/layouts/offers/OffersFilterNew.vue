<template>
    <div class="offers-filter">
        <h3 class="offers-filter-title">
            Filters
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
    import InputName from '../forms/InputFilter';
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
                clearing: false
            }
        },
        computed: {},
        methods: {
            filter: function () {

            },
            clear: function () {

            }
        },
    }
</script>

<style lang="stylus" scoped>
    .offers-filter

        .offers-filter-title
            font-family MuseoSansCyrl300
            text-transform uppercase
            color #818686
            letter-spacing 0.5px
            line-height 1.29
            font-size 14px
            padding-left 16px

        .offers-filter-container
            padding 16px
            background-color #f0f0f0

            .offers-filter-container-footer
                display flex
                justify-content space-between

                button
                    height 36px
                    padding 2px 10px


</style>