/**
 * 绘制窗口对象
 * 绘制原点在左上角
 */
class Window {
    /**
     * @param width {number} 窗口宽
     * @param height {number} 窗口高
     * @param scale {number} 缩放倍数, 便于debug
     */
    constructor(width, height, scale = 1) {
        this.scale = scale
        // 记录原始的宽高
        this.w = width
        this.h = height
        this.width = this.s(width)
        this.height = this.s(height)
        this.canvas = document.querySelector('#id-canvas')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.context = this.canvas.getContext('2d')
        this.imageData = this.context.getImageData(0, 0, this.width, this.height);
    }

    /**
     * 放大函数
     * @param num {number}
     * @returns {number}
     */
    s(num) {
        return this.scale * num
    }

    draw() {
        this.context.putImageData(this.imageData, 0, 0)
    }

    clear() {
        for (let i = 0; i < this.imageData.data.length; i++) {
            // 黑色 rgba 0 0 0 255
            if ((i + 1) % 4 === 0) {
                this.imageData.data[i] = 255
            } else {
                this.imageData.data[i] = 0
            }
        }
    }

    /**
     * 在 (x, y) 处 放置颜色为color的像素
     * 注意: 原点在左上角
     * @param x {number}
     * @param y {number}
     * @param color {Color}
     */
    putPixel(x, y, color) {
        x = this.s(x)
        y = this.s(y)

        ensure(x < this.width, `绘制像素越界 x: ${x}, canvas宽: ${this.width}`)
        ensure(y < this.height, `绘制像素越界 y: ${y}, canvas宽: ${this.height}`)

        // 假设每个像素占一个字节 二维坐标映射到数组索引就是 y * W + x
        // 每个像素在data数组中占4个字节 分别是 r g b a
        let idx = y * (this.width * 4) + x * 4

        // 这两个for循环是为了根据SCALE的值来调整绘制像素的大小, 便于debug
        for (let i = 0; i < this.scale; i++) {
            // 每一行都绘制SCALE个像素点
            for (let j = 0; j < this.scale; j++) {
                const r = idx
                const g = idx + 1
                const b = idx + 2
                const a = idx + 3
                const offset = j * 4
                this.imageData.data[r + offset] = color.r
                this.imageData.data[g + offset] = color.g
                this.imageData.data[b + offset] = color.b
                this.imageData.data[a + offset] = color.a
            }
            idx += (this.width * 4)
        }
    }
}