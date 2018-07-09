<template>
    <div class="offers-datepicker">
        <datepicker id="dateOffersFrom"
                    class="dateOffersFrom"
                    v-if="openedFromDatepicker"
                    v-model="offersDateFrom"
                    :language="$t('modals.pdf.lang')"
                    :inline="inline"/>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: 'OffersDatepicker',
        data() {
            return {
                inline: true,
                openedFromDatepicker: false,
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>