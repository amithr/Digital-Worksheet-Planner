// Use this to delay "keyup" event until user stops typing
export function delayChange(fn, duration, timer) {
    clearTimeout(timer);
    timer = setTimeout(fn, duration);
}