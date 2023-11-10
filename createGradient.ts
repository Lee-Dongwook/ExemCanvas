import type { AddColorStop, Gradient } from "./createGradient.types";

const gradianSet: Record<string, AddColorStop[]> = {
    "#Gradient-0": [
        {offset: 0, color: "#196df3"},
        {offset: 1, color: "#25273d"}
    ],
    "#Gradient-1": [
        {offset: 0, color: "#594de7"},
        {offset: 1, color: "#7b61ff"}
    ],
    "#Gradient-2": [
        {offset: 0, color: "#1a6cf2"},
        {offset: 1, color: "#000"}
    ],
    "#Gradient-3": [
        {offset: 0, color: "#ffffff"},
        {offset: 1, color: "#000000"}
    ],
    "#Gradient-4": [
        {offset: 0.2, color: "#23263c"},
        {offset: 1, color: "#196df3"}
    ]
}


export function createGradient({context, gradientId, coordinate}: Gradient) {
    if(context){
        const gradient = context.createLinearGradient(
            coordinate.startX, 
            coordinate.startY, 
            coordinate.endX, 
            coordinate.endY
        );
        
        const gradiantConfigSet = gradianSet[gradientId]

        if(gradiantConfigSet){
            gradiantConfigSet.forEach((gradiantConfig) => {
                gradient.addColorStop(gradiantConfig.offset, gradiantConfig.color)
            })
        }
        return gradient;
    }
    else{
        throw new Error('Gradiant를 적용할 수가 없습니다.')
    }
}