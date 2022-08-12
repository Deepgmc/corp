/**
 * плагин для всяких манипуляций с авторизацией
    можно из любого компонента разлогиниться, например, если что
    или проверить валидность токена
 */
const $auth = {
    install(app, options){
        app.config.globalProperties.$auth = {

            login() {
                this.$store.dispatch(`auth/ACTION_${this.isRegistering ? 'REGISTER' : 'LOGIN'}`, {
                    login   : this.login,
                    name    : this.name,
                    password: this.password
                })
                .then((res) => {
                    if(!this.isRegistering) {
                        //если происходит регистрация (а не авторизация), то перекидывать дальше не нужно
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
            },

            getUser(){
                if(!this.token){
                    console.error('Invalid token')
                }
                this.$store.dispatch(`auth/ACTION_GET_USER`, {
                    token: this.token
                })
            },

        }
    }
}

export default $auth