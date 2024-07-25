import { Router } from "express";
import commentModel from "../../../DB/model/comment.model.js"; 
import blogModel from "../../../DB/model/blog.model.js";
import userModel from "../../../DB/model/user.model.js";

const app = Router();

app.get("/", async (req, res) => {
    try {
        const comments = await commentModel.findAll();
        res.status(200).json( {message : "success" , comments});
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.post("/", async (req, res) => {
    try {
        const {description , uesrid , blogid} = req.body;
        const newComment = await commentModel.create({description : description,
            name : userModel.name,
            blog: blogModel.title,
            UserId: uesrid,
            BlogId: blogid
        });
        res.status(201).json({ message: "success", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

app.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedComment = await commentModel.update({ description }, { where: { id } });
        if (updatedComment[0] === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ message: "success"});
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await commentModel.destroy({ where: { id } });
        if (deletedComment === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

export default app;
