<template>
    <Line 
    :options="chartOptions"
    :label="label"
    :data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height" />
</template>
  
<script>
import { Line } from "vue-chartjs";
import Chart from "chart.js/auto";

export default {
    name: 'BarChart',
    components: { Line },
    data() {
        return {
            allStat: [],
            year: "",
            month: "",
            sdadsa: [],
            chartData: {
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                datasets: [
                    {
                        backgroundColor: "transparent",
                        borderColor: "#78D4DA",
                        fill: true,
                        borderWidth: 3, 
                        pointBackgroundColor: 'white',
                        pointHoverBackgroundColor: 'white',
                        pointBorderWidth: 1,
                        pointHoverBorderWidth: 10,
                        tension: 0.5,
                        data: [3, 3, 4, 5, 4, 3, 3, 4, 6, 6, 7, 2,]
                    },
                    {
                        backgroundColor: "transparent",
                        borderColor: "#D76BAB",
                        fill: true,
                        borderWidth: 3, 
                        pointBackgroundColor: 'white',
                        pointHoverBackgroundColor: 'white',
                        pointBorderWidth: 1,
                        pointHoverBorderWidth: 10,
                        tension: 0.5,
                        data: [2, 2, 3, 4, 5, 4, 4, 3, 5, 5, 9, 3,],
                    }
                ],
            },
            
                chartOptions: {
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            var index = elements[0].index;
                            console.log(++index);
                        }
                     },
                
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        usePointStyle: false,
                        titleAlign: 'center',
                        padding: 20,
                        titleColor: 'white',
                        titleSpacing: 1,
                        TitleFont: {
                            weight: 'bold'
                        },
                        backgroundColor: '#1D1E40DB',
                        bodyColor: 'white',
                        bodyAlign: 'center',
                        bodyFont: {
                            weight: 'italic'
                        },
                        callbacks: {
                            labelPointStyle: function(context) {
                                return {
                                    rotation: 0
                                };
                            },
                            title: function(tooltipItems) {
                                return 'Points';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        position: 'right',
                    },
                    x: {
                        grid: {
                        display: false // Убираем сетку по горизонтали для оси X
                        }
                    },
                }
                
            },


        }
    },
    methods: {
    },
    props: {
        staticData: {
            type: Array
        },
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        label: {
            type: String,
            default: 'Product',
        },
        width: {
            type: Number,
            default: 400,
        },
        height: {
            type: Number,
            default: 600
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Object,
            default: () => { }
        }
    }

}
</script>