<template>
    <span>
        <button
            class="btn-sm btn-success"
            :data-bs-toggle="dataModal"
            :data-bs-target="dataTarget"
            :data-button_entity_id="buttonEntityId"
            @click="buttonClick"
        >
            {{buttonText}}
        </button>
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IButtonOptionsType } from '@/types/globalTypes'
import utils from '@/utils/utilFunctions'

export default defineComponent({

    data() {
        return {
            buttonText: 'text',
            buttonEntityId: 0,
            dataModal : '' as string | null,
            dataTarget: '' as string | null,

            buttons: {
                redact: {
                    text      : 'редактировать',
                    type      : 'modal',
                    icon      : '',
                    dataModal : 'modal',
                    dataTarget: `#${this.partition}RedactModal`,
                    link      : '',
                    // action    : null
                } as IButtonOptionsType,
                view: {
                    text      : 'просмотр',
                    type      : 'modal',
                    icon      : '',
                    dataModal : 'modal',
                    dataTarget: `#${this.partition}ViewModal`,
                    link      : '',
                    // action    : null
                } as IButtonOptionsType,
                hire: {
                    text      : 'уволить',
                    type      : 'action',
                    icon      : '',
                    dataModal : null,
                    dataTarget: '',
                    link      : '',
                    // action    : () => {
                    //     console.log('Hire action')
                    // }
                } as IButtonOptionsType
            },
        }
    },

    props: {
        buttonType: {
            type: String, // view, redact, hire
            required: true
        },
        partition: {
            type: String,
            required: true
        },
        itemData: {
            type: Object,
            required: true
        },

    },

    mounted(){
        let thisButton
        if(this.buttonType in this.buttons){
            thisButton = this.buttons[this.buttonType as keyof typeof this.buttons]
        } else {
            utils.showDefaultMessage(this.$store.dispatch, 'save_error', `Ошибка загрузки элемента управления: "button: ${this.buttonType}"`)
            return
        }

        this.buttonText = thisButton.text + `(${this.itemData.id})`
        this.buttonEntityId = this.itemData.id
        this.dataModal = thisButton.dataModal
        this.dataTarget = thisButton.dataTarget

    },

    methods: {
        buttonClick(event: Event){
            let entity
            switch(this.buttonType){
                case 'redact':
                    this.$emit('buttonClick', this.itemData)
                break

                case 'view':
                    this.$emit('buttonClick', this.itemData)
                break

                case 'hire':
                    entity = (event.target as HTMLInputElement).dataset.button_entity_id
                    console.log('Hire click, entity id:', entity)
                break
            }
        }
    }
})
</script>