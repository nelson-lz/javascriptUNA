const tareaController = {};

tareaController.getTareas = (req,res) => {
    res.json({
        message:"Obteniendo las tareas"
    });
};

tareaController.getTarea = (req,res) => {
    res.json({
        message:'Obteniento una tarea',
        id_tarea:req.params.id
    });
};

tareaController.crearTarea = (req,res) => {
    res.json({
        message:"Crando un tarea",
        data:req.body
    });
};

tareaController.updateTarea = (req,res) => {
    res.json({
        message:"actualizando tarea",
        idTarea:req.params.id,
        data:req.body
    });
};

tareaController.deleteTarea = (req,res) => {
    res.json({
        message:"Borrando una tarea",
        idTarea:req.params.id
    });
};

module.exports = tareaController;