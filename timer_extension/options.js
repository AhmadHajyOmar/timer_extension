const name_input = document.getElementById("input");
const but = document.getElementById("save-btn");
const timeInput = document.getElementById("time-input");
but.addEventListener("click", () => {
  const name = name_input.value;
  const notificationTime = timeInput.value;
  chrome.storage.sync.set(
    {
      name,
      notificationTime,
    },
    () => {
      console.log(`Name is set to ${name}`);
    }
  );
});

chrome.storage.sync.get(["name", "notificationTime"], (res) => {
  name_input.value = res.name ?? "???";
  timeInput.value = res.notificationTime ?? 1000;
});

setInterval(() => {
  console.log("options");
}, 1000);
