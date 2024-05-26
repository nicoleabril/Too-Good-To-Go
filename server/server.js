const { Pool } = require('pg');
const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer'); // Importa multer
const jwt = require('jsonwebtoken');
const app = express();
const upload = multer(); // Inicializa multer

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'toogoodtogo',
    password: 'contrasenia',
    port: 5432,
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT pu.* FROM public."Usuario" pu WHERE pu.email = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        if (bcrypt.compareSync(password, user.contrasenia)) {
            const token = jwt.sign({ username }, 'secret_key');
            return res.json({ token });
        } else {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

app.post('/registro_cliente', async (req, res) => {
    try {
        const { nombre, email, contrasenia, telefono, fecha_registro } = req.body;

        // Comprobar si el correo de usuario ya existe
        const userExists = await pool.query('SELECT * FROM public."Usuario" WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'El correo de usuario ya está en uso' });
        }

        await pool.query('BEGIN'); // Iniciar transacción
        const hashedPassword = await bcrypt.hash(contrasenia, 10);
        const newUserResult = await pool.query('INSERT INTO public."Usuario" (email, contrasenia, telefono, fecha_registro, tipo_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING id_usuario', [email, hashedPassword, telefono, fecha_registro, 'cliente']);
        const idUsuario = newUserResult.rows[0].id_usuario;
        await pool.query('INSERT INTO public."Cliente" (id_cliente, nombre) VALUES ($1, $2)', [idUsuario, nombre]);

        await pool.query('COMMIT'); // Confirmar transacción
        console.log('Transacción completada');
        return res.status(201).json({ message: 'Cliente registrado con éxito' });
    } catch (error) {
        await pool.query('ROLLBACK'); // Cancelar transacción en caso de error
        console.error('Error en el servidor:', error);
        return res.status(500).json({ message: 'Error al registrar cliente', error: error.message });
    }
});

app.post('/registro_negocio', async (req, res) => {
    try {
      const { nombre_negocio, email, contrasenia, telefono, posicion_x, posicion_y, fecha_registro } = req.body;
  
      // Comprobar si el nombre de usuario ya existe
      const userExists = await pool.query('SELECT * FROM public."Usuario" WHERE email = $1', [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'El correo de usuario ya está en uso' });
      }
  
      await pool.query('BEGIN'); // Iniciar transacción
      const hashedPassword = await bcrypt.hash(contrasenia, 10);
      const newUserResult = await pool.query('INSERT INTO public."Usuario" (email, contrasenia, telefono, posicion_x, posicion_y,fecha_registro, tipo_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_usuario', [email, hashedPassword, telefono, posicion_x, posicion_y, fecha_registro, 'negocio']);
      const idUsuario = newUserResult.rows[0].id_usuario;
      await pool.query('INSERT INTO public."Negocio" (id_negocio, nombre_negocio) VALUES ($1, $2)', [idUsuario, nombre_negocio]);
  
      await pool.query('COMMIT'); // Confirmar transacción
      console.log('Transacción completada');
      return res.status(201).json({ message: 'Negocio registrado con éxito' });
    } catch (error) {
      await pool.query('ROLLBACK'); // Cancelar transacción en caso de error
      console.error('Error en el servidor:', error);
      return res.status(500).json({ message: 'Error al registrar negocio', error: error.message });
    }
});
  
app.post('/actualizar_datos_cliente', upload.single('foto_perfil'), async (req, res) => {
    try {
      const { id_cliente, nombre, contrasenia, telefono } = req.body;
      const foto_perfil = req.file.buffer;
      await pool.query('BEGIN'); // Iniciar transacción
      let hashedPassword;
      if (contrasenia) {
        hashedPassword = await bcrypt.hash(contrasenia, 10);
      }
      await pool.query('UPDATE public."Usuario" SET contrasenia = COALESCE($1, contrasenia), telefono = $2 WHERE id_usuario = $3', [hashedPassword, telefono, id_cliente]);
      await pool.query('UPDATE public."Cliente" SET nombre = $1, foto_perfil = $2 WHERE id_cliente = $3', [nombre, foto_perfil, id_cliente]);
      await pool.query('COMMIT'); // Confirmar transacción
      console.log('Transacción completada');
      return res.status(200).json({ message: 'Cliente actualizado con éxito' });
    } catch (error) {
      await pool.query('ROLLBACK'); // Cancelar transacción en caso de error
      console.error('Error en el servidor:', error);
      return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

app.post('/borrar', async (req, res) => {
    try {
      const { id } = req.body;
      const userExists = await pool.query('SELECT * FROM pac.pac_usuarios WHERE id_usuario = $1', [id]);
      if (userExists.rows.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      await pool.query('BEGIN'); // Iniciar transacción
      await pool.query('DELETE FROM pac.pac_roles_usuarios WHERE usuario = $1', [id]);
      await pool.query('DELETE FROM pac.pac_usuarios WHERE id_usuario = $1', [id]);
  
      await pool.query('COMMIT'); // Confirmar transacción
      console.log('Transacción completada');
  
      return res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
      await pool.query('ROLLBACK'); // Cancelar transacción en caso de error
      console.error('Error en el servidor:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  });

app.get('/obtener_info_user/:correo', async(req, res) => {
    try{
        const { correo } = req.params;
        const info_user = await pool.query('SELECT * FROM pac.pac_usuarios WHERE correo_usuario = $1', [correo]);
        return res.json(info_user.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
})

app.get('/obtener_menu/:correo', async(req, res) => {
    try{
        const { correo } = req.params;
        const info_user = await pool.query(`
        SELECT * FROM pac.pac_menu
        INNER JOIN pac.pac_accesos ON pac.pac_menu.id_opcion = pac.pac_accesos.opcion_menu
        LEFT JOIN pac.pac_roles_usuarios ON pac.pac_accesos.opcion_rol = pac.pac_roles_usuarios.rol
        WHERE pac.pac_roles_usuarios.usuario = (
            SELECT id_usuario
            FROM pac.pac_usuarios
            WHERE correo_usuario = $1
        ) OR pac.pac_accesos.opcion_rol IS NULL ORDER BY pac.pac_menu.id_opcion`, [correo]);
        return res.json(info_user.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor al obtener menu' });
    }
})

app.get('/obtener_rol_usuario/:correo', async(req, res) => {
    try{
        const { correo } = req.params;
        const info_user = await pool.query(`
        SELECT r.*
        FROM pac.pac_usuarios u
        JOIN pac.pac_roles_usuarios ru ON u.id_usuario = ru.usuario
        JOIN pac.pac_roles r ON ru.rol = r.id_rol
        WHERE u.correo_usuario = $1`, [correo]);
        return res.json(info_user.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor al obtener menu' });
    }
})

app.get('/obtener_info_user_dado_ID/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const info_user = await pool.query('SELECT * FROM pac.pac_usuarios WHERE id_usuario = $1', [id]);
        return res.json(info_user.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
})

app.listen(5000, () => {
    console.log('Servidor en ejecución en el puerto 5000');
});
