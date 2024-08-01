import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

type Category = 'Youth' | 'Junior' | 'Open' | 'Senior';
const ageToCategory = (age: number): Category => {
  if (age < 10) return 'Youth';
  else if (age < 18) return 'Junior';
  else if (age < 35) return 'Open';
  return 'Senior';
};

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    {{ fullName() | titlecase }} plays tennis in the {{ category() }} category!!
  `,
  host: {
    class: 'text-xl text-green-800',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  // @Input({ required: true }) name!: string;
  // @Input() lastName?: string;
  // @Input() age?: string;

  name = input.required<string>();
  lastName = input<string>();
  age = input<string>();

  fullName = computed(() => `${this.name()} ${this.lastName() ?? ''}`);
  category = computed(() => ageToCategory(Number(this.age) ?? 0));

  // ngOnChanges(): void {
  //   this.fullName = `${this.name} ${this.lastName ?? ''}`;
  //   this.category = ageToCategory(Number(this.age) ?? 0);
  // }
}
