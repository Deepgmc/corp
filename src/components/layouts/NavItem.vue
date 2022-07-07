<template>
    <router-link class="nav-link" :to="link">{{ text }}</router-link>
</template>


<script>
export default {
    props: {
        text: {
            type    : String,
            required: true
        },
        link: {
            type    : String,
            required: true
        }
    }
}
</script>