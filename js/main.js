let interval;
const tbody = document.querySelector("tbody");
upsertData(data);

function upsertData(data) {
  const fragment = new DocumentFragment();
  data.forEach(item => {
      const row = document.createElement("tr");
      Object.keys(item).forEach(key => {
          const dataEl = document.createElement("td");
          const text = document.createTextNode(item[key]);
          dataEl.appendChild(text);
          row.appendChild(dataEl);
      });
      fragment.appendChild(row);
  });
  tbody.innerHTML = "";
  tbody.appendChild(fragment);
}

function start() {
  interval = setInterval(() => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.sort(() => Math.random() - 0.5);
    upsertData(newData);
    data = newData;
  }, 1000);
}

function stop() {
  clearInterval(interval);
}

function sort() {
  const newData = JSON.parse(JSON.stringify(data));
  newData.sort((item1, item2) => {
    if (item2.price > item1.price) {
      return 1;
    } else if (item2.price < item1.price) {
      return -1;
    } else {
      return item1.id - item2.id;
    }
  });
  upsertData(newData);
  data = newData;
}
