import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
// import { StudentStore } from '../../data-access/student.store';
// import { TeacherStore } from '../../data-access/teacher.store';
import { MasterStore } from '../../data-access/master.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.backgroundColor]="customClass">
      <img [src]="imgSrc" width="200px" />
      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.firstName || item.name"
          [id]="item.id"
          [type]="type"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() imgSrc = '';
  @Input() list: any[] | null = null;
  // @Input() type!: CardType;
  @Input() customClass = '';
  private _type!: CardType;

  @Input()
  set type(value: CardType) {
    console.log('TYPE INPUT: ', value);

    this._type = value;
    // this.masterStore.type = value;
    this.masterStore.type.next(value);
    // this.onMyPropertyChange();
  }

  get type(): CardType {
    return this._type;
  }

  CardType = CardType;

  constructor(private masterStore: MasterStore) {}

  addNewItem() {
    console.log('ADD NEW ITEM: ', this.type);
    this.masterStore.addOne(this.type);
    // this.masterStore.de
    // if (this.type === CardType.TEACHER) {
    //   this.teacherStore.addOne(randTeacher());
    // } else if (this.type === CardType.STUDENT) {
    //   this.studentStore.addOne(randStudent());
    // }
  }
}
