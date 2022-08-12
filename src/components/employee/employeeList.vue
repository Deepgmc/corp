<template>
    <list-card
        :items="localEmployees"
        :collapsedSize="collapsedSize"
        :caption="caption"
        filterField="fio"
    >
        <template #listBody="slotParams">
            <div class="row">
                <div class="col-md-3">{{slotParams.item.fio}}</div>
                <div class="col-md-3">{{slotParams.item.departmentName}}</div>
            </div>
        </template>
    </list-card>
</template>

<script>
import ListCard from '@/components/common/ListCard.vue'
import { mapState } from 'vuex'

export default {

    name: 'EmployeeList',

    data(){
        return {
            collapsedSize: 5,
            caption      : 'Наши сотрудники'
        }
    },

    computed: {

        ...mapState('company', {
            company: state => state.company
        }),

        localEmployees() {
            if(!this.company.employees) return []
            return [...this.company.employees].map(emp => {
                /**
                    нужно из company.departments выцепить имя департамента по id
                    и вставить в список employees
                */
                return {
                    ...emp,
                    departmentName: [...this.company.departments].find((department) => {
                        return department.id === emp.departmentId
                    }).name
                }
            })
        }
    },

    components: {ListCard}
}
</script>