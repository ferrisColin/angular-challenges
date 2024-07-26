import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardType } from '../model/card.model';
import { City } from '../model/city.model';
import { Student } from '../model/student.model';
import { Teacher } from '../model/teacher.model';
import { CityStore } from './city.store';
import { randStudent, randTeacher, randomCity } from './fake-http.service';
import { StudentStore } from './student.store';
import { TeacherStore } from './teacher.store';

const instanceOf = <T>(value: any, fieldName: string): value is T =>
  fieldName in value;

@Injectable({
  providedIn: 'root',
})
export class MasterStore {
  private cities = new BehaviorSubject<City[]>([]);
  cities$ = this.cities.asObservable();
  private students = new BehaviorSubject<Student[]>([]);
  students$ = this.students.asObservable();
  private teachers = new BehaviorSubject<Teacher[]>([]);
  teachers$ = this.teachers.asObservable();

  // type!: CardType;
  type = new BehaviorSubject<CardType>(CardType.CITY);
  type$ = this.type.asObservable();

  // private masterStoreData!: BehaviorSubject<any>;
  private masterStoreData!: TeacherStore | StudentStore | CityStore;
  // masterStoreData$ = this.masterStoreData.asObservable();
  // private masterStoreData!: any;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  //   addAll(cities: City[]) {
  //     this.cities.next(cities);
  //   }

  addOne(type: CardType) {
    //   this.cities.next([...this.cities.value, student]);
    console.log('ADD ONE: ', this.type.value);
    //   if (this.type === CardType.TEACHER) {
    //     this.teacherStore.addOne(randTeacher());
    //   } else if (this.type === CardType.STUDENT) {
    //       this.studentStore.addOne(randStudent());
    //   } else if (this.type === CardType.CITY) {
    //       this.cityStore.addOne(randomCity());
    //   }
    //   if (this.type.value === CardType.TEACHER) {
    //     this.teacherStore.addOne(randTeacher());
    //   } else if (this.type.value === CardType.STUDENT) {
    //       this.studentStore.addOne(randStudent());
    //   } else if (this.type.value === CardType.CITY) {
    //       this.cityStore.addOne(randomCity());
    //   }
    if (type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    } else if (type === CardType.CITY) {
      this.cityStore.addOne(randomCity());
    }
    //   this.masterStoreData.addOne(randData);
  }

  deleteOne(id: number, type: CardType) {
    // this.cities.next(this.cities.value.filter((s) => s.id !== id));

    //   this.masterStoreData.deleteOne(id);
    if (type === CardType.TEACHER) {
      this.teacherStore.deleteOne(id);
    } else if (type === CardType.STUDENT) {
      this.studentStore.deleteOne(id);
    } else if (type === CardType.CITY) {
      this.cityStore.deleteOne(id);
    }
  }
}
