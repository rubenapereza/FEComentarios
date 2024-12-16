import { Component } from '@angular/core';
import { Comentario } from '../../interfaces/Comentario';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-list-comentarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-comentarios.component.html',
  styleUrl: './list-comentarios.component.css'
})
export class ListComentariosComponent {
  listComentarios : Comentario[] = [];

  constructor(private _comentarioService: ComentarioService) {}

  ngOnInit(): void{
    this.getComentarios();
  } 

  getComentarios(){
    this._comentarioService.getListComentarios().subscribe(data => {
      this.listComentarios = data;
    }, error => {
      console.log(error);
    });
  }

  eliminarComentario(id: any ){ //id: number | undefined
    console.log(id);
    this._comentarioService.deleteComentario(id).subscribe(data => {
      this.getComentarios();
    }, error => {
      console.log(error);
    })
  }
}
