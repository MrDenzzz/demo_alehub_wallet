<template>
    <div :class="{'apply-panel': !isBottomOffersAction, 'offers-apply-panel': btnRouterText, 'top-offers-apply-panel': topOffersApplyPanel}">

        <div>
            <h1 v-if="price">
                <vue-numeric :value="price"
                             :separator="correctLangSep"
                             :precision="correctValuePrecision"
                             :decimal-separator="correctLangDecSep"
                             :read-only="true"></vue-numeric>
                {{ " " + "ALC" }}
            </h1>
            <p class="text"
               v-if="text">
                {{ text }}
            </p>
            <p class="text muted"
               v-if="textMuted">
                {{ textMuted }}
            </p>
        </div>

        <button id="btnApply"
                class="btn btn-yellow btn-create btn-block"
                v-if="btnText && !applyOffer && !isSubmit"
                @click="openModalApply">
            {{ btnText }}
        </button>
        <a id="btnContractor"
           class="btn btn-yellow btn-block btn-create-task"
           v-if="applyOffer"
           :href="'mailto:' + mailto">
            {{ formatedActionText }}
        </a>
        <div v-if="isAction && !applyOffer"
             class="text-center"
             id="actionText">
            <a href="mailto:asdasd@zxc.ru"
               class="link">
                {{ actionText }}
            </a>
        </div>

        <button class="btn btn-yellow btn-block btn-create"
                v-if="isSubmit"
                @click="submitOffer">
            {{ btnText }}
        </button>

        <div class="row-flex"
             v-if="actionRouterText">
            <div class="col">
                <h3 class="title-btn-create-task"
                    :class="{'title-btn-create-task-bottom': isBottomOffersAction}">
                    {{ actionRouterText }}
                </h3>
            </div>
        </div>
        <div class="row-flex row-flex-router"
             v-if="btnRouterText && to">
            <div class="col"
                 :class="{'is-350': isBottomOffersAction || topOffersApplyPanel}">
                <router-link class="btn btn-block btn-create"
                             tag="a"
                             :class="[isBottomOffersAction ? 'btn-grey': 'btn-yellow']"
                             :to="to">
                    {{ btnRouterText }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import vueNumeric from 'vue-numeric';

    export default {
        name: 'ActionPanel',
        components: {
            vueNumeric
        },
        data() {
            return {}
        },
        props: {
            btnText: String,
            actionText: String,
            isAction: [Boolean, String],
            price: Number,
            wallet: String,
            text: String,
            'text-muted': String,
            btnRouterText: String,
            actionRouterText: String,
            to: String,
            isTopOffersAction: [Boolean, String],
            isBottomOffersAction: [Boolean, String],
            applyOffer: [Boolean, String],
            isSubmit: [Boolean, String],
            mailto: String,
            reservedBalance: String,
            topOffersApplyPanel: [Boolean, String]
        },
        computed: {
            formatedActionText: function () {
                return this.actionText.charAt(0).toUpperCase() + this.actionText.slice(1);
            },
            correctLangSep: function () {
                if (localStorage.getItem('systemLang') === 'eng')
                    return ',';
                return 'space';
            },
            correctLangDecSep: function () {
                if (localStorage.getItem('systemLang') === 'eng')
                    return '.';
                return ',';
            },
            correctValuePrecision: function () {
                if (Number(this.price) % 1 !== 0 && Number(this.price) === this.price)
                    return this.price.toString().split('.')[1].toString().length;
                else
                    return 0;
            }
        },
        methods: {
            openModalApply: function () {
                this.$modal.show('applyOffer');
            },
            openModalContact: function () {
                this.$modal.show('contactContractor');
            },
            submitOffer() {
                this.$parent.$emit('submitOffer')
            }
        }
    }
</script>

<style lang="stylus" scoped>

    // .offers-apply-panel
    //     margin-bottom 24px
    //     margin-top 32px

    // .top-offers-apply-panel
    //     margin-top 0
    //     margin-bottom 0

    // .title-btn-create-task-bottom
    //     opacity 0.7

    // .row-flex
    //     display flex
    //     justify-content space-between
    //     margin-bottom 14px
    //     align-items center

    //     .is-350
    //         width 350px !important

    //     .col
    //         display flex
    //         justify-content center
    //         width 100%

    //         .btn-grey
    //             background-color #dedfdf

    // .row-flex-router
    //     margin-bottom 0
    //     justify-content center

    // a.btn
    //     text-decoration none
    //     color inherit
    //     font-family MuseoSansCyrl500

    // .apply-panel
    //     -webkit-touch-callout text
    //     -webkit-user-select text
    //     -khtml-user-select text
    //     -moz-user-select text
    //     -ms-user-select text
    //     user-select text
    //     .btn-block
    //         margin-bottom 0

    //     .link
    //         margin-top 16px

    // @media (max-width: 768px)
    //     .offers-apply-panel
    //         margin-top 50px
</style>