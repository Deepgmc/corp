export default {
    //плагин, предоставляющий доступ компонентам на получение данных авторизации и проверку авторизации
    install(Vue, options){
       Vue.prototype.$auth = function(html){

       }
    }
 }