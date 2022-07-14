class Config{

	static config={
		set:()=>{
			Config.dificultad.set(0);
			localStorage.setItem("config",JSON.stringify(Config.personalizado));
		},
		get:()=>{
			switch(Config.dificultad.get()){
				case 0: return Config.personalizado; break;
				case 1: return Config.facil; break;
				case 2: return Config.medio; break;
				case 3: return Config.dificil; break;
			}
		}
	};

	static dificultad={
		set:(tipo)=>{
			localStorage.setItem("dificultad",tipo);
		},
		get:()=>{
			return Number(localStorage.getItem("dificultad")??2);
		}
	}

	static tiempo={
		total:{
			set:(milisegundos)=>{
				localStorage.setItem("tiempo_total",milisegundos);
			},
			get:()=>{
				return Number(localStorage.getItem("tiempo_total")??60000);
			}
		},
		fallo:{
			set:(milisegundos)=>{
				localStorage.setItem("tiempo_fallo",milisegundos);
			},
			get:()=>{
				return Number(localStorage.getItem("tiempo_fallo")??5000);
			}
		}
	}

	static facil={
		hoyos:{
			fila:2,
			columna:2
		},
		topo:{
			cantidad:1,
			tiempo:{
				mostrar:{
					min:1000,
					max:1500,
					set:(min,max)=>{
						this.medio.topo.tiempo.mostrar.min=min;
						this.medio.topo.tiempo.mostrar.max=max;
					},
					get:()=>{
						return Util.numeroAleatorio(this.medio.topo.tiempo.ocultar.min,this.medio.topo.tiempo.ocultar.max);
					}
				},
				ocultar:{
					min:1000,
					max:1500,
					set:(min,max)=>{
						this.medio.topo.tiempo.ocultar.min=min;
						this.medio.topo.tiempo.ocultar.max=max;
					},
					get:()=>{
						return Util.numeroAleatorio(this.medio.topo.tiempo.mostrar.min,this.medio.topo.tiempo.mostrar.max);
					}
				}
			}
		}
	};

	static medio={
		hoyos:{
			fila:3,
			columna:4
		},
		topo:{
			cantidad:3,
			tiempo:{
				mostrar:{
					min:700,
					max:1000,
					set:(min,max)=>{
						this.medio.topo.tiempo.mostrar.min=min;
						this.medio.topo.tiempo.mostrar.max=max;
					},
					get:()=>{
						return Util.numeroAleatorio(this.medio.topo.tiempo.ocultar.min,this.medio.topo.tiempo.ocultar.max);
					}
				},
				ocultar:{
					min:700,
					max:1000,
					set:(min,max)=>{
						this.medio.topo.tiempo.ocultar.min=min;
						this.medio.topo.tiempo.ocultar.max=max;
					},
					get:()=>{
						return Util.numeroAleatorio(this.medio.topo.tiempo.mostrar.min,this.medio.topo.tiempo.mostrar.max);
					}
				}
			}
		}
	};

	static dificil={
		hoyos:{
			fila:5,
			columna:5
		},
		topo:{
			cantidad:6,
			tiempo:{
				mostrar:{
					min:100,
					max:500,
					set:(min,max)=>{
						this.medio.topo.tiempo.mostrar.min=min;
						this.medio.topo.tiempo.mostrar.max=max;
					},
					get:()=>{
						return Util.numeroAleatorio(this.medio.topo.tiempo.ocultar.min,this.medio.topo.tiempo.ocultar.max);
					}
				},
				ocultar:{
					min:100,
					max:500,
					set:(min,max)=>{
						this.medio.topo.tiempo.ocultar.min=min;
						this.medio.topo.tiempo.ocultar.max=max;
					},
					get:()=>{
						return Util.numeroAleatorio(this.medio.topo.tiempo.mostrar.min,this.medio.topo.tiempo.mostrar.max);
					}
				}
			}
		}
	};

	// Object.assign({},Config.medio) -> clonar

	static personalizado={
		hoyos:{
			fila:(JSON.parse(localStorage.getItem("config"))??Object.assign({},Config.medio)).hoyos.fila,
			columna:(JSON.parse(localStorage.getItem("config"))??Object.assign({},Config.medio)).hoyos.columna
		},
		topo:{
			cantidad:(JSON.parse(localStorage.getItem("config"))??Object.assign({},Config.medio)).topo.cantidad,
			tiempo:{
				mostrar:{
					min:(JSON.parse(localStorage.getItem("config"))??Object.assign({},Config.medio)).topo.tiempo.mostrar.min,
					max:(JSON.parse(localStorage.getItem("config"))??Object.assign({},Config.medio)).topo.tiempo.mostrar.max,
					set:(min,max)=>{
					this.medio.topo.tiempo.mostrar.min=min;
						this.medio.topo.tiempo.mostrar.max=max;
					},
					get:()=>{
						return Util.numeroAleatorio(this.medio.topo.tiempo.ocultar.min,this.medio.topo.tiempo.ocultar.max);
					}
			},
				ocultar:{
					min:(JSON.parse(localStorage.getItem("config"))??Object.assign({},Config.medio)).topo.tiempo.ocultar.min,
					max:(JSON.parse(localStorage.getItem("config"))??Object.assign({},Config.medio)).topo.tiempo.ocultar.max,
					set:(min,max)=>{
						this.medio.topo.tiempo.ocultar.min=min;
						this.medio.topo.tiempo.ocultar.max=max;
					},
					get:()=>{
						return Util.numeroAleatorio(this.medio.topo.tiempo.mostrar.min,this.medio.topo.tiempo.mostrar.max);
					}
				}
			}
		}
	};

	static hoyos;

	static topo;

}