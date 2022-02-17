let musicas = [
    {titulo: "Double Take Slowed - Farizki", src:'./assets/audios/Double Take Slowed - Farizki.mp3'},
    {titulo: "Oh My God - Alec Benjamin", src:'./assets/audios/Oh My God - Alec Benjamin.mp3'},
    {titulo: "Dancing With Your Ghost - Sasha Sloan", src:'./assets/audios/Dancing With Your Ghost - Sasha Sloan.mp3'},
    {titulo: "Happier Than Ever - Billie Eilish", src:'./assets/audios/Happier Than Ever - Billie Eilish.mp3'}
]

let musica = document.querySelector("audio")
var playimg = document.getElementById("play")
let change = false
let musicDuration= document.querySelector("#final")
let titulo = document.querySelector('marquee')
let barra = document.querySelector('#barra')
let i = 0

renderizarMusica(i)

// Eventos
musica.addEventListener('timeupdate', atualizarBarra)
document.querySelector('#voltarMusica').addEventListener('click', voltar_musica); 
document.querySelector('#proximaMusica').addEventListener('click',avancar_musica);
document.querySelector('#diminuirVol').addEventListener('click',diminuirVol)
document.querySelector('#aumentarVol').addEventListener('click',aumentarVol)
document.querySelector('#play').addEventListener('click', play)
barra.addEventListener('click', definirTempo)
barra.addEventListener('touchend', definirTempo)



// Funções ->
function renderizarMusica(index){

    musica.setAttribute('src', musicas[index].src)
    musica.addEventListener("loadeddata", () =>{
        titulo.innerText = musicas[index].titulo;
        musicDuration.textContent= segundoparaminuto(Math.floor(musica.duration - musica.currentTime))
        barra.value = 0
    } )


}
function play(){

    musica.play();
    changeIMG();

}
function pauseM(){
    musica.pause()

}
function atualizarBarra(){


   barra.value = Math.floor(musica.currentTime)

   barra.max =  Math.floor (musica.duration)

   var tempoDecorrido = document.querySelector('#inicio')

   tempoDecorrido.innerText = segundoparaminuto(Math.floor(musica.currentTime))

   musicDuration.textContent= segundoparaminuto(Math.floor(musica.duration - musica.currentTime))

   if (musica.currentTime == musica.duration){
        change = false
       avancar_musica()
   }
  

}
function segundoparaminuto(segundos){

    let campominuto = Math.floor(segundos/60);
    let camposegundos =  segundos % 60;
    if (camposegundos < 10){

        camposegundos = "0" + camposegundos
    }

    return campominuto + ":" +  camposegundos
}
function voltar_musica(){
    i--;
    if(i < 0){
        i = 3
    }
    renderizarMusica(i)
    change = false
    play()
}
function avancar_musica(){
    i++;
    if(i > 3){
        i=0
    }
    renderizarMusica(i)
    change = false
    play()
}
function diminuirVol(){
    musica.volume-=0.1
}
function aumentarVol(){
    musica.volume+=0.1
}
function changeIMG(){

    if (!change){
        playimg.setAttribute('src','./assets/images/pause.png' )
        change = true


      }
      else{
        playimg.setAttribute('src','./assets/images/play.png' )
        change = false
        pauseM()
    }

}
function definirTempo(){
    musica.currentTime = barra.value;
}











