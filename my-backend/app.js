const moment = require('moment');

const hoy = moment();

const fechaDeNacimiento = moment('2003-06-02', 'YYYY-MM-DD');

if (fechaDeNacimiento.isValid) {
    console.log(`Desde mi nacimiento, han pasado ${hoy.diff(fechaDeNacimiento, 'days')} dias`)
}

// console.log(fechaDeNacimiento);