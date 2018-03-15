<template>
    <div class="confirmation-user">
        <Navbar
                :title="'ALE'"
                :isNavigate="false"
                :isBalance="false"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <Spinner v-if="loading" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';
    import Spinner from './layouts/Spinner';
    import sha256 from 'sha256';

    export default {
        name: 'confirmation-email',
        components: {
            Navbar,
            Spinner
        },
        data() {
            return {
                loading: true
            }
        },
        methods: {
        },
        created() {
            this.$http.post(`${this.$host}/users/confirm-reg`, {
                token: this.$route.params.token
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                }
            }).then(response => {
                localStorage.setItem(sha256('2o_H-Zu7nNDcmSaZX'), response.body.user_id);
                localStorage.setItem(sha256('TdlMDdlYzViMmQ5OCI'), response.body.user_token);
                this.loading = false;
                this.$router.push('/');
            }, response => {
                console.log('error', response);
            });
        }
    }
</script>

<style lang="stylus" scoped>
    .d-block
        display block
</style>