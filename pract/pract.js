const fs = require('fs');
const crypto = require('crypto');

const path = '../pract/Usuarios.json'

class ManagerUsuarios {
    constructor() {

    }
    consultarUsuarios = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            const user = JSON.parse(data);
            return user;
        } else {
            return[]
        }
    }
    crearUsuario = async (usuario) => {
        const users = await this.consultarUsuarios();
        usuario.salt = crypto.randomBytes(128).toString('base64');
        usuario.password = crypto.createHmac('sha256', usuario.salt).update(usuario.password).digest('hex');
        users.push(usuario);
        await fs.promises.writeFile(path, JSON.stringify(users))
    }
    validarUsuario = async (nombreUsuario, password) => {
        const usuarios = await this.consultarUsuarios();
        const usuariosIndex = usuarios.findIndex(user => user.nombreUsuario === nombreUsuario);
        if (usuariosIndex === -1) {
            console.log('Error: el usuario no existe')
            return;
        }
        const usuario = usuarios [usuariosIndex]
        const newHash = crypto.createHmac('sha256', usuario.salt).update(password).digest('hex');
        if (newHash === usuario.password) {
            console.log('usuario logueado');
        }else {
            console.log('contraseña incorrecta');
        }

    }
}

module.exports = ManagerUsuarios;