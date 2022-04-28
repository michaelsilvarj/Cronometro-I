//Função anonima encurtadora de comandos
const qS = (el)=>document.querySelector(el);
const qSA = (el)=>document.querySelectorAll(el);


//Início da função
function aplicativo(){

    const song = qS('.song');
    const play = qS('.play');
    const outline = qS('.move-outline circle');
    const video = qS('.vid-container video');

    //som
    const sounds =  qSA('.sound-picker button');

    //Display do tempo
    const timeDisplay = qS('.time-display');
    const timeSelect = qSA('.time-select button');

    //Captura o tamanho do circulo externo 
    const outlineLength = outline.getTotalLength();
    //console.log(outlineLength);
   
    // duração 
    let fakeDuration = 0;

    outline.style.strokeDasharray = outlineLength; 
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = `${fixZero(Math.floor(fakeDuration / 3600))}:${fixZero
        (Math.floor(fakeDuration / 60))}:${fixZero(Math.floor(
        fakeDuration % 60))}`;

    // Escolher sons diferentes
    sounds.forEach(sound=>{
        sound.addEventListener('click',function (){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song); //*
        })
    });

    // Play sounds
    play.addEventListener("click", function() {
        checkPlaying(song);
      });

    // seleção do tempo
    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
          fakeDuration = this.getAttribute("data-time");
          if (Math.floor(fakeDuration / 3600) >= 1){
            timeDisplay.textContent = `${fixZero(Math.floor(fakeDuration / 3600))}:${fixZero
                (Math.floor(fakeDuration / 60)-60)}:${fixZero(Math.floor(
                fakeDuration % 60))}`;
          } else {
            timeDisplay.textContent = `${fixZero(Math.floor(fakeDuration / 3600))}:${fixZero
                (Math.floor(fakeDuration / 60))}:${fixZero(Math.floor(
                fakeDuration % 60))}`;
          }
          
        });
    });

    // Função responsável por tocar e parar o audio
    const checkPlaying = song => {
        if (song.paused) {
          song.play();
          video.play();
          play.src = "./svg/pause.svg";
        } else {
          song.pause();
          video.pause();
          play.src = "./svg/play.svg";
        }
      };

   //Função para a animação do circulo

   song.ontimeupdate = function() {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;    
    let seconds = Math.floor(elapsed % 60);    
    let minutes = Math.floor(elapsed / 60);
    let hour = Math.floor(elapsed /3600);
    timeDisplay.textContent = `${fixZero(hour)}:${fixZero(minutes)}:${fixZero(seconds)}`;
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
  
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };


}
function fixZero(time){

    return time <10 ? `0${time}`: time;
    
    }
aplicativo();