const btn = document.getElementById('search-btn');
const input = document.getElementById('input');
const container = document.querySelector('.results');
const popup = document.querySelector('.popup-container');
const cardParent = document.querySelector('.card-parent');
const btnCrs = document.querySelector('.cross-btn');

// hiding popup 
const init = function(){
    popup.style.display = 'none';
}
init();

// showing search result on UI
const showResultOnUI = function(name,url,id){
    const html = `<div class="col-sm-6 mb-4 col-md-4 col-lg-3 ">
                    <div class="row m-2 card-parent " >
                        <div class="card" data-id="${id}" style="">
                          <img src="${url}" class="card-img-top" alt="...">
                          <div class="card-body bg-custom-gray">
                            <p class="card-text item-name text-center">${name}</p>
                          </div>
                        </div>
                    </div>
                </div>`;
    container.insertAdjacentHTML('beforeend',html);
}

// showing error message when not getting any item
const showError = function(value){
    const html = `<div class="col-12 error-message">
                            <div class=" m-2 ">
                                <div class="card" style="">
                                  <h1 class="card-text display-1 text-center">${value} not found!</h1>
                                  <div class="card-body bg-custom-gray">
                                    <p class="card-text text-center">Try something else!</p>
                                  </div>
                                </div>
                            </div>
                        </div>`;
            container.innerHTML = html;
}

// searching for food according to given search value
const search = function(value){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`).then(res=>res.json()).then(data=>{
        const obj = data.meals;
        if(!obj){
            showError(value);
            return;
        }
        container.innerHTML = '';
        obj.forEach(arr=>{
            const name = arr.strMeal;
            const url = arr.strMealThumb;
            const id = arr.idMeal;
            
            showResultOnUI(name,url,id);
        })
    });
}

// making list for ingredients
const ingredientsList = function(obj){
    let htmlList = '';
        for(let i=1;i<=20;i++){
            
            const ingNm = `strIngredient${i}`;
            if(!obj[ingNm]){  
                
            }else{
                htmlList += `<li class="list-group-item bn">✔ ${obj[ingNm]}</li>`
            }
        }
    return htmlList;
    }
    
// showing details on UI for a particular item
const showDetails = function(obj){
    popup.style.display = 'block';
    const html = `<div class="row ">
                    <div class="card custom-card" style="">
                       <div class="cross-btn">X</div>
                      <img src="${obj.strMealThumb}" class="card-img-top" alt="...">
                    </div>
                    <div class="inner-text">
                        <h4 class='title  p-4 text-bold'>${obj.strMeal}</h4>
                        <p class="px-4 text-bold">Ingredients</p>
                        <ul class="list-group my-bg check cw-1">
                            ${ingredientsList(obj)}
                        </ul>
                    </div>
                    <div class="ingredients-lists">

                    </div>
                </div>`;
    popup.innerHTML = html;  
}

// fetching data for a particular item using ID of that item
const findMoreAboutThisItem = function(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res=>res.json()).then(data=>{
        showDetails(data.meals[0]);
    });
}

// adding listener for items using event bubbling 
container.addEventListener('click',function(e){
    if(!e.target.closest('.card-parent')) return;
    const id = e.target.closest('.card-parent').firstElementChild.dataset.id;
    findMoreAboutThisItem(id);
})

// adding listener for search btn
btn.addEventListener('click',function(e){
    e.preventDefault();
    const value = input.value;
    if(!value) return;
    search(value);
    input.value = '';
})

// hide popup after clicking on the close btn of popup
popup.addEventListener('click',function(e){
    if(e.target.classList.value !== 'cross-btn') return;
    init();
})



