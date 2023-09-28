import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Orden, Plato } from '../../models/orden.v2.model';
import { OrdenService } from '../../services/orden.service';
import { Platillo } from 'src/app/platillos/models/platillo.model';
import { ConfirmDialogComponent } from 'src/app/platillos/components/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-new-orden',
  templateUrl: './new-orden.component.html',
  styles: [
  ]
})
export class NewOrdenComponent implements OnInit {

  public ordenForm = new FormGroup({
    _id:        new FormControl<string>(''),
    platos: new FormControl<Plato[]>([],{ nonNullable: true }),
    adiciones: new FormControl<string[]>([]),
    descripcion: new FormControl(''),
  });



  constructor(
    private ordenService: OrdenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {

  }

  get currentOrden(): Orden {
    const orden = this.ordenForm.value as Orden;
    return orden;
  }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.ordenService.getOrdenById( id ) ),
      ).subscribe( orden => {

        if ( !orden ) {
          return this.router.navigateByUrl('/');
        }

        this.ordenForm.reset( orden );
        return;
      });

  }



  // onSubmit():void {

  //   if ( this.ordenForm.invalid ) return;

  //   if ( this.currentOrden._id ) {
  //     this.ordenService.updateOrden( this.currentOrden )
  //       .subscribe( orden => {
  //         this.showSnackbar(`${ orden._id } updated!`);
  //       });

  //     return;
  //   }

  //   this.ordenService.create( this.currentOrden )
  //     .subscribe( orden => {
  //       // TODO: mostrar snackbar, y navegar a /heroes/edit/ orden._id
  //       this.router.navigate(['/heroes/edit', orden._id ]);
  //       this.showSnackbar(`${ orden._id } created!`);
  //       this.router.navigate(['/']);
  //     });
  // }

  onDeleteHero() {
    if ( !this.currentOrden._id ) throw Error('Orden id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.ordenForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.ordenService.deleteOrdenById( this.currentOrden._id! )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   if ( !result ) return;

    //   this.ordenService.deleteHeroById( this.currentOrden._id )
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
