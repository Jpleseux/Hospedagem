const userModel = require("../models/user")

//importações
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userController ={
    
    create: async(req, res)=>{
            try {
                const exist = await userModel.findOne({email: req.body.email})

                if(exist){
                    return res.json({msg:"Email ja existe faça login"})
                    
                }
                
                const user ={
                    nome:req.body.nome,
                    email: req.body.email,
                    senha:await bcrypt.hash(req.body.senha, 10),
                    tel:req.body.tel,
                    isAdmin: req.body.isAdmin,
                }
                const respose = await userModel.create(user)

                res.status(201).json({respose, msg:"Finalizado com sucesso"})

            } catch (error) {
                console.log("Deu certo desgraça")
                res.json({msg:`Erro ao cadastrar usuario ${error}`})
            }
    },
    login: async(req, res)=>{
        try {
            const {senha, email} = req.body

            const user = await userModel.findOne({email:email})

            if(!user){
                return res.status(422).json({msg:"Usuario não existe faça login"})
            }
            const checkPassword = await bcrypt.compare(senha, user.senha)
            if(!checkPassword){
                return res.status(422).json({msg:"Senha invalida"})
            }
            
            try {
                const secret =  process.env.secret
                const token = jwt.sign(
                    {
                        id:user._id
                    },
                    secret,
                )
                
                req.session.user = user.nome
                req.session.token = token 
                console.log("Deu certo buceta")
            
                res.status(200).json({msg:"Autenticação feita com sucesso", token})
            } catch (error) {
                console.log("Erro")
                res.status(401).json({msg:"Errona validação de senha"})
            }


        } catch (error) {
            res.status(401).json({msg:"Erro interno "+error})
        }
    }
}
module.exports = userController