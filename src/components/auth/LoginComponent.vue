<template>
    <div>
        <hr />
        <div>Login component</div>
        <form @submit.prevent="onLoginSubmit">
        <div>
            <input
                v-model="userName"
                type="text"
                placeholder="user name"
            />
        </div>
        <div>
            <input
                v-model="password"
                type="password"
                placeholder="password"
            />
        </div>
        <div><button>Войти</button></div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginComponent',

    data: () => {
        return {
            userName: "",
            password: "",
        };
    },

    methods: {
        onLoginSubmit(){
            this.$store.dispatch('auth/LOGIN', {userName: this.userName, password: this.password})
        }
    }
};
</script>
