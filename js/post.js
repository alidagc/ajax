console.log('post.js is linked!');


$(document).ready(() => {
    console.log('Page is ready');

    $('#postWalle').click((theEvent) => {
        const walleInfo = {
          name: 'WALL-E',
          occupation: 'Waste Allocation Robot',
          weapon: 'Head laser'
        };

        postCharacterInfo(walleInfo);
    });
});


function postCharacterInfo (newCharacterDetails) {
  // Post data to the characters API
  $.ajax({  // 1st argument -> giant settings object
            // Minimum 4 settings: "url", "method", "success" & "error".
      url: 'https://ih-api.herokuapp.com/characters',
      method: 'POST',

      // the "data" setting is only used
      // when you need to send extra info to the API
      data: newCharacterDetails,
          // "newCharacterDetails" is an object that contains:
          // "name", "occupation" & "weapon" properties

      // if successful, put the data on the screen (DOM manipulation)
      success: (responseFromApi) => {
          console.log('POSTED WALL-E! Yes! 🤠');
          console.log(responseFromApi);

          $('#characterList').append(`
              <li>
                <h3> ${responseFromApi.name} </h3>
                <p> Id: ${responseFromApi.id} </p>
              </li>
          `);
      },

      // if error, show error feedback (DOM manipulation)
      error: (errorFromApi) => {
          alert('Sorry! Character POST error. 😱');
          console.log(errorFromApi);
      }
  });
}
