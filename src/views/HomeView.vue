<template>
    <div>
        Home layout
        <home-component></home-component>
    </div>
</template>


<script>

import HomeComponent from '@/components/HomeComponent.vue'

export default {
    name: 'HomeView',

    components: {HomeComponent},
}

</script>