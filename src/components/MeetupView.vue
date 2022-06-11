<template>
    <div>
    <p>{{ meetup.name }}</p>
    <p>{{ meetup.text }}</p>
    </div>
</template>
<script>
export default {
    props: {
        meetup: {
            type: Object,
            required: true
        }
    }
}
</script>
<style>

</style>