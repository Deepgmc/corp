const $auth = {
    install(app, options){
        app.config.globalProperties.$auth = {

            login() {
                this.$store.dispatch(`auth/ACTION_${this.isRegistering ? 'REGISTER' : 'LOGIN'}`, {
                    login   : this.login,
                    password: this.password
                })
                .then((res) => {
                    console.log('login plugin then 2')
                    if(!this.isRegistering) {
                        //если происходит регистрация, то перекидывать дальше не нужно
                        this.$router.push({name: 'home'})
                    }
                })
                .catch(() => {
                    console.log('login plugin catch 2')
                })
            },

            logout() {
                this.$store.dispatch(`auth/ACTION_LOGOUT`, {
                    token: this.token,
                    user: this.user
                })
                .then(() => {
                    this.$router.push({name: 'login'})
                })
            }

        }
    }
}

export default $auth