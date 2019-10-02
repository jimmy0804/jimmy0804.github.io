
function init_raderChart() {
    if ($('#raderChart').length) {

        var echartRader = echarts.init(document.getElementById('raderChart'));

        var option = {
            
            tooltip: {},
            legend: {
                data: ['CVSS Score']
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 1,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: 'Firewall', max: 10 },
                    { name: 'Switch', max: 10 },
                    { name: 'Server', max: 10 },
                    { name: 'Host', max: 10 },
                    { name: 'Endpoint', max: 10 }
                ]
            },
            series: [{
                type: 'radar',
                areaStyle: {normal: {}},
                data: [
                    {
                        value: [2.5, 3.5, 7.5, 9.5, 4.0],
                        name: 'Average CVSS Score'
                    }
                ]
            }]
        };

        echartRader.setOption(option);
    }
    return echartRader;
}

function init_lineChart() {
    if ($('#EventslineChart').length) {

        var echartPie = echarts.init(document.getElementById('EventslineChart'));

        var colors = ['#5793f3', '#d14a61', '#675bba'];

        option = {
            color: colors,

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    lineStyle: {
                        color: '#57617B'
                    },
                    label: {
                        backgroundColor: '#6a7985',
                        // formatter: function (params) {
                        //     return 'Incidents ' + params.value
                        //         + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        // }
                    }
                }
            },
            legend: {
                data: ['Events', 'Incidents']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true

            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    boundaryGap: false,
                    data: ["Mar 17'", "Apr 17'", "May 17'", "Jun 17'", "July 17'", "Aug 17'", "Sept 17'", "Oct 17'", "Nov 17'", "Dec 17'", "Jan 18'", "Feb 18'"]
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    }

                }
            ],
            series: [
                {
                    name: 'Incidents',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 5,
                    smooth: true,
                    data: [340, 324, 412, 214, 287, 143, 175, 182, 95, 65, 69, 54]
                },
                {
                    name: 'Events',
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 5,
                    smooth: true,
                    data: [650, 530, 524, 295, 360, 250, 231, 221, 201, 183, 153, 141]
                }
            ]
        };
        echartPie.setOption(option);
    }
    return echartPie;
}

function init_chartss() {
    /* DATA TABLES */
    if ($('#incidentByLevelChart').length) {

        var ctx = document.getElementById("incidentByLevelChart");
        var mybarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["High", "Medium", "Low"],
                datasets: [{
                    label: '# of Incidents',
                    backgroundColor: "#03586A",
                    data: [51, 30, 40]
                }]
            },

            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }
}

function init_pie() {
    if ($('#pieChart11').length) {

        var echartPie = echarts.init(document.getElementById('pieChart11'));

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            visualMap: {
                show: false,
                min: 40,
                max: 900,
                inRange: {
                    colorLightness: [0, 9]
                }
            },
            series: [
                {
                    name: 'Application',
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 335, name: 'https' },
                        { value: 310, name: 'www-http' },
                        { value: 274, name: 'uncategorized' },
                        { value: 235, name: 'NTP' },
                        { value: 400, name: 'hpvirtgrp' }
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#2c343c'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#2c343c'
                            },
                            smooth: 0.2,
                            length: 5,
                            length2: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F6571F',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        echartPie.setOption(option);
    }
    return echartPie;
}



$(document).ready(function () {
    init_chartss();
    var pieChart = init_pie();
    var lineChart = init_lineChart();
    var raderChart = init_raderChart();

    $(window).on('resize', function () {
        if (lineChart != null && lineChart != undefined) {
            lineChart.resize();
            pieChart.resize();
            raderChart.resize();
        }
    });

});

