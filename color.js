class Color {

    static RED = new Color(255, 0, 0)
    static GREEN = new Color(0, 255, 0)
    static BLUE = new Color(0, 0, 255)
    static BLACK = new Color(0, 0, 0)
    static WHITE = new Color(255, 255, 255)

    /**
     * 颜色描述, 每个值都在 0 ~ 255 之间
     * @param r {number}
     * @param g {number}
     * @param b {number}
     * @param a {number}
     */
    constructor(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}