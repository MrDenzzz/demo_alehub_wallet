<template>
    <div class="dialog" v-if="qaIsActive">
        <form>
            <div class="form-group">
                <label for="name">
                    {{ $t('offersFilter.name') }}
                </label>
                <input type="text" id="name">
            </div>
            <div class="form-group">
                <label>
                    {{ $t('offersFilter.rating.title') }}
                </label>
                <div class="double-input-block">
                    <div class="double-input">
                        <label for="from">
                            {{ $t('offersFilter.rating.from') }}
                        </label>
                        <input type="text" id="from">
                    </div>
                    <div class="double-input">
                        <label for="to">
                            {{ $t('offersFilter.rating.to') }}
                        </label>
                        <input type="text" id="to">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="one-line">
                    <label>
                        {{ $t('offersFilter.country') }}
                    </label>
                    <button>
                        {{ $t('offersFilter.selectAll') }}
                    </button>
                </div>
                <input type="text">
                <div class="form-checkbox country">
                    <label class="control control-checkbox">
                        <input type="checkbox">
                        <div class="control-indicator"></div>
                        <span>Afhganistan</span>
                    </label>
                    <label class="control control-checkbox">
                        <input type="checkbox">
                        <div class="control-indicator"></div>
                        <span>Åland Islands</span>
                    </label>
                    <label class="control control-checkbox">
                        <input type="checkbox">
                        <div class="control-indicator"></div>
                        <span>Albania</span>
                    </label>
                    <label class="control control-checkbox">
                        <input type="checkbox">
                        <div class="control-indicator"></div>
                        <span>Algeria</span>
                    </label>
                    <label class="control control-checkbox">
                        <input type="checkbox">
                        <div class="control-indicator"></div>
                        <span>American Samoa</span>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Certification</label>
                <div class="form-checkbox">
                    <label class="control control-checkbox">
                        <input type="checkbox">
                        <div class="control-indicator"></div>
                        <span>ГОСТ</span>
                    </label>
                    <label class="control control-checkbox">
                        <input type="checkbox">
                        <div class="control-indicator"></div>
                        <span>DIN</span>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Verified</label>
                <div class="form-radio">
                    <label class="control control-radio">
                        <input type="radio"
                               name="verified">
                        <div class="control-indicator"></div>
                        <span>Yes</span>
                    </label>
                    <label class="control control-radio">
                        <input type="radio"
                               name="verified">
                        <div class="control-indicator"></div>
                        <span>No</span>
                    </label>
                    <label class="control control-radio">
                        <input type="radio"
                               name="verified">
                        <div class="control-indicator"></div>
                        <span>Doesn't matter</span>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <div class="form-checkbox">
                    <label class="control control-checkbox">
                        <input type="checkbox">
                        <div class="control-indicator"></div>
                        <span class="bold-text">Verified by me</span>
                    </label>
                </div>
            </div>
        </form>
        <button class="buttons btn btn-yellow">Clear</button>
    </div>
</template>

<script>
    export default {
        name: 'OffersFilter',
        data() {
            return {
                qaIsActive: true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .dialog
        width 208px
        border-radius 4px
        background-color #fafafa
        position absolute
        z-index 5
        box-shadow 0 4px 16px 0 rgba(0, 0, 0, 0.24)
        left 54px
        top 158px
        padding 16px

        .btn
            margin-left 0
            width 100%
            height 26px
            padding 0
            font-size 12px
            color #34343e

        .form-group
            display flex
            flex-direction column
            align-items flex-start
            margin-bottom 24px

            label
                margin-bottom 12px
                font-family MuseoSansCyrl500
                font-size 13px
                font-weight bold
                color #34343e

            input
                border-radius 2px
                background-color #f7f7f7
                border solid 1px #979797
                width 100%
                padding 6px 8px
                font-family MuseoSansCyrl500
                font-size 12px
                color #34343e

            .one-line
                width 100%
                display flex
                justify-content space-between
                align-items flex-start

                button
                    padding 0
                    border none
                    background-color transparent
                    font-family MuseoSansCyrl500
                    font-size 12px
                    color #34343e
                    opacity 0.5

            .double-input-block
                display flex

                .double-input
                    position relative
                    display flex
                    align-items center
                    border 1px solid #979797
                    border-radius 2px
                    padding-left 8px

                    label
                        margin-bottom 0
                        font-family MuseoSansCyrl500
                        font-size 12px
                        line-height 1.17
                        color #34343e

                    input
                        border none
                        flex-grow 1
                        background-color transparent
                        font-family MuseoSansCyrl700
                        color #979797
                        font-size 12px

                    &:first-child
                        margin-right 12px

            .form-checkbox, .form-radio
                width 100%

                .control
                    input:checked ~ .control-indicator
                        border solid 0.6px #979797

                .control-checkbox, .control-radio
                    display flex
                    align-items center
                    justify-content flex-start
                    width 100%

                    &:last-child
                        margin-bottom 0

                    span
                        padding-left 22px
                        font-family MuseoSansCyrl500
                        font-size 12px
                        color #34343e
                        font-weight 500

                        &.bold-text
                            font-size 13px
                            font-weight bold

                &.country
                    margin-top 12px

                    label
                        span:first-letter
                            color #ab7713
</style>