import { Component} from '@angular/core';
import { FaceSnap } from '../models/face-snap-model';
import { FaceSnapsService } from '../services/face-snaps.service';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf, NgStyle, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';

//Cette classe est déclarée avec un décorateur  @Component  à qui on passe un objet de configuration avec un sélecteur, un fichier de template et un fichier de styles.
@Component({
  selector: 'app-single-face-snaps',
  standalone: true,
  imports: [NgClass,NgFor,NgIf,NgStyle, DatePipe,TitleCasePipe,UpperCasePipe, RouterLink, AsyncPipe],
  templateUrl: './single-face-snaps.component.html',
  styleUrl: './single-face-snaps.component.scss'
})

export class SingleFaceSnapsComponent {
  //faceSnap!: FaceSnap;
  //On ajoute un observable a facesnap afin de récuperer depuis le serveur
  faceSnap$!: Observable<FaceSnap>;

  buttonText!: string;

  // injection de ActivatedRoute afin de récuperer les informations de la route
  constructor(private faceSnapsService: FaceSnapsService, 
    private route: ActivatedRoute){}

  ngOnInit() {
      
      this.buttonText = "Oh Snap!"
      // récupérer le paramètre id via le snapshot de la route (un snapshot est un aperçu instantané d'une valeur qui change au cours du temps via son objet  snapshot.params)
      //récupérer l'id d'un facesnaps et convertir avec Ajouter le  +  au début de l'expression permet de cast (changer le type d'une variable) une string  de nombres en  number. Par exemple
      const faceSnapId = +this.route.snapshot.params['id'];
      //initialiser le facenaps
      this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }
  // Implémentation de la méthode ajouter un snap ou unsnap
  onAddSnap(faceSnapId: number){
    if (this.buttonText === "Oh Snap!"){
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, "snap").pipe(
        tap(() => this.buttonText = "Oops, unSnap!")
      );
      
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, "unsnap").pipe(
        tap(() => this.buttonText = "Oh Snap!")
      );
      
    }
  }
  
  
}
