const cookie = document.getElementById('cookie');
const token = document.getElementById('token');

/// Get saved values ///

// On page refresh, get saved values
cookie.value = getSavedValue('cookie');
token.value = getSavedValue('token');

// Get the saved value - return the value of "v" from localStorage
function getSavedValue(v) {
  return !localStorage.getItem(v) ? '' : localStorage.getItem(v);
}

/// Save Values ///
cookie.addEventListener('blur', (e) => {
  saveValue(e.target);
});
token.addEventListener('blur', (e) => {
  saveValue(e.target);
});

// Save the value function - save it to localStorage as (ID, VALUE)
function saveValue(elem) {
  console.log(elem.id, elem.value);
  // Overwrite new data into localstorage
  localStorage.setItem(elem.id, elem.value);
}
