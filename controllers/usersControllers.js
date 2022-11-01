import { rolesModel } from "../models/roles.js";
import { userModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/jwt.js";

import { deleteImage, uploadImage } from "../utils/cloudinary.js";

// Modulo para eliminar las imagenes y usar funciones asyncronas
import fs from "fs-extra";

// Mostrar todos los usuarios del sistema
export const getUserControllers = async (req, res) => {
  const page = Number(req.query.page) || 0;
  let size = 10;

  let options = {
    limit: +size,
    offset: +page * +size,
  };

  try {
    const { count } = await userModel.findAndCountAll(options);
    const usuarios = await userModel.findAll({
      include: {
        model: rolesModel,
        attributes: ["name"],
      },
    });

    res.json({
      total_register: count,
      page,
      data: usuarios,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Ingresar usuarios al sistema
export const addUsersControllers = async (req, res) => {
  const { email, password, name, idRol, idEmpleado } = req.body;

  try {
    // Buscamos el usuario para saber si ya existe

    const usuarioName = await userModel.findOne({
      where: {
        name,
      },
    });
    const usuarioEmail = await userModel.findOne({
      where: {
        email,
      },
    });

    if (usuarioName) {
      return res.json({
        msg: `¡El usuario ${name} ya existe!`,
      });
    }
    if (usuarioEmail) {
      return res.json({
        msg: `¡El Email ${email} ya existe!`,
      });
    }

    if (!usuarioName && !usuarioEmail) {
      if (req.files?.image) {
        const results = await uploadImage(req.files.image.tempFilePath);
        const { public_id, secure_url } = results;
        const passHash = await bcryptjs.hash(password, 8);

        const user = await userModel.create({
          email,
          name,
          password: passHash,
          idRol,
          idEmpleado,
          image_id: public_id,
          image_url: secure_url,
        });
        await fs.unlink(req.files.image.tempFilePath);
      }
    }

    // Encriptamos la password para mandarla ala BD

    res.json({
      msg: "¡Usuario Creado Correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar usuarios del sistema

export const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const buscar = await userModel.findOne({
      where: {
        id,
      },
    });

    await deleteImage(buscar.image_id);

    const deleteUser = await userModel.destroy({
      where: {
        id,
      },
    });

    res.json({
      msg: "¡Usuario eliminado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Login de usuarios del sistema

export const loginUsersControllers = async (req, res) => {
  const { name, password } = req.body;

  try {
    const usuario = await userModel.findOne({ where: { name } });

    //  const usuario = await userModel.findAll({
    //   where: {
    //     name
    //   },
    //   include: {
    //     model: rolesModel,
    //   },
    //   attributes: ["name"],
    // });

    if (!usuario) {
      return res.json({
        msg: "¡El usuario no existe!",
      });
    }

    // Comparamos si la password mandada y la almacenada en la bd es valida
    const passwordValida = await bcryptjs.compare(password, usuario.password);

    if (!passwordValida) {
      return res.json({
        msg: "¡La contraseña es Incorrecta!",
      });
    }

    // Si todo es valido --> generamos el token de autenticacion con jwt

    const token = await generarJWT(
      usuario.name,
      usuario.email,
      usuario.id,
      usuario.idEmpleado
    );

    res.status(201).json({
      res: true,
      msg: "¡ Hola " + usuario.name + " !",
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar los datos del usuario ====== LA PASSWORD NO SE MODIFICA EN ESTE CONTROLADOR =====

export const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, idRol, idEmpleado } = req.body;

  try {
    const usuario = await userModel.findOne({
      where: {
        id,
      },
    });

    usuario.set({
      name,
      email,
      idRol,
      idEmpleado,
    });

    if (req.files?.image) {
      await deleteImage(usuario.image_id);

      const results = await uploadImage(req.files.image.tempFilePath);
      const { public_id, secure_url } = results;

      usuario.set({
        image_id: public_id,
        image_url: secure_url,
      });
      await fs.unlink(req.files.image.tempFilePath);
    }

    await usuario.save();

    res.json({
      msg: "¡Usuario Actualizado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar la contraseña del usuario

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const usuario = await userModel.findOne({
      where: {
        id,
      },
    });

    if (!usuario) {
      return res.json({
        msg: "¡No existe el usuario!",
      });
    }

    // Verificamos si la password introducida es valida con la q tenemos en la BD
    // Hacemos una comparacion ya que esta encriptada en la BD

    if (!(await bcryptjs.compare(password, usuario.password))) {
      return res.json({
        msg: "¡La contraseña es incorrecta!",
        msg2: "¡No podemos cambiar la contraseña!",
      });
    } else {
      const passHash = await bcryptjs.hash(password, 8);
      usuario.set({
        password: passHash,
      });
    }
    await usuario.save();

    res.json({
      msg: "¡Se ha modificado correctamente la contraseña!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
