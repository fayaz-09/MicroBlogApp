import { Request, Response } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken"

const getPosts = (req: Request, res: Response) => {
    const query = "SELECT `idposts`, `username`, `content`, `comments`, `likes`, `date` FROM posts LEFT JOIN user ON posts.uid=user.id";

    db.query(query, (err,data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
};

const getPost = (req: Request, res: Response) => {
    const query = "SELECT `idposts`, `username`, `content`, `comments`, `likes`, `date` FROM posts p JOIN user u ON u.id=p.uid WHERE p.idposts = ?"
    
    db.query(query, [req.params.id], (err: any,data: Array<any>)=> {
        if(err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    })
};

const addPost = (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo:any) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO posts(`content`, `comments`, `likes`, `date`, `uid`) VALUES (?)"

        const values = [
            req.body.content,
            req.body.comments,
            req.body.likes,
            req.body.date,
            userInfo.id
        ]
    
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json("post has been created.")
        })
  });
};

const deletePost = (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo:any) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const postId = req.params.id;
        const query = "DELETE FROM posts WHERE `idposts` = ? AND `uid` = ?";

        db.query(query, [postId, userInfo.id], (err: any) => {
            if (err) 
                {
                    console.log("here");
                    return res.status(403).json("You can only delete your own post!");
                }

            return res.json("Post has been deleted!");
        });
    });
};

const updatePost = (req: Request, res: Response) => {
    const token = req.cookies.access_token;

  
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo:any) => {
        if (err) return res.status(403).json("Token is not valid!");


        const postId = req.params.id;
        const q = "UPDATE posts SET ?? = ? WHERE `idposts` = ?";
    

        const values = [
            req.body.data,
            req.body.number
        ]
        db.query(q, [...values, postId], (err, data) => {
      
        if (err) return res.status(500).json(err)
        return res.json("post has been updated.")
        })
    });
};

export default {getPosts, getPost, addPost, deletePost, updatePost};