<template>
    <div class="offers">
        <Navbar
                :title="$t('pages.jobOffers.navbarTitle')"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container" v-if="offersStatus !== 'success'">
                    <div class="row">
                        <div class="col-12">
                            <div class="spinner">
                                <Spinner/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container" v-else>
                    <div class="row" v-if="notFoundOffers">
                        <div class="col-12">
                            <action-panel
                                :btn-router-text="$t('pages.jobOffers.newOfferBlock.subTitle')"
                                :action-router-text="$t('pages.jobOffers.newOfferBlock.title')"
                                to="/offers/new"
                                is-top-offers-action="true"
                                top-offers-apply-panel="true"
                            />
                        </div>
                    </div>
                    <div class="row" :class="{'flex-row': notFoundOffers}">

                        <div class="col-9" :class="{'flex-col': notFoundOffers}">
                            <div class="row-flex" v-if="!notFoundOffers">
                                <div class="col">
                                    <div class="list-panel-heading list-panel-heading-offers">
                                        <h3>{{ currentNumOffers }} {{ $t('pages.jobOffers.amountOffers') }}</h3>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="list-panel-heading list-panel-count-offers">
                                        <p>{{ $t('pages.jobOffers.filters.onPage') }}: </p>
                                        <Select
                                                :current="10"
                                                :all-options="optionsOffersOnPage"
                                                type-select="offer"
                                                count-offers="true"
                                                :id="'offersonpage'"
                                                @onselect="newSelect"
                                        />
                                    </div>
                                    <div class="list-panel-heading list-panel-offers">
                                        <p>{{ $t('pages.jobOffers.filters.sortBy.title') }}: </p>
                                        <Select
                                                current="CONTRACTOR RATING"
                                                :all-options="optionsSortBy"
                                                type-select="offer"
                                                sort-by="true"
                                                :id="'sortby'"
                                                @onselect="newSelect"
                                        />
                                    </div>
                                    <div class="list-panel-heading list-panel-sort">
                                        <div class="control-arrow-container">
                                            <a
                                                    v-if="getSortPriority === 'decrease'"
                                                    type="button"
                                                    class="control-arrow"
                                                    @click="doIncreasePriority"
                                            >
                                                <img class="arrow down" :src="getIcon('change-arrow-ic')" alt=""/>
                                            </a>
                                            <a
                                                    v-if="getSortPriority === 'increase'"
                                                    type="button"
                                                    class="control-arrow"
                                                    @click="doDecreasePriority"
                                            >
                                                <img class="arrow up" :src="getIcon('change-arrow-ic')" alt="">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <offers-list
                                    v-if="!notFoundOffers && !notFoundOffersByFilter"
                                    :current-list-offers="offersList"
                            />
                            <pagination
                                    v-if="!notFoundOffers && !notFoundOffersByFilter"
                                    :num-offers="currentNumOffers"
                            />
                            <div :class="{'wrap-not-found-offers-by-filter': notFoundOffersByFilter}">
                                <div style="width: 100%;">
                                    <h3
                                            v-if="notFoundOffersByFilter"
                                            class="no-found-offers"
                                    >
                                        {{ $t('pages.jobOffers.notFoundOffersByFilter') }}
                                    </h3>
                                    <action-panel
                                            v-if="!notFoundOffers && getCountOfferPerPage === 50 || notFoundOffersByFilter"
                                            :btnRouterText="$t('pages.jobOffers.newOfferBlock.subTitle')"
                                            :actionRouterText="$t('pages.jobOffers.newOfferBlock.title')"
                                            to="/offers/new"
                                            isBottomOffersAction="true"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="col-3" id="filters_block">
                            <action-panel
                                    v-if="!notFoundOffers"
                                    :btn-router-text="$t('pages.jobOffers.newOfferBlock.subTitle')"
                                    :action-router-text="$t('pages.jobOffers.newOfferBlock.title')"
                                    to="/offers/new"
                                    is-top-offers-action="true"
                            />
                            <!-- filters убрать в компонент фильтра -->

                            <div v-if="offersList.length > 0" class="list-panel-heading mr-t0">
                                <h3>{{ $t('pages.jobOffers.filtersBlock.title') }}</h3>
                            </div>

                            <Filters v-if="offersList.length > 0" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from "./layouts/Navbar";
import OffersList from "./layouts/OffersList";
import Filters from "./layouts/Filters";
import Select from "./layouts/forms/Select";
import Pagination from "./layouts/Pagination";
import ActionPanel from "./layouts/ActionPanel";
import Spinner from "./layouts/Spinner";

import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "offers",
  components: {
    Navbar,
    OffersList,
    Filters,
    Select,
    Pagination,
    ActionPanel,
    Spinner
  },
  data() {
    return {
      isLoader: false,
      notFoundOffers: false,
      notFoundOffersByFilter: false,
      //вынести во vuex?
      optionsOffersOnPage: [10, 20, 50],
      optionsSortBy: ["CONTRACTOR RATING", "PRICE", "END DATE"],
      numOffers: 0,
      rightMenu: {
        horizontal: false,
        list: [
          {
            type: "link",
            name: this.$t("pages.jobOffers.rightMenu.savedOffers"),
            link: "/offers/saved"
          },
          {
            type: "link",
            name: this.$t("pages.jobOffers.rightMenu.createOffer"),
            link: "/offers/new"
          }
        ]
      },
      selectedOffersOnPage: 10,
      selectedSortBy: "CONTRACTOR RATING",
      offersListOpen: []
    };
  },
  computed: {
    ...mapGetters([
        "doSortByRatingIncrease",
        "doSortByRatingDecrease",
        "doSortByPriceIncrease",
        "doSortByPriceDecrease",
        "doSortByEndDateIncrease",
        "doSortByEndDateDecrease",

        "getComputedOfferList",
        "offersStatus",
        "getPartOffersList"
    ]),
    offersList: function() {
      return this.$store.state.Offers.offersList;
    },
    selectedTheme() {
      return this.$store.state.Themes.theme;
    },
    countOfferPerPage: function() {
      return this.$store.state.Offers.countOfferPerPage;
    },
    currentNumOffers: function() {
      return this.getComputedOfferList.length;
    },
    currentSortBy: function() {
      return this.$store.state.Offers.currentSortBy;
    },
    //передавать данные из офферса в офферслист ибо проблемы с отсутствующими-присутствующими офферами
    getOffersList: function() {
      return this.$store.state.Offers.offersList;
    },
    getSortPriority: function() {
      return this.$store.state.Offers.sortPriority;
    },
    getCountOfferPerPage: function() {
      return this.$store.state.Offers.countOfferPerPage;
    }
    // currentOfferList: function () {
    //     if (!this.isSaved) {
    //         // this.$parent.$emit('numOffers', this.getOffersResultList.length);
    //         return this.getPartOffersList;
    //     }
    //     else {
    //         // this.$parent.$emit('numOffers', this.getOfferSavedList.length);
    //         console.log(this.currentListOffers);
    //         return this.getPartOfferSavedList;
    //     }
    // }
  },
  methods: {
    ...mapMutations({
      setNewSelect: "SET_NEW_SELECT",
      setCurrentPage: "SET_CURRENT_PAGE",
      setCurrentPriority: "SET_CURRENT_PRIORITY",
      setSortPriority: "SET_SORT_PRIORITY",
      setCountOffersPerPage: "SET_COUNT_OFFERS_PER_PAGE"
    }),

    doIncreasePriority: function() {
      this.setSortPriority("increase");

      if (this.currentSortBy === "CONTRACTOR RATING")
        return this.doSortByRatingIncrease;

      if (this.currentSortBy === "PRICE") {
        return this.doSortByPriceIncrease;
      }

      if (this.currentSortBy === "END DATE")
        return this.doSortByEndDateIncrease;
    },
    doDecreasePriority: function() {
      this.setSortPriority("decrease");

      if (this.currentSortBy === "CONTRACTOR RATING")
        return this.doSortByRatingDecrease;

      if (this.currentSortBy === "PRICE") {
        return this.doSortByPriceDecrease;
      }

      if (this.currentSortBy === "END DATE")
        return this.doSortByEndDateDecrease;
    },
    newSelect(value, id) {
      if (id === "offersonpage") {
        this.selectedOffersOnPage = value;
      }
      if (id === "sortby") {
        this.selectedSortBy = value;
      }
    },
    imitationLoadPage() {
      this.isLoader = true;
      setTimeout(() => {
        this.isLoader = false;
      }, 750);
    },
    initiateStateOffers: function() {
      this.doSortByRatingDecrease;
      this.setCountOffersPerPage(10);
      this.setCurrentPage(1);

      if (this.offersList.length === 0) {
        this.notFoundOffers = true;
      }
    },
    getOpenOffers() {
      // this.$http.get(`http://localhost:8080/http://127.0.0.1:12348/node/state/offers/list/open`, {
      //     headers : {
      //         'Content-Type' : 'application/json; charset=UTF-8',
      //         'Accept' : 'application/json'
      //     }
      // }).then(response => {
      //     this.offersListOpen = response.body;
      //     console.log('S', response);
      // }, response => {
      //     console.log('E', response);
      // })
    },
    getIcon(name) {
      if (this.selectedTheme === "dark")
        return require(`../assets/img/${name}_dark.svg`);
      else if (this.selectedTheme === "white")
        return require(`../assets/img/${name}.svg`);
      else return require(`../assets/img/${name}.svg`);
    }
  },
  mounted() {
    let currentPage = this.$router;
    // window.addEventListener("scroll", function(e) {
    //   if (currentPage.currentRoute.name !== "Offers") return false;
    //   let filters = document.getElementById("filters_block");
    //   if (window.scrollY >= 40) {
    //     // пофиксить
    //     filters.classList.add("fixed-filters");
    //   } else {
    //     filters.classList.remove("fixed-filters");
    //   }
    // });

    this.imitationLoadPage();

    this.$on("onselect", function(item, id) {
      this.setNewSelect(item);

      if (this.currentSortBy === "CONTRACTOR RATING") {
        if (this.getSortPriority === "increase")
          return this.doSortByRatingIncrease;
        else return this.doSortByRatingDecrease;
      }

      if (this.currentSortBy === "PRICE") {
        if (this.getSortPriority === "increase")
          return this.doSortByPriceIncrease;
        else return this.doSortByPriceDecrease;
      }

      if (this.currentSortBy === "END DATE") {
        if (this.getSortPriority === "increase")
          return this.doSortByEndDateIncrease;
        else return this.doSortByEndDateDecrease;
      }

      if (id === "offersonpage") this.setCurrentPage(1);
    });

    this.$on("changeCurrentPage", function(item) {
      this.setCurrentPage(item);
    });

    this.$on("notFoundOffersByFilter", function(result) {
      this.notFoundOffersByFilter = result;
    });

    this.initiateStateOffers();
  },
  created() {
    this.$store.dispatch('getOffers').then(() => {  });
    this.getOpenOffers();
  }
};
</script>

<style lang="stylus" scoped>
// .list-panel-count-offers, .list-panel-sort {
//     margin-top: 0;
//     margin-bottom: 0;
// }

// .list-panel-offers {
//     margin: 0;
// }

// .list-panel-sort {
//     margin-left: 0;
// }

// .fixed-filters {
//     position: fixed;
//     right: 12px;
//     padding-right: 12px;
//     top: 50px;
// }

// .no-found-offers {
//     font-family: MuseoSansCyrl500;
//     font-size: 16px;
//     font-weight: 500;
//     line-height: 1.25;
//     text-align: center;
//     color: #34343e;
// }

// .flex-row {
//     display: flex;
// }

// .flex-col {
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// .wrap-not-found-offers-by-filter {
//     display: flex;
//     height: 85vh;
//     align-items: center;
//     justify-content: center;
// }
// .spinner {
//     display: flex; 
//     justify-content: center; 
//     align-items: center;
// }

// @media (max-width: 1024px)
//     .main 
//         & .content 
//             padding-left 0

// @media (max-width: 768px) and (min-width: 426px)
//     .list-panel-offers
//         background-color #dedfdf
//         & p
//           display none
//     .list-panel-count-offers
//         background-color #dedfdf
//         & p
//           display none
//     .list-panel-sort
//         margin-left 16px

// @media (max-width: 425px) and (min-width: 321px)
//     .col-3
//         display none
//     .col-9
//         width 100%
//     .list-panel-offers
//         background-color #dedfdf
//         margin-right 5px
//         width 170px
//         & p
//           display none
//     .list-panel-count-offers
//         background-color #dedfdf
//         margin-right 5px
//         margin-left 5px
//         & p
//           display none
//     .list-panel-sort
//         padding 9px
//         width 32px
//     .row-flex
//         justify-content space-between;
// @media (max-width: 320px)
//     .row-flex
//         flex-wrap wrap
//     .col
//         margin-bottom 5px
//     .col-3
//         display none
//     .col-9
//         width 100%
//     .list-panel-offers
//         background-color #dedfdf
//         margin-right 5px
//         width 170px
//     .list-panel-count-offers
//         background-color #dedfdf
//         margin-right 5px
//     .list-panel-sort
//         padding 9px
//         width 32px
</style>