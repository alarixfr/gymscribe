const ctx = document.getElementById('chart');

const xValues = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const yValues = [0, 10, 20, 30, 40, 50];

new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(255,255,255,1)",
      borderColor: "rgba(255,255,255,0.4)",
      data: yValues
    }]
  },
  options: {
    plugins: {
      legend: {display:false},
      title: {
        display: true,
        text: "Last 7 Days Data",
        color: "rgba(255,255,255,1)",
        font: {size: 22}
      }
    },
    scales: {
      x: {
        ticks: {
          font: { size: 28 }
        }
      },
      y: {
        ticks: {
          font: { size: 28 }
        }
      }
    }
  }
});