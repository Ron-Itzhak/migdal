import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Garage } from '../models/garage';
import { GarageService } from '../garage.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-garage-page',
  templateUrl: './garage-page.component.html',
  styleUrls: ['./garage-page.component.scss'],
  standalone: false,
})
export class GaragePageComponent implements OnInit {
  tableGarages: any[] = [];
  selectGarages: any[] = [];
  selectedGarages: any[] = [];
  limit = 15;
  offset = 0;
  isLoadingSelect = false;
  isAddingGarages = false;
  isPageLoading = false;

  displayedColumns: string[] = ['shem_mosah', 'telephone', 'miktzoa'];

  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private garageService: GarageService,
    private snackbarService: SnackbarService
  ) {}
  ngOnInit() {
    this.loadGarages();
    this.fetchSelectGarages();
  }

  loadGarages(): void {
    this.isPageLoading = true;
    this.garageService
      .getGarages()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Garage[]) => {
          this.tableGarages = data;
          this.isPageLoading = false;
        },
        () => {
          this.snackbarService.showError('בעיה בהוספת מוסכים');
          this.isPageLoading = false;
        }
      );
  }

  fetchSelectGarages(): void {
    if (this.isLoadingSelect) return;
    this.isLoadingSelect = true;
    this.garageService
      .fetchExternalGarages(this.offset, this.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (newGarages) => {
          this.selectGarages = [...this.selectGarages, ...newGarages];
          this.offset += this.limit;
          this.isLoadingSelect = false;
        },
        () => {
          this.snackbarService.showError('בעיה בטעינת מוסכים');
          this.isLoadingSelect = false;
        }
      );
  }
  addSelectedGarages(): void {
    this.isAddingGarages = true;
    const newGarages = this.selectedGarages.filter(
      (selectedGarage) =>
        !this.tableGarages.some(
          (tableGarage) => tableGarage._id === selectedGarage._id
        )
    );
    if (newGarages.length === 0) {
      this.snackbarService.showError('המוסכים שנבחרו נמצאים כבר במערכת');

      this.isAddingGarages = false;
      return;
    }

    if (newGarages.length > 0) {
      this.garageService
        .addGarages(newGarages)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.tableGarages = [...this.tableGarages, ...newGarages];
            this.selectedGarages = [];
            this.snackbarService.showSuccess(
              `${newGarages.length} מוסכים הוספו בהצלחה`
            );

            this.isAddingGarages = false;
          },
          () => {
            this.snackbarService.showError('בעיה בהוספת מוסכים');
            this.isAddingGarages = false;
          }
        );
    }
  }
}
