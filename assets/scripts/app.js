const leftItems = document.querySelector('.left-items');
const leftP = document.querySelector('.left-p');



async function showRests(){
    fetch("https://developers.zomato.com/api/v2.1/search", {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" },
  }).
  then(response => response.json()).
  then(data=>{
    restaurantAll = data.restaurants;
      for(item of restaurantAll){

        const{restaurant:{name,id}} = item;
        let elmts = `<p class="left-p" data-id="${id}">
          ${name}
         </p>`;
         leftItems.innerHTML = leftItems.innerHTML + elmts;
        // console.log(id);
      }
  })
}

async function getSelectedRest(id){
  fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`, {
    headers: { "user-key": "6c11b6f8975b808590064388ed3f37a8" }
  })
  .then(res => res.json())
  .then(resData => {
    console.log(resData.name);
  })
}


function showSelectedRest(event){
  let showId = event.target.getAttribute('data-id');
  console.log(showId);
  getSelectedRest(showId);
}

window.addEventListener("load",showRests);
leftItems.addEventListener("click",showSelectedRest);