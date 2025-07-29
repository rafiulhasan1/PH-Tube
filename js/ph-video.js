// console.log('connected')

const fetchData = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => localCatagories(data.categories))
    .catch((error) => console.log(error))
}

const localCatagories = (data) =>{
    console.log(data)
} 

fetchData();