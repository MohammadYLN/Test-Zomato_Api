const catList = document.querySelector(".cat-list");
let asideSec = document.querySelector(".result");
const showSection = document.querySelector(".show-row");
const cuisineShow = document.querySelector(".col-cuisine");
const descSection = document.querySelector(".desc-col");
const leftItems = document.querySelectorAll(".left-items");
const imageSection = document.querySelector(".img-div");

let catsName = [];
let catsChecked = [];
let lastId;


/* --------------------------------- show list of Categories ----------------------------- */
async function getCategories() {
  fetch("https://developers.zomato.com/api/v2.1/categories", {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
  })
    .then((resp) => resp.json())
    .then((catData) => {
      let allCats = catData.categories;
      for (let cat of allCats) {
        const {
          categories: { name, id },
        } = cat;
        let elmnt = `<div class="check-cats1">
          <input class="check" id="${id}" onchange="isCheckedOrNot(this)" type="radio" data-id="${id}" name="cat"
          />
      <label for="cat">${name}</label>
          </div>`;
        catList.innerHTML = catList.innerHTML + elmnt;
        
      }
    })
    .catch((err) => console.log(err));
}

/* --------------------------------- show list of Cuisines ----------------------------- */
async function getCuisines() {
  fetch("https://developers.zomato.com/api/v2.1/cuisines?city_id=250", {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
  })
    .then((res) => res.json())
    .then((cuisData) => {
      let allCuisines = cuisData.cuisines;
      // console.log(allCuisines);
      for (let cuis of allCuisines) {
        const {
          cuisine: { cuisine_id, cuisine_name },
        } = cuis;
        const elmts = `<div class="cuisine-list" data-id="${cuisine_id}">
          <input class="${cuisine_name}" onchange="isCheckedOrNot(this)" type="checkbox" data-id="${cuisine_name}" name="cuisine"
          />
      <label for="cuisine">${cuisine_name}</label>
              </div>`;
        cuisineShow.innerHTML = cuisineShow.innerHTML + elmts;
        // console.log(cuisine_name);
      }
    })
    .catch((err) => console.log(err));
}

/* ---------------------------------  list of restaurants ----------------------------- */
async function showRests() {
  let url = "https://developers.zomato.com/api/v2.1/search";
  fetch(url, {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
  })
    .then((response) => response.json())
    .then((data) => {
      let restaurantAll = data.restaurants;
      for (item of restaurantAll) {
        const {
          restaurant: { name, id, highlights },
        } = item;
        let elmts = `<div class="left-items">
        <p id="${name}" data-id="${id}">${name}</p>
        </div>`;
        asideSec.innerHTML = asideSec.innerHTML + elmts;

        catsName = highlights;
        
      }
      console.log(restaurantAll);
    });
}

/* ---------------------------------  select and show one of restaurants ----------------------------- */

async function getSelectedRest(id) {
  let url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`;
  fetch(url, {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
  })
    .then((res) => res.json())
    .then((resData) => {
      const {
        location: { address },
      } = resData;
      catsName = resData.highlights;
      // console.log(catsName);

      let txtElmnt = `<h1 class="desc-title" data-id="${resData.id}">${resData.name}</h2>
    <p class="desc-address" data-id="${resData.id}">${address}</p>
    <p class="desc-booking" data-id="${resData.id}">Paragraph booking</p>
    <p class="desc-delivery" data-id="${resData.id}">Paragraph delivery</p>
    <p class="desc-cuisinetitle" data-id="${resData.id}">Cuisines</p>
    <h2 class="desc-cuisinedesc" data-id="${resData.id}">${resData.cuisines}</h2>
    <p class="desc-phonetitle" data-id="${resData.id}">Phone</p>
    <h2 class="desc-phonedesc" data-id="${resData.id}">${resData.phone_numbers}</h2>
    <p class="desc-openingtitle" data-id="${resData.id}">Opening Hours</p>
    <h2 class="desc-openingdesc" data-id="${resData.id}">${resData.openings}</h2>`;

      // let imgElmnt = `<img class="img-show" src="${resData.photos[0].photo.url}" />`;

      descSection.innerHTML = txtElmnt;
      // imageSection.innerHTML =  imgElmnt;
    })
    .catch((err) => console.log(err));
}

async function getDefaultRest() {
  let url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=19010386`;
  fetch(url, {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
  })
    .then((res) => res.json())
    .then((resData) => {
      const {
        location: { address },
        photos,
      } = resData;
      // console.log(photosUrl);

      let txtElmnt = `<h1 class="desc-title" data-id="${resData.id}">${resData.name}</h2>
    <p class="desc-address" data-id="${resData.id}">${address}</p>
    <p class="desc-booking" data-id="${resData.id}">Paragraph booking</p>
    <p class="desc-delivery" data-id="${resData.id}">Paragraph delivery</p>
    <p class="desc-cuisinetitle" data-id="${resData.id}">Cuisines</p>
    <h2 class="desc-cuisinedesc" data-id="${resData.id}">${resData.cuisines}</h2>
    <p class="desc-phonetitle" data-id="${resData.id}">Phone</p>
    <h2 class="desc-phonedesc" data-id="${resData.id}">${resData.phone_numbers}</h2>
    <p class="desc-openingtitle" data-id="${resData.id}">Opening Hours</p>
    <h2 class="desc-openingdesc" data-id="${resData.id}">${resData.openings}</h2>`;

      // let imgElmnt = `<img class="img-show" src="${resData.photos[0].photo.url}" />`;

      descSection.innerHTML = txtElmnt;
      // imageSection.innerHTML =  imgElmnt;
    })
    .catch((err) => console.log(err));
}

function showSelectedRest(event) {
  let showId = event.target.getAttribute("data-id");
  let showName = event.target.getAttribute("id");
  console.log(showName);
  getSelectedRest(showId);
}

function isCheckedOrNot(ele) {
  // let is_checked_elememt =  document.querySelector('.is_checked')
  // is_checked_elememt.innerHTML = ele.checked;
  let checkedId = event.target.getAttribute("data-id");
  // console.log(checkedId);
  showFilteredRests(checkedId);
}

async function showFilteredRests(category) {
  
  
  let url = `https://developers.zomato.com/api/v2.1/search?category=${category}`;
  fetch(url, {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
  })
    .then((response) => response.json())
    .then((data) => {
      let restaurantAll = data.restaurants;
      let catElmnt = [];
      let count = 0;
      for (item of restaurantAll) {
        
        const {
          restaurant: { name, id, highlights },
        } = item;
        catElmnt[count] = `<div class="left-items">
        <p id="${name}" data-id="${id}">${name}</p>
        </div>`;
        count++;
        // catsName = highlights;
        // console.log(catElmnt);
        
      }
      asideSec.innerHTML =  catElmnt;
      
      
    });
}

/* ------------------- Events and Listeners -----------------------*/

window.addEventListener("load", showRests);
window.addEventListener("load", getCuisines);
window.addEventListener("load", getCategories);
window.addEventListener("load", getDefaultRest);
asideSec.addEventListener("click", showSelectedRest);




