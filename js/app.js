var content_inicio=document.getElementById('content-inicio');
var icon_audio=document.getElementById('icon-audio');
var icon_mazo=document.getElementById('icon-mazo');
var content_mazo=document.getElementById('content-mazo');
var audio_musica=document.getElementById("audio-musica");
var audio_toque=document.getElementById("audio-toque");
var btn_jugar=document.getElementById("btn-jugar");

window.addEventListener("DOMContentLoaded",()=>{
	this.icon_audio.src=Diccionario.icon.audio;
	this.icon_mazo.src=Diccionario.icon.mazo;
	this.audio_musica.src=Diccionario.audio.musica;
	this.audio_musica.loop=true;
	this.audio_toque.src=Diccionario.audio.toque;
	this.inicio();
});
window.addEventListener("mousemove",(evt)=>{
	this.content_mazo.style.left=(evt.clientX-(this.content_mazo.offsetWidth/2))+"px";
	this.content_mazo.style.top=(evt.clientY-(this.content_mazo.offsetWidth/2))+"px";
});

icon_audio.addEventListener("click",()=>{
	this.musica(true);
});
content_mazo.addEventListener("mousedown",()=>{
	this.icon_mazo.style.transform="rotateZ(-90deg) rotateY(-45deg)";
});
content_mazo.addEventListener("mouseup",()=>{
	this.icon_mazo.style.transform="rotateZ(0deg) rotateY(0deg)";
});
btn_jugar.addEventListener("click",()=>{
	this.juego();
});


function musica(cambio=null){
	if(cambio){
		if(this.icon_audio.getAttribute("src")==Diccionario.icon.audio){
			this.icon_audio.setAttribute("src",Diccionario.icon.audio_mute);
			this.audio_musica.muted=true;
		}else{
			this.icon_audio.setAttribute("src",Diccionario.icon.audio);
			this.audio_musica.muted=false;
		}
	}else{
		this.audio_musica.currentTime=0;
	}
	this.audio_musica.play();
}

function inicio(){
	Util.modal(content_mazo,false);
	document.body.style.cursor="default";
	Util.modal(content_inicio,true);
}

function juego(){
	Util.modal(content_mazo,true);
	document.body.style.cursor="none";
	Util.modal(content_inicio,false);
	this.musica();
}