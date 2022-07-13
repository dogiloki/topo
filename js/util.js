class Util{

	static modal(content,visible=-1){
		content.style.display=(visible==-1)?
							((content.style.display=="none")?"":"none"):
							(visible)?"":"none";
	}

}