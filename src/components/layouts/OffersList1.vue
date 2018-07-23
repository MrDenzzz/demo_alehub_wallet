<template>
    <div>
        <div class="offer-list" v-for="item in currentOfferList">
            <SingleOffer :item="item"/>
        </div>
    </div>
</template>

<script>
    import SingleOffer from './SingleOffer'
    import {mapGetters} from 'vuex'

    export default {
        name: "offers-list",
        components: {
            SingleOffer
        },
        data() {
            return {}
        },
        props: {
            currentListOffers: {
                type: Array,
                required: true
            },
            isSaved: [String, Boolean]
        },
        computed: {
            ...mapGetters([
                'getPartOffersList',
                'getPartOfferSavedList'
            ]),
            // currentPage: function () {
            //     return this.$store.state.offers.currentPage;
            // },
            // countOfferPerPage: function () {
            //     return this.$store.state.offers.countOfferPerPage;
            // },
            // getCurrentSortBy: function () {
            //     return this.$store.state.offers.currentSortBy;
            // },
            // getUserId: function () {
            //     return localStorage.getItem('id');
            // },
            // getOffersList: function () {
            //     return this.$store.state.offers.offersList;
            // },
            // getCurrentPage: function () {
            //     return this.$store.state.offers.currentPage;
            // },
            // getCurrentSavedPage: function () {
            //     return this.$store.state.offers.currentSavedPage  ;
            // },
            // getCurrentOfferPerPage: function () {
            //     return this.$store.state.offers.countOfferPerPage;
            // },
            // getOffersResultList: function () {
            //     return this.getOffersList.filter(item => {
            //         return !item.apply || (item.apply && parseInt(this.getUserId) === parseInt(item.contractorId)) || (item.apply && parseInt(this.getUserId) === parseInt(item.ownerId)) && !item.completed;
            //     }).slice((this.getCurrentPage - 1) * this.getCurrentOfferPerPage, this.getCurrentPage * this.getCurrentOfferPerPage);
            // },
            // getOfferSavedList: function () {
            //     return this.getOffersList.filter(function (el) {
            //         return el.saved;
            //     }).slice((this.getCurrentSavedPage - 1) * this.getCurrentOfferPerPage, this.getCurrentSavedPage * this.getCurrentOfferPerPage);
            // },
            currentOfferList: function () {
                if (!this.isSaved) {
                    // this.$parent.$emit('numOffers', this.getOffersResultList.length);
                    return this.getPartOffersList;
                }
                else {
                    // this.$parent.$emit('numOffers', this.getOfferSavedList.length);
                    console.log(this.currentListOffers);
                    return this.getPartOfferSavedList;
                }
            }
        }
    }
</script>

<style scoped>

</style>