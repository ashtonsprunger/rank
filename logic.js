const optionAEl = document.getElementById("optionA");
const optionBEl = document.getElementById("optionB");
const nextEl = document.getElementById("next");
const doneEl = document.getElementById("done");
const progressEl = document.getElementById("progress");
const resultsEl = document.querySelector("p");
const bodyEl = document.querySelector("body");

nextEl.addEventListener("click", () => {
  nextPerson();
});
doneEl.addEventListener("click", () => {
  showResults();
});
optionAEl.addEventListener("click", () => {
  optionClicked(0);
});
optionBEl.addEventListener("click", () => {
  optionClicked(1);
});

let thingsToRank = [
  ["RIGHT right.", 0],
  ["I knew that!", 0],
  ["Zero points!", 0],
  ["BOB! BOB!!!", 0],
  ["The paper towel needs refilled!", 0],
  ["Jaden likes pizza!", 0],
  ["Ariel!", 0],
  ["Calico!", 0],
  ["*loud sniff*", 0],
  ["BEEAR", 0],
  ["He's not a nice guy!", 0],
];

const rankReset = JSON.parse(JSON.stringify(thingsToRank));

let results = [];

let currentPair = 0;
let done = false;
let currentPerson = 0;

const randomBackground = () => {
  const r = Math.random() * 55 + 200;
  const g = Math.random() * 55 + 200;
  const b = Math.random() * 55 + 200;
  bodyEl.style.backgroundColor = `rgb(${r},${g},${b})`;
};

const displayItems = (pairIndex) => {
  optionAEl.innerHTML = thingsToRank[pairs[pairIndex][0]][0];
  optionBEl.innerHTML = thingsToRank[pairs[pairIndex][1]][0];
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const nextPair = () => {
  if (currentPair < pairs.length - 1) {
    randomBackground();
    currentPair++;
    displayItems(currentPair);
    progressEl.innerHTML = `${currentPair + 1} out of ${pairs.length}`;
  } else {
    // console.log(currentPair, pairs.length);
    nextEl.innerHTML = "NEXT PERSON";
    doneEl.innerHTML = "DONE";
    results.push([currentPerson, JSON.parse(JSON.stringify(thingsToRank))]);
    console.log("RESULTS", results);
    done = true;
    console.log("done");
    // console.log(thingsToRank);
  }
};

const optionClicked = (option) => {
  if (!done) {
    thingsToRank[pairs[currentPair][option]][1]++;
    nextPair();
  } else {
    console.log("DONE!!");
  }
};

const showResults = () => {
  let ob = {};
  let ar = [];
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[0][1].length; j++) {
      if (ob[results[i][1][j][0]]) {
        ob[results[i][1][j][0]] += results[i][1][j][1];
      } else {
        ob[results[i][1][j][0]] = results[i][1][j][1];
      }
    }
  }
  for (let i = 0; i < Object.keys(ob).length; i++) {
    ar.push([Object.keys(ob)[i], ob[Object.keys(ob)[i]]]);
  }
  ar.sort((a, b) => (a[1] > b[1] ? -1 : 1));
  console.log(ar);

  const total = (rankReset.length - 1) * (currentPerson + 1);
  resultsEl.innerHTML = "";
  for (let i = 0; i < ar.length; i++) {
    const span = document.createElement("span");
    const br = document.createElement("br");
    span.innerHTML =
      ar[i][0] +
      " : " +
      ar[i][1] +
      " (" +
      Math.round((ar[i][1] / total) * 100) +
      "%)";
    resultsEl.appendChild(span);
    resultsEl.appendChild(br);
  }
};

const nextPerson = () => {
  currentPerson++;
  currentPair = 0;
  displayItems(currentPair);
  done = false;
  nextEl.innerHTML = "";
  doneEl.innerHTML = "";
  progressEl.innerHTML = `1 out of ${pairs.length}`;
  thingsToRank = JSON.parse(JSON.stringify(rankReset));
};

// generate pairs to compare
const pairs = [];
for (let i = 0; i < thingsToRank.length - 1; i++) {
  for (let j = i; j < thingsToRank.length - 1; j++) {
    pairs.push([i, j + 1]);
  }
}

// shuffle pairs
shuffle(pairs);

// swap some pairs so that order is random
for (let i = 0; i < pairs.length; i++) {
  if (Math.random() > 0.5) {
    const placeHolder = pairs[i][0];
    pairs[i][0] = pairs[i][1];
    pairs[i][1] = placeHolder;
  }
}

progressEl.innerHTML = `1 out of ${pairs.length}`;

displayItems(0);
randomBackground();
