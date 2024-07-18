import { Request, Response } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken"

const getLikes = (req: Request, res: Response) => {
    const query = "SELECT * FROM likedposts WHERE `userlikeid` = ? AND `postlikeid` = ? ";

    db.query(query, [req.params.id, req.params.idu], (err: any,data: Array<any>)=> {
        if(err) 
            {
                return res.status(500).json(err);
            }
        return res.status(200).json(data[0]);
    })
};

const addLike = (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo:any) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const query = "INSERT INTO likedposts(`userlikeid`, `postlikeid`) VALUES (?)"
        
        const values = [
            userInfo.id,
            postId
        ]
    
        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json("Post has been Liked.")
        })
  });
};

const deleteLike = (req: Request, res: Response) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err: any, userInfo:any) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const postId = req.params.id;
        const query = "DELETE FROM likedposts WHERE `postlikeid` = ? AND `userlikeid` = ?";

        db.query(query, [postId, userInfo.id], (err: any) => {
            if (err) 
                {
                    console.log("here");
                    return res.status(403).json("You can only toggle likes!");
                }

            return res.json("Like has been removed!");
        });
    });
};


export default {getLikes, addLike, deleteLike};