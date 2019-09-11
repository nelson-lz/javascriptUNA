const {Router} = require("express");
const router = Router();

const {createUser, updateUser, 
       deleteUser, getUsuario, 
       getUsuarios, bajaUser, altaUser} = require("../controllers/users.controller");

router.get('/', getUsuarios);
router.get('/:id',getUsuario);
router.post('/',createUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.put('/baja-user/:id',bajaUser);
router.put('/alta-user/:id',altaUser);

module.exports = router;