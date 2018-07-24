<template>
    <div class="offer-filter">
        <form @submit.prevent="filter">
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
                    @click="clear">
                {{ $t('offersFilter.buttons.clear') }}
            </button>

            <button type="submit"
                    class="buttons btn btn-yellow">
                {{ $t('offersFilter.buttons.search') }}
            </button>
        </form>
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
        computed: {

        },
        methods: {
            filter: function () {

            },
            clear: function () {

            }
        },
    }
</script>

<style lang="stylus" scoped>

</style>