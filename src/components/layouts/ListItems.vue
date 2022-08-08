<template>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <list-item v-for="(item, index) in listData" :key="index">
            <template #itemSlot>
                <router-link :class="[
                    'nav-link',
                    {'text-primary font-weight-bold': item.name === $route.name},
                    {'text-body': item.name !== $route.name}
                ]" :to="item.link">{{ item.text }}</router-link>
            </template>
        </list-item>
    </ul>
</template>


<script>
import ListItem from '@/components/layouts/ListItem.vue'
export default {

    components: {ListItem},

    props: {
        listData: {
            type    : Array,
            required: true
        }
    }
}
</script>

<style>
</style>