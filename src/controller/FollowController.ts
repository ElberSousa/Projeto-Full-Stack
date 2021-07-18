import { Request, Response } from "express";
import { FollowBusiness } from "../business/FollowBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class FollowController{

    async follow(
        req: Request,
        res: Response
    ){

        try {
            const token = req.headers.authorization as string
            
            const id_follow = req.body.id_follow

            const followBusiness = new FollowBusiness()
            const message = await followBusiness.follow(id_follow, token)
        
            res
            .status(200)
            .send({
                message: message
            })
        } catch (error) {
            res.status(400).send({ error: error.message })            
        }
        await BaseDatabase.destroyConnection()
    }

    async unfollow(
        req: Request,
        res: Response
    ){

        try {
            const token = req.headers.authorization as string
            
            const id_follow = req.body.id_followed

            const followBusiness = new FollowBusiness()
            const message = await followBusiness.unfollow(id_follow, token)
        
            res
            .status(200)
            .send({
                message: message
            })
        } catch (error) {
            res.status(400).send({ error: error.message })            
        }
        await BaseDatabase.destroyConnection()
    }
}