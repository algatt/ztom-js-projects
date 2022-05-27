const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
  VoiceRSS.speech({
    key: "085cba83e64248559b80a1a437cbde11",
    src: jokeString,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    toggleButton();
    tellMe(joke);
  } catch (error) {
    console.log(`Joke Error : ${error}`);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
