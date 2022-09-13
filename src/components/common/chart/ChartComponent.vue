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

            <div class="row">
                <div class="col-md-12">
                    <slot name="subTableSlot"></slot>
                </div>
            </div>
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
        },
        chartItemClick: {
            type    : Function,
            required: false
        },
    },

    columnSeries: null,

    data() {
        return {
            isLoaded: false,
            chart   : null,
        }
    },

    mounted(){
        const root = am5.Root.new(this.$refs.chartdiv)

        root.setThemes([am5themes_Animated.new(root)])
        this.setLocale(root)

        const axis = this.getChartAndAxis(root)
        const seriesConfig = this.getSeriesConfig(axis)
        const series = this.setSeriesAndLegend(root, seriesConfig)

        this.setSeriesTooltip(series)

        if(this.isColumnsGraph()){
            this.$options.columnSeries.columns.template.events.on('click', this.chartClickHandler)
        } else {
            this.$options.columnSeries.slices._values.forEach(slice => slice.events.on('click', this.chartClickHandler))
        }

        this.isLoaded = true
    },


    methods: {

        setSeriesAndLegend(root, seriesConfig){
            let series, legend
            if(this.isColumnsGraph()){
                this.$options.columnSeries = am5xy.ColumnSeries.new(root, seriesConfig)
                series = this.chart.series.push(this.$options.columnSeries)
                legend = this.chart.children.push(am5.Legend.new(root, {}))
                legend.data.setAll(this.chart.series.values)
                //this.chart.set('cursor', am5xy.XYCursor.new(root, {}))
            } else {
                this.$options.columnSeries = am5pie.PieSeries.new(root, seriesConfig)
                series = this.chart.series.push(this.$options.columnSeries)
                series.labels.template.setAll({
                    text: '{category}',
                    textType: 'circular',
                    inside: true,
                    radius: 20
                })
            }

            series.data.setAll(this.data)
            return series
        },

        setLocale(root){
            root.locale = am5lang_ru_RU
        },

        chartClickHandler(event) {
            console.log('Clicked value: ', event.target.dataItem.dataContext)
            if(this.chartItemClick){
                this.chartItemClick(event.target.dataItem.dataContext)
            }
            // console.log('Clicked on a column', event.target.uid)
            // console.log(event.target.dataItem)
            // console.log(event.target.dataItem.component)
        },

        getChartAndAxis(root){
            let xAxis, yAxis
            if(this.isColumnsGraph()){
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
            } else {
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
            if(this.isColumnsGraph()){
                seriesConfig.xAxis          = axis.xAxis,
                seriesConfig.yAxis          = axis.yAxis,
                seriesConfig.valueYField    = this.fieldY
                seriesConfig.categoryXField = this.fieldX
            } else {
                seriesConfig.valueField    = this.fieldY
                seriesConfig.categoryField = this.fieldX
            }
            return seriesConfig
        },

        setSeriesTooltip(series){
            series[this.chartBarTypeName()].template.setAll({
                tooltipText: `{category${this.isColumnsGraph() ? 'X' : ''}}: {value${this.isColumnsGraph() ? 'Y' : ''}} чел.`
            })
        },

        isColumnsGraph(){
            return this.type === 'xy'
        },

        chartBarTypeName() {
            return this.isColumnsGraph() ? 'columns' : 'slices'
        }
    },

    beforeUnmount() {
        if (this.chart) {
            this.$options.columnSeries[this.chartBarTypeName()].template.events.off('click', this.chartClickHandler)
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