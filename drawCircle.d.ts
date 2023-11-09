interface Arc {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    clockwise?: boolean;
}
interface Circle {
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D;
    arc: Arc;
    fillStyle: string;
}
export declare const drawCircle: ({ canvas, ctx, arc, fillStyle }: Circle) => void;
export {};
