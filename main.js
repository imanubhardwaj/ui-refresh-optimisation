let interval;
const tbody = document.querySelector('tbody');
populateData(data);

function populateData(data) {
  data.forEach(item => {
    const newRow = tbody.insertRow();

    swapRowData(item, newRow);
  });
}

function start() {
  interval = setInterval(() => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.sort(() => Math.random() - 0.5);
    replaceRows(newData, getChangedIndices(data, newData));
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
  replaceRows(newData, newData.map((item, index) => index));
  data = newData;
}

function getChangedIndices(arr1, arr2) {
  const indices = [];
  arr2.forEach((item, index) => {
    if (arr1[index].id !== item.id) {
      indices.push(index);
    }
  });
  return indices;
}

function replaceRows(data, indices) {
  indices.forEach(index => {
    const row = tbody.rows[index];
    swapRowData(data[index], row);
  });
}

function swapRowData(item, row) {
  Object.keys(item).forEach((key, index) => {
    let cell = row.cells[index];
    if (cell) {
      cell.innerHTML = item[key];
    } else {
      const newCell = row.insertCell();

      const newText = document.createTextNode(item[key]);
      newCell.appendChild(newText);
    }
  });
}
