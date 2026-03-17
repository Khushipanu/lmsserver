const TryCatch=(handler)=>{
    return async(req,res,next)=>{
        try{
            await handler(req,res,next);

        }catch(err){
            return res.status(500).json({ message: err.message });

            

        }
    }

}
export default TryCatch;