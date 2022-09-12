<template>
    <div class="card mt-2">
        <div class="card-header card-header__colors">
            {{chartCaption}}
        </div>

        <div class="card-body">
            <div v-if="!isLoaded" class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div v-show="isLoaded" class="mainChart" ref="chartdiv"></div>
        </div>
    </div>
</template>

<script>
import am5lang_ru_RU from '@amcharts/amcharts5/locales/ru_RU'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5pie from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'


export default {
    name: 'chartComponent',

    props: {
        data: {
            type    : Array,
            required: true
        },
        chartDataName: {
            type    : String,
            required: true
        },
        chartCaption: {
            type    : String,
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
        type: {
            type    : String,
            required: true
        }
    },

    data() {
        return {
            isLoaded     : false,
            chart        : null
        }
    },

    mounted(){
        let series, legend
        const root = am5.Root.new(this.$refs.chartdiv)

        root.setThemes([am5themes_Animated.new(root)])
        root.locale = am5lang_ru_RU

        const axis = this.getChartAndAxis(root)
        const seriesConfig = this.getSeriesConfig(axis)

        if(this.type === 'xy'){
            series = this.chart.series.push(am5xy.ColumnSeries.new(root, seriesConfig))
            legend = this.chart.children.push(am5.Legend.new(root, {}))
            this.chart.set('cursor', am5xy.XYCursor.new(root, {}))
            legend.data.setAll(this.chart.series.values)
        } else if(this.type === 'pie'){
            series = this.chart.series.push(am5pie.PieSeries.new(root, seriesConfig))
        }

        series.data.setAll(this.data)

        series[this.type === 'pie' ? 'slices' : 'columns'].template.setAll({
            tooltipText: `{category${this.type === 'pie' ? '' : 'X'}}: {value${this.type === 'pie' ? '' : 'Y'}} чел.`
        })

        this.isLoaded = true
    },


    methods: {
        getChartAndAxis(root){
            let xAxis, yAxis
            if(this.type === 'xy'){
                this.chart = root.container.children.push(
                    am5xy.XYChart.new(root, {
                        panY: false,
                        layout: root.verticalLayout
                    })
                )
                yAxis = this.chart.yAxes.push(
                    am5xy.ValueAxis.new(root, {
                        renderer: am5xy.AxisRendererY.new(root, {}),
                    })
                )
                xAxis = this.chart.xAxes.push(
                    am5xy.CategoryAxis.new(root, {
                        renderer: am5xy.AxisRendererX.new(root, {}),
                        categoryField: this.fieldX
                    })
                )
                xAxis.data.setAll(this.data)
            } else if(this.type === 'pie'){
                this.chart = root.container.children.push(
                    am5pie.PieChart.new(root, {})
                )
            }
            return { xAxis: xAxis, yAxis: yAxis }
        },

        getSeriesConfig(axis){
            const seriesConfig = {
                name: this.chartDataName
            }
            if(this.type === 'xy'){
                seriesConfig.xAxis          = axis.xAxis,
                seriesConfig.yAxis          = axis.yAxis,
                seriesConfig.valueYField    = this.fieldY
                seriesConfig.categoryXField = this.fieldX
            } else if(this.type === 'pie'){
                seriesConfig.valueField    = this.fieldY
                seriesConfig.categoryField = this.fieldX
            }
            return seriesConfig
        },
    },

    beforeUnmount() {
        if (this.chart) {
            this.chart.dispose()
        }
    },

}
</script>

<style scoped>
.mainChart {
    width: 100%;
    height: 300px;
}
</style>