export const lineLegends = [
  { title: "Profit", color: "bg-yellow-600" },
  { title: "Volume", color: "bg-yellow-300" },
];

export const barLegends = [
  { title: "Sports", color: "bg-yellow-600" },
  { title: "Casino", color: "bg-yellow-300" },
];

export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [33, 66],
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: ["#d42f81", "#31c48d"],
        label: "Dataset 1",
      },
    ],
    labels: ["Loss", "Win"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

export const lineOptions = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Volume",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(179, 143, 7,1)");
          gradient.addColorStop(1, "rgba(179, 143, 7,0)");
          return gradient;
        },
        borderColor: "#faca15",
        data: [43, 48, 40, 54, 67, 73, 96, 43, 48, 40, 54, 67, 73, 96],
        fill: {
          target: "origin",
        },
        lineTension: 0.4,
      },
      {
        label: "Profit",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(250,174,50,1)");
          gradient.addColorStop(1, "rgba(250,174,50,0)");
          return gradient;
        },
        borderColor: "#b38f07",
        data: [24, 50, 64, 74, 52, 51, 65, 24, 50, 64, 74, 52, 51, 65],
        fill: {
          target: "origin",
        },
        lineTension: 0.4,
      },
      {
        label: "BCB Profit",
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        data: [42, 51, 24, 14, 42, 12, 15, 42, 51, 24, 14, 42, 12, 15],
      },
      {
        label: "BCB Volume",
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        data: [45, 14, 42, 12, 51, 24, 15, 45, 14, 42, 12, 51, 24, 15],
      },
      {
        label: "ETH Profit",
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        data: [24, 14, 42, 42, 51, 12, 15, 24, 14, 42, 42, 51, 12, 15],
      },
      {
        label: "ETH Volume",
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        data: [42, 51, 42, 12, 15, 24, 14, 42, 51, 42, 12, 15, 24, 14],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  },
};

export const lineCasinoOptions = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Volume",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(179, 143, 7,1)");
          gradient.addColorStop(1, "rgba(179, 143, 7,0)");
          return gradient;
        },
        borderColor: "#faca15",
        data: [43, 48, 40, 54, 67, 73, 96, 43, 48, 40, 54, 67, 73, 96],
        fill: {
          target: "origin",
        },
        lineTension: 0.4,
      },
      {
        label: "Profit",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(250,174,50,1)");
          gradient.addColorStop(1, "rgba(250,174,50,0)");
          return gradient;
        },
        borderColor: "#b38f07",
        data: [24, 50, 64, 74, 52, 51, 65, 24, 50, 64, 74, 52, 51, 65],
        fill: {
          target: "origin",
        },
        lineTension: 0.4,
      },
      {
        label: "BCB Profit",
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        data: [42, 51, 24, 14, 42, 12, 15, 42, 51, 24, 14, 42, 12, 15],
      },
      {
        label: "BCB Volume",
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        data: [45, 14, 42, 12, 51, 24, 15, 45, 14, 42, 12, 51, 24, 15],
      },
      {
        label: "ETH Profit",
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        data: [24, 14, 42, 42, 51, 12, 15, 24, 14, 42, 42, 51, 12, 15],
      },
      {
        label: "ETH Volume",
        borderColor: "rgba(0,0,0,0)",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        data: [42, 51, 42, 12, 15, 24, 14, 42, 51, 42, 12, 15, 24, 14],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  },
};

export const lineOptions2 = {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Your Stake",
        borderColor: "#faca15",
        data: [43, 48, 40, 54, 67, 73, 70, 43, 48, 40, 54, 67, 73, 70],
        fill: {
          target: "origin",
        },
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(179, 143, 7,1)");
          gradient.addColorStop(1, "rgba(179, 143, 7,0)");
          return gradient;
        },
        lineTension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
  legend: {
    display: false,
  },
};

export const barOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Shoes",
        backgroundColor: "#0694a2",
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [-3, 14, 52, 74, 33, 90, 70],
      },
      {
        label: "Bags",
        backgroundColor: "#7e3af2",
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
};
