import { userModel } from "../models/user.js";
import { ventasModel } from "../models/ventas.js";

export const loadVentas = async (req, res) => {
  try {
    const ventas = await ventasModel.findAll({
      include: {
        model: userModel
      }
    });

    res.json({
      ventas,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addVentas = async (req, res) => {
  const { idUserCreateVenta, monto } = req.body;

  try {
    ventasModel.create({
      idUserCreateVenta,
      monto,
    });

    res.json({
      msg: "creado",
    });
  } catch (error) {
    console.log(error);
  }
};


export const deleteVentas = async (req,res) => {
  const { id } = req.params
  try {

    const deleteVenta = await ventasModel.destroy({
      where: {
        id
      }
    })


    res.json({
      msg: "¡Venta eliminada correctamente!"
    })
    


  } catch (error) {
    console.log(error)
  }
}
