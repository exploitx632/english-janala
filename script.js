// const loadLessons = () => {
//   const url = "https://openapi.programming-hero.com/api/levels/all";
//   fetch(url)
//     .then((response) => response.json())
//     .then((json) => displayLesson(json.data));
// };

// const displayLesson = (lessons) => {
//   const lessonContainer = document.getElementById("level-container");
//   lessonContainer.innerHTML = "";
//   for (let lesson of lessons) {
//     const div = document.createElement("div");
//     div.innerHTML = `<button onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary"><i class="fa-solid fa-book"></i> Lesson - ${lesson.level_no} </button>`;
//     lessonContainer.appendChild(div);
//   }
// };
// loadLessons();
// const loadLevelWord = (id) => {
//   const url = `https://openapi.programming-hero.com/api/level/${id}`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((word) => showWord(word.data));
// };
// const showWord = (words) => {
//   const card = document.getElementById("card-container");
//   card.innerHTML = "";
//   for (let word of words) {
//     console.log(word);
//     const div = document.createElement("div");
//     div.innerHTML = `<div class=" card h-[300px] flex flex-col justify-center   rounded-md
//         p-10 text-center bg-white">
//                 <h2 class="mb-2 text-xl font-bold">${word.word}</h2>
//                 <p class="mb-3">${word.meaning}</p>
//                 <p class="mb-3 text-xl font-semibold">${word.pronunciation}</p>
//                 <div class="btn-container flex justify-between">

//                     <button class="btn btn-outline  bg-sky-100 hover:bg-sky-600"><i class="fa-solid fa-circle-info"></i></button>
//                     <button class="btn btn-outline bg-sky-100 hover:bg-sky-600"><i class="fa-solid fa-volume-high "></i></button>

//                 </div>
//             </div>`;
//     card.append(div);
//   }
// };

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => showLevel(data.data));
};

const showLevel = (levels) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let level of levels) {
    const div = document.createElement("div");

    div.innerHTML = `<button onclick='loadWord(${level.level_no})' class="btn btn-outline btn-primary" id="load-btn"><i class="fa-solid fa-book"></i> Lesson - ${level.level_no} </button>`;

    levelContainer.appendChild(div);
  }
};

const loadWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showWord(data.data));
};
const showWord = (words) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if(words.length === 0){
    cardContainer.innerHTML = `<div class="mx-auto col-span-full text-center space-y-3">
                <div>
                    <img src="assets/alert-error.png" alt="" class="mx-auto">
                </div>
                <div class="space-y-5">
                    <p class="text-lg text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <p class="text-4xl font-semibold">নেক্সট Lesson এ যান</p>
                </div>
            </div>`
    return;
  }
  for (let word of words) {
    const div = document.createElement("div");
    div.innerHTML = `<div class=" card h-[300px] flex flex-col justify-center   rounded-lg
        p-10 text-center bg-white">
               <h2 class="mb-2 text-xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায় নি'}</h2>
               <p class="mb-3">Meaning/Pronunciation</p>
               <p class="mb-3 text-xl font-semibold">${word.meaning ? word.meaning :'অর্থ খোঁজে পাওয়া যায় নি '}/${word.pronunciation ? word.pronunciation: "উচ্চারণ খুঁজে পাওয়া যায় নি"}</p>                 <div class="btn-container flex justify-between">
                  <button class="btn btn-outline  bg-sky-100 hover:bg-sky-600"><i class="fa-solid fa-circle-info"></i></button>                  <button class="btn btn-outline bg-sky-100 hover:bg-sky-600"><i class="fa-solid fa-volume-high "></i></button>
              </div>          
            </div>`;
    cardContainer.appendChild(div);
  }
};
loadLessons();
