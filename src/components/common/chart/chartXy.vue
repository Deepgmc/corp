<template>
    <div class="mainChart" ref="chartdiv"></div>
</template>

<script>

import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
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
        chart.data = this.data

        //date axis
        console.log('chart.xAxes', chart.xAxes);
        chart.xAxes.push(new am4charts.DateAxis())

        //val axis
        chart.yAxes.push(new am4charts.ValueAxis())

        //series spec
        const series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.dateX = this.fieldX
        series.dataFields.valueY = this.fieldY

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