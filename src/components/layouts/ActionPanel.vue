<template>
    <div :class="{'apply-panel': !isBottomOffersAction, 'offers-apply-panel': btnRouterText, 'top-offers-apply-panel': topOffersApplyPanel}">

        <div>
            <h1 v-if="price"><vue-numeric :value="price" :separator="correctLangSep" :precision="correctValuePrecision"
                                          :decimal-separator="correctLangDecSep" :read-only="true"></vue-numeric>{{ " " + "ALC" }}</h1>
            <p v-if="text" class="text">{{ text }}</p>
            <p v-if="textMuted" class="text muted">{{ textMuted }}</p>
        </div>

        <button v-if="btnText && !applyOffer && !isSubmit" class="btn btn-yellow btn-create btn-block" @click="openModalApply" id="btnApply">{{ btnText }}</button>
        <a v-if="applyOffer" class="btn btn-yellow btn-block btn-create-task" :href="'mailto:' + mailto" id="btnContractor"> {{ formatedActionText }} </a>
        <div v-if="isAction && !applyOffer" class="text-center" id="actionText">
            <a href="mailto:asdasd@zxc.ru" class="link">{{ actionText }}</a>
        </div>

        <button v-if="isSubmit" class="btn btn-yellow btn-block btn-create" @click="submitOffer">
            {{ btnText }}
        </button>

        <div v-if="actionRouterText" class="row-flex">
            <div class="col">
                <h3 class="title-btn-create-task" :class="{'title-btn-create-task-bottom': isBottomOffersAction}">{{ actionRouterText }}</h3>
            </div>
        </div>
        <div v-if="btnRouterText && to" class="row-flex row-flex-router">
            <div class="col" :class="{'is-350': isBottomOffersAction || topOffersApplyPanel}">
                <router-link :to="to" tag="a" class="btn btn-block btn-create" :class="[isBottomOffersAction ? 'btn-grey': 'btn-yellow']">
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

    .offers-apply-panel
        margin-bottom 24px
        margin-top 32px

    .top-offers-apply-panel
        margin-top 0
        margin-bottom 0

    .title-btn-create-task-bottom
        opacity 0.7

    .row-flex
        display flex
        justify-content space-between
        margin-bottom 14px
        align-items center

        .is-350
            width 350px !important

        .col
            display flex
            justify-content center
            width 100%

            .btn-grey
                background-color #dedfdf

    .row-flex-router
        margin-bottom 0
        justify-content center

    a.btn
        text-decoration none
        color inherit
        font-family MuseoSansCyrl500



    .apply-panel
        -webkit-touch-callout text
        -webkit-user-select text
        -khtml-user-select text
        -moz-user-select text
        -ms-user-select text
        user-select text
        .btn-block
            margin-bottom 0

        .link
            margin-top 16px

    @media (max-width: 768px)
        .offers-apply-panel
            margin-top 50px
</style>