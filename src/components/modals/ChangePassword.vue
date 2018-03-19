<template>
    <modal name="change-password" height="auto" class="modal-xs">
        <div class="heading">
            <p class="title">Change password</p>
            <i class="close" @click="closeModal"></i>
        </div>
        <div class="body">

            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">Old password</label>
                    <!--<input type="text" class="input" placeholder="password" :value="data.old" @input="setOldPassword">-->
                    <input type="text" class="input" placeholder="password">
                </div>
            </div>

            <div class="modal-control">
                <div class="modal-input">
                    <label class="title">New password</label>
                    <!--<input type="text" class="input" placeholder="password" :value="data.new" @input="setNewPassword">-->
                    <input type="text" class="input" placeholder="password">
                </div>
            </div>

            <div class="modal-control no-bottom">
                <div class="modal-input">
                    <label class="title">Repeat password</label>
                    <!--<input type="text" class="input" placeholder="password" :value="data.repeat" @input="setRepeatPassword">-->
                    <input type="text" class="input" placeholder="password">
                </div>
            </div>

            <div class="modal-btn text-center">
                <button class="btn btn-yellow btn-large">
                    Change
                </button>
            </div>

        </div>
    </modal>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: 'change-password-modal',
        data() {
            return {
                isDropDown: false,
                isActivate: false
            }
        },
        computed: {
            data() {
                // return this.$store.state.Settings.changePassword
            }
        },
        methods: {
            ...mapMutations({
                // setOldPass: 'SET_OLD_PASSWORD',
                // setNewPass: 'SET_NEW_PASSWORD',
                // setRepeatPass: 'SET_REPEAT_PASSWORD'
            }),
            setOldPassword(e) {
                // this.setOldPass(e.target.value);
            },
            setNewPassword(e) {
                // this.setNewPass(e.target.value);
            },
            setRepeatPassword(e) {
                // this.setRepeatPass(e.target.value);
            },
            closeModal() {
                this.$modal.hide('change-password');
            }
        }
    }
</script>

<style lang="stylus">
    @import './modals.scss';

    .modal-input
        input
            width 100%

    .modal-xs
        .v--modal-box
            width 426px !important

    .modal-btn
        .btn-yellow
            .disabled
                opacity 0.3
                border-radius 2px
                background-color #ffd24f

                &:hover
                    cursor default
</style>
