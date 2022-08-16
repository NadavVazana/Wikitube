const STORAGE_KEY ='searchesDB'

var gSearches = loadFromStorage(STORAGE_KEY) || []

function init(){
    renderSearches()
    getVideo('beatles').then(renderVideos)
    getWiki('beatles').then(renderWiki)
}


function searchVideo(value){
    cleanVideos()
    if(!gSearches.includes(value)) addSearchToFooter(value,true)
    

   getVideo(value).then(renderVideos)
   getWiki(value).then(renderWiki)
}

function renderSearches(){
    gSearches.forEach(search => addSearchToFooter(search,false))
}


function renderVideos(videos){
    document.querySelector('.video-player').src = `https://www.youtube.com/embed/${videos[0].id}`

    for(let i = 0 ; i < 5 ; i++){
        document.querySelector(`.video${i+1}`).innerHTML += `<img class="thumb"  src=${videos[i].thumbnail}> <span class="video-name">${videos[i].name}</span>`
        document.querySelector(`.video${i+1}`).addEventListener('click',()=> document.querySelector('.video-player').src = `https://www.youtube.com/embed/${videos[i].id}`)
    
    }
    

}

function changeTheme(color){
    document.querySelector('body').style.backgroundColor = color
}

function clearHistory(){
    document.querySelector('.footer').innerHTML = ''
    saveToStorage(STORAGE_KEY,[])
}

function addSearchToFooter(value,isChange){
    if(isChange){
        gSearches.push(value)
        saveToStorage(STORAGE_KEY,gSearches)}
        document.querySelector('.footer').innerHTML += `<span onclick="searchVideo('${value}')">${value}</span> `
}

function renderWiki(value){
    if(!value) document.querySelector('.wiki').innerHTML = `No wiki info`
  else{  var strHTML = `<h2 class="wiki-title">${value.title}</h2><br>${value.desc}`
    document.querySelector('.wiki').innerHTML = strHTML}
}

function cleanVideos(){
    for(var i = 0 ; i < 5 ; i++){
        document.querySelector(`.video${i+1}`).innerHTML = ``
    
    }
}

