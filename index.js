const constraints = {
  audio: false,
  video: {
    width: 250, height: 200
  }
};
let stream;
var topLayoutNumber = 2;

async function init() {
  stream = await navigator.mediaDevices.getUserMedia(constraints);
}

init();

function sleep(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

function setRandomPosition(item) {
  var maxWidth = $(".date")[0].clientWidth - 250;
  var maxHeight = $(".date")[0].clientHeight - 250;
  var randPosX = Math.floor(Math.random() * maxWidth);
  var randPosY = Math.floor(Math.random() * maxHeight);

  let newItem = $(item).css("top", randPosY);
  newItem = $(newItem).css("left", randPosX);
  newItem = $(newItem).css("z-index", topLayoutNumber);
  return newItem;
}

function setDraggable(item) {
  $(item).draggable({
    containment: ".date",
    scroll: false,
    start: function () {
      topLayoutNumber += 1;
      $(this).css("z-index", topLayoutNumber);
    },
  });
}

async function addPhoto(i) {
  let item =
    $(`<div data-aos="zoom-in" class="photo absolute p-5 shadow bg-white rounded w-64">
  <img src="./photos/${i}.jpg" alt="" class="" />
 </div>`);
  item = setRandomPosition(item);
  await sleep(300);
  $(".date").append(item);
  setDraggable(item);
}

async function addVideo() {
  let item =
    $(`<div class="video p-5 shadow bg-white rounded" style="width: 240px; top: 200px; left: 400px">
    <video id="video" playsinline autoplay></video>
    <p class="phrase mt-2">Eres tu la mujer que yo amo</p>
  </div>`);
  item = setRandomPosition(item);
  await sleep(300);
  $(".date").append(item);
  setDraggable(item);
  await sleep(300);
  const video = document.getElementById('video');
  window.stream = stream;
  video.srcObject = stream;
}

$("#letterBtn").on("click", async function () {
  await sleep(1100);
  for (var i = 1; i <= 55; i++) {
    await addPhoto(i);
  }
  await addVideo();
  $(".date_content").removeClass("hidden");
});

$(".photo").on("click", function () {
  topLayoutNumber += 1;
  $(this).css("z-index", topLayoutNumber);
});