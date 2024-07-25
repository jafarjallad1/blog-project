import { Router } from "express";
import blogModel from "../../../DB/model/blog.model.js";

const app = Router();

app.get('/' , async(req, res) => {

    try {
        const blogs = await blogModel.findAll();
        res.status(200).json({message : "success" , blogs : blogs});
    } catch (error) {
        res.status(500).json({ message: error});
    }
})

app.post('/', async (req, res) => {
    try {
        const{title , description , user_id} = req.body;
        const blog = await blogModel.create({ title : title, description : description , UserId : user_id });
        res.status(201).json({ message: "Blog created successfully", blog: blog });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

app.put('/:id' , async (req, res) => {
    try {
        const { id } = req.params;
        const { title , description } = req.body;
        const updatedBlog = await blogModel.update(
            { title : title, description : description },
            { where: { id: id } }
        );
        if (updatedBlog[0] === 1) {
            res.status(200).json({ message: "Blog updated successfully" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
    
});

app.delete('/:id' , async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await blogModel.destroy({ where: { id: id } });
        if (deletedBlog ) {
            res.status(200).json({ message: "Blog deleted successfully" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
});
export default app;
