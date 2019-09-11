const tareaController = {};

const TareaModel = require('../models/Tarea');
const UserModel = require('../models/User');

tareaController.getTareas = async(req,res) => {
    try {
        const tareas = await TareaModel.find();
        res.json(tareas);
    } catch (error) {
        res.json({
            success:false,
            message:'Ha ocurrido algun error con la DB'
        });
    }
};

tareaController.getTarea = async(req,res) => {
    try {
        const tarea = await TareaModel.findById(req.params.id);
        res.json(tarea);
    } catch (error) {
        res.json({
            sucess:false,
            message:'Ha ocurrido un error con la BD',
            error:error
        });
    }
};

tareaController.crearTarea = async (req,res) => {
    const {title,description,userId} = req.body;
    
    if(!title){
        return res.json({
            success:false,
            message:'El titulo no puede estar vacio'
        });
    }
    if(!description){
        return res.json({
            success:false,
            message:'La descripcion no puede estar vacia'
        });
    }
    const newTarea = new TareaModel({
        title,
        description,
        userId
    });
    try {
       const usuario = await UserModel.findById(userId);
       if(!usuario){
            return res.json({
                success:false,
                message:'El usuario no existe o esta Inactivo'
            });
       }else if(usuario.estado!='activo'){
            return res.json({
                success:false,
                message:'El usuario está Inactivo'
            });
       }
       await newTarea.save();
       res.json({
           success:true,
           message:'Se ha creado la tarea'
       });
    } catch (error) {
        res.json({
            success:false,
            message:'Ha ocurrido un errror'
        });
    }
};

tareaController.updateTarea = async (req,res) => {
    try {
       await TareaModel.findByIdAndUpdate({_id:req.params.id},req.body);
       res.json({
            success:true,
            message:'Tarea actualizada'
       });
    } catch (error) {
        res.json({
            success:false,
            messsage:'Ha ocurrido un error'
        });
    }
};

tareaController.taskCompleted = async (req,res) => {
    try {
       await TareaModel.findByIdAndUpdate({_id:req.params.id},req.body);
       res.json({
           sucess:true,
           message:"Tarea completada"
       });
    } catch (error) {
        res.json({
            success:false,
            message:"Ha ocurrido algun errror"
        })
    }
};

tareaController.deleteTarea = async (req,res) => {
    try {
       await TareaModel.findByIdAndDelete(req.params.id); 
       res.json({
           success:true,
           messages:'Tarea ha sido eliminada'
       });
    } catch (error) {
       res.json({
           success:false,
           message:'Ha ocurrido un error'
       });
    }
};
tareaController.taskCompleted = async (req,res) => {
    try {
        await TareaModel.findByIdAndUpdate(
            {_id:req.params.id},
            {completed:true});
        res.json({
            success:true,
            message:'Task completed'
        });
    } catch (error) {
        res.json({
            success:false,
            message:'Ha ocurrido algun error'
        });
    }
}

module.exports = tareaController;