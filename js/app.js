var content_inicio=document.getElementById('content-inicio');
var content_juego=document.getElementById('content-juego');
var content_hoyos=document.getElementById('content-hoyos');
var template_hoyo=document.getElementById('template-hoyo').content;
var icon_audio=document.getElementById('icon-audio');
var icon_mazo=document.getElementById('icon-mazo');
var content_mazo=document.getElementById('content-mazo');
var audio_musica=document.getElementById("audio-musica");
var audio_toque=document.getElementById("audio-toque");
var btn_jugar=document.getElementById("btn-jugar");
var hoyos=[];
var puntos=0;
var tiempo_mostrar, tiempo_ocultar;

window.addEventListener("DOMContentLoaded",()=>{
	this.icon_audio.src=Diccionario.icon.audio;
	this.icon_mazo.src=Diccionario.icon.mazo;
	this.audio_musica.src=Diccionario.audio.musica;
	this.audio_musica.loop=true;
	this.audio_toque.src=Diccionario.audio.toque;
	this.inicio();
});
window.addEventListener("mousemove",(evt)=>{
	if(Util.estaRango(evt.clientX,this.content_hoyos.offsetLeft,this.content_hoyos.offsetLeft+this.content_hoyos.offsetWidth) &&
		Util.estaRango(evt.clientY,this.content_hoyos.offsetTop,this.content_hoyos.offsetTop+this.content_hoyos.offsetHeight)){
		this.mazo(true);
		this.content_mazo.style.left=(evt.clientX-this.content_mazo.offsetWidth/2)+"px";
		this.content_mazo.style.top=(evt.clientY-this.content_mazo.offsetHeight/2)+"px";
	}else{
		this.mazo(false);
	}
});

icon_audio.addEventListener("click",()=>{
	this.musica(true);
});
content_mazo.addEventListener("mousedown",(evt)=>{
	this.audio_toque.currentTime=0;
	this.audio_toque.play();
	this.icon_mazo.style.transform="rotateZ(-90deg) rotateY(-45deg)";
	console.log(evt.clientX," - ",evt.clientY);
	this.hoyos.forEach((hoyo)=>{
		let x=this.content_hoyos.offsetLeft+hoyo.obj.offsetLeft;
		let y=this.content_hoyos.offsetTop+hoyo.obj.offsetTop;
		if(Util.estaRango(evt.clientX,x,x+hoyo.obj.offsetWidth) &&
			Util.estaRango(evt.clientY,y,y+hoyo.obj.offsetHeight) &&
			hoyo.img.getAttribute("src")==Diccionario.icon.topo){
			hoyo.img.setAttribute("src",Diccionario.icon.hoyo);
			this.puntos++;
		}
	});
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

function mazo(mostrar=true){
	Util.modal(content_mazo,mostrar);
	document.body.style.cursor=(mostrar)?"none":"default";
}

function inicio(){
	this.puntos=0;
	this.hoyos=[];
	Util.modal(content_inicio,true);
	Util.modal(content_juego,false);
}

async function juego(){
	Util.modal(content_inicio,false);
	Util.modal(content_juego,true);
	await this.generarHoyos();
	this.musica();
	for(let a=0; a<Diccionario.topo.cantidad; a++){
		this.generarTopo();
	}
}

function generarHoyos(){
	let ancho_total=this.content_hoyos.offsetWidth;
	let alto_total=this.content_hoyos.offsetHeight;
	let ancho=(ancho_total/Diccionario.hoyos.columna);
	let alto=(alto_total/Diccionario.hoyos.fila);
	let conta=0, x_temp=0, y_temp=0;
	for(let a=0; a<Diccionario.hoyos.fila; a++){
		x_temp=0;
		for(let b=0; b<Diccionario.hoyos.columna; b++){
			let content_hoyo=this.template_hoyo.cloneNode(true);
			let hoyo=content_hoyo.getElementById("hoyo");
			let img=content_hoyo.getElementById("img");
			let x=x_temp;
			let y=y_temp;
			hoyo.removeAttribute("id");
			hoyo.style.left=(x_temp*80/ancho_total)+"vw";
			hoyo.style.top=(y_temp*80/alto_total)+"vh";
			img.style.width=(ancho*80/ancho_total)+"vw";
			img.style.height=(alto*80/alto_total)+"vh";
			img.setAttribute("src",Diccionario.icon.hoyo);
			img.setAttribute("id","hoyo"+conta);
			this.content_hoyos.appendChild(content_hoyo);
			conta++;
			x_temp+=ancho_total/Diccionario.hoyos.columna;
			let obj_hoyo=new Hoyo();
			obj_hoyo.obj=hoyo;
			obj_hoyo.img=img;
			this.hoyos.push(obj_hoyo);
		}
		y_temp+=alto_total/Diccionario.hoyos.fila;
	}
	return;
}

function generarTopo(){
	let img;
	do{
		img=this.hoyos[Util.numeroAleatorio(this.hoyos.length-1)].img;
	}while(img.getAttribute("src")==Diccionario.icon.topo);
	this.tiempo_mostrar=setTimeout(()=>{
		img.setAttribute("src",Diccionario.icon.topo);
		this.tiempo_ocultar=setTimeout(()=>{
			img.setAttribute("src",Diccionario.icon.hoyo);
			generarTopo();
		},Util.numeroAleatorio(Diccionario.topo.tiempo.ocultar.min,Diccionario.topo.tiempo.ocultar.max));
	},Util.numeroAleatorio(Diccionario.topo.tiempo.mostrar.min,Diccionario.topo.tiempo.mostrar.max));
}