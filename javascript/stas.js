function getAttendance(event) {
  return event.assistance ?? event.estimate ?? 0;
}

function getAttendancePercentage(event) {
  return (getAttendance(event) / event.capacity) * 100;
}

function isUpcoming(event) {
  return new Date(event.date) > new Date(data.currentDate);
}

function renderOverviewStats() {
  const events = data.events;
  let highest = events[0], lowest = events[0], largest = events[0];

  events.forEach((e) => {
    if (getAttendancePercentage(e) > getAttendancePercentage(highest)) highest = e;
    if (getAttendancePercentage(e) < getAttendancePercentage(lowest)) lowest = e;
    if (e.capacity > largest.capacity) largest = e;
  });

  document.getElementById("highest-attendance").textContent = highest.name;
  document.getElementById("lowest-attendance").textContent = lowest.name;
  document.getElementById("largest-capacity").textContent = largest.name;
}

function groupByCategory(events) {
  const groups = {};
  events.forEach((e) => {
    if (!groups[e.category]) groups[e.category] = [];
    groups[e.category].push(e);
  });
  return groups;
}

function renderCategoryStats(events, tbodyId) {
  const groups = groupByCategory(events);
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = "";

  Object.keys(groups).forEach((category) => {
    const catEvents = groups[category];
    const totalRevenue = catEvents.reduce((sum, e) => sum + e.price * getAttendance(e), 0);
    const totalAssistance = catEvents.reduce((sum, e) => sum + getAttendance(e), 0);
    const totalCapacity = catEvents.reduce((sum, e) => sum + e.capacity, 0);
    const avgPercentage = totalCapacity > 0 ? (totalAssistance / totalCapacity) * 100 : 0;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${category}</td>
      <td>$${totalRevenue.toLocaleString()}</td>
      <td>${avgPercentage.toFixed(1)}%</td>
    `;
    tbody.appendChild(row);
  });
}

function init() {
  renderOverviewStats();
  const upcoming = data.events.filter(isUpcoming);
  const past = data.events.filter((e) => !isUpcoming(e));
  renderCategoryStats(upcoming, "upcoming-stats-body");
  renderCategoryStats(past, "past-stats-body");
}

document.addEventListener("DOMContentLoaded", init);
