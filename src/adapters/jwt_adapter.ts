import jwt from "jsonwebtoken";

export class JWTAdapter {
     
    constructor(private readonly secret:string){}

    encrypt(value: any){
        return jwt.sign(value,this.secret)
    }

    decrypt(token: string){
        return jwt.verify(token, this.secret)
    }
    
}