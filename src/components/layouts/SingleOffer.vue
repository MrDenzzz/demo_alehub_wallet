<template>
    <div class="offer">
        <div class="heading">
            <router-link :to="{ path: '/offers/' + item.id }" class="title">{{ item.title }}</router-link>
            <h3 class="count">
                <vue-numeric
                        :value="this.item.price"
                        :separator="correctLangSep"
                        :decimal-separator="correctLangDecSep"
                        :precision="correctValuePrecision"
                        :read-only="true">
                </vue-numeric>{{ " " + "ALC" }}</h3>
        </div>
        <p class="subtitle">
            {{ item.wallet }}
            <!--<span class="badge">{{ item.rating }}</span>-->
        </p>
        <p class="description">{{ item.desc }}</p>
        <div class="footer">
            <div class="tags-list">
                <p>{{ $t('pages.singleOffer.requirements') }}:</p>
                <div class="tag" v-for="req in item.reqs">
                    <span>{{ req }}</span>
                </div>
            </div>
            <div class="timeout">
                {{ $t('pages.singleOffer.deadline') }}
                <span class="bold">{{ formattedDate }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import vueNumeric from 'vue-numeric';

    export default {
        name: "singleOffer",
        props: {
            item: [Object, Array]
        },
        computed: {
            formattedDate: function () {
                let a = moment(this.item.date);
                let endDays = a.diff(moment(), 'days');
                if (endDays !== 1)
                    return endDays + " " + this.$t('pages.singleOffer.parseEnd.more');
                else
                    return endDays + " " + this.$t('pages.singleOffer.parseEnd.single');
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
                if (Number(this.item.price) % 1 !== 0 && Number(this.item.price) === this.item.price)
                    return this.item.price.toString().split('.')[1].toString().length;
                else
                    return 0;
            }
        },
        methods: {

        },
        created() {
            console.log(this.correctValuePrecision);
        }
    }
</script>

<style lang="stylus" scoped>
    .title, .count, .description, .subtitle, .footer
        -webkit-touch-callout text;
        -webkit-user-select text;
        -khtml-user-select text;
        -moz-user-select text;
        -ms-user-select text;
        user-select text;
</style>