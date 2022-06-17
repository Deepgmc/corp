<template>
    <div>
        <slot name="filters"
            :filter="filter"
            :onFiltration="(evt) => filter = evt.target.value"
        >
        </slot>

        <slot name="view" :filteredMeetups="filteredMeetups"></slot>
    </div>
</template>
<script>

export default {
    props: {
        meetups: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            filter: '',
        }
    },
    computed: {
        filteredMeetups() {
            return this.meetups.filter((meetup) => {
                return meetup.name.includes(this.filter)
            })
        }
    },
    mounted(){
        // fetch('/auth')
        //     .then((data) => {
        //         return data.json();
        //     })
        //     .then((data) => {
        //         console.log(data.text);
        //     })
        //     .catch((e) => {
        //         console.log('ERR', e);
        //     })
    }
}
</script>