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

function getTime(time){
    const hour = parseInt(time / 3600);
    const returnTime = time % 3600;
    const minute = parseInt(returnTime/60)
    const second = minute % 60
    return `${hour} Hour ${minute} minute ${second} second ago`
}

const removeClass = () =>{
    const re = document.getElementsByClassName("categoryBtn");
    for(let bn of re){
        bn.classList.remove("btnColor")
    }
}

function localCategoryVideo(catagory){
    //alert(catagory)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${catagory}`)
    .then(res => res.json())
    .then(data => {
        removeClass();
        const activeBtn = document.getElementById(`btn-${catagory}`)
        activeBtn.classList.add("btnColor")
        localVideo(data.category)
    })
    .catch((error) => console.log(error))
}

const localCatagories = (data) =>{

    const categoriesApi = document.getElementById('categories');

    data.forEach(item => {
        //console.log(item)
        const buttonContainer = document.createElement('div')
        // button.classList = "btn";
        // button.innerText = item.category;
        // categoriesApi.append(button);
        buttonContainer.innerHTML=
        `
            <button id="btn-${item.category_id}" onClick="localCategoryVideo(${item.category_id})" class="btn categoryBtn">
                ${item.category}
            </button>
        `

        categoriesApi.append(buttonContainer)
    })
}

const localVideo = (data) => {
    const localVideoId = document.getElementById('local-video');
    localVideoId.innerHTML = ""

    if(data.length == 0){
        localVideoId.classList.remove("grid");
        localVideoId.innerHTML = `
            <div class="min-h-[600px] w-full flex flex-col gap-5 justify-center items-center">
                <img src="assets/icon.png" alt="" />
                <h2 class="font-bold text-gray-500">Oops!! Sorry, There is no content hear</h2>
            </div>
        `
    }
    else{
        localVideoId.classList.add("grid");
    }

    //console.log(data)
    data.forEach(item => {
        // console.log(item.authors[0].profile_name)
        const div = document.createElement('div');
        div.classList = "card bg-base-100";
        div.innerHTML = `
        
        <figure class="h-[250px] relative">
                <img
                class="h-full w-full object-cover"
                src=${item.thumbnail}
                alt="" />
                ${
                    item.others.posted_date?.length == 0 
                    ? "" 
                    : `<span class="absolute right-1 bottom-1 bg-black text-white rounded p-1">
                    ${getTime(item.others.posted_date)}
                    </span>`
                }
                
        </figure>
        <div class="flex items-center">
            <div>
                <img
                class="h-10 w-10 object-cover rounded-full"
                src=${item.authors[0].profile_picture}/>
            </div>
            <div class="card-body">
                <h2 class="card-title">${item.title}</h2>
                <p>${item.authors[0].profile_name} <span>${item.authors[0].verified ==true ? `<i class="fa-solid fa-certificate" style="color: #74C0FC;"></i>` : ""}</span> </p>
                
                <p>${item.others.views}</p>
            </div>
        </div>
        
        
        `
        localVideoId.append(div);
    })
}

fetchData();
fetchVideoData();