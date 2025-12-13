
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures');


exports.getAll = Model => catchAsync(async (req,res,next)=>{
    //to allow for nested GET reviews on tour(hack)
    let filter = {}
    if(req.params.productId) filter = {product: req.params.productId}

        //EXECUTE QUERY
        const features = new APIFeatures(Model.find(filter), req.query).filter().sort();
       //using the explain method
        // const doc = await features.query.explain();
        const doc = await features.query;


        //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        result: doc.length,
        data: {
            data:doc
        }
    })
    
});






exports.getOne = (Model) =>catchAsync( async (req,res,next)=>{
    let query =Model.findById(req.params.id)
    const doc = await query;
        if(!doc){
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data:doc
        }
    })
    
})


exports.createOne = Model => catchAsync(async (req,res,next)=>{
    //using the Tour model directly
     const doc = await Model.create(req.body);


     res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        })
  
});




