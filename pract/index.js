const ManagerUsuarios = require("./pract");

const manager = new ManagerUsuarios;

const crearUsuarios = async() => {
    let consultarUsuarios = await manager.consultarUsuarios();
    console.log(consultarUsuarios);

    let user = {
        nombre: 'Jordan',
        edad: '20',
        apellido: 'Mehrez',
        nombreUsuario: 'benja',
        password: '233'
    };
    await manager.crearUsuario(user);
    let segundaConsultaUsuarios = await manager.consultarUsuarios();
    console.log(segundaConsultaUsuarios);
    await manager.validarUsuario('benja', '233'); //correcto
    await manager.validarUsuario('user2', 'dadasda'); //mal nombre
    await manager.validarUsuario('benja', '12344'); //mal contra
}

crearUsuarios();