const video = document.getElementById('video');

const constraints = {
  audio: false,
  video: {
    width: 200, height: 150
  }
};

// Access webcam
async function init() {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream)
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}