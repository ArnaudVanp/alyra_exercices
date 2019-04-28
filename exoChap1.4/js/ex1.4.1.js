/*Convertir un nombre décimal en hexadecimal*/
/*466321  */

function convertDecHex(data){
    
    const hexadecimal = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']; // table hexadecimale

    let convert = [];
    
    do {

        convert.push(hexadecimal[data % 16]);
        data = Math.floor( data / 16 );

    } while (data > 0);

    if(convert.length % 2 !== 0){
        convert.push(0);
        convert.reverse();
    }
    
    let table = [];
    
    for(let i = 0; i < convert.length; i += 2)
    {
    table.push(convert[i] + convert[i + 1])
    };

    return table;
}


function conversionHexaLittleEndian(data){
    let conversion =`0x ${convertDecHex(data).reverse().join(' ')}`;
    return conversion;
}

function conversionHexaBigEndian(data){
    let conversion =`0x ${convertDecHex(data).join(' ')}`;
    return conversion;
}

let data = process.argv[2];
let conversionHexa = convertDecHex(data);
let conversionlittleE = conversionHexaLittleEndian(data);
let conversionBigE = conversionHexaBigEndian(data);
console.log("La conversion de :",data);
console.log("est :"+conversionHexa+" en hexadecimal.")
console.log("est : "+conversionlittleE+" en Little endian.");
console.log("est : "+conversionBigE+" en Big endian.");