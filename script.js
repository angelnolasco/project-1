let  userInput;

// my variables & data
const $artistName = $('#artist-name');
const $artistFollowers = $('#artist-followers');
const $artistImage = $('#artist-image');
const $artistDescription = $('#artist-description');
const $input = $('input[type="text"]');

$('form').on('submit', handleGetData)

// this makes the get artist button work

function handleGetData(event) {
  event.preventDefault()
  userInput = $input.val()



// searchs for arttist ids in spotifys platform
  const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spotify23.p.rapidapi.com/search/?q="+ userInput + "&type=artists&offset=0&limit=10&numberOfTopResults=5",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "4e3f0efb5cmsh7c52f7735407baap165ef7jsn4a71521fc2ab",
		"X-RapidAPI-Host": "spotify23.p.rapidapi.com"
	}
};

// searches for artist image , followers & desciption
  $.ajax(settings)
    .done(function (response) {
      console.log(response);
     const artisturi = response.artists.items[0].data.uri.split(':')[2]
      

      const artistsSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spotify23.p.rapidapi.com/artist_overview/?id="+artisturi,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "4e3f0efb5cmsh7c52f7735407baap165ef7jsn4a71521fc2ab",
            "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
        }
    };


    // all the data for the artists
    $.ajax(artistsSettings).done(function (artistResponse) {
       $artistName.text(artistResponse.data.artist.profile.name)
       $artistDescription.html(artistResponse.data.artist.profile.biography.text) 
       $artistFollowers.text(artistResponse.data.artist.stats.followers)
       $artistImage.attr('src',artistResponse.data.artist.visuals.avatarImage.sources[1].url)
    });
    })


    .fail(function (xhr, status, error) {
      console.log('Error:', error);
    })
}