import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

	heroe:Heroe={
		nombre:"",
		bio:"",
		casa:"Marvel"

	}
	nuveo:boolean = false;
	id:string;
  constructor(private _heroeService: HeroesService, private router:Router, private route: ActivatedRoute) {
  		this.route.params.subscribe(parametros=>{
  			console.log(parametros);
  			this.id = parametros['id'];
  			if(this.id !== "nuevo"){
  				this._heroeService.getHeroe(this.id)
  					.subscribe(heroe=>this.heroe = heroe)
  			}

  		})
   }

  ngOnInit() {
  }
  guardar(){
  	if(this.id =='nuevo')
  			{
  				//insertado
  				console.log(this.heroe);
			  	this._heroeService.nuevoHeroe(this.heroe).subscribe(data=>{
			  		this.router.navigate(['/heroe', data.name]);
			  	}, 
			  	error=>console.log(error));
  			}
  			else{
  				//actualizando
  				console.log(this.heroe);
			  	this._heroeService.actualizarHeroe(this.heroe, this.id).subscribe(data=>{
			  		console.log(data);
			  	}, 
			  	error=>console.log(error));
  			}
  }
	agregarNUevo(forma:NgForm){
		this.router.navigate(['/heroe', 'nuevo']);
		forma.reset({casa: "Marvel"});
	}

}
