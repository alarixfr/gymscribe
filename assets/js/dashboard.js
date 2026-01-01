const ctx = document.getElementById('chart');

const xValues = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Today"];
const yValues = [0, 30, 15, 25, 50, 25, 45];

new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      backgroundColor: "rgba(255,255,255,1)",
      borderColor: "rgba(255,255,255,0.4)",
      data: yValues
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {display:false},
      title: {
        display: true,
        text: "Last 7 Days Attendance",
        color: "rgba(255,255,255,1)",
        font: {size: 28}
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