import { Injectable } from '@angular/core';
import { Offer } from '../interfaces/offer';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

 private offers: Offer[] = [

  {
    title: 'Renault à vendre',
    brand: 'Renault',
    model: 'Clio',
    description: 'bonne état',
    price: 2000
  }
];

offerSubject: BehaviorSubject<Offer[]> = new BehaviorSubject(<Offer[]>[]);
// BehaviorSubject est un type d'observable qui permet de stocker la valeur courante de l'observable
// on dois spéficier le type de l'observable dans les chevrons <> car il est vide au départ
// On utiliser [] car on veux un tableau d'offre de type Offer

constructor() { }


/* #region Promise  */
// Promise
  // getOffers():Promise<Offer[]> {

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(this.offers);
  //     if (!this.offers || this.offers.length === 0) {
  //       reject('Erreur lors du chargement des offres');
  //     }

  // }, 3000);
  //   //return this.offers;

  // });

  // }
/* #endregion */

/* #region Observable */
  // getOffers():Observable<Offer[]> {

    // return new Observable(observer => {
    //   if(this.offers.length === 0) {
    //     observer.error(new Error('Aucune offre disponible'));
    //   }
    //   setInterval(() => {
    //     observer.next(this.offers);
    //     //observer.complete();
    //   }, 1000);

    // });
    //}
  /* #endregion */

  getOffers() {

  }

  dispatchOffers() {

    this.offerSubject.next(this.offers) // permet de notifier les composants qui sont abonnés à l'observable
  }

  createOffer(offer: Offer): Offer[] {

    this.offers.push(offer);
    return this.offers;

  }


  editOffer(offer: Offer, index : number): Offer[] {

    this.offers[index] = offer;

    return this.offers;


  }

  deleteOffer(offerIndex: number): Offer[] {

    this.offers.splice(offerIndex, 1);
    return this.offers;

  }


}
