<template>
    <div>
        Profile layout
        <profile-component></profile-component>
    </div>
</template>


<script>
import ProfileComponent from '@/components/ProfileComponent.vue'

export default {
    name: 'ProfileView',

    components: {ProfileComponent},
}
</script>