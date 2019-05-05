function recompenseBloc(hauteurBloc) {
    let pos =  Math.floor(hauteurBloc/210000);
    let calc = 50/Math.pow(2,pos);
    let result = Math.floor(calc*100000000)/100000000
    return result;
}

recompenseBloc(hauteurBloc)



