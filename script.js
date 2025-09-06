
const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => showLevel(data.data));
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner-box").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spinner-box").classList.add("hidden");
  }
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};
const showLevel = (levels) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let level of levels) {
    const div = document.createElement("div");

    div.innerHTML = `<button id="lesson-btn-${level.level_no}" onclick='loadWord(${level.level_no})' class="btn btn-outline btn-primary lesson-btn" id="load-btn"><i class="fa-solid fa-book"></i> Lesson - ${level.level_no} </button>`;

    levelContainer.appendChild(div);
  }
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const detail = await res.json();
  showWordDetail(detail.data);
};
const showWordDetail = (word) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `<div>
                    <h2 class="text-2xl font-bold">${
                      word.word
                    } (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })</h2>
                </div>
                <div>
                    <p class="font-bold">Meaning</p>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <p class="font-bold">Example</p>
                    <p>${word.sentence}</p>
                </div>
                <div class="font-bold">
                    <div >${createElement(word.synonyms)}</div>
                    
                </div>`;
  console.log(word);
  document.getElementById("word_modal").showModal();
};
const createElement = (arr) => {
  const synElement = arr.map((el) => `<span class="btn">${el}</span>`);
  return synElement.join(" ");
};


const loadWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActive();
      const lessonBtn = document.getElementById(`lesson-btn-${id}`);
      lessonBtn.classList.add("active");

      showWord(data.data);
    });
};

const showWord = (words) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (words.length === 0) {
    cardContainer.innerHTML = `<div class="mx-auto col-span-full text-center space-y-3">
                <div>
                    <img src="assets/alert-error.png" alt="" class="mx-auto">
                </div>
                <div class="space-y-5">
                    <p class="text-lg text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <p class="text-4xl font-semibold">নেক্সট Lesson এ যান</p>
                </div>
            </div>`;
            manageSpinner(false)
    return;
  }
  words.forEach((word)=>{
    const div = document.createElement("div");
    div.innerHTML = `<div class=" card h-[300px] flex flex-col justify-center   rounded-lg
        p-10 text-center bg-white">
               <h2 class="mb-2 text-xl font-bold">${
                 word.word ? word.word : "শব্দ পাওয়া যায় নি"
               }</h2>
               <p class="mb-3">Meaning/Pronunciation</p>
               <p class="mb-3 text-xl font-semibold">${
                 word.meaning ? word.meaning : "অর্থ খোঁজে পাওয়া যায় নি "
               }/${
      word.pronunciation ? word.pronunciation : "উচ্চারণ খুঁজে পাওয়া যায় নি"
    }</p>                 <div class="btn-container flex justify-between">
                  <button onclick="loadWordDetails(${
                    word.id
                  })" class="btn btn-outline  bg-sky-100 hover:bg-sky-600"><i class="fa-solid fa-circle-info"></i></button>                  
                  <button onclick=pronounceWord('${word.word}') class="btn btn-outline bg-sky-100 hover:bg-sky-600">
                  <i class="fa-solid fa-volume-high "></i></button>
              </div>          
            </div>`;
    cardContainer.appendChild(div);
  })
  manageSpinner(false);
};
loadLessons();
