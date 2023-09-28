import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


import { PlatillosService } from '../../services/platillos.service';
import { Platillo } from '../../models/platillo.model';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public platilloForm = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true }),
    precio: new FormControl<number>(0,{ nonNullable: true }),
    imagen: new FormControl<string>(''),
    descripcion: new FormControl(''),
  });



  constructor(
    private platilloService: PlatillosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {

  }

  get currentPlatillo(): Platillo {
    const platillo = this.platilloForm.value as Platillo;
    return platillo;
  }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.platilloService.getPlatilloById( id ) ),
      ).subscribe( platillo => {

        if ( !platillo ) {
          return this.router.navigateByUrl('/');
        }

        this.platilloForm.reset( platillo );
        return;
      });

  }


  onFileUploaded(url: string){
    this.platilloForm.patchValue({imagen:url})
console.log("Se subio aquí", this.platilloForm.value)
  }


  onSubmit():void {

    if ( this.platilloForm.invalid ) return;

    if ( this.currentPlatillo._id ) {
      this.platilloService.updatePlatillo( this.currentPlatillo )
        .subscribe( platillo => {
          this.showSnackbar(`${ platillo.nombre } updated!`);
        });

      return;
    }

    this.platilloService.create( this.currentPlatillo )
      .subscribe( platillo => {
        // TODO: mostrar snackbar, y navegar a /heroes/edit/ platillo._id
        this.router.navigate(['/heroes/edit', platillo._id ]);
        this.showSnackbar(`${ platillo.nombre } created!`);
        this.router.navigate(['/']);
      });
  }

  onDeleteHero() {
    if ( !this.currentPlatillo._id ) throw Error('Platillo id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.platilloForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.platilloService.deletePlatilloById( this.currentPlatillo._id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   if ( !result ) return;

    //   this.platilloService.deleteHeroById( this.currentPlatillo._id )
    //   .subscribe( wasDeleted => {
    //     if ( wasDeleted )
    //       this.router.navigate(['/heroes']);
    //   })
    // });

  }


  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }





}
