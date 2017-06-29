var $role = $(".chooseHero")
var $img = $(".role-preview")
var $descrip = $("#pTag")
var $descriptionText = $("data.data.results[i]")
var $imgPhoto = $("#imgTag")
var $comicImage = $(".comicImg")
var $comics = $(".comics")


$role.change(function(event){
  var $selected = $(".chooseHero option:selected")
  var $id = $selected.attr("id")
  var url1 = "https://gateway.marvel.com/v1/public/characters/"
  var url2 = "?apikey=9a0703bf8b52719c00d7bc05796addd9&hash=9169e2818a095dd8912b7b7222b40790&ts=1500829120"
  var fullURL = url1 + $id + url2
  var urlComic = "https://gateway.marvel.com/v1/public/characters/"
  var comicId = $id + "/comics"
  var fullURLComic = urlComic + comicId + url2

 // console.log(fullURLComic);


  $.get(fullURL)
  .then(function (character) {
    var imgExtension = "." + character.data.results[0].thumbnail.extension;
    var imgPath = character.data.results[0].thumbnail.path;
    var image = imgPath + imgExtension;
    var description = character.data.results[0].description;
    var comicVariant = "portrait_xlarge"
    // var comic = character.data.results[0].image + imgExtension

    $descrip.text(description)
    $imgPhoto.attr("src", image)
    // $comicImage.attr("src",comic);

    getComics($id)

    if (!description) {
      $descrip.text(" SORRY, " + " NO DESCRIPTION AVAILABLE ! ")
    }

  })

})

$.get("https://gateway.marvel.com/v1/public/characters?limit=100&offset=0&ts=1500829120&apikey=9a0703bf8b52719c00d7bc05796addd9&hash=9169e2818a095dd8912b7b7222b40790")
.then(function (data) {
    for( var i = 0; i < data.data.results.length; i++){
      $role.append('<option id="' + data.data.results[i].id + '" value="">' + data.data.results[i].name + '</option>')
      // console.log(data)
    }
})
function getComics(id) {
  $.get("https://gateway.marvel.com:443/v1/public/characters/"+ id + "/comics?&apikey=9a0703bf8b52719c00d7bc05796addd9&hash=9169e2818a095dd8912b7b7222b40790&ts=1500829120")
  .then(function (data){
    
    $comics.empty()
    for(var j = 0; j < data.data.results.length; j++){
      $comics.append('<img src="' + data.data.results[j].images[0].path +"/"+ "portrait_xlarge" + "." + data.data.results[j].images[0].extension+ '">')
      console.log($comics)
    }

  })

}
