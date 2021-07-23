const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
var mediaRecorder
// Options for getDisplayMedia()

var displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: false
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function(evt) {
  startCapture();
}, false);

stopElem.addEventListener("click", function(evt) {
  stopCapture();
}, false);

async function startCapture() {
  
  try {
    let media = await navigator.mediaDevices.getDisplayMedia({
        audio: true, 
        video: { mediaSource: "screen"}
    });
    mediaRecorder = createRecorder(media,"video/webm")
	videoElem.srcObject = media
  } catch(err) {
    console.error("Error: " + err);
  }
}

function createRecorder (stream, mimeType) {
  // the stream data is stored in this array
  let recordedChunks = []; 

  const Recorder = new MediaRecorder(stream);

  Recorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }  
  };
  Recorder.onstop = function () {
     saveFile(recordedChunks);
     recordedChunks = [];
  };
  Recorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
  return Recorder;
}


function stopCapture(evt) {
  // let tracks = videoElem.srcObject.getTracks();
  // tracks.forEach(track => track.stop());
  // videoElem.srcObject = null;
  mediaRecorder.stop()
}

function saveFile(recordedChunks){
	console.log(recordedChunks)
   const blob = new Blob(recordedChunks, {
      type: 'video/webm\;codecs=h264'
    });
    let filename = window.prompt('Enter file name'),
        downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.webm`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(blob); // clear from memory
    document.body.removeChild(downloadLink);
}












