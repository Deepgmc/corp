<template>
    <div>
        <div v-if="isLoading">Данные загружаются с ЦБ РФ...</div>
        <div v-else>
            <div v-for="currency in currencies" :key="currency.numCode">
                {{currency.name}}: {{currency.nominal}} / {{currency.value}} рублей
            </div>
        </div>
    </div>
</template>

<script>
/**
<Valute ID="R01370">
    <NumCode>417</NumCode>
    <CharCode>KGS</CharCode>
    <Nominal>100</Nominal>
    <Name>Киргизских сомов</Name>
    <Value>72,4723</Value>
</Valute>
 */
import $api from '@/utils/api.js'

export default {
    /*
        подгружаем инфу по валютам с ЦБ РФ
    */
    name: 'currencyInfo',

    data: () => ({
        currencies          : null,
        isLoading           : true,
        currentDateXMLFormat: new Date().toLocaleDateString().replace(/\./g, '/')
    }),

    async mounted() {
        const XMLCurrency = await this.loadCurrency()
        console.log('Loaded XMLCurrency: ', XMLCurrency)
    },

    methods: {
        loadCurrency(){
            return new Promise((resolve, reject) => {
                $api.sendQuery({
                    type      : 'GET',
                    moduleName: 'api',
                    section   : 'common',
                    operation : 'getCBRFCurrency',
                    data      : {
                        forDate: this.currentDateXMLFormat
                    }
                })
                .then((res) => {
                    this.isLoading = false
                    this.currencies = res.data.currencies
                })
                .catch((error) => {
                    console.log('Currency error: ', error);
                })

            })
        }
    }
}
</script>

<style>

</style>