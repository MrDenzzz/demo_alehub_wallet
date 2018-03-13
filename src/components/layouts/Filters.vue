<template>
    <div class="filter-panel">

        <label>Price, ALC</label>
        <div class="two-input">
            <label for="price_from" class="label-from">from</label>
            <input
                    id="price_from"
                    type="number"
                    class="input input-from"
                    :placeholder="getMinPriceOffers"
                    @blur="filterPriceFrom"
                    @keydown.enter="filterPriceFrom"
            >
            <label for="price_to" class="label-to">to</label>
            <!-- забирать эти значения не из геттера, а из стейта -->
            <input
                    id="price_to"
                    type="number"
                    class="input input-to"
                    :placeholder="getMaxPriceOffers"
                    @blur="filterPriceTo"
                    @keydown.enter="filterPriceTo"
            >
        </div>

        <label>Type</label>

        <div class="control-group">
            <label class="control control-checkbox" v-for="item in typeOffer">
                {{ item.title }}
                <input
                        type="checkbox"
                        class="type_project_arr"
                        :key="item.key"
                        :value="item.value"
                        @click="filterType"
                >
                <div class="control-indicator"></div>
            </label>
        </div>

        <label>Contractor rating</label>

        <div class="two-input">
            <label for="rating_from" class="label-from">from</label>
            <input
                    id="rating_from"
                    type="number"
                    class="input input-from"
                    :placeholder="getMinRatingOffers"
                    @blur="filterRatingFrom"
                    @keydown.enter="filterRatingFrom"
            >
            <label for="rating_to" class="label-to">to</label>
            <input
                    id="rating_to"
                    type="number"
                    class="input input-to"
                    :placeholder="getMaxRatingOffers"
                    @blur="filterRatingTo"
                    @keydown.enter="filterRatingTo"
            >
        </div>

        <label>Professional area</label>

        <div class="control-group one-col">
            <label class="control control-checkbox" v-for="item in professionalArea">
                {{ item.title }}
                <input
                        type="checkbox"
                        class="professional_area_arr"
                        :value="item.value"
                        @click="filterProfessionalArea"
                >
                <div class="control-indicator"></div>
            </label>
        </div>

        <label>Project duration</label>

        <div class="control-group one-col">
            <div class="project-duration" v-for="item in projectDuration">
                <label class="control control-radio">
                    {{ item.title }}
                    <input
                            type="radio"
                            class="duration_arr"
                            :value="item.value" name="duration"
                            @click="filterProjectDuration"
                            checked="item.checked"
                    >
                    <div class="control-indicator"></div>
                </label>
            </div>
        </div>

        <div class="control-group one-col">
            <label class="control control-checkbox" v-for="item in specialOptions">
                <span class="bold">
                    {{ item.title }}
                </span>
                <input
                        type="checkbox"
                        id="check_premium"
                        value="premium"
                        @click="filterPremium"
                >
                <div class="control-indicator"></div>
            </label>
        </div>

    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        name: "filters",
        data() {
            return {
                checkedTypeOffer: [],
                checkedProfessionalArea: [],
                checkedProjectDuration: [],
                checkedSpecial: [],

                typeOffer: [
                    {
                        id: "aa",
                        title: "Patch",
                        value: "patch",
                        inputType: "checkbox"
                    },
                    {
                        id: "aaa",
                        title: "Full project",
                        value: "full project",
                        inputType: "checkbox"
                    },
                    {
                        id: "aaaa",
                        title: "Script",
                        value: "script",
                        inputType: "checkbox"
                    }
                ],
                professionalArea: [
                    {
                        id: "bb",
                        title: "Chemystry and Biology",
                        value: "Chemystry and Biology",
                        inputType: "checkbox"
                    },
                    {
                        id: "bbb",
                        title: "Information technology, System integration, Internet",
                        value: "Information technology, System integration, Internet",
                        inputType: "checkbox"
                    },
                    {
                        id: "bbbb",
                        title: "Science and Education",
                        value: "Science and Education",
                        inputType: "checkbox"
                    },
                    {
                        id: "bbbbb",
                        title: "Machine learning and Big data",
                        value: "Machine learning and Big data",
                        inputType: "checkbox"
                    },
                    {
                        id: "bbbbbb",
                        title: "Medicine research",
                        value: "Medicine research",
                        inputType: "checkbox"
                    },
                    {
                        id: "bbbbbbb",
                        title: "Media processing",
                        value: "Media processing",
                        inputType: "checkbox"
                    }
                ],
                projectDuration: [
                    {
                        id: "cc",
                        title: "< 1 week",
                        value: 7,
                        inputType: "radio",
                        checked: false
                    },
                    {
                        id: "ccc",
                        title: "1 week - 1 month",
                        value: 30,
                        inputType: "radio",
                        checked: false
                    },
                    {
                        id: "cccc",
                        title: "> 1 month",
                        value: 60,
                        inputType: "radio",
                        checked: false
                    },
                    {
                        id: "ccccc",
                        title: "Doesn't matter",
                        value: 0,
                        inputType: "radio",
                        checked: true
                    }
                ],
                specialOptions: [
                    {
                        id: "d",
                        title: "Only Premium contractors",
                        value: true,
                        inputType: "checkbox"
                    }
                ]
            }
        },
        computed: {
            ...mapGetters([
                "getMaxPriceOffers",
                "getMinPriceOffers",
                "getMaxRatingOffers",
                "getMinRatingOffers",
                "doFilterByPriceFork",
                "doFilterByRatingFork",
                "doFilterByPremium",
                "doFilter"
            ]),
            getMaxPrice: function () {
                return this.$store.state.Offers.maxPrice;
            },
            getMinPrice: function () {
                return this.$store.state.Offers.minPrice;
            },
            getMaxRating: function () {
                return this.$store.state.Offers.maxRating;
            },
            getMinRating: function () {
                return this.$store.state.Offers.minRating;
            },
            getStablishOffersList: function () {
                return this.$store.state.Offers.stablishOffersList;
            },
            getOffersList: function () {
                return this.$store.state.Offers.offersList;
            },
            getPremium: function () {
                return this.$store.state.Offers.premium;
            },
            getTypeProject: function () {
                return this.$store.state.Offers.type;
            },
            getProfessionalArea: function () {
                return this.$store.state.Offers.professionalArea;
            },
            getProjectDuration: function () {
                return this.$store.state.Offers.projectDuration;
            }
        },
        methods: {
            ...mapMutations({
                setPriceFork: 'SET_PRICE_FORK',
                setMinPrice: 'SET_MIN_PRICE',
                setMaxPrice: 'SET_MAX_PRICE',
                setNewOffersList: 'SET_NEW_OFFERS_LIST',
                setStablishOffersList: 'SET_STABLISH_OFFERS_LIST',
                setMaxRating: 'SET_MAX_RATING',
                setMinRating: 'SET_MIN_RATING',
                setTypeProject: 'SET_TYPE_PROJECT',
                setProfessionalArea: 'SET_PROFESSIONAL_AREA',
                setProjectDuration: 'SET_PROJECT_DURATION',
                setPremiumProject: 'SET_PREMIUM_PROJECT'
            }),
            checkOffersList: function () {
                (this.getOffersList.length === 0) ? this.$parent.$emit('notFoundOffersByFilter', true) : this.$parent.$emit('notFoundOffersByFilter', false);
            },
            filterPriceFrom: function () {
                let priceFrom = parseInt(document.getElementById('price_from').value);
                (priceFrom) ? this.makeFilter(this.setMinPrice, priceFrom) : this.makeFilter(this.setMinPrice, this.getMinPriceOffers);
            },
            filterPriceTo: function () {
                let priceTo = parseInt(document.getElementById('price_to').value);
                (priceTo) ? this.makeFilter(this.setMaxPrice, priceTo) : this.makeFilter(this.setMaxPrice, this.getMaxPriceOffers);
            },
            filterRatingFrom: function () {
                let ratingFrom = parseFloat(document.getElementById('rating_from').value);
                (ratingFrom) ? this.makeFilter(this.setMinRating, ratingFrom) : this.makeFilter(this.setMinRating, this.getMinRatingOffers);
            },
            filterRatingTo: function () {
                let ratingTo = parseFloat(document.getElementById('rating_to').value);
                (ratingTo) ? this.makeFilter(this.setMaxRating, ratingTo) : this.makeFilter(this.setMaxRating, this.getMaxRatingOffers);
            },
            makeFilter: function (setStatusProperty, value) {
                this.setNewOffersList(this.getStablishOffersList);
                setStatusProperty(value);
                this.setNewOffersList(this.doFilter);
                this.checkOffersList();
            },
            filterPremium: function () {
                this.setNewOffersList(this.getStablishOffersList);
                let premium = "all";
                if (document.getElementById('check_premium').checked) {
                    premium = document.getElementById('check_premium').value;
                    this.setPremiumProject(premium);
                } else
                    this.setPremiumProject(premium);
                this.setNewOffersList(this.doFilter);
                this.checkOffersList();
            },
            filterType: function () {
                this.setNewOffersList(this.getStablishOffersList);
                this.setTypeProject(["all"]);
                let types = this.getTypeProject;

                for (let i = 0; i < document.getElementsByClassName("type_project_arr").length; i++)
                    if (document.getElementsByClassName("type_project_arr")[i].checked)
                        types.push(document.getElementsByClassName("type_project_arr")[i].value.toLowerCase());

                this.setTypeProject(types);
                this.setNewOffersList(this.doFilter);
                this.checkOffersList();
            },
            filterProfessionalArea: function () {
                this.setNewOffersList(this.getStablishOffersList);
                this.setProfessionalArea(["all"]);
                let areas = this.getProfessionalArea;

                for (let i = 0; i < document.getElementsByClassName("professional_area_arr").length; i++)
                    if (document.getElementsByClassName("professional_area_arr")[i].checked)
                        areas.push(document.getElementsByClassName("professional_area_arr")[i].value);

                this.setProfessionalArea(areas);
                this.setNewOffersList(this.doFilter);
                this.checkOffersList();
            },
            filterProjectDuration: function () {
                this.setNewOffersList(this.getStablishOffersList);
                this.setProjectDuration([0]);
                let duration = this.getProjectDuration;

                for (let i = 0; i < document.getElementsByClassName('duration_arr').length; i++)
                    if (document.getElementsByClassName('duration_arr')[i].checked)
                        duration.push(document.getElementsByClassName('duration_arr')[i].value);

                this.setProjectDuration(duration);
                this.setNewOffersList(this.doFilter);
                this.checkOffersList();
            }

        },
        mounted() {
            this.setMinPrice(this.getMinPriceOffers);
            this.setMaxPrice(this.getMaxPriceOffers);
            this.setMinRating(this.getMinRatingOffers);
            this.setMaxRating(this.getMaxRatingOffers);
            this.setStablishOffersList(this.getOffersList);
        },
        destroyed() {
            this.setNewOffersList(this.getStablishOffersList);
        }
    }
</script>

<style lang="stylus" scoped>
    .project-duration
        width 100%
</style>