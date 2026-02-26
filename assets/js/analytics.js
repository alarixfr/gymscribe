import { init, getMembers } from "./handler.js";
import {
  saveTodayAttendance,
  createAttendanceChart,
  updateAttendanceChart,
} from "./attendance.js";

const expiresSoonContainer = document.getElementById("expiresSoonContainer");
const allCount = document.getElementById("allCount");
const activeCount = document.getElementById("activeCount");
const expiresSoonCount = document.getElementById("expiresSoonCount");
const expiredCount = document.getElementById("expiredCount");
const attendedCount = document.getElementById("attendedCount");
const absenceCount = document.getElementById("absenceCount");

const activePercent = document.getElementById("activePercent");
const expiresSoonPercent = document.getElementById("expiresSoonPercent");
const expiredPercent = document.getElementById("expiredPercent");

const chart = "attendanceChart";

let membersChart = null;
let members;

async function loadMembers() {
  try {
    allCount.textContent = "Loading";
    activeCount.textContent = "Loading";
    expiresSoonCount.textContent = "Loading";
    expiredCount.textContent = "Loading";
    attendedCount.textContent = "Loading";
    absenceCount.textContent = "Loading";

    expiresSoonContainer.innerHTML = "";

    const memberData = await getMembers();

    if (memberData?.error) throw new Error(memberData.error);

    allCount.textContent = memberData.membersCount.all;
    activeCount.textContent = memberData.membersCount.active;
    expiresSoonCount.textContent = memberData.membersCount.expiresSoon;
    expiredCount.textContent = memberData.membersCount.expired;

    members = memberData.membersList;
    console.log("loadMembers: received", members.length, "members");

    const attendedToday = members.filter((m) => m.isAttended === true);
    const absenceToday = members.filter((m) => m.isAttended === false);
    const expiresSoonMember = members.filter((m) => m.status === "expiresSoon");

    attendedCount.textContent = `Attended: ${attendedToday.length}`;
    absenceCount.textContent = `Absence: ${absenceToday.length}`;

    saveTodayAttendance(attendedToday.length, absenceToday.length);
    updateAttendanceChart(chart);

    renderMembersChart();

    if (expiresSoonMember.length <= 0) {
      const noneElement = document.createElement("p");
      noneElement.textContent = "No expired soon";

      expiresSoonContainer.append(noneElement);
      return;
    }

    expiresSoonMember.forEach((member) => {
      const memberElement = generateMember(
        member.name,
        member.duration,
        member.id,
      );

      expiresSoonContainer.append(memberElement);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function generateMember(name, expires, id) {
  const memberContainer = document.createElement("div");
  const memberName = document.createElement("h3");
  const memberExpires = document.createElement("p");
  const memberId = document.createElement("p");

  memberContainer.classList.add("member");
  memberContainer.id = id;

  memberName.textContent = name;
  memberId.textContent = `ID: ${id}`;
  memberExpires.textContent = `Expires in ${expires}`;
  if (expires === null) {
    memberExpires.textContent = "Expires in: Never (Lifetime)";
  } else if (expires < 0) {
    memberExpires.textContent = `Expired ${Math.abs(expires)} days ago`;
  } else {
    memberExpires.textContent = `Expires in ${expires} days`;
  }
  memberContainer.append(memberName, memberExpires, memberId);

  return memberContainer;
}

function renderMembersChart() {
  try {
    const activeMembers = members.filter((m) => m.status === "active").length;
    const expiresSoonMembers = members.filter(
      (m) => m.status === "expiresSoon",
    ).length;
    const expiredMembers = members.filter((m) => m.status === "expired").length;
    const totalMembers = members.length;

    const chartContainer = document.getElementById("members-chart-container");

    if (membersChart) {
      membersChart.destroy();
    }

    let canvas = document.getElementById("membersChart");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "membersChart";
      chartContainer.innerHTML = "";
      chartContainer.append(canvas);
    }

    const ctx = canvas.getContext("2d");

    membersChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Active", "Expires Soon", "Expired"],
        datasets: [
          {
            data: [activeMembers, expiresSoonMembers, expiredMembers],
            backgroundColor: [
              "rgba(60, 180, 120, 0.8)",
              "rgba(255, 200, 10, 0.8)",
              "rgba(255, 90, 90, 0.8)",
            ],
            borderColor: [
              "rgba(60, 180, 120, 1)",
              "rgba(255, 200, 10, 1.3)",
              "rgba(255, 90, 90, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#fff",
              font: {
                size: 14,
              },
            },
          },
          title: {
            display: true,
            text: "Members Chart",
            color: "#fff",
            font: {
              size: 16,
            },
          },
        },
      },
    });

    const activePercentCalc =
      totalMembers > 0 ? ((activeMembers / totalMembers) * 100).toFixed(2) : 0;
    const expiresSoonPercentCalc =
      totalMembers > 0
        ? ((expiresSoonMembers / totalMembers) * 100).toFixed(2)
        : 0;
    const expiredPercentCalc =
      totalMembers > 0 ? ((expiredMembers / totalMembers) * 100).toFixed(2) : 0;

    activePercent.textContent = `${activePercentCalc}%`;
    expiresSoonPercent.textContent = `${expiresSoonPercentCalc}%`;
    expiredPercent.textContent = `${expiredPercentCalc}%`;
  } catch (e) {
    console.error(e.message);
  }
}

document.addEventListener("DOMContentLoaded", async (e) => {
  await init();
  createAttendanceChart(chart);
  await loadMembers();

  setInterval(async () => {
    await loadMembers();
  }, 20000);
});
