<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <div class="notifications-panel">
        <div class="action-buttons">
            <div class="left-buttons">
                <button class="buttons btn-default btn-check-all"
                        v-if="isShown"
                        @click="selectAll">
                    <label class="control control-checkbox">
                        <input class="notif-checkbox"
                               type="checkbox"
                               :checked="notifications.length === checkedNotif.length">
                        <div class="control-indicator"></div>
                    </label>
                    {{$t('pages.notifications.selectAll')}}
                </button>
                <button v-else="isShown" class="buttons btn-default"
                        @click="showCheckbox">
                        <p>{{ $t('pages.notifications.edit') }}</p>
                </button>
                <button v-if="isShown" class="buttons btn-default"
                        @click="showCheckbox">
                        <p>{{ $t('modals.deleteWallet.buttons.cancel') }}</p>
                </button>
            </div>
            <!--была кнопка удаления с v-if="isShown" я сделал слой с двумя кнопками-->
            <div>
                <button class="buttons btn-default btn-delete"
                        :disabled="checkedNotif.length === 0"
                        @click="removeCheckedNotif(checkedNotif)">
                    <img width="22"
                         height="22"
                         class="icon"
                         :src="getIcon('bin')">
                </button>
                <!--z-->
                <!-- <button class="buttons btn-default btn-delete"
                        :disabled="checkedNotif.length === 0"
                        v-clipboard:copy="copyNotification()">
                    <img class="icon-copy"
                         width="22"
                         height="22"
                         :src="getIcon('tmp_copy_icon')"/>
                </button> -->
                <!--z-->
            </div>
        </div>
        <div v-for="(notification, notificationIndex) in notifications"
             :key="notificationIndex">
            <panel-heading v-if="check(notificationIndex)"
                           :title="parseDate(notification.date)"
                           :isTop="true"/>
            <div class="notif-panel"
                 :class="{checked: isChecked(notification._id), pointer: isShown}"
                 @click="clickCheckbox($event, notification._id)">
                <label class="control control-checkbox"
                       v-show="isShown">
                    <input type="checkbox"
                           class="notif-checkbox"
                           :id="'checkbox'+notification._id"
                           :value="notification._id"
                           v-model="checkedNotif">
                    <div class="control-indicator"></div>
                </label>
                <div class="panel-heading"
                     :class="{'shift-right': isShown}"
                        :id="'content'+notification._id">
                    <h3 class="title"
                        v-html="parseMarkDown(notification.title)"></h3>
                    <h3 class="datetime">
                        {{ parseDate(notification.date) }} {{ $t('pages.notifications.in') }}
                        <span class="bold">
                            {{ parseTime(notification.date) }}
                        </span>
                    </h3>
                </div>
                <h4 class="subtitle"
                    v-if="notification.isSubtitle">
                    {{ notification.subTitle }}:
                </h4>
                <div class="changed-line"
                     v-if="notification.changes.length"
                     v-for="change in notification.changes"
                     :class="{ 'line-update': change.status === 'updated' }">
                    <span class="icon"
                          v-if="change.status === 'old'">–</span>
                    <span class="icon"
                          v-if="change.status === 'updated'">+</span>
                    <span class="message"
                          v-html="parseMarkDown(change.text)"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PanelHeading from './PanelHeading';
    import Moment from 'moment';

    let md = require("node-markdown").Markdown;

    export default {
        name: 'notifPanel',
        props: {
            notifications: {
                type: [Array, Object],
                required: true
            }
        },
        data() {
            return {
                checkedNotif: [],
                isShown: false
            }
        },
        components: {
            PanelHeading
        },
        computed: {
            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            }
        },
        methods: {
            parseMarkDown: function (text) {
                return md(text);
            },
            selectAll: function (event) {
                if (event.target.className === "control-indicator")
                    return false;
                if (this.checkedNotif.length < this.notifications.length) {
                    this.checkedNotif = [];
                    for (let i = 0; i < this.notifications.length; i++) {
                        this.checkedNotif.push(this.notifications[i]._id);
                    }
                } else {
                    this.checkedNotif = [];
                }
            },
            clickCheckbox: function (event, id) {
                if (event.target.className === "control-indicator")
                    return false;
                if (!this.isShown)
                    return false;
                document.querySelector(`#checkbox${id}`).click();
            },
            check: function (index) {
                if (index === 0)
                    return true;

                if (index === this.notifications.length) {
                    if (Moment(this.notifications[index].date).format('YYYY/MM/DD') === Moment(this.notifications[index + 1].date).format('YYYY/MM/DD'))
                        return false;
                    return true;
                } else {
                    if (Moment(this.notifications[index].date).format('YYYY/MM/DD') === Moment(this.notifications[index - 1].date).format('YYYY/MM/DD'))
                        return false;
                    return true;
                }
            },
            parseDate: function (date) {
                let currentDate = new Date();
                let yesterdayDate = new Date();
                yesterdayDate = yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                if (Moment(date).format('YYYY/MM/DD') === Moment(currentDate).format('YYYY/MM/DD')) {
                    return this.$t('pages.notifications.today');
                }
                if (Moment(date).format('YYYY/MM/DD') === Moment(yesterdayDate).format('YYYY/MM/DD')) {
                    return this.$t('pages.notifications.yesterday');
                }
                return Moment(date).format('MM/DD');
            },
            parseTime: function (date) {
                return Moment(date).format('HH:mm');
            },
            isChecked: function (id) {
                return this.checkedNotif.indexOf(id) !== -1;
            },
            showCheckbox: function () {
                this.isShown = !this.isShown;
                this.checkedNotif = [];
            },
            removeCheckedNotif: function (checkedNotif) {
                this.$parent.$emit('removeCheckedNotif', checkedNotif);
            },
            getIcon: function (name) {
                if (this.selectedTheme === 'dark')
                    return require(`../../assets/img/${name}_dark.svg`);
                else if (this.selectedTheme === 'white')
                    return require(`../../assets/img/${name}_dark.svg`);

                return require(`../../assets/img/${name}.svg`);
            },
            // z
            copyNotification() {
                this.checkedNotif.forEach(function (item, i, arr) {
                    // var a = a + document.guerySelector('#content'+item).textContent;
                    // console.log(a);
                    // return  item;
                });
            }
            // z
        }
    }
</script>

<style lang="stylus" scoped>
    .notifications-panel
        width 100%
    .notif-checkbox
        position absolute

    .shift-right
        padding-left 20px

    .checked
        background-color #f5e9c5

    .control
        margin-bottom 0px

    .pointer
        cursor pointer

    .left-buttons
        display flex

        @media(max-width: 425px)
            .buttons
                &:last-child
                    width 120px

        @media(max-width: 375px)
            flex-direction column
            order 2

            .buttons
                &:last-child
                    width 100%

    .btn-check-all
        width auto
        margin-right 10px
        padding-left 36px
        padding-right 15px
        white-space nowrap

        @media(max-width: 375px)
            margin-right 0
            order 2

        .control-indicator
            top 2px
            left -20px
    p
        margin 0

</style>

