<template>
    <div class="container">

        <div class="row p-4 border-bottom">
            <div class="col-10">
                Header
            </div>
            <div class="col-2">
                <login-info></login-info>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <nav-component />
            </div>
            <div class="col-md-10">
                <main>
                    <router-view></router-view>
                </main>
            </div>
        </div>

        <div class="row">
            <footer>

            </footer>
        </div>

        <!-- global notifications plugin -->
        <notifications class="notification" position="top center" width="400" />

    </div>
</template>


<script>
import NavComponent from '@/components/NavComponent.vue'
import LoginInfo from '@/components/LoginInfo.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'App',
    components: {NavComponent, LoginInfo},

    mounted(){
        if(this.isAuthenticated){
            this.$auth.getUser.call(this)
        }
    },

    computed: {
        ...mapGetters({
            isAuthenticated: 'auth/IS_AUTHENTICATED',
            token          : 'auth/GET_TOKEN'
        })
    },
}
</script>


<style scoped>
.notification{
    margin: 20px 0 0 0;
}
</style>