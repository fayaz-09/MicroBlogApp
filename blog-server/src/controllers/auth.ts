import { Request, Response } from "express";
import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const register = (req: Request, res: Response) => {
    /*Check the database for an already existing user */
    /*query variable contains the mySQL statement for the query*/
    const query = "SELECT * FROM user WHERE email = ? OR username = ?";

    db.query(query, [req.body.email, req.body.username], (err,data) => {
        if(err) return res.json(err)
        console.log(data);
        /*following if statement will evaluate to true if the query returns an existing user*/
        if(Array.isArray(data) && data.length != 0) 
        {
            return res.status(409).json("user alreadys exists");
        }
        /*Hash password and add user to database*/
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO user (`username`,`email`,`password`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(insertQuery, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created.")
        });

    })
};

const login = (req: Request, res: Response) => {
    /*Check the database for an already existing user */
    const query = "SELECT * FROM user WHERE username = ?";

    db.query(query, [req.body.username], (err: any,data: Array<any>)=>{
        if (err){
            return res.status(500).json(err);
        }
        if(data.length === 0)
        {
            return res.status(404).json("user not found");
        }

        /*Check the password entered and compare it to the hashed password in the database*/ 
        const passwordCompare = bcrypt.compareSync(req.body.password, data[0].password);

        if(!passwordCompare) return res.status(400).json("username or password is incorrect");
        
        /*Stores id within a cookie which is then checked before performing functions such as deleting a post. Only a matching id will allow for post deletion.*/
        const token = jwt.sign({id: data[0].id}, "jwtkey");
        const {password, ...other} = data[0];

        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json(other);

    });
};

const logout = (req: Request, res: Response) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
};


export default {register, login, logout};