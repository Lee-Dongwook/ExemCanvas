"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCircle = void 0;
var drawCircle = function (_a) {
    var canvas = _a.canvas, ctx = _a.ctx, arc = _a.arc, fillStyle = _a.fillStyle;
    if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(arc.x, arc.y, arc.radius, arc.startAngle, arc.endAngle, arc.clockwise);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.closePath();
    }
    else {
        throw new Error("Canvas element is null");
    }
};
exports.drawCircle = drawCircle;
