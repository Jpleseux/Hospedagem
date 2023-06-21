const router = require("express").Router()

const useRouter = require("./user")

router.use("/", useRouter)

module.exports = router