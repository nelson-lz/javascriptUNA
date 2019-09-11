const {Router} = require("express");
const router = Router();

const {crearTarea,deleteTarea,
       getTarea,getTareas,
       updateTarea,taskCompleted} =require("../controllers/tareas.controller");

//Rest API tasks
router.get('/', getTareas);
router.get("/:id",getTarea);
router.post("/",crearTarea);
router.put("/:id",updateTarea);
router.delete("/:id",deleteTarea);
router.put('/task-completed/:id',taskCompleted);


module.exports = router;