import SearchBar from "../Components/SearchBar/SearchBar";

const clientId = "66f08345d8f04327ab81ba60fe669488";
const redirectUri = "http://localhost:3000/";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expireInMatch) {
      accessToken = accessTokenMatch[1];
      const expireIn = Number(expireInMatch[1]);
      // This clears the parameters, allowing us to grab a new access token when it expires.
      window.setTimeout(() => (accessToken = ""), expireIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  }
};

export default Spotify;
