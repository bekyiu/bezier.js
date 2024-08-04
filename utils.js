const ensure = function (cond, msg = '断言错误') {
    if (!cond) {
        alert(msg)
        throw new Error(msg)
    }
}

// 权重越大 n2 的影响越大
function lerp(n1, n2, weight) {
    return n1 * (1 - weight) + n2 * weight
}

function lerpPoint(x1, y1, x2, y2, weight) {
    let x = lerp(x1, x2, weight)
    let y = lerp(y1, y2, weight)
    return [Math.round(x), Math.round(y)]
}

function drawLine(x1, y1, x2, y2) {
    const dx = x2 - x1
    const dy = y2 - y1

    if (dx === 0 && dy === 0) {
        win.putPixel(x1, y1, Color.WHITE)
        return
    }

    // x
    if (Math.abs(dx) > Math.abs(dy)) {
        const step = dx > 0 ? 1 : -1
        let x = x1
        let y = y1
        for (; x !== x2; x += step) {
            y = y1 + dy * (x - x1) / dx
            win.putPixel(Math.round(x), Math.round(y), Color.WHITE)
        }
    } else {
        const step = dy > 0 ? 1 : -1
        let x = x1
        let y = y1
        for (; y !== y2; y += step) {
            x = x1 + dx * (y - y1) / dy
            win.putPixel(Math.round(x), Math.round(y), Color.WHITE)
        }
    }
}