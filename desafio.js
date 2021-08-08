//Nicolás Gonçalves Batista Silva, Porto Alegre, Nicolasgbdas@gmail.com
let olympicsMedalTable = [
    { id: 1, country: "BRASIL", gold: 7, silver: 6, bronze: 6, continent: "AMERICA DO SUL" },
    { id: 2, country: "USA", gold: 46, silver: 37, bronze: 17, continent: "AMERICA DO NORTE" },
    { id: 3, country: "CHINA", gold: 26, silver: 18, bronze: 26, continent: "ASIA" },
    { id: 4, country: "RUSSIA", gold: 19, silver: 18, bronze: 19, continent: "EUROPA" },
    { id: 5, country: "REINO UNIDO", gold: 27, silver: 23, bronze: 17, continent: "EUROPA" },
    { id: 6, country: "ALEMANHA", gold: 17, silver: 10, bronze: 15, continent: "EUROPA" },
    { id: 7, country: "JAPÃO", gold: 12, silver: 8, bronze: 21, continent: "ASIA" },
    { id: 8, country: "ARGENTINA", gold: 3, silver: 1, bronze: 0, continent: "AMERICA DO SUL" },
    { id: 9, country: "ITALIA", gold: 8, silver: 12, bronze: 8, continent: "EUROPA" },
    { id: 10, country: "QUÊNIA", gold: 6, silver: 6, bronze: 1, continent: "AFRICA" },
];

Array.prototype.customFind = function (predicate) {
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var valor;

    for (var i = 0; i < length; i++) {
        valor = list[i];
        if (predicate.call(thisArg, valor, i, list)) {
            return valor;
        }
    }

    return null;
}

Array.prototype.customSome = function (predicate) {
    'use strict';
    var t = Object(this);
    var len = t.length >>> 0;
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
        if (i in t) {
            var val = t[i];
            if (predicate.call(thisArg, val, i, t)) {
                res.push(val);
            }
        }
    }

    return res;
}

Array.prototype.customFilter = function (predicate) {
    'use strict';
    var t = Object(this);
    var len = t.length >>> 0;
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;

    for (var i = 0; i < len; i++) {
        if (i in t) {
            var val = t[i];
            if (predicate.call(thisArg, val, i, t)) {
                res.push(val);
            }
        }
    }

    return res;
};

Array.prototype.customMap = function (callback) {
    var T, A, k;
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
        var kValue, mappedValue;
        if (k in O) {
            kValue = O[k];
            mappedValue = callback.call(T, kValue, k, O);

            A[k] = mappedValue;
        }
        k++;
    }

    return A;
}

Array.prototype.customReduce = function (callback, initialValue) {
    'use strict';
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
        value = arguments[1];
    } else {
        while (k < len && !(k in t)) {
            k++;
        }
        if (k >= len) {
            throw new TypeError('Reduce possui um array vazio sem um valor inicial');
        }
        value = t[k++];
    }
    for (; k < len; k++) {
        if (k in t) {
            value = callback(value, t[k], k, t);
        }
    }
    return value;
}

// Código modelo utilizando filter, map e reduce

const resultFilterMapReduce = olympicsMedalTable.customFilter(i => i.continent === "ASIA") // JAPÃO e CHINA 
    .customMap(i => i.gold) // 26 e 12
    .customReduce((total, quantity) => total + quantity); // 38

console.log(`Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`);

// Implemente as funções customizadas - customFilter, customMap e customReduce e verique se o retorno é igual ao do código modelo

// const resultByCustomFilterMapReduce = olympicsMedalTable.customFilter(i => i.continent === "ASIA")
//     .customMap(i => i.gold)
//     .customReduce((total, quantity) => total + quantity);

// console.log(`Resultado custom - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`);

/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */

console.log(`1 - Crie um algoritmo que encontre o único pais do continente Africano`);
function procuraAfrica(pais) {
    return pais.continent === 'AFRICA';
};
const paisAfricano = olympicsMedalTable.customFind(procuraAfrica);
console.log(paisAfricano);

// 2 - Crie um algoritmo que retorne o total de medalhas por país
// const medalhasPorPais =  ;
// console.log(medalhasPorPais);

console.log("3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro");
const paisesCom10MedalhasOuroNoMinimo = olympicsMedalTable.customFilter(i => i.gold > 10);
console.log(paisesCom10MedalhasOuroNoMinimo);

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
// const paisesCom30MedalhasNoMinimo =  <seu código aqui>;
// console.log(paisesCom30MedalhasNoMinimo);

console.log("5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro")
const paisesComPeloMenos20MedalhasDeOuro = olympicsMedalTable.customFilter(i => i.continent === "AMERICA DO SUL")
    .customMap(i => i.gold)
    .customSome(i => i >= 20);
console.log(paisesComPeloMenos20MedalhasDeOuro)
