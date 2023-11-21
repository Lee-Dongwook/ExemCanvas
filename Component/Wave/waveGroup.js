class WaveGroup {
    constructor(config) {
        this.totalWaves = config.totalWaves;
        this.totalPoints = config.totalPoints;
        this.color = config.color;
        this.waves = config.waves;
    
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(i, this.totalPoints, this.color[i]);
            this.waves[i] = wave;
        }
    }

    resize(stageWidth, stageHeight) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.draw(ctx);
        }
    }
}