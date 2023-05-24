var Timer = /** @class */ (function () {
    function Timer(interval) {
        this.validateTimeout(interval);
        this.interval = interval;
        this.maxInterval = 1000;
        this.minInterval = 100;
        this.count = 1;
    }
    Timer.prototype.start = function () {
        var _this = this;
        if (this.currentTimer) {
            console.log('Timer already started');
            return;
        }
        this.currentTimer = setInterval(function () {
            var displayContent = document.querySelector('.timer__display__content');
            if (displayContent) {
                displayContent.innerHTML = "".concat(_this.count++);
            }
        }, this.interval);
    };
    Timer.prototype.stop = function () {
        if (!this.currentTimer) {
            console.log('Timer already stopped');
            return;
        }
        this.clear();
    };
    Timer.prototype.reset = function () {
        this.stop();
        this.start();
    };
    Timer.prototype.clear = function () {
        clearInterval(this.currentTimer);
        this.count = 1;
        this.currentTimer = undefined;
    };
    Timer.prototype.validateTimeout = function (timeout) {
        if (timeout < this.minInterval || timeout > this.maxInterval) {
            throw new Error("Invalid interval! The allowed values are in the range from ".concat(this.minInterval, " to ").concat(this.maxInterval));
        }
    };
    return Timer;
}());
document.addEventListener('DOMContentLoaded', function () {
    var page = document.querySelector('.page');
    var inputInterval = document.querySelector('.timer__input');
    var buttonStart = document.querySelector('.timer__start');
    var buttonStop = document.querySelector('.timer__stop');
    var buttonReset = document.querySelector('.timer__reset');
    var timer = new Timer(1000);
    document.addEventListener('click', function (event) {
        if (event.target === buttonStart) {
            if (!(page === null || page === void 0 ? void 0 : page.classList.contains('active')))
                page === null || page === void 0 ? void 0 : page.classList.add('active');
            timer.interval = parseInt(inputInterval.value);
            timer.start();
            console.log('Click Start');
        }
        else if (event.target === buttonStop) {
            if (page === null || page === void 0 ? void 0 : page.classList.contains('active'))
                page === null || page === void 0 ? void 0 : page.classList.remove('active');
            timer.stop();
            console.log('Click Stop');
        }
        else if (event.target === buttonReset) {
            if (!(page === null || page === void 0 ? void 0 : page.classList.contains('active')))
                page === null || page === void 0 ? void 0 : page.classList.add('active');
            timer.reset();
            console.log('Click Reset');
        }
    });
});
