// export const checkXRoleHeaderMiddleware=(req,res,next)=>{
// let headers = req.headers["XRole"]
// let xRole=headers["x-role"]
// console.log("headers:",headers)
// if(!xRole){

//     res.status(400).json({
//         error:"X-Role header must be required"
//     })
//     return
// }
export const checkXRoleHeaderMiddleware = (req, res, next) => {
    const xRole = req.headers["x-role"];

    console.log("X-Role:", xRole);

    if (!xRole) {
        return res.status(400).json({
            error: "X-Role header is required"
        });
    }

    next();
}

 export let checkApiKeyInheader=(req,res,next)=>{
let apiKey=req.headers["x-api-key"]
if(!apiKey){
    res.status(400).json({
        error:"'api key not found in header"
    })
    return
}
if(apiKey !== "NodeJs-ApiKey"){
    res.status(400).json({
        error:"'api key not found in header"
    })
    return
}
next()
}