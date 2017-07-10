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


    $('#postCharacterForm').submit((theEvent) => {
      // the 1st argument of any event callback (click, submit, scroll, etc.),
      // is an "Event" object.

      // Use the "Event" object to prevent
      // the normal form submission page refresh
        theEvent.preventDefault();

        // retrieve what the user typed in the inputs (the input values)
        const characterInfo = {
          name: $('#postCharacterName').val(),
          occupation: $('#postCharacterOccupation').val(),
          weapon: $('#postCharacterWeapon').val()
        };

        postCharacterInfo(characterInfo);
    });


    $('#updateForm').submit((theEvent) => {
        theEvent.preventDefault();

        // retrieve what the user typed in the inputs (the input values)
        const updatedInfo = {
          name: $('#updateName').val(),
          weapon: $('#updateWeapon').val(),
          occupation: $('#updateOccupation').val()
        };

        // retrieve the character id from the input
        const characterId = $('#updateCharacterId').val();

        // call the function that makes the AJAX request
        updateCharacter(characterId, updatedInfo);
    });
});




function updateCharacter (myId, newInfo) {
    $.ajax({
      url: 'https://ih-api.herokuapp.com/characters/' + myId,
      method: 'PATCH',

      // the "data" setting is only used
      // when you need to send extra info to the API
      data: newInfo,
          // "newInfo" is an object that contains:
          // "name", "occupation" & "weapon" properties

      success: (responseFromApi) => {
          alert('UPDATE SUCCESS! 😺');
          console.log(responseFromApi);
      },
      error: (errorFromApi) => {
          alert('Sorry! Update error. 😤');
          console.log(errorFromApi);
      }
    });
}




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
