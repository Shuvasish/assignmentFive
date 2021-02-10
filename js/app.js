const btn = document.getElementById('search-btn');
const input = document.getElementById('input');
const container = document.querySelector('.results');
const popup = document.querySelector('.popup-container');
const cardParent = document.querySelector('.card-parent');
const btnCrs = document.querySelector('.cross-btn');
const boss= document.querySelector('.boss');


// showing search result on UI
const showResultOnUI = function(obj){
    const html = `<div class="col-sm-6 mb-4 col-md-4 col-lg-3 ">
                    <div class="row m-2 cc" data-toggle="modal" data-target="#ok${obj.idMeal}" >
                        <div class="card"  style="">
                          <img src="${obj.strMealThumb}" class="card-img-top" alt="...">
                          <div class="card-body bg-custom-gray">
                            <p class="card-text item-name text-center">${obj.strMeal}</p>
                          </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="ok${obj.idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${obj.strMeal}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                            </div>
                                <div class="modal-body">
                                    <div class="row ">
                                        <div class="card custom-card" style="">
                                            
                                                <img src="${obj.strMealThumb}" class="card-img-top" alt="...">
                                            </div>
                                            <div class="inner-text">
                                                
                                                <p class="px-4 text-bold">Ingredients</p>
                                                <ul class="list-group">
                                                    ${ingredientsList(obj)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                      
                                </div>
                            </div>
                        </div>



`;
    container.insertAdjacentHTML('beforeend',html);
}

// making list for ingredients
const ingredientsList = function(obj){
    let htmlList = '';
        for(let i=1;i<=20;i++){
            
            const ingNm = `strIngredient${i}`;
            if(!obj[ingNm]){  
                
            }else{
                htmlList += `<li class="list-group-item bdr">✔ ${obj[ingNm]}</li>`
            }
        }
    return htmlList;
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
            
            showResultOnUI(arr);
        })
    });
}

// adding listener for search btn
btn.addEventListener('click',function(e){
    e.preventDefault();
    const value = input.value;
    if(!value) return;
    search(value);
    input.value = '';
})






