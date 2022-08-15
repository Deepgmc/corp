<template>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <list-item v-for="(item, index) in listData" :key="index">
            <template #itemSlot>

                <router-link :class="[
                        'nav-link',
                        {'text-primary font-weight-bold': item.name === $route.name},
                        {'text-body': item.name !== $route.name}
                    ]" :to="item.link"
                >
                    <div>
                        <img
                            v-if="item.icon"
                            class="nav-icon"
                            :src="require(
                                `@/assets/nav-icons/${item.name}${getIsActiveIcon(item)}-active.png`
                            )"
                        />
                        {{ item.text }}
                    </div>
                </router-link>

                <div v-if="item.subnav.length > 0">
                    <div class="nav__subItems_container">
                        <div v-for="subItem in item.subnav" :key="subItem.name">
                            <router-link :class="[
                                    'nav-link nav__subItem',
                                    {'text-primary font-weight-bold': subItem.name === $route.name},
                                    {'text-body': subItem.name !== $route.name}
                                ]" :to="subItem.link"
                            >
                                <div>{{ subItem.text }}</div>
                            </router-link>
                        </div>
                    </div>
                </div>

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
    },

    methods: {
        getIsActiveIcon(item){
            let activeSuffix = ''
            if(item.name !== this.$route.name){
                if(item.subnav.length > 0){
                    activeSuffix = '-not'
                    item.subnav.some(subItem => {
                        if(subItem.name === this.$route.name){
                            activeSuffix = ''
                            return true
                        }
                    })
                } else {
                    activeSuffix = '-not'
                }
            }
            return activeSuffix
        }
    }
}
</script>