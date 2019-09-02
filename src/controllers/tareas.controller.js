const tareaController = {};

const TareaModel = require('../models/Tarea');

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
    const {title,description} = req.body;
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
        description
    });
    try {
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

module.exports = tareaController;