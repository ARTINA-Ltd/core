import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";


const DonutChart = ({ ethBalanceInTomans, maticBalanceInTomans, rialAvailableBalance }) => {

  const { t } = useTranslation("donutChart");

  const chartOptions = {
    series: [ethBalanceInTomans, maticBalanceInTomans, rialAvailableBalance],
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              // fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: t("totalBalance"),
              fontFamily: "KalamehMedium, system-ui",
              fontSize: "16px",
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return `${sum.toLocaleString()}`;
              },
            },
            value: {
              show: true,
              fontFamily: "KalamehMedium, system-ui",
              offsetY: -20,
              formatter: function (value) {
                return `${value.toLocaleString()}`;
              },
            },
          },
          size: "80%",
        },
      },
    },
    labels: [t("Ethereum"), t("Matic"), t("Toman")],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "KalamehMedium, system-ui",
    },
  };

  return <Chart options={chartOptions} series={chartOptions.series} type="donut" height={320} />;
};

export default DonutChart;
