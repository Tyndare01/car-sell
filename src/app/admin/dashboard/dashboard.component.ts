import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { OffersService } from 'src/app/services/offers.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

/* #region tableau de voiture */
  // cars = [

  //   {
  //     id: 0,
  //     brand: 'BMW',
  //     model: 'M3',
  //     color: 'Blue',
  //   },

  //   {
  //     id: 1,
  //     brand: 'Mercedes',
  //     model: 'AMG',
  //     color: 'Black',
  //   },

  //   {
  //     id: 2,
  //     brand: 'Audi',
  //     model: 'RS6',
  //     color: 'White',
  //   },
    //  ];
/* #endregion */


offerForm! : FormGroup;


offers: Offer[] = [];

subscription!: Subscription


   constructor(

    private formBuilder: FormBuilder,
    private offersService: OffersService

    //private activatedRoute: ActivatedRoute
    // permet de charger via la classe ActivatedRoute les parametres de la route qui est dans le app-routing.module.ts



    ) { }


    ngOnInit(): void {
      this.initOfferForm();
      //this.offers = this.offersService.getOffers();
      //this.subscription = this.offersService.getOffers().subscribe(
        this.subscription = this.offersService.offerSubject.subscribe(
        {
          next: (offers: Offer[]) => {
            console.log('NEXT');
            this.offers = offers },
          // complete: () => {
          //   console.log('Les offres ont été récupérées')
          // },
          error: (error) => {console.error(error);
          }

        });
        this.offersService.dispatchOffers();
        console.log(this.offersService.offerSubject.value);
        // Remarque : Nous avons besoin du BehaviorSubject pour pouvoir utiliser la méthode next() et complete() sur l'observable



    // Promise
    //   .then((offers: Offer[]) => {
    //     this.offers = offers;

    //   }).catch((error) => {
    //     console.log(error);
    // }).finally(() => {

    //   console.log('La promesse est terminée');
    // });

    }

    initOfferForm() : void {

      this.offerForm = this.formBuilder.group({
        index: [0],
        title: ['', [Validators.required, Validators.maxLength(50)]],
        brand: '',
        model: '',
        description: '',
        price: 0
      });

    }

      /* #region Route */
      // const carId = this.activatedRoute.snapshot.paramMap.get('id');
      // this.currentCar = this.cars.find(el => el.id === +<string>carId );
      // console.log(this.currentCar);
/* #endregion */


  // Methode qui permet de recuperer les donnees du formulaire en methode template
    // OnSubmitOfferForm(form: NgForm) : void {
    //   console.log(form.value);
    // }

    // Methode qui permet de recuperer les donnees du formulaire en methode reactive

    OnSubmitOfferForm() : void {
      // console.log(this.offerForm.invalid), // permet de verifier si le formulaire est valide (true signifie que le formulaire est invalide)
      // console.log(this.offerForm?.value);


      const offerIndex = this.offerForm.value.index; // permet de recuperer l'index de l'offre
      let offer = this.offerForm.value; // permet de recuperer les valeurs du formulaire

      if (offerIndex == null || offerIndex == undefined){
        delete offer.index; // permet de supprimer l'index de l'offre
        this.offers = this.offersService.createOffer(offer); // permet d'ajouter l'offre dans le tableau
      }
      else {

        delete offer.index;
        this.offers = this.offersService.editOffer(offer, offerIndex) // permet de modifier l'offre dans le tableau
      }


      this.offerForm.reset();
      console.log(this.offers);
    }

    OnEditOfferForm(offer: Offer, index: number): void {

     this.offerForm.setValue({...offer, index});


    }

    onDeleteOffer(index: number): void {
     this.offers = this.offersService.deleteOffer(index); // Splice permet de supprimer un element dans un tableau
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }




}
