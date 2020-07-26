<template>
    <ViewContainer>
        <template v-slot:sidebar><MonitoringMenu /></template>
        <section class="monitoring">
            <LineChart
                v-if="data.cpu.loaded"
                :chartdata="data.cpu.chartData"
                :options="data.cpu.options"
                :height="100"
            />
            <LineChart
                v-if="data.ram.loaded"
                :chartdata="data.ram.chartData"
                :options="data.ram.options"
                :height="100"
            />
            <LineChart
                v-if="data.temperature.loaded"
                :chartdata="data.temperature.chartData"
                :options="data.temperature.options"
                :height="100"
            /></section
    ></ViewContainer>
</template>

<script>
import axios from "axios";
import View from "@/mixins/View";
import MonitoringMenu from "@/components/MonitoringMenu/MonitoringMenu";
import LineChart from "@/components/LineChart/LineChart";

export default {
    name: "monitoring",
    mixins: [View],
    components: {
        MonitoringMenu,
        LineChart
    },
    data() {
        return {
            data: {
                cpu: {
                    chartData: null,
                    options: null,
                    loaded: false
                },
                ram: {
                    chartData: null,
                    options: null,
                    loaded: false
                },
                temperature: {
                    chartData: null,
                    options: null,
                    loaded: false
                }
            }
        };
    },
    created() {
        this.fetchCPUData();
        this.fetchRAMData();
        this.fetchTemperatureData();
    },
    methods: {
        async fetchCPUData() {
            let response = await axios({
                method: "GET",
                url: "http://192.168.178.49:19999/api/v1/data",
                params: {
                    chart: "system.cpu",
                    after: "-60",
                    format: "json",
                    options: "jsonwrap"
                }
            });
            if (response.status == 200) {
                let result = response.data.result;
                let labels = result.data.map(datapoint => datapoint[0]);
                let datasets = result.labels
                    .map((label, index) => {
                        if (label == "user" || label == "system") {
                            return {
                                label: label,
                                fill: false,
                                data: result.data.map(
                                    datapoint => datapoint[index]
                                )
                            };
                        } else {
                            return null;
                        }
                    })
                    .filter(dataset => dataset !== null);
                let data = {
                    labels: labels,
                    datasets: datasets
                };
                let options = {
                    scales: {
                        yAxes: [
                            {
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0, // minimum value
                                    max: 100 // maximum value
                                }
                            }
                        ]
                    }
                };
                this.data.cpu.chartData = data;
                this.data.cpu.options = options;
                this.data.cpu.loaded = true;
            }
        },
        async fetchRAMData() {
            let response = await axios({
                method: "GET",
                url: "http://192.168.178.49:19999/api/v1/data",
                params: {
                    chart: "system.ram",
                    after: "-60",
                    format: "json",
                    options: "jsonwrap"
                }
            });
            if (response.status == 200) {
                let result = response.data.result;
                let labels = result.data.map(datapoint => datapoint[0]);
                let datasets = result.labels
                    .map((label, index) => {
                        if (label !== "time") {
                            return {
                                label: label,
                                fill: true,
                                data: result.data.map(
                                    datapoint => datapoint[index]
                                )
                            };
                        } else {
                            return null;
                        }
                    })
                    .filter(dataset => dataset !== null);
                let data = {
                    labels: labels,
                    datasets: datasets
                };
                let options = {
                    scales: {
                        yAxes: [
                            {
                                stacked: true
                            }
                        ]
                    }
                };
                this.data.ram.chartData = data;
                this.data.ram.options = options;
                this.data.ram.loaded = true;
            }
        },
        async fetchTemperatureData() {
            let response = await axios({
                method: "GET",
                url: "http://192.168.178.49:19999/api/v1/data",
                params: {
                    chart: "sensors.cpu_thermal_virtual_0_temperature",
                    after: "-60",
                    format: "json",
                    options: "jsonwrap"
                }
            });
            if (response.status == 200) {
                let result = response.data.result;
                let labels = result.data.map(datapoint => datapoint[0]);
                let datasets = result.labels
                    .map((label, index) => {
                        if (label !== "time") {
                            return {
                                label: label,
                                fill: true,
                                data: result.data.map(
                                    datapoint => datapoint[index]
                                )
                            };
                        } else {
                            return null;
                        }
                    })
                    .filter(dataset => dataset !== null);
                let data = {
                    labels: labels,
                    datasets: datasets
                };
                this.data.temperature.chartData = data;
                this.data.temperature.loaded = true;
            }
        }
    }
};
</script>
