const buildKafkaOuterRect = (config) => {
    const { center, outerRect } = config;

    kafkaCanvasContext.beginPath();
    kafkaCanvasContext.lineWidth = outerRect.lineWidth;
    kafkaCanvasContext.lineJoin = outerRect.lineJoin;
    kafkaCanvasContext.strokeStyle = outerRect.strokeStyle;
    kafkaCanvasContext.strokeRect(
        center.x + (outerRect.radius / 2),
        center.y + (outerRect.radius / 2),
        outerRect.width - outerRect.radius,
        outerRect.height - outerRect.radius
    );
    kafkaCanvasContext.stroke();
}