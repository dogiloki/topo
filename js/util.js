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

	static esNumero(texto){
		texto??=" ";
		texto=texto.toString();
		if(texto=="" || texto=="."){ return false; }
		if(texto=="0"){ return true; }
		let decimales=0;
		if(texto[0]=="-"){
			texto=texto.replaceAll("-","");
		}
		for(let a=0; a<texto.length; a++){
			if(texto[a]=="."){
				decimales++;
			}else
			if(parseFloat(texto[a]).toString()=="NaN"){
				return false;
			}
			if(decimales>1){
				return false;
			}
		}
		return true;
	}

	static esDecimal(texto){
		if(Util.esNumero(texto)){
			if(texto%1==0){
				return false;
			}
		}else{
			return false;
		}
		return true;
	}

}