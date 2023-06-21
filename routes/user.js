const router = require("express").Router()

const userController = require("../controllers/userController")

router.route("/cadastro").post((req, res)=>userController.create(req, res))

router.route("/login").post((req, res)=>userController.login(req, res))
module.exports = router