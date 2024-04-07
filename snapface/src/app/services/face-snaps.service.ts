import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap-model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

// Déclaration d'une class comme étant un service avec le décorateur @Injectable()
@Injectable({
  // dit à Angular d'enregistrer ce service à la racine de l'application.
  //ça permet de s'assurer de n'avoir qu'une seule instance du service, partagée par tous les partis intéressés.
  providedIn: 'root',
})
//un service n'a pas de méthode  ngOnInit(), car les services ne sont pas instanciés de la même manière que les components

export class FaceSnapsService {

  // Injectez HttpClient dans FaceSnapsService en y créant un constructor

  constructor(private http: HttpClient){}
  // Récupération du model faceSnap et initialisation des attributs du tableau faceSnap
  faceSnaps: FaceSnap[] = [];
// Récupération tous les faceSnap
  getAllFaceSnaps():Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }
// On recherche un facesnap par son id ans le tableau faceSnaps avec la fonction  find() sinon, on  throw  une erreur.
  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
    // const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    // if (!faceSnap) {
    //     throw new Error('FaceSnap not found!');
    // } else {
    //     return faceSnap;
    // }
  }

//   snapFaceSnapById(faceSnapId: number, snapType: string): void {
//     const faceSnap = this.getFaceSnapById(faceSnapId);
//     snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
// }

//Afin de limiter les possibilités à des options sémantiques, on peut remplacer le type  string  par un literal type .
<<<<<<< Updated upstream
  snapFaceSnapById(faceSnapId: number, snapType: "snap" | "unsnap") : void {
    const faceSnap = this.getFaceSnapById(faceSnapId);
    snapType === "snap" ? faceSnap.snaps++ : faceSnap.snaps--;
  } 
=======

  // snapFaceSnapById(faceSnapId: number, snapType: "snap" | "unsnap") : void {
  //   // const faceSnap = this.getFaceSnapById(faceSnapId);
  //   // snapType === "snap" ? faceSnap.snaps++ : faceSnap.snaps--;
  // }
  // On transforme en une observable pour pouvoir utiliser la méthode get et les opérateurs map et switchMap
  snapFaceSnapById(faceSnapId: number, snapType: "snap" | "unsnap") : Observable<FaceSnap> {
      return this.getFaceSnapById(faceSnapId).pipe(
        map(faceSnap => ({
          ...faceSnap,
          snaps: faceSnap.snaps + (snapType === "snap" ? 1 : -1)
        })),
        switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
      );
    }
  // Ajout d'un nouveau faceSnap

//   addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }) {
//     const faceSnap: FaceSnap = {
//         ...formValue,
//         snaps: 0,
//         createdDate: new Date(),
//         //ajoute 1 à l' id  du dernier ajouté au tableau pour générer le nouveau, puisque les  id  des FaceSnap sont des entiers croissants 
//         id: this.faceSnaps[this.faceSnaps.length - 1].id + 1
//     };
//     this.faceSnaps.push(faceSnap);
// }
addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
  return this.getAllFaceSnaps().pipe(
       map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
       map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
       map(previousFacesnap => ({
          ...formValue,
          snaps: 0,
          createdDate: new Date(),
          id: previousFacesnap.id + 1
      })),
      switchMap(newFacesnap => this.http.post<FaceSnap>(
          'http://localhost:3000/facesnaps',
          newFacesnap)
      )
  );
}
>>>>>>> Stashed changes
}
