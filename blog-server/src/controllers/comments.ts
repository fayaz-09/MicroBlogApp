import { Request, Response } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken"

const getComments = (req: Request, res: Response) => {
    const query = "SELECT `idcomments`, `comment`, comments.date, `username` FROM comments LEFT JOIN user ON comments.userid=user.id JOIN posts WHERE comments.postid = posts.idposts";

    db.query(query, (err,data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
};

const addComment = (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo:any) => {
        if (err) return res.status(403).json("Token is not valid!");

        const query = "INSERT INTO comments(`comment`, `date`, `postid`, `userid`) VALUES (?)";

        const values = [
            req.body.comment,
            req.body.date,
            req.body.postid,
            userInfo.id
        ]
    
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json("post has been created.")
        })
  });
};

const deleteComment = (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo:any) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const commentId = req.params.id;
        const query = "DELETE FROM comments WHERE `idcomments` = ? AND `userid` = ?";

        db.query(query, [commentId, userInfo.id], (err: any) => {
            if (err) 
                {
                    console.log("here");
                    return res.status(403).json("You can only delete your own comment!");
                }

            return res.json("Comment has been deleted!");
        });
    });
};



export default {getComments, addComment, deleteComment};