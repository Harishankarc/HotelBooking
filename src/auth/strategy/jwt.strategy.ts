import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";

export class JwtSrategy extends PassportStrategy(Strategy){
  constructor(){
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration : false,
      secretOrKey : jwtConstants.secret
    })
  }

  async validate(payload : any){
    return {
      id : payload.sub,
      email: payload.email
    }
  }

}