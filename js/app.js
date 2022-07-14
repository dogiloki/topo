// Variables del del juego
var content_inicio=document.getElementById('content-inicio');
var content_juego=document.getElementById('content-juego');
var content_hoyos=document.getElementById('content-hoyos');
var content_puntos=document.getElementById('content-puntos');
var content_tiempo=document.getElementById('content-tiempo');
var template_hoyo=document.getElementById('template-hoyo').content;
var icon_salir=document.getElementById('icon-salir');
var icon_audio=document.getElementById('icon-audio');
var icon_mazo=document.getElementById('icon-mazo');
var content_mazo=document.getElementById('content-mazo');
var audio_musica=document.getElementById("audio-musica");
var audio_toque=document.getElementById("audio-toque");
var btn_jugar=document.getElementById("btn-jugar");
var btn_aceptar=document.getElementById("btn-aceptar");
var hoyos=[];
var puntos=0;
var tiempo_mostrar, tiempo_ocultar, tiempo_total, tiempo_actual=0;

// Variables de puntaje
var content_puntaje_obtenido=document.getElementById('content-puntaje-obtenido');
var caja_nombre=document.getElementById("caja-nombre");
var puntaje_obtenido=document.getElementById("content-puntaje");
var content_puntajes=document.getElementById("puntajes");

// Variable de configuracion
var config={
	dificultad:{
		facil:document.getElementById('config-facil'),
		medio:document.getElementById('config-medio'),
		dificil:document.getElementById('config-dificil'),
		personalizado:document.getElementById('config-personalizado')
	},
	fila:document.getElementById('config-fila'),
	columna:document.getElementById('config-columna'),
	cantidad:document.getElementById('config-cantidad'),
	mostrar_min:document.getElementById('config-mostrar-min'),
	mostrar_max:document.getElementById('config-mostrar-max'),
	ocultar_min:document.getElementById('config-ocultar-min'),
	ocultar_max:document.getElementById('config-ocultar-max')
}

window.addEventListener("DOMContentLoaded",()=>{
	this.icon_salir.src=Diccionario.icon.salir;
	this.icon_audio.src=Diccionario.icon.audio;
	this.icon_mazo.src=Diccionario.icon.mazo;
	this.audio_musica.src=Diccionario.audio.musica;
	this.audio_musica.loop=true;
	this.audio_toque.src=Diccionario.audio.toque;
	
	// Agregar eventos
	document.getElementsByName("dificultad").forEach((elemento)=>{
		elemento.addEventListener("change",()=>{
			switch(elemento.getAttribute("id")){
				case "config-facil": Config.dificultad.set(1); break;
				case "config-medio": Config.dificultad.set(2); break;
				case "config-dificil": Config.dificultad.set(3); break;
				case "config-personalizado": Config.dificultad.set(0); Config.config.set(); break;
			}
			this.getConfig();
		});
	});
	this.config.fila.addEventListener("keyup",()=>{
		if(Util.esNumero(this.config.fila.value) && !Util.esDecimal(this.config.fila.value)){
			Config.personalizado.hoyos.fila=Number(this.config.fila.value);
			Config.dificultad.set(0);
			Config.config.set();
			this.config.dificultad.personalizado.setAttribute("checked",true);
		}else{
			this.config.fila.value="";
		}
	});
	this.config.columna.addEventListener("keyup",()=>{
		if(Util.esNumero(this.config.columna.value) && !Util.esDecimal(this.config.columna.value)){
			Config.personalizado.hoyos.columna=Number(this.config.columna.value);
			Config.dificultad.set(0);
			Config.config.set();
			this.config.dificultad.personalizado.setAttribute("checked",true);
		}else{
			this.config.columna.value="";
		}
	});
	this.config.cantidad.addEventListener("keyup",()=>{
		if(Util.esNumero(this.config.cantidad.value) && !Util.esDecimal(this.config.cantidad.value)){
			Config.personalizado.topo.cantidad=Number(this.config.cantidad.value);
			Config.dificultad.set(0);
			Config.config.set();
			this.config.dificultad.personalizado.setAttribute("checked",true);
		}else{
			this.config.cantidad.value="";
		}
	});
	this.config.mostrar_min.addEventListener("keyup",()=>{
		if(Util.esNumero(this.config.mostrar_min.value)){
			Config.personalizado.topo.tiempo.mostrar.min=Number(this.config.mostrar_min.value)*1000;
			Config.dificultad.set(0);
			Config.config.set();
			this.config.dificultad.personalizado.setAttribute("checked",true);
		}else{
			this.config.mostrar_min.value="";
		}
	});
	this.config.mostrar_max.addEventListener("keyup",()=>{
		if(Util.esNumero(this.config.mostrar_max.value)){
			Config.personalizado.topo.tiempo.mostrar.max=Number(this.config.mostrar_max.value)*1000;
			Config.dificultad.set(0);
			Config.config.set();
			this.config.dificultad.personalizado.setAttribute("checked",true);
		}else{
			this.config.mostrar_max.value="";
		}
	});
	this.config.ocultar_min.addEventListener("keyup",()=>{
		if(Util.esNumero(this.config.ocultar_min.value)){
			Config.personalizado.topo.tiempo.ocultar.min=Number(this.config.ocultar_min.value)*1000;
			Config.dificultad.set(0);
			Config.config.set();
			this.config.dificultad.personalizado.setAttribute("checked",true);
		}else{
			this.config.ocultar_min.value="";
		}
	});
	this.config.ocultar_max.addEventListener("keyup",()=>{
		if(Util.esNumero(this.config.ocultar_max.value)){
			Config.personalizado.topo.tiempo.ocultar.max=Number(this.config.ocultar_max.value)*1000;
			Config.dificultad.set(0);
			Config.config.set();
			this.config.dificultad.personalizado.setAttribute("checked",true);
		}else{
			this.config.ocultar_max.value="";
		}
	});
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

caja_nombre.addEventListener("keydown",(evt)=>{
	if(evt.keyCode==13){
		this.guardarPuntaje();
	}
});
icon_salir.addEventListener("click",()=>{
	this.mostrarPuntaje();
});
icon_audio.addEventListener("click",()=>{
	this.musica(true);
});
content_mazo.addEventListener("mousedown",(evt)=>{
	this.audio_toque.currentTime=0;
	this.audio_toque.play();
	this.icon_mazo.style.transform="rotateZ(-90deg) rotateY(-45deg)";
	// console.log(evt.clientX," - ",evt.clientY);
	// console.log(this.puntos);
	this.hoyos.forEach((hoyo)=>{
		let x=this.content_hoyos.offsetLeft+hoyo.obj.offsetLeft;
		let y=this.content_hoyos.offsetTop+hoyo.obj.offsetTop;
		if(Util.estaRango(evt.clientX,x,x+hoyo.obj.offsetWidth) &&
			Util.estaRango(evt.clientY,y,y+hoyo.obj.offsetHeight)){
			if(hoyo.img.getAttribute("src")==Diccionario.icon.topo){
				hoyo.img.setAttribute("src",Diccionario.icon.hoyo);
				this.puntos++;
				this.content_puntos.innerHTML=puntos;
			}else{
				this.tiempo_actual-=Config.tiempo.fallo.get()/1000;
				this.content_tiempo.innerHTML=this.tiempo_actual;
				if(this.tiempo_actual<=0){
					clearInterval(this.tiempo_total);
					this.mostrarPuntaje();
				}
			}
		}
	});
});
content_mazo.addEventListener("mouseup",()=>{
	this.icon_mazo.style.transform="rotateZ(0deg) rotateY(0deg)";
});
btn_jugar.addEventListener("click",()=>{
	this.juego();
});
btn_aceptar.addEventListener("click",()=>{
	this.guardarPuntaje();
});

function getConfig(){
	switch(Config.dificultad.get()){
		case 0: this.config.dificultad.personalizado.setAttribute("checked",true); break;
		case 1: this.config.dificultad.facil.setAttribute("checked",true); break;
		case 2: this.config.dificultad.medio.setAttribute("checked",true); break;
		case 3: this.config.dificultad.dificil.setAttribute("checked",true); break;
	}
	let datos=Config.config.get();
	Config.hoyos=datos.hoyos;
	Config.topo=datos.topo;
	this.config.fila.value=datos.hoyos.fila;
	this.config.columna.value=datos.hoyos.columna;
	this.config.cantidad.value=datos.topo.cantidad;
	this.config.mostrar_min.value=datos.topo.tiempo.mostrar.min/1000;
	this.config.mostrar_max.value=datos.topo.tiempo.mostrar.max/1000;
	this.config.ocultar_min.value=datos.topo.tiempo.ocultar.min/1000;
	this.config.ocultar_max.value=datos.topo.tiempo.ocultar.max/1000;
}

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
	clearTimeout(this.tiempo_mostrar);
	clearTimeout(this.tiempo_ocultar);
	clearInterval(this.tiempo_total);
	this.audio_musica.pause();
	this.getConfig();
	this.puntos=0;
	this.hoyos=[];
	this.tiempo_actual=Config.tiempo.total.get()/1000;
	this.content_hoyos.innerHTML="";
	this.content_puntos.innerHTML=puntos;
	this.content_tiempo.innerHTML=this.tiempo_actual;
	Util.modal(content_juego,false);
	Util.modal(content_puntaje_obtenido,false);
	Util.modal(content_inicio,true);
	this.obtenerPuntajes();
}

async function juego(){
	Util.modal(content_inicio,false);
	Util.modal(content_juego,true);
	await this.generarHoyos();
	this.musica();
	for(let a=0; a<Config.topo.cantidad; a++){
		this.generarTopo();
		console.log("topo"+a);
	}
	this.tiempo_total=setInterval(()=>{
		this.tiempo_actual--;
		this.content_tiempo.innerHTML=this.tiempo_actual;
		if(this.tiempo_actual<=0){
			clearInterval(this.tiempo_total);
			this.mostrarPuntaje();
		}
	},1000);
}

function generarHoyos(){
	let ancho_total=this.content_hoyos.offsetWidth;
	let alto_total=this.content_hoyos.offsetHeight;
	let ancho=(ancho_total/Config.hoyos.columna);
	let alto=(alto_total/Config.hoyos.fila);
	let conta=0, x_temp=0, y_temp=0;
	for(let a=0; a<Config.hoyos.fila; a++){
		x_temp=0;
		for(let b=0; b<Config.hoyos.columna; b++){
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
			x_temp+=ancho_total/Config.hoyos.columna;
			let obj_hoyo=new Hoyo();
			obj_hoyo.obj=hoyo;
			obj_hoyo.img=img;
			this.hoyos.push(obj_hoyo);
		}
		y_temp+=alto_total/Config.hoyos.fila;
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
		},Config.topo.tiempo.ocultar.get());
	},Config.topo.tiempo.mostrar.get());
}

function mostrarPuntaje(){
	this.audio_musica.pause();
	Util.modal(content_juego,false);
	Util.modal(content_puntaje_obtenido,true);
	this.caja_nombre.value="Jugador "+(Number((Puntaje.puntajes()??[]).length)+1);
	this.caja_nombre.focus();
	this.caja_nombre.select();
	this.puntaje_obtenido.innerHTML=this.puntos;
}

function obtenerPuntajes(){
	this.content_puntajes.innerHTML="";
	(Puntaje.puntajes()??[]).sort((a,b)=>{
		return (a.puntos>b.puntos)?-1:(a.puntos<b.puntos)?1:0;
	}).forEach((dato)=>{
		let puntaje=document.createElement("li");
		puntaje.innerHTML=`${dato.nombre} - ${dato.puntos}`;
		this.content_puntajes.appendChild(puntaje);
	});
}

function guardarPuntaje(){
	let datos={
		puntos: this.puntos,
		nombre: this.caja_nombre.value,
		dificultad: Config.dificultad.get()
	}
	Puntaje.agregar(datos);
	this.inicio();
}