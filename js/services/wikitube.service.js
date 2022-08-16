const CACHE_KEY = 'videosDB'
var gCache = loadFromStorage(CACHE_KEY) ||{}


function getVideo(value){
    if(gCache[value]){
        return Promise.resolve(gCache[value]) 
    }
  return  axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyBNYE1N-RH4lspHbvSwxyFLutsHXsCSJVo&q=${value}`)
  .then(res => res.data.items).then(res => {
    var prm =  res.map(video=>getVideoInfo(video))
    console.log(prm);
    gCache[value] = prm
    saveToStorage(CACHE_KEY,gCache)
    return prm
  })
}


function getVideoInfo(video){
   return {id:video.id.videoId, thumbnail:video.snippet.thumbnails.default.url,name:video.snippet.title}
}

function getWiki(value){
  return  axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&
    srsearch=${value}&format=json`).then(res=> getWikiInfo(res))

}

function getWikiInfo(res){
    return {title:res.data.query.search[0].title,desc:res.data.query.search[0].snippet}
}

