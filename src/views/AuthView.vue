<template>
    <div>
        <login-component></login-component>
    </div>
</template>

<script>

import LoginComponent from '@/components/auth/LoginComponent.vue'

export default {
    name: 'AuthView',
    components: {LoginComponent}
}
</script>