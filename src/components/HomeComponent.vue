<template>
    <div class="row">
        <div class="col-2">

            <currency-info :currencies="currencies" :isLoading="isLoading">
                <template #currencyBody="slotProps">
                    <currency-body :currencies="slotProps.previewCurrencies"></currency-body>
                    <div class="card-footer text-muted card__small_text" data-bs-toggle="modal" data-bs-target="#currencyModal">
                        Показать все валюты
                    </div>
                </template>
            </currency-info>

            <div class="modal fade" id="currencyModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-body">
                        <currency-info :currencies="currencies" :isLoading="isLoading">
                            <template #currencyBody="slotProps">
                                <currency-body :currencies="slotProps.currencies"></currency-body>
                            </template>
                        </currency-info>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-6">
            2
        </div>
        <div class="col-4">
            3
        </div>
    </div>
</template>

<script>
import currencyInfo from '@/components/common/currencyInfo'
import currencyBody from '@/components/common/currencyBody'
export default {

    name: 'HomeComponent',

    components: {currencyInfo, currencyBody},

    data(){
        return {
            currencies          : null,
            isLoading           : true,
            currentDateXMLFormat: new Date().toLocaleDateString().replace(/\./g, '/'),
        }
    },

    async mounted() {
        const XMLCurrency = await this.loadCurrency()
        console.log('Loaded XMLCurrency: ', XMLCurrency)
    },

    methods: {
        loadCurrency(){
            return new Promise((resolve) => {
                /**
                чтобы на этапе тестирования не тягать АПИ ЦБ РФ, убрать в реальном проекте
                */
                const c = [{numCode: 933, charCode: 'BYN', nominal: '1', value: 23.4276, name: 'Белорусский рубль'}
                        ,{numCode: 840, charCode: 'USD', nominal: '1', value: 61.3101, name: 'Доллар США'}
                        , {numCode: 978, charCode: 'EUR', nominal: '1', value: 62.5695, name: 'Евро'}
                        , {numCode: 356, charCode: 'INR', nominal: '100', value: 76.7238, name: 'Индийская рупия'}
                        , {numCode: 398, charCode: 'KZT', nominal: '100', value: 12.8055, name: 'Казахстанский тенге'}
                        , {numCode: 417, charCode: 'KGS', nominal: '100', value: 73.7131, name: 'Киргизский сом'}
                        , {numCode: 156, charCode: 'CNY', nominal: '10', value: 92.1636, name: 'Китайский юань'}
                        , {numCode: 498, charCode: 'MDL', nominal: '10', value: 31.7146, name: 'Молдавская лея'}
                        ,{numCode: 972, charCode: 'TJS', nominal: '10', value: 59.7192, name: 'Таджикский сомони'}
                        ,{numCode: 949, charCode: 'TRY', nominal: '10', value: 34.2121, name: 'Турецкая лира'}
                        , {numCode: 860, charCode: 'UZS', nominal: '10000', value: 56.2060, name: 'Узбекская сума'}
                        , {numCode: 756, charCode: 'CHF', nominal: '1', value: 64.3608, name: 'Швейцарский франк'}]
                this.isLoading = false
                this.currencies = c
                resolve(c)

            })
        }
    }
}
</script>