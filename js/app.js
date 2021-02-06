const btn = document.getElementById('search-btn');
const input = document.getElementById('input');
const container = document.querySelector('.results');

const showResultOnUI = function(name,url){
    const html = `<div class="col-sm-6 mb-4 col-md-4">
                    <div class="row m-2 ">
                        <div class="card" style="">
                          <img src="${url}" class="card-img-top" alt="...">
                          <div class="card-body bg-custom-gray">
                            <p class="card-text text-center">${name}</p>
                          </div>
                        </div>
                    </div>
                </div>`;
    container.insertAdjacentHTML('beforeend',html);
//    console.log(html);
}

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

const search = function(value){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`).then(res=>res.json()).then(data=>{
        const obj = data.meals;
        if(!obj){
            showError(value);
            return;
        }
//        console.log(obj);
        container.innerHTML = '';
        obj.forEach(arr=>{
            const name = arr.strMeal;
            const url = arr.strMealThumb;
            
            showResultOnUI(name,url);
//            console.log(arr.strMeal);
//            console.log(arr.strMealThumb);
        })
    });
}

btn.addEventListener('click',function(e){
    e.preventDefault();
    const value = input.value;
    if(!value) return;
//    console.log(value);
    search(value);
    input.value = '';
    
})



