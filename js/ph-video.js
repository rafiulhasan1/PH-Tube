// console.log('connected')

const fetchData = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => localCatagories(data.categories))
    .catch((error) => console.log(error))
}

const localCatagories = (data) =>{
    // for(const item of data){
    //     console.log(item)        //for of loop
    // }

    const categoriesApi = document.getElementById('categories');

    data.forEach(item => {
        //console.log(item)
        const button = document.createElement('button')
        button.classList = "btn";
        button.innerText = item.category;
        categoriesApi.appendChild(button);
    })
} 

fetchData();