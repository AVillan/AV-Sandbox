// READ THIS: make sure to create some type of environment file in the same directory as this.
// After doing that create an export line that exports the auth token as a variable named TOKEN
// Finally RUN "source ./<env file name>" to actually export the variables to this file
const token = process.env.TOKEN;

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
async function fetchWebApi(endpoint, method, body) {
  // verify auth token
  try{
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
      method,
      body:JSON.stringify(body)
    });
    return await res.json();
  }
  catch(err){
    console.log("auth token no longer valid");
  }
  
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}

async function getTopTrackIds(){
  const topTracks = await getTopTracks();
  return topTracks?.map(
    ({id}) => id
  );
}

async function logTopTrackIds(){
  const tracks = await getTopTracks();
  console.log("Your top 5 favorite tracks have ids: ");
  console.log(
    tracks?.map(
      ({name, id}) =>
      `${name} has track id ${id}`
    )
  );
}

async function logTopTracks(){
  const topTracks = await getTopTracks();
  console.log("Your top 5 favorite tracks: ");
  console.log(
    topTracks?.map(
      ({name, artists}) =>
        `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
  );
}

// const topTracksIds = [
//   '6uwjDA0Qi6hk8C6lPJIMc9','52apyWv5B0JKYZWGC7yuMe','5uh8m2Lna0Gfk8YGqYVb6d','1E0CZWim9mfwrCkXvieES8','47kEJq44ZBrRBD4gvdCu0v'
// ];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  const topTrackIds = await(getTopTrackIds());
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTrackIds.join(',')}`, 'GET'
  )).tracks;
}

async function logRecommendations(){
  const recommendedTracks = await getRecommendations();
  console.log("Recommended tracks based off your top 5 favorite tracks:");
  console.log(
    recommendedTracks.map(
      ({name, artists}) =>
        `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
  );
}

(async function main () {
  // You can use await inside this function block
  try{
    await logTopTracks();
    await logTopTrackIds();
    await logRecommendations();
  }
  catch(err){
    console.log("short circuited script. Check auth token?");
  }
})();