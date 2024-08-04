const win = new Window(300, 300, 3)


// a 起点, b 终点, c 控制点
function curvePoints(a, b, c, numberOfSamples) {
    ensure(numberOfSamples >= 3, '采样次数必须大宇等3')
    const points = []
    points.push([...a])
    const parts = numberOfSamples - 1
    for (let i = 1; i < parts; i++) {
        const weight = i / parts
        // console.log(weight)
        const [x1, y1] = lerpPoint(a[0], a[1], c[0], c[1], weight)
        const [x2, y2] = lerpPoint(c[0], c[1], b[0], b[1], weight)

        const p = lerpPoint(x1, y1, x2, y2, weight)
        points.push(p)
    }
    points.push([...b])
    console.log(points)
    return points
}

function curvePoints3(a, b, c, d, numberOfSamples) {
    ensure(numberOfSamples >= 3, '采样次数必须大宇等3')
    const points = []
    points.push([...a])
    const parts = numberOfSamples - 1

    for (let i = 1; i < parts; i++) {
        const weight = i / parts
        // console.log(weight)
        const a1 = lerpPoint(a[0], a[1], c[0], c[1], weight)
        const b1 = lerpPoint(c[0], c[1], d[0], d[1], weight)
        const c1 = lerpPoint(d[0], d[1], b[0], b[1], weight)

        const [x1, y1] = lerpPoint(a1[0], a1[1], b1[0], b1[1], weight)
        const [x2, y2] = lerpPoint(b1[0], b1[1], c1[0], c1[1], weight)

        const p = lerpPoint(x1, y1, x2, y2, weight)
        points.push(p)
    }

    points.push([...b])
    return points
}


function parsePath(source) {
    const tokens = source.split(' ')

    let points = []

    const start = [0, 0]
    const end = [0, 0]
    const c1 = [0, 0]
    const c2 = [0, 0]

    let idx = 0
    while (idx < tokens.length) {
        const cmd = tokens[idx++]

        if (cmd === 'M') {
            start[0] = parseInt(tokens[idx++])
            start[1] = parseInt(tokens[idx++])
        } else if (cmd === 'C') {
            c1[0] = parseInt(tokens[idx++])
            c1[1] = parseInt(tokens[idx++])

            c2[0] = parseInt(tokens[idx++])
            c2[1] = parseInt(tokens[idx++])

            end[0] = parseInt(tokens[idx++])
            end[1] = parseInt(tokens[idx++])

            // console.log(start, end, c1, c2)
            points = points.concat(curvePoints3(start, end, c1, c2, 10))
            // console.log(points)
        } else if (cmd === 'S') {
            let [c1x, c1y] = lerpPoint(c2[0], c2[1], end[0], end[1], 2)
            c1[0] = c1x
            c1[1] = c1y

            c2[0] = parseInt(tokens[idx++])
            c2[1] = parseInt(tokens[idx++])

            start[0] = end[0]
            start[1] = end[1]

            end[0] = parseInt(tokens[idx++])
            end[1] = parseInt(tokens[idx++])


            // console.log(start, end, c1, c2)
            points = points.concat(curvePoints3(start, end, c1, c2, 10))
            // console.log(points)
        } else {
            throw new Error(`unknown cmd: ${cmd}`)
        }

    }

    return points
}

function __main() {
    win.clear()
    const source = 'M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80'

    let points = parsePath(source)

    console.log('final:', points)
    for (let i = 0; i < points.length; i++) {
        if (i + 1 >= points.length) {
            break
        }

        const [x1, y1] = points[i]
        const [x2, y2] = points[i + 1]
        drawLine(x1, y1, x2, y2)
    }

    win.draw()
    console.log(win)
}

__main()