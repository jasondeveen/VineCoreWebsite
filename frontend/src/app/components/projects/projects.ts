import { Component, DestroyRef, computed, inject, signal } from '@angular/core';

interface WorkPhoto {
  src: string;
  alt: string;
}

interface Work {
  company: string;
  title: string;
  description: string;
  photos: WorkPhoto[];
}

/** Time each photo stays on screen while the carousel runs by itself. */
const AUTO_ADVANCE_MS = 7000;

/**
 * A work with a single photo has nothing to cycle through, so it is only
 * moving on to the next work. Give it longer to be looked at.
 */
const SINGLE_PHOTO_MS = 12000;

@Component({
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects {
  readonly works: Work[] = [
    {
      company: 'CSpect',
      title: 'Inspection-robot firmware',
      description:
        'Rewrote and extended the firmware of an inspection robot. Details to follow.',
      photos: [
        {
          src: '/projects/altum-1.jpg',
          alt: 'Photo of the Altum inspection robot',
        },
      ],
    },
    {
      company: 'Movatron',
      title: 'Sensor datalogger',
      description:
        'A datalogger that records measurements from connected sensors and shows the current reading on a display.',
      photos: [
        {
          src: '/projects/datalogger-1.jpg',
          alt: 'Photo of the sensor datalogger',
        },
        {
          src: '/projects/datalogger-2.jpg',
          alt: 'Photo of the datalogger display',
        },
        {
          src: '/projects/datalogger-3.jpg',
          alt: 'Photo of the datalogger in use',
        },
      ],
    },
  ];

  /** Index of the work currently shown. */
  private readonly workIndexState = signal(0);
  /** Index of the photo shown for the current work. */
  private readonly photoIndexState = signal(0);
  /** Turns false for good once the visitor uses one of the controls. */
  private readonly autoPlayingState = signal(true);
  /** Bumped every cycle; changing it recreates the progress bar so its animation restarts. */
  private readonly progressRunState = signal(0);

  private readonly destroyRef = inject(DestroyRef);
  private timerId: ReturnType<typeof setTimeout> | undefined;

  readonly workIndex = this.workIndexState.asReadonly();
  readonly photoIndex = this.photoIndexState.asReadonly();
  readonly autoPlaying = this.autoPlayingState.asReadonly();
  readonly progressRun = this.progressRunState.asReadonly();

  readonly work = computed(() => this.works[this.workIndex()]);
  readonly photo = computed(() => this.work().photos[this.photoIndex()]);

  /**
   * How long the current work is shown for. Drives both the auto-advance timer
   * and the progress bar, so the line always fills in step with the cycle.
   */
  readonly cycleMs = computed(() =>
    this.work().photos.length === 1 ? SINGLE_PHOTO_MS : AUTO_ADVANCE_MS,
  );

  constructor() {
    this.scheduleNextAdvance();
    this.destroyRef.onDestroy(() => this.stopAutoPlay());
  }

  selectWork(index: number): void {
    this.stopAutoPlay();
    this.goToWork(index);
  }

  nextWork(): void {
    this.stopAutoPlay();
    this.goToWork(this.workIndex() + 1);
  }

  prevWork(): void {
    this.stopAutoPlay();
    this.goToWork(this.workIndex() - 1);
  }

  selectPhoto(index: number): void {
    this.stopAutoPlay();
    this.photoIndexState.set(index);
  }

  nextPhoto(): void {
    this.stopAutoPlay();
    this.stepPhoto(1);
  }

  prevPhoto(): void {
    this.stopAutoPlay();
    this.stepPhoto(-1);
  }

  /**
   * Schedules one cycle. A timeout rather than an interval, because each work
   * can have a different duration (see `cycleMs`).
   */
  private scheduleNextAdvance(): void {
    this.timerId = setTimeout(() => {
      this.advance();
      // Recreate the progress bar so its animation restarts from empty.
      this.progressRunState.update((run) => run + 1);

      if (this.autoPlayingState()) {
        this.scheduleNextAdvance();
      }
    }, this.cycleMs());
  }

  /** Moves to the next photo, or on to the next work once the last photo has been shown. */
  private advance(): void {
    if (this.photoIndex() < this.work().photos.length - 1) {
      this.photoIndexState.update((index) => index + 1);
    } else {
      this.goToWork(this.workIndex() + 1);
    }
  }

  private goToWork(index: number): void {
    const count = this.works.length;
    this.workIndexState.set((index + count) % count);
    // Every work starts on its first photo.
    this.photoIndexState.set(0);
  }

  private stepPhoto(delta: number): void {
    const count = this.work().photos.length;
    this.photoIndexState.update((index) => (index + delta + count) % count);
  }

  private stopAutoPlay(): void {
    if (this.timerId === undefined) {
      return;
    }

    clearTimeout(this.timerId);
    this.timerId = undefined;
    this.autoPlayingState.set(false);
  }
}
