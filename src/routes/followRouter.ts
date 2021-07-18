import express from 'express'
import {FollowController} from "../controller/FollowController"

export const followRouter = express.Router()

const followController = new FollowController()

followRouter.post("/create-unfollow", followController.unfollow)
followRouter.post("/create-follow", followController.follow)