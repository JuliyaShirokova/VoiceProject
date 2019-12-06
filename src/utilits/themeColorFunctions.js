import * as colors from '../constants/colors';

export const convertColor = (col, index) => {

    const { h, s, l } = col;
    const _index = parseFloat(index);
    let _h = h;
    let _s = s;
    let _l = _index;
    const _color = `hsl(${_h},${_s}%,${_l}%)`;
    return _color

}
export const getThemeColor = (themeColor) => {

    startColor = convertColor(colors.startColor, themeColor);
    stopColor = convertColor(colors.stopColor, themeColor);    
    return {startColor, stopColor}    

}