import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comentario } from '../../interfaces/Comentario';
import { CommonModule } from '@angular/common';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrl: './agregar-editar-comentario.component.css'
})
export class AgregarEditarComentarioComponent {
  agregarComentario: FormGroup;
  accion = 'Agregar';
  id = 0;
  comentario: Comentario | undefined;

  constructor(private fb: FormBuilder,
              private _comentarioService: ComentarioService,
              private router: Router,
              private aRoute: ActivatedRoute){
    this.agregarComentario = this.fb.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required],
      texto: ['', Validators.required],
    })
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void{
    this.esEditar();
  }

  esEditar(){
    if(this.id !== 0){
      this.accion = 'Editar';
      this._comentarioService.getComentario(this.id).subscribe(data => {
        this.comentario = data;
        this.agregarComentario.patchValue({
          titulo: data.titulo,
          texto: data.texto,
          creador: data.creador,
        })
      }, error => {
        console.log(error);
      })
    }
  }

  agregarEditarComentario(){

    if(this.comentario == undefined){
      //Agregamos un nuevo comentario

      const comentario : Comentario = {
      titulo: this.agregarComentario.get('titulo')?.value,
      creador: this.agregarComentario.get('creador')?.value,
      texto: this.agregarComentario.get('texto')?.value,
      fechaCreacion: new Date()
    }
    this._comentarioService.saveComentario(comentario).subscribe(data => {
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
    })

    } else {
      //Editamos comentario
      const comentario : Comentario = {
        id: this.comentario.id,
        titulo: this.agregarComentario.get('titulo')?.value,
        creador: this.agregarComentario.get('creador')?.value,
        texto: this.agregarComentario.get('texto')?.value,
        fechaCreacion: this.comentario.fechaCreacion
      }

      this._comentarioService.updateComentario(this.id, comentario).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      })
    }
    
  }
}
