<template>
    <div class="mainChart" ref="chartdiv"></div>
</template>

<script>

import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import am4lang_ru_RU from '@amcharts/amcharts4/lang/ru_RU'
am4core.useTheme(am4themes_animated)

export default {

    name: 'chartXy',

    props: {
        data: {
            type    : Array,
            required: true
        },
        fieldX: {
            type    : String,
            required: true
        },
        fieldY: {
            type    : String,
            required: true
        },
    },

    mounted(){
        const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
        chart.language.locale = am4lang_ru_RU
        chart.data = this.data

        //############# date axis

        const valueXAxis = chart.xAxes.push(new am4charts.DateAxis())
        valueXAxis.dateFormats.setKey('day', 'dd.MM')
        valueXAxis.renderer.minGridDistance = 30



        valueXAxis.renderer.grid.template.strokeWidth = 1

        valueXAxis.renderer.labels.template.fill = am4core.color('#000000')
        valueXAxis.renderer.labels.template.fontSize = 9
        valueXAxis.renderer.ticks.template.disabled = true

        //############# val axis
        const valueYAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueYAxis.title.text = 'Количество нанятых сотрудников'

        //############# series spec
        const series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.dateX = this.fieldX
        series.dataFields.valueY = this.fieldY
        series.name = 'Сотрудники'
        series.columns.template.tooltipText = '{name} - {valueY}\nна {dateX}\n'
        series.columns.template.fill = am4core.color('#CCCCFF')
        series.columns.template.stroke = am4core.color('#CCCCCC')

        //############# legend
        chart.legend = new am4charts.Legend()


        this.chart = chart
    }
}
</script>

<style lang="scss">
    .mainChart {
        width: 100%;
        height: 300px;
    }
</style>