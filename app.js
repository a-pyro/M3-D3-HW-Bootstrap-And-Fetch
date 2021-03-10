'use strict';

console.log('Hi there! 🔥');
const shit = '💩',
  fire = '🔥',
  rocket = '🚀',
  poudzo = '👍🏻';

/*         PICTURE ALBUM EXERCISE

        Starting from the current "base" bootstrap layout, implement the following exercise:

        1) When pressing on Load Images button, load the pictures from http://www.splashbase.co/api/v1/images/search?query=your query
        2) When pressing on Load Seconday Images, load the pictures from http://www.splashbase.co/api/v1/images/search?query=your secondary query
        3) When the user clicks on the "VIEW" button inside the Card, open the specified image in a modal view
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
const loadImgsBtn = document.querySelector('.jumbotron a.btn.btn-primary');
const loadSecondaryImgsBtn = document.querySelector(
  '.jumbotron a.btn.btn-secondary'
);

loadImgsBtn.addEventListener('click', fetchData);
loadSecondaryImgsBtn.addEventListener('click', fetchData);
{
  /* <img class="card-img-top" src="..." alt="Card image cap"></img> */
}

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
      cards.forEach((card, idx) => {
        card.firstElementChild.remove(); //get rid of svg
        const imgHTML = `<img class="card-img-top" src="${images[idx].url}" alt="Card image cap"></img>`;
        card.insertAdjacentHTML('afterbegin', imgHTML); //inserting img
      });
    })
    .catch((err) => console.log(err));
}
