class Timer {
  private maxInterval: number;
  private minInterval: number;
  private currentTimer?: number;
  public interval?: number;
  private count: number;

  constructor(interval: number) {
    this.validateTimeout(interval);
    this.interval = interval;
    this.maxInterval = 1000;
    this.minInterval = 100;
    this.count = 1;
  }

  public start() {
    if (this.currentTimer) {
      console.log('Timer already started');
      return;
    }

    this.currentTimer = setInterval(() => {
      const displayContent = document.querySelector('.timer__display__content');
      if (displayContent) {
        displayContent.innerHTML = `${this.count++}`;
      }
    }, this.interval);
  }

  public stop() {
    if (!this.currentTimer) {
      console.log('Timer already stopped');
      return;
    }

    this.clear();
  }

  public reset() {
    this.stop();
    this.start();
  }

  private clear() {
    clearInterval(this.currentTimer);
    this.count = 1;
    this.currentTimer = undefined;
  }

  private validateTimeout(timeout: number) {
    if (timeout < this.minInterval || timeout > this.maxInterval) {
      throw new Error(`Invalid interval! The allowed values are in the range from ${this.minInterval} to ${this.maxInterval}`);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const page = document.querySelector('.page');
  const inputInterval = document.querySelector('.timer__form__input') as HTMLInputElement;
  const buttonStart = document.querySelector('.timer__start');
  const buttonStop = document.querySelector('.timer__stop');
  const buttonReset = document.querySelector('.timer__reset');
  const timer = new Timer(1000);

  document.addEventListener('click', function(event) {
    if (event.target === buttonStart) {
      if (!page?.classList.contains('active')) page?.classList.add('active');
      timer.interval = parseInt(inputInterval.value);
      timer.start();
      console.log('Click Start')
    } else if (event.target === buttonStop) {
      if (page?.classList.contains('active')) page?.classList.remove('active');
      timer.stop();
      console.log('Click Stop')
    } else if (event.target === buttonReset) {
      if (!page?.classList.contains('active')) page?.classList.add('active');
      timer.reset();
      console.log('Click Reset')
    }
  });
});