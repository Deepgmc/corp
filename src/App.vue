<template>
    <div class="container">

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

export default {
    name: 'App',
    components: {NavComponent}
}
</script>


<style scoped>
.notification{
    margin: 20px 0 0 0;
}
</style>