'use strict';

let batteryIsCharging = false;

navigator.getBattery().then(function (battery) {
  batteryIsCharging = battery.charging;

  function updateLevelInfo() {
    console.log(`Battery level: ${battery.level * 100}%`);
    let levelBattery = battery.level.toFixed(0);
    document.querySelectorAll('.battery rect')[1].style.width = `${
      18 * levelBattery
    }%`;
  }
  function chargingChangeInfo(batteryIsCharging) {
    document
      .querySelectorAll('.notification-bar')[0]
      .classList.remove(`is-chargin-true`);
    document
      .querySelectorAll('.notification-bar')[0]
      .classList.remove(`is-chargin-false`);
    document
      .querySelectorAll('.notification-bar')[0]
      .classList.add(`is-chargin-${batteryIsCharging}`);
  }
  battery.addEventListener('levelchange', () => {
    console.log(`Battery level: ${battery.level * 100}%`);
    updateLevelInfo();
  });

  battery.addEventListener('chargingchange', function () {
    batteryIsCharging = battery.charging;
    chargingChangeInfo(batteryIsCharging);
  });
  updateLevelInfo();
  chargingChangeInfo(batteryIsCharging);
});

function prettyDate() {
  var date = new Date();
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

document.querySelectorAll('.time')[0].textContent = prettyDate();
