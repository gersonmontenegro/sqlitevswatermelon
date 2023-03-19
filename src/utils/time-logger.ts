interface TimerMap {
  [key: string]: number;
}

export const timeLogger = {
  //   timers: {} as Record<string, number>,
  timers: {} as TimerMap,

  time: function (label: string) {
    this.timers[label] = Date.now();
  },

  timeEnd: function (label: string): number {
    const endTime = Date.now();
    const startTime = this.timers[label];
    if (startTime) {
      const elapsedTime = endTime - startTime;
      console.log(`${label}:`, elapsedTime, 'ms');
      delete this.timers[label];
      return elapsedTime;
    } else {
      console.warn(`Timer with label '${label}' does not exist.`);
      return 0;
    }
  },
};
