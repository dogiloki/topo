class Util{

	static modal(content,visible=-1){
		content.style.display=(visible==-1)?
							((content.style.display=="none")?"":"none"):
							(visible)?"":"none";
	}

	static estaRango(posi,min,max){
		return posi>=min && posi<=max;
	}

	static numeroAleatorio(max,min=0){
		return Math.round(Math.random()*(max-min)+min);
	}

}