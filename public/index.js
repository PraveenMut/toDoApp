window.addEventListener("load", getAllNotes);

// getElements factory function
function getElements() {
  return {
    cardsContainer: document.querySelector('#cards-container'),
  }
}

// getAllNotes Function
function getAllNotes() {
  fetch('tasks').then((serverResponse) => {
    return serverResponse.json();
  }).then((parsed_data) => {
    parsed_data.forEach(task => {
      content = `<div class="card mx-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${task.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Task Status: ${task.completed}</h6>
        <p class="card-text">${task.description}</p>
        <a href="#" class="card-link">Edit</a>
        <a href="#" class="card-link">Delete</a>
      </div>
    </div>`
    getElements().cardsContainer.insertAdjacentHTML('afterbegin', content)
    });
  })
}
// fetch("http://localhost:3000/tasks").then((response) => { return response.json() }).then((data) => { allData = data })