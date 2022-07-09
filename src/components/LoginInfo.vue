<template>
    <div>
        <p v-if="isAuthenticated && userInfo">
            {{ userInfo.login }}
        </p>
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
        })
    },
}

</script>