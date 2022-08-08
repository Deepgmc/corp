<template>
    <div class="card mt-2">

        <div class="card-header card-header__colors">
            Наши сотрудники
        </div>

        <list
            :items="localEmployees"
            :collapsedSize="collapsedSize"
        >
            <template #itemSlot="slotParams">
                <div class="row">
                    <div class="col-md-1">{{slotParams.index + 1}}</div>
                    <div class="col-md-3">{{slotParams.item.fio}}</div>
                    <div class="col-md-3">{{slotParams.item.departmentName}}</div>
                </div>
            </template>
        </list>

    </div>
</template>

<script>
import List from '@/components/common/List.vue'
import { mapState } from 'vuex'

export default {

    name: 'EmployeeList',

    data(){
        return {
            collapsedSize: 10
        }
    },

    computed: {

        ...mapState('company', {
            company: state => state.company
        }),

        localEmployees() {
            return [...this.company.employees].map(emp => {
                return {
                    ...emp,
                    departmentName: [...this.company.departments].find((department) => {
                        return department.id === emp.departmentId
                    }).name
                }
            })
        }
    },

    methods: {

    },

    components: {List}
}
</script>