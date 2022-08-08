<template>
    <div>
        <div v-if="isAuthenticated && userInfo" class="text-start">
            <div>{{ userInfo.login }}</div>
            <div v-if="isCompanyLoaded" class="subText">{{ userCompany.name }}</div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    name: 'LoginInfo',

    components: {},

    computed: {
        ...mapGetters({
            isAuthenticated: 'auth/IS_AUTHENTICATED',
            userInfo       : 'auth/GET_USER',
            userCompany    : 'company/GET_USER_COMPANY',
            isCompanyLoaded: 'company/GET_IS_LOADED',
        })
    },
}

</script>

<style lang="scss">
    .subText{
        color    : $sub-text-color;
        font-size: $sub-text-size;
    }
</style>