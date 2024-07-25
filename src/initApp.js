import userRouter from './modules/users/user.router.js';
import connectionDb from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import blogRouter from './modules/blogs/blog.router.js';
import commentRouter from './modules/comments/comment.router.js';
import cors from 'cors';


export const  initapp = (app,express)=>{

    connectionDb();
    app.use(express.json());
    app.use(cors());
    app.use('/users' , userRouter);
    app.use('/auth', authRouter);
    app.use('/blogs', blogRouter);
    app.use('/comments', commentRouter);
    app.use('*',(req,res)=>{
        res.status(404).json({message:'Not Found'});
    })
    
};

