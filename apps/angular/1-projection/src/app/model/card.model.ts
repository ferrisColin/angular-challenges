import { City } from './city.model';
import { Student } from './student.model';
import { Teacher } from './teacher.model';

export enum CardType {
  TEACHER,
  STUDENT,
  CITY,
}

export type DataType = Student | City | Teacher;
