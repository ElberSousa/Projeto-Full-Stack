import { FollowDatabase } from "../data/FollowDatabase";
import { Authenticator } from "../services/Authenticator";

export class FollowBusiness {
    async follow(id: string, token: string){
        const authenticator = new Authenticator()
        const accessToken = authenticator.getData(token)
    
        if(!accessToken){
            throw new Error("Token Invalido!");
        }

        const followDatabase = new FollowDatabase()
        
        await followDatabase.insertFollowDatabase(
            accessToken.id,
            id
        )
        return ("Seguindo!")
    }

    async unfollow(id: string, token: string){
        const authenticator = new Authenticator()
        const accessToken = authenticator.getData(token)
    
        if(!accessToken){
            throw new Error("Token Invalido!");
        }

        const followDatabase = new FollowDatabase()
        
        await followDatabase.deleteFollowDatabase(
            accessToken.id,
            id
        )
        return ("Deixou de seguir!")
    }
}