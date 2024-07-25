import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';

const app = Router();

app.post('/' , async(req, res) => {
    const {name , email , password} = req.body;
    var hashedPass = bcrypt.hashSync(password, 8);
    try {
        const user  = await userModel.create({name: name , email: email , password: hashedPass});
    return res.status(200).json({ message: 'success registration' , data: user });
    } catch (error) {
        res.status(404).json({ message: 'error creating'});
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        const check = await bcrypt.compare(password, user.password);

        if (!check) { // if(check == false)
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id  ,name: user.name ,email:user.email} , '0595825985');

        return res.status(200).json({ message: "Success", token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error logging in", error: error.message });
    }
});


export default app;
