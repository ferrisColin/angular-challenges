import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AppHoldable } from './app.directive';

@Component({
  standalone: true,
  imports: [AppHoldable],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          [appHoldable]="time"
          (calculatedResult)="progressTime.set($event)"
          (completed)="onSend()"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="progressTime()" [max]="time"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public time = 3000;
  public progressTime = signal(0);
  onSend() {
    console.log('Save it!');
  }
}
