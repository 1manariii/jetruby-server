

class InitializeRunService {
    timerStore = { timer: null }

    getTimer () {
        const { timer } = this.timerStore;

        if (!timer) throw new Error("timer пуст")

        return timer
    }

    setTimer (timer) {
        this.timerStore.timer = timer
    }

    clearTimer () {
        clearInterval(this.timerStore.timer)
    }
}

module.exports = InitializeRunService;