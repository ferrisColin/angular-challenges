import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      imgSrc="assets/img/city.png"
      [customClass]="'rgba(250, 0, 0, 0.1)'"></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));

    this.store.cities$.subscribe((t) => (this.cities = t));
  }
}

// styles: [
//   `
//     ::ng-deep .bg-light-red {
//       background-color: rgba(250, 0, 0, 0.1);
//     }
//   `,

// @Component({
//   selector: 'app-teacher-card',
//   template: `
//     <app-card
//       [list]="teachers"
//       [type]="cardType"
//       imgSrc="assets/img/teacher.png"
//       customClass="bg-light-red"></app-card>
//   `,
// styles: [
//   `
//     ::ng-deep .bg-light-red {
//       background-color: rgba(250, 0, 0, 0.1);
//     }
//   `,
// ],
//   standalone: true,
//   imports: [CardComponent],
// })
// export class TeacherCardComponent implements OnInit {
//   teachers: Teacher[] = [];
//   cardType = CardType.TEACHER;

//   constructor(
//     private http: FakeHttpService,
//     private store: TeacherStore,
//   ) {}

//   ngOnInit(): void {
//     this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

//     this.store.teachers$.subscribe((t) => (this.teachers = t));
//   }
// }
