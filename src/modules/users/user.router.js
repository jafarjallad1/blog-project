import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import jwt from 'jsonwebtoken';


const app = Router();

app.get('/' , async (req, res) => {
    const users = await userModel.findAll();
    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ message : "success" , users : users });
});

app.delete('/:id',async (req, res) => {

    const { id } = req.params;
   
    const user = await userModel.destroy(
        {
            where: {
                id: id
            }
        }
    );
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
});

app.put('/:id',async (req, res) => {
    const { id } = req.params;
    const { name} = req.body;
    const user = await userModel.update(
        { name: name },
        {
            where: {
                id: id
            }
        }
        );
        if (!user[0]) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully" });
    });

export default app;
