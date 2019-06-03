// jshint esversion: 6

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; // On page load checks local storage.

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false,
  };

  items.push(item); // Creates an object from the data input by the user.
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items)); // Puts items into local storage  as a string.
  this.reset(); // Resets form input field
}

// Populating a list to have the form update with user choices.
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? 'checked' : ''
      }>
        <label for="item${i}">${plate.text}</label>
        </li>
        `;
    })
    .join('');
}

// The code below will persist the toggle of items
function toggleDone(e) {
  if (!e.target.matches('input')) return; // Will skip this unless it is an input.
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);
