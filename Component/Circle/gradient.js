class Gradient {
    constructor(config){
        this.gradient = config.gradient;
    }

    createGradient(ctx) {
        const grd = ctx.createLinearGradient(this.gradient.startX, this.gradient.startY, this.gradient.endX, this.gradient.endY);

        this.gradient.colorSet.forEach((set) => {
            grd.addColorStop(set.offset, set.color)
        })

        return grd;
    }
}