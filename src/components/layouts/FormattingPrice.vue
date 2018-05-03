<template>
    <!--<span>-->
        <vue-numeric
                :separator='correctLangSep()'
                :decimal-separator='correctLangDecSep()'
                :value="value"
                :precision="correctValuePrecision(value)"
                :read-only="true">
        </vue-numeric>
        <!--<span v-if="balance">-->
            <!--ALE-->
        <!--</span>-->
    <!--</span>-->
</template>

<script>
    export default {
        name: 'formatting-price',
        props: {
            value: {
                type: [String, Number],
                required: true
            },
            balance: {
                type: Boolean,
            }
        },
        methods: {
            correctValuePrecision: function (balance) {
                if (Number(balance) % 1 !== 0) {
                    return balance.toString().split('.')[1].toString().length;
                }
                else
                    return 0;
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
        }
    }
</script>
