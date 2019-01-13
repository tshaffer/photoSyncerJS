// Enter an API key from the Google API Console:
//   https://console.developers.google.com/apis/credentials
var apiKey = 'AIzaSyABn_1PDqgscMgwZwIQBbVLIIkcIAZXqWk';

// Enter the API Discovery Docs that describes the APIs you want to
// access. In this example, we are accessing the People API, so we load
// Discovery Doc found here: https://developers.google.com/people/api/rest/
var discoveryDocs = ["https://photoslibrary.googleapis.com/$discovery/rest?version=v1"];

// Enter a client ID for a web application from the Google API Console:
//   https://console.developers.google.com/apis/credentials?project=_
// In your API Console project, add a JavaScript origin that corresponds
//   to the domain where you will be running the script.
var clientId = '761277743420-torvm7prpbm88g9v1fmbk9lfvnqrklub.apps.googleusercontent.com';

// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details.
var scopes = 'https://www.googleapis.com/auth/photoslibrary.readonly';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

function handleClientLoad() {
  // Load the API client and auth2 library
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
      apiKey: apiKey,
      discoveryDocs: discoveryDocs,
      clientId: clientId,
      scope: scopes
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    console.log('make api call');
    makeApiCall();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  console.log(gapi);

  console.log('invoke albums.list()');

  gapi.client.photoslibrary.albums.list().then(function(resp) {
    console.log('list response:');
    console.log(resp);
  });

  console.log('invoke albums.get()');
  gapi.client.photoslibrary.albums.get({
    albumId: 'AEEKk91HDRStKfdzzGDMIo_9bHEKfVk5jpo49EUAor7P8bWD_WmakobXa39G1YhIG6DRMpG0TXRd'
  }).then(function(resp) {
    console.log('get album response:');
    console.log(resp);
  });

  console.log('invoke mediaItems.search');
  gapi.client.photoslibrary.mediaItems.search({
    albumId: 'AEEKk91HDRStKfdzzGDMIo_9bHEKfVk5jpo49EUAor7P8bWD_WmakobXa39G1YhIG6DRMpG0TXRd'
  }).then(function(resp) {
    console.log('get mediaItems.search response:');
    console.log(resp);
  });
}
