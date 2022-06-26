const $auth = {
    install(app, options){
        app.config.globalProperties.$auth = {
            login() {
                this.$store.dispatch(`auth/ACTION_${this.isRegistering ? 'REGISTER' : 'LOGIN'}`, {
                    login   : this.login,
                    password: this.password
                })
        }
    }

    }
}

export default $auth