<template>
    <div class="notifications-panel" style="width: 100%;">
        <div class="action-buttons">
            <button class="buttons btn-default" @click="showCheckbox">
                Edit
            </button>
            <button class="buttons btn-default btn-delete" @click="removeCheckedNotif(checkedNotif)">
                <img :src="getIcon('bin')" width="22" height="22" class="icon">
            </button>
        </div>
        <div v-for="(notification, notificationIndex) in notifications" :key="notificationIndex">
            <Panel-heading :title="parseDate(notification.date)" :isTop="true" v-if="check(notificationIndex)"/>
            <div class="notif-panel" :class="{checked: isChecked(notification._id)}">
                <input type="checkbox" :value="notification._id" id="notification._id" v-model="checkedNotif" class="notif-checkbox" v-show="isShown"> 
                <div class="panel-heading" :class="{'shift-right': isShown}">
                    <h3 class="title" v-html="parseMarkDown('dfsdf')"></h3>
                    <h3 class="datetime">{{ parseDate(notification.timestamp) }} {{ $t('pages.notifications.in') }} <span class="bold">{{ parseTime(notification.timestamp) }}</span>
                    </h3>
                </div>
                <h4 class="subtitle" v-if="notification.isSubtitle">{{ notification.subTitle }}:</h4>
                <div class="changed-line" v-for="change in notification.changes" v-if="notification.changes.length"
                     :class="{ 'line-update': change.status == 'updated' }">
                    <span class="icon" v-if="change.status == 'old'">–</span>
                    <span class="icon" v-if="change.status == 'updated'">+</span>
                    <span class="message" v-html="parseMarkDown(change.text)"></span>
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
            selectedTheme() {
                return this.$store.state.Themes.theme;
            }
        },
        methods: {
            parseMarkDown(text) {
                return md(text);
            },
            check(index) {
                if (index === 0) return true;
                if (index === this.notifications.length) {
                    if (Moment(this.notifications[index].date).format('YYYY/MM/DD') === Moment(this.notifications[index + 1].date).format('YYYY/MM/DD')) return false;
                    return true;
                } else {
                    if (Moment(this.notifications[index].date).format('YYYY/MM/DD') === Moment(this.notifications[index - 1].date).format('YYYY/MM/DD')) return false;
                    return true;
                }
            },
            parseDate(date) {
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
            parseTime(date) {
                return Moment(date).format('HH:mm');
            },
            isChecked(id) {
               return this.checkedNotif.indexOf(id) !== -1 ? true : false;
            },
            showCheckbox() {
                this.isShown = !this.isShown;
                this.checkedNotif = [];
            },
            removeCheckedNotif(checkedNotif) {
                console.log('from removeCheckedNotif method');
            },
            getIcon: function (name) {
                if (this.selectedTheme === 'dark')
                    return require(`../../assets/img/${name}_dark.svg`);
                else if (this.selectedTheme === 'white')
                    return require(`../../assets/img/${name}_dark.svg`);

                return require(`../../assets/img/${name}.svg`);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .notif-checkbox
        position absolute

    .shift-right
        padding-left 30px

    .checked
        background-color #f5e9c5
</style>

