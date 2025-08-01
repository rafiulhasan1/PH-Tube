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

/**
 * {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
 */


const localVideo = (data) => {
    const localVideoId = document.getElementById('local-video');
    console.log(data)
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