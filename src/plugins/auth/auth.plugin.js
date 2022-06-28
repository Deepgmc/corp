const $auth = {
    install(app, options){
        app.config.globalProperties.$auth = {

            login() {
                this.$store.dispatch(`auth/ACTION_${this.isRegistering ? 'REGISTER' : 'LOGIN'}`, {
                    login   : this.login,
                    password: this.password
                })
            },

            logout() {
                this.$store.dispatch(`auth/ACTION_LOGOUT`, {
                    token: this.token,
                    user: this.user
                })
                this.$router.push('/login')
            }

        }
    }
}

export default $auth