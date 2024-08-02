import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'address-user',
  standalone: true,
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Address:
      <div>Street: {{ street() }}</div>
      <div>ZipCode: {{ zipCode() }}</div>
      <div>City: {{ city() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class AddressComponent {
  userService = inject(UserStore);
  street = computed(() => this.userService.user().address.street);
  zipCode = computed(() => this.userService.user().address.zipCode);
  city = computed(() => this.userService.user().address.city);
}
