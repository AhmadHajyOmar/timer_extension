chrome.alarms.create({
  periodInMinutes: 1 / 60, // alram each 60 min
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunning"], (res) => {
    console.log("backroound");
    const time = res.timer ?? 0; // zero if timer dose not exist
    const isRunning = res.isRunning ?? true; // timer is running by default
    if (!isRunning) {
      return;
    }
    chrome.storage.local.set({
      timer: time + 1,
    });
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });
    chrome.storage.sync.get(["notificationTime"], (res) => {
      const notificationTime = res.notificationTime ?? 1000;
      if (time % notificationTime == 0) {
        // 1000 seconds is passed
        this.registration.showNotification("Chrome Timer Extension", {
          body: `${notificationTime} seconds has passed`,
          icon: "icon.png",
        });
      }
    });
  });
});
