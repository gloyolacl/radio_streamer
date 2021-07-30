const stationsData = [
  {
    id: 1,
    name: 'Capital FM',
    url : 'https://icecast2.getstreamhosting.com:8050/stream.mp3',
    logo: 'https://seeklogo.com/images/C/capital-fm-kenya-logo-B96EC76277-seeklogo.com.png'
  },

  {
    id: 2,
    name: 'Kiss 100',
    url : 'http://streamingv2.shoutcast.com/kiss100',
    logo: 'https://www.kenyans.co.ke/files/styles/article_style/public/images/media/Kiss%20fm.jpg'
  },

  {
    id: 3,
    name: 'Gheto FM',
    url : 'https://node-18.zeno.fm/t2wky7h647zuv?rj-ttl=5&rj-tok=AAABeukC3m4ArY80_tysT_zfAg',
    logo: 'https://cdn.webrad.io/images/logos/radio-or-ke/ghetto.png'
  },

  {
    id: 4,
    name: 'Classic 105',
    url : 'https://streamingv2.shout.com/classic105fm',
    logo: 'https://cdn.webrad.io/images/logos/radio-or-ke/classic-105.png'
  },

  {
    id: 5,
    name: 'Xfm',
    url : 'https://streamingv2.shoutcast.com/smooth-1055',
    logo: 'https://liveonlineradio.net/wp-content/uploads/2016/09/105.5-XFM-220x108.jpg'
  },

  {
    id: 6,
    name: 'Home Boys Radio',
    url : 'https://node-15.zeno.fm/hhkd1ubrb2zuv.aac?rj-ttl=5&rj-tok=AAABeujbwB0ATMeEBYG45Z7fFQ',
    logo: 'https://cdn.webrad.io/images/logos/radio-or-ke/hbr.png'
  },

  {
    id: 7,
    name: 'NRG',
    url : 'http://main.smanelcast.com:8000/radio.mp3',
    logo: 'https://cdn.onlineradiobox.com/img/l/9/77349.v5.png'
  },
];

//DOM CONSTANTS
const stationsList = document.querySelector('.stations-list');

const player = document.querySelector('.audio-player');

const controlButton = document.querySelector('.playBtn');

const currentChannel = document.querySelector('.current-channel');

const popupMessage = document.querySelector('.popup-message');


//EVENT LISTENERS
//DOM Event listner
document.addEventListener('DOMContentLoaded', ()=>{
  let listHTML = '';

  stationsData.forEach(listItem =>{
    listHTML += `
    <div class="station-list-item" id="${listItem.id}">
      <img src="${listItem.logo}">
      <label>${listItem.name}</label>
    </div>
    `;
  });

  stationsList.innerHTML = listHTML;

  console.log(controlButton);

});

//Offline Event listener
window.addEventListener('offline', event => {
setTimeout(displayPopupMessage, 3000, 'It appears you lost connection');
  });

//Check Offline status
window.addEventListener('online', e => {
  setTimeout(removePopupMessage, 3000);
});

//Stations List event Listner
stationsList.addEventListener('click',e=>{
 if(e.target.classList.contains('station-list-item')){
   const id = e.target.id-1;
   player.setAttribute('autoplay', 'true');
   player.src = stationsData[id].url;
   setCurrentChannelLabel(id);
   playStream();
 }
});

//Control Button EventListener
controlButton.addEventListener('click', e =>{
  if(e.target.classList.contains('fa-play')){
    playStream();
  } else if(e.target.classList.contains('fa-pause')) {
    pauseStream();
  }
  e.preventDefault();
  
});

//FUNCTIONS
//play stream
function playStream(){
  player.play()
    .catch(error=>{
      displayPopupMessage('Sorry, an error occured in playing the audio');
      setTimeout(removePopupMessage(), 3000);
      console.log(error);
    });
  controlButton.classList.remove('fa-play');
  controlButton.classList.add('fa-pause');
}

//pause stream
function pauseStream(){
  player.pause();
  controlButton.classList.add('fa-play');
  controlButton.classList.remove('fa-pause');
}

//change player channel name
function setCurrentChannelLabel(id){
  currentChannel.textContent = stationsData[id].name;
}

function displayPopupMessage(msg){
  popupMessage.innerHTML = msg;
  if(!popupMessage.classList.contains('popup-message-show')){
    popupMessage.classList.add('popup-message-show');
  }

}

function removePopupMessage(){
  popupMessage.classList.remove('popup-message-show');
}

