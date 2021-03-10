'use strict';

console.log('Hi there! 🔥');
const shit = '💩',
  fire = '🔥',
  rocket = '🚀',
  poudzo = '👍🏻';

/*         PICTURE ALBUM EXERCISE

        Starting from the current "base" bootstrap layout, implement the following exercise:

        x1) When pressing on Load Images button, load the pictures from http://www.splashbase.co/api/v1/images/search?query=your query
        x2) When pressing on Load Seconday Images, load the pictures from http://www.splashbase.co/api/v1/images/search?query=your secondary query
       x 3) When the user clicks on the "VIEW" button inside the Card, open the specified image in a modal view
        4) The Edit button should be replace with a "Hide" button. 
        5) When the hide button is pressed, the whole picture card disappears.
        6) Replace the "9 mins" string in the card template with the ID of the Image
        
        [EXTRA]
        7) Add in the "jumbotron" a search field. If there is a value there and the user press "Load Seconday Image" the API call should use the specified query as query
        8) After every button is pressed, display in an alert for 5 seconds the result of the operation (es.: 20 images loaded)
        9) Handle API error gracefully using alert components with the message inside
        10) Add at the bottom of the page a carousel with "forest" images loaded by another API call

        [EVEN MORE EXTRA]
        11) Use the map method to create from your splashbase response object an array containing just the url strings
        12) Use filter to modify the "forest" api call to receive only images from a source different than "unsplash"
        13) Use the reduce method on the results array to sum up all the id numbers in a single one

        [HINT]
        You can replace the images src for making your pictures appear on button click or you can use template literals to re-create all the cards from scratch.
        Use arrow functions to make some practice with them

        API Docs: http://www.splashbase.co/api */

const cards = document.querySelectorAll('.card');
const viewbtns = document.querySelectorAll(
  '.btn.btn-sm.btn-outline-secondary:first-of-type'
);
const editBtns = document.querySelectorAll(
  '.btn.btn-sm.btn-outline-secondary:last-of-type'
);

const loadImgsBtn = document.querySelector('.jumbotron a.btn.btn-primary');
const loadSecondaryImgsBtn = document.querySelector(
  '.jumbotron a.btn.btn-secondary'
);
const modal = document.getElementById('exampleModal');
const form = document.querySelector('nav .form-inline');
const photoRow = document.getElementById('photoRow');
const inputField = document.querySelector('input[type="search"]');

loadImgsBtn.addEventListener('click', fetchData);
loadSecondaryImgsBtn.addEventListener('click', fetchData);
form.addEventListener('submit', searchQuery);

viewbtns.forEach((btn) => {
  btn.addEventListener('click', showModal);
  btn.setAttribute('data-toggle', 'modal');
  btn.setAttribute('data-target', '#exampleModal');
});

const endpoint = 'http://www.splashbase.co/api/v1/images/search?query=';

function fetchData(e) {
  e.preventDefault();
  // console.log(e.target);

  // console.log('firstbtn');
  fetch(
    `${endpoint}${
      e.target.classList.contains('btn-primary') ? 'mountain' : 'sea'
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      const { images } = data;
      console.log(images);
      /*  photoRow.innerHTML = images
        .map(
          (img) => `
        <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
              <img class="card-img-top" src="${img.url}" alt="Card image cap"></img>
                <div class="card-body">
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </button>
                    </div>
                    <small class="text-muted">${img.id}</small>
                  </div>
                </div>
              </div>
            </div>
      `
        )
        .join(''); */

      cards.forEach((card, idx) => {
        const small = card.querySelector('small');
        small.innerText = images[idx].id;
        card.firstElementChild.remove(); //get rid of svg
        const imgHTML = `<img class="card-img-top" src="${images[idx].large_url}" alt="Card image cap"></img>`;
        card.insertAdjacentHTML('afterbegin', imgHTML); //inserting img
      });
    })
    .catch((err) => console.log(err));
}

function showModal(e) {
  const card = e.target.closest('.card');
  const img = card.querySelector('img');
  const url = img.src;
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = `<img class="img-fluid" src="${url}" alt="Card image cap"></img>`;
}

//ex4 /5
editBtns.forEach((btn) => {
  btn.innerText = 'Hide';
  btn.addEventListener('click', hide);
});

function hide(e) {
  console.log(e.target);
  const card = e.target.closest('.card');
  // card.style.opacity = '0';
  const col = card.closest('.col-md-4');
  col.classList.add('animate__animated', 'animate__faster', 'animate__zoomOut');
  setTimeout(() => {
    col.remove();
  }, 500);
}

function searchQuery(e) {
  e.preventDefault();
  console.log(e.target);
  console.log(inputField.value);
  const query = inputField.value.toLowerCase();
  console.log('query:', query);
  fetch(endpoint + query)
    .then((res) => res.json())
    .then((data) => {
      if (data.images.length === 0) {
        console.log('nothing found');
        inputField.value = '';
        inputField.focus();
        return;
      }

      const { images } = data;
      photoRow.innerHTML = images
        .map(
          (img) => `
        <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
              <img class="card-img-top" src="${img.url}" alt="Card image cap"></img>
                <div class="card-body">
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary view-btn"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary hide-btn"
                      >
                        Hide
                      </button>
                    </div>
                    <small class="text-muted">${img.id}</small>
                  </div>
                </div>
              </div>
            </div>
      `
        )
        .join('');
      const hides = document.querySelectorAll('.hide-btn');
      const views = document.querySelectorAll('.view-btn');
      hides.forEach((btn) => btn.addEventListener('click', hide));
      views.forEach((btn) => {
        btn.addEventListener('click', showModal);
        btn.setAttribute('data-toggle', 'modal');
        btn.setAttribute('data-target', '#exampleModal');
      });
    });
}
