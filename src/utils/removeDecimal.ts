export function removeDecimal(value: number | undefined) {
    const numeroString = value.toString();

    const posicaoPontoDecimal = numeroString.indexOf(".");

    if (posicaoPontoDecimal === -1) {
        return value;
    }

    const numeroSemDecimais = numeroString.substring(0, posicaoPontoDecimal);

    return parseFloat(numeroSemDecimais);
}