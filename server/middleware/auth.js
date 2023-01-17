//to enable login to post
//wants to like a post? then auth middleware (next)=>like controller..
import jwt from "jsonwebtoken";

// Google auth verification and setting up middle ware
const auth = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length<500;//more than 500 then google auth        let decodedData;
        let decodedData;
        // decodedData = jwt.decode(token);
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');//test string here too
            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;//sub is google id to diff each user
        }
        
        next();
    } 
    catch (error) {
        console.log(error);
    }
};
//next means do somthing and move to the next
export default auth;