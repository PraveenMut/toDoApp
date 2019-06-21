window.addEventListener("load", getAllNotes);

// getElements factory function
function getElements() {
  return {
    cardsContainer: document.querySelector('#cards-container'),
    createNoteTitle: document.querySelector('#create-note-title'),
    createNoteCotents: document.querySelector('#create-note-contents'),
    addButton: document.querySelector('#add-button'),
  }
}

// getAllNotes Function (R)
function getAllNotes() {
  getElements().cardsContainer.innerHTML = '';
  fetch('tasks').then((serverResponse) => {
    return serverResponse.json();
  }).then((parsed_data) => {
    parsed_data.forEach(task => {
      content = `<div class="card mx-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${task.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Task Status: ${task.completed}</h6>
        <p class="card-text">${task.description}</p>
        <a id="edit-note" href="#" onclick="editNote('${task.name}')" class="card-link">Edit</a>
        <a id="delete-note" href="#" onclick="deleteNote('${task.name}')" class="card-link">Delete</a>
      </div>
    </div>`
    getElements().cardsContainer.insertAdjacentHTML('afterbegin', content)
    });
  })
}

// add notes functionality (C)
getElements().addButton.addEventListener("click", postNote)

function postNote() {
  data = {
    name: getElements().createNoteTitle.value,
    description: getElements().createNoteCotents.value,
    completed: false,
  }
  axios.post('/tasks', data).then((res => {
    console.log(`Status Code: ${res.status}`);
    console.log(`Entire Response: ${res.data}`);
    getAllNotes();
  })).catch((exception => {
    console.log(exception);
  }))
};

// update notes functionality (U)
function editNote(task) {

}

// delete notes functionality (D)
function deleteNote(task) {
  let encodedURL = encodeURI(task);
  axios.delete(`/tasks/${encodedURL}`).then((res) => {
    console.log(`Task Deleted Successfully. Status Code: ${res.status}`);
    getAllNotes();
  }).catch((exception) => {
    console.log(exception);
  })
}

// fetch("http://localhost:3000/tasks").then((response) => { return response.json() }).then((data) => { allData = data })