import { Component, OnInit } from '@angular/core';
import { Garage } from '../models/garage';
import { GarageService } from '../garage.service';

@Component({
  selector: 'app-garage-table',
  templateUrl: './garage-table.component.html',
  styleUrls: ['./garage-table.component.scss'],
  standalone: false,
})
export class GarageTableComponent implements OnInit {
  garages: Garage[] = [];
  selectedGarages: Garage[] = [];
  loading = false;
  displayedColumns: string[] = ['shem_mosah', 'telephone', 'miktzoa'];

  constructor(private garageService: GarageService) {}

  ngOnInit() {
    this.loadGarages();
  }

  loadGarages(): void {
    this.loading = true;
    this.garageService.getGarages().subscribe(
      (data: Garage[]) => {
        this.garages = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading garages', error);
        this.loading = false;
      }
    );
  }

  addGarages(): void {
    const newGarages = this.selectedGarages.filter(
      (garage) => !this.garages.some((g) => g._id === garage._id)
    );

    if (newGarages.length > 0) {
      this.garageService.addGarages(newGarages).subscribe(
        () => {
          this.garages = [...this.garages, ...newGarages];
          this.selectedGarages = [];
        },
        (error) => {
          console.error('Error adding garages', error);
        }
      );
    }
  }
}
