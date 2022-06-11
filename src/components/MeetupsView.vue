<template>
    <div>
        <ol>
            <li v-for="meetup in meetups">
                <MeetupView :meetup="meetup"></MeetupView>
            </li>
        </ol>
    </div>
</template>
<script>
import MeetupView from './MeetupView.vue';
export default {
    components: { MeetupView },
    props: {
        meetups: {
            type: Array,
            required: true
        }
    }
}
</script>
<style>

</style>