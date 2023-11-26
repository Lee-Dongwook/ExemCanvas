const buildKafkaInnerRect = (config) => {
    const { center, innerRect } = config;

    kafkaCanvasContext.fillStyle = innerRect.fillStyle;
    kafkaCanvasContext.fillRect(
        center.x + (innerRect.radius / 2),
        center.y + (innerRect.radius / 2),
        innerRect.width - innerRect.radius,
        innerRect.height - innerRect.radius
    );
}