<template>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-12">
                    <employee-list></employee-list>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card mt-2">
                        <div class="card-header card-header__colors">
                            Динамика отдела кадров
                        </div>
                        <div class="card-body">
                            <div class="hello" ref="chartdiv"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <add-department></add-department>
                </div>
                <div class="col-md-6">
                    <departments-list></departments-list>
                </div>
            </div>

            <!-- <div class="row">
                <div class="col-md-12">
                    <add-employee></add-employee>
                </div>
            </div> -->
        </div>
    </div>
    <router-view></router-view>
</template>


<script>
import employeeList from '@/components/employee/employeeList.vue'

// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// am4core.useTheme(am4themes_animated);

export default {
    name: 'EmployeeView',

    components: {employeeList},

    mounted(){
        // let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

        // chart.paddingRight = 20;

        // let data = [];
        // let visits = 10;
        // for (let i = 1; i < 100; i++) {
        //     visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        //     data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        // }

        // chart.data = data;

        // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        // dateAxis.renderer.grid.template.location = 0;

        // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.tooltip.disabled = true;
        // valueAxis.renderer.minWidth = 35;

        // let series = chart.series.push(new am4charts.LineSeries());
        // series.dataFields.dateX = "date";
        // series.dataFields.valueY = "value";

        // series.tooltipText = "{valueY.value}";
        // chart.cursor = new am4charts.XYCursor();

        // let scrollbarX = new am4charts.XYChartScrollbar();
        // scrollbarX.series.push(series);
        // chart.scrollbarX = scrollbarX;

        // this.chart = chart;
    },

    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
  }
}
</script>