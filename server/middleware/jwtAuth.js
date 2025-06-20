const jwt = require("jsonwebtoken");

const jwtAuth = async(req,res,next)=>{
    try{
        let jwtToken;
        const authHeader = req.headers["authorization"];
        console.log(authHeader)
        if(authHeader !== undefined)
        {
            jwtToken = authHeader.split(' ')[1];
        }
        
        if(jwtToken === undefined)
        {
            return res.status(401).json({message:"No token provided"})
        }else
        {
            jwt.verify(jwtToken,"SGU_JWT",async(err,payload)=>{
                if(err){
                    return res.status(401).json({message:"Invalid JWT Token"})
                }
                else
                {
                    req._id = payload.userId;
                    next();
                }
            })
        }
    }
    catch(e)
    {
        console.log("middleware",e);
        res.status(401).json({message:"Auth failed"})
    }
}

module.exports = jwtAuth;