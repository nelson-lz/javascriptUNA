const userController ={};
const UserModel = require('../models/User');
const TareaModel = require('../models/Tarea');

userController.getUsuarios = async (req,res) => {
    try {
        const usuarios = await UserModel.find();
        res.json(usuarios);
    } catch (error) {
       res.json({
           success:false,
           message:"Ha ocurrido algun error",
           error:error
       }); 
    }
};
userController.getUsuario = async (req,res) => {
    try {
        const userId = req.params.id; 
        const usuario = await UserModel.findById(userId);
        const tareas = await TareaModel.findOne({userId:userId});
        res.json({
            user:usuario,
            tasks: tareas
        });
    } catch (error) {
       res.json({
           success:false,
           message:"Ha ocurrido algun error",
           error:error
       }); 
    }
};
userController.createUser = async (req,res) => {
    const {username,email} = req.body;
    if(!username){ 
        return res.json({
            success:false,
            message:'Debe especificar un Username'
        });
    }
    if(!email){
        return res.json({
            success:false,
            message:'Debe especificar un email'
        }); 
    }
    const newUser = new UserModel({
        username,
        email
    });
    try {
        await newUser.save();
        res.json({
            success:true,
            message:'Usuario creado con exito'
        });
    } catch (error) {
        res.json({
            success:false,
            message:'Ha ocurrido algun error'
        });
    }
};
userController.updateUser = async (req,res) => {
    try {
        await UserModel.findByIdAndUpdate(
           {_id:req.params.id},
           req.body);
        res.json({
            success:true,
            message:'Usuario actualizado con exito'
        });
    } catch (error) {
        res.json({
            success:false,
            message:'Ha ocurrido algun error'
        });
    }
};
userController.deleteUser = async (req,res) => {
    try {
       const usId = req.params.id;
       const tareasPendientes = await TareaModel.findOne({
           $and:[
               {userId:usId},
               {completed:false}
            ]
        });
       if(tareasPendientes){
            return res.json({
                success:false,
                message:"El usuario posee tareas pendientes"
            });
       }
       await TareaModel.deleteMany({userId:usId});
       await UserModel.findByIdAndDelete(usId);
       res.json({
           success:true,
           message:'Usuario ha sido eliminado'
       });
    } catch (error) {
        res.json({
            success:false,
            message:'Ha ocurrido algun error'
        });
    }
};
userController.bajaUser = async (req,res) => {
     try {
        const idUsuario = req.params.id;
        const tareaPendiente = await TareaModel.findOne({
        $and:[
            {userId:idUsuario},
            {completed:false}
        ]});
        if(tareaPendiente){
           res.json({
               success:false,
               message:'El usuario aun tiene tareas pendientes',
               tareas:tareaPendiente
           });
        }
        await UserModel.findByIdAndUpdate(
           {_id:req.params.id},
           {estado:'inactivo'});
        res.json({
            success:true,
            message:'Usuario dado de baja'
        });
    } catch (error) {
        res.json({
            success:false,
            message:'Ha ocurrido algun error'
        });
    }
}; 
userController.altaUser = async (req,res) => {
    try {
       await UserModel.findByIdAndUpdate(
           {_id:req.params.id},
           {estado:'activo'});
        res.json({
            success:true,
            message:'Usuario activado'
        });
    } catch (error) {
        res.json({
            success:false,
            message:'Ha ocurrido un error'
        });
    }
};

module.exports = userController;