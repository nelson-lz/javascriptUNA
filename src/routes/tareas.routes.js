const {Router} = require("express");
const router = Router();

const {crearTarea,deleteTarea,getTarea,getTareas,updateTarea} =require("../controllers/tareas.controller");

//Rest API tasks
router.get('/', getTareas);
router.get("/:id",getTarea);
router.post("/",crearTarea);
router.put("/:id",updateTarea);
router.delete("/:id",deleteTarea);


module.exports = router;