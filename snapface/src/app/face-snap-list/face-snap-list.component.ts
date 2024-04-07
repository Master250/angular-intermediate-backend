import { Component, OnInit } from '@angular/core';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnap } from '../models/face-snap-model';
import { AsyncPipe, NgFor } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
<<<<<<< Updated upstream
=======
import { Observable } from 'rxjs';
//import { Observable, Subject, interval, takeUntil, tap } from 'rxjs';
>>>>>>> Stashed changes

//Cette classe est déclarée avec un décorateur  @Component  à qui on passe un objet de configuration avec un sélecteur, un fichier de template et un fichier de styles.
@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [FaceSnapComponent, NgFor, AsyncPipe],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit{
<<<<<<< Updated upstream
  
  faceSnaps!: FaceSnap[];
=======
  // Déclaration facesnaps et destroy
  
  //faceSnaps!: FaceSnap[];

  //Dynamiser les faceSnaps avec la requette http
  faceSnaps$!: Observable<FaceSnap[]>;

  //private destroy$!: Subject<boolean>;
>>>>>>> Stashed changes

  // on injecte les facesnaps depuis services 

  constructor(private faceSnapsService: FaceSnapsService ) {}

  //On va maintenant initialiser les quatre propriétés dans la méthode  ngOnInit() et l'affichées
  
  ngOnInit(): void {
<<<<<<< Updated upstream
    this.faceSnaps = this.faceSnapsService.getAllFaceSnaps()
  }

=======
    // Initialisations
    //this.faceSnaps = this.faceSnapsService.getAllFaceSnaps();
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
    //this.destroy$ = new Subject<boolean>();

    // interval(1000).pipe(
    //   tap(console.log),
    //   takeUntil(this.destroy$),
    // ).subscribe();
  }
  // destruction de l'observable
  // ngOnDestroy(): void {
  //     this.destroy$.next(true);
  // }
>>>>>>> Stashed changes
  
}
