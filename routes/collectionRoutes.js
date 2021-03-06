import mongoose from "mongoose"; 
import CollectionsModel from "../model/CollectionsModel.js";
import {checkIfAuthenticated} from "../controller/authController.js";
const collectionsRoutesCreator = (app) => {
const routeString = "/api/collections/";    
app.route(routeString + "collection")
.post(async (req, res, next) => {
    const {title, routeName  } = req.body;
  
    if (title === undefined || routeName === undefined)
        {
            res.status(400).send({"error":"Need to have title and routeName in request body"});  
            return;  
        }
    try {
            const insertedData = await CollectionsModel.create({title, routeName})
            res.status(200).send({"message":"successfully created collection",data:insertedData});
        }
      catch(error)
        {
            res.status(400);
            next(error);  
        }  
})

app.route(routeString + "collection")
.get(async(req, res, next) => {
    const {title} = req.query; 
    if (typeof title !== "string")
        {
            res.status(400).json({"error":"type query must be passed"}); 
            return; 
        }
    try{
        const data = await CollectionsModel.find({title});
        res.status(200).json({...data});
       }
     catch(error)
        {
            res.status(400);
            next(error);  
        }  
})
app.route("/api/itemsname")
.get( async (req, res) => {
    const itemsName = await ItemsNameModel.find({});
    res.status(200).json(itemsName);
});

app.route("/api/item/")
.get(async(req, res, next) => { 
    const {_id} = req.query; 
  
  const type = req.query.type.split('').map((char,index) => {
     
        if(index === 0)
            {  
                char = char.toUpperCase();
            }
            return char; 
    }).join('');

    
    try{
        const collection = await CollectionsModel.findOne({title:type});
        //MAKE THIS CODE BETTER
        const itemArr = collection.items.filter(item => {
            if(item._id.toString() === _id)
                {
                    return true;
                }
        });
       const item = itemArr[0].toObject();
        //MAKE THIS CODE BETTER
       item.type = type;
       res.status(200).json(item ? item : {});
       }
     catch(error)
        {
            console.log(error);
            res.status(400);
            next(error);
        }  
});
}
//CollectionsModel.deleteMany({}, () => {}); 

export default collectionsRoutesCreator;
