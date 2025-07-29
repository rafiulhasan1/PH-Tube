// console.log('connected')

const fetchData = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => localCatagories(data.categories))
    .catch((error) => console.log(error))
}

const fetchVideoData = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => localVideo(data.videos))
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
        categoriesApi.append(button);
    })
}


const localVideo = (data) => {
    const localVideoId = document.getElementById('local-video');
    // console.log(data.authors[0].profile_name)
    data.forEach(item => {
        // console.log(item.authors[0].profile_name)
        const div = document.createElement('div');
        div.classList = "card bg-base-100";
        div.innerHTML = `
        
        <figure class="h-[250px]">
            <img
            class="h-full w-full object-cover"
            src=${item.thumbnail}
            alt="" />
        </figure>
        <div class="flex items-center">
            <div>
                <img
                class="h-10 w-10 object-cover rounded-full"
                src=${item.authors[0].profile_picture}/>
            </div>
            <div class="card-body">
                <h2 class="card-title">${item.title}</h2>
                <p>${item.authors[0].profile_name}</p>
                
                <p>${item.others.views}</p>
            </div>
        </div>
        
        
        `
        localVideoId.append(div);
    })
}

fetchData();
fetchVideoData();