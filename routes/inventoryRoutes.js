

const express =require('express')
const authMiddelware = require('../middlewares/authMiddelware')
const {createInventoryController,getInventoryController, getDonarsController, getHospitalController, getOrgnaisationController, getOrgnaisationForHospitalController, getInventoryHospitalController, getRecentInventoryController, updateInventory, getbyId}=require('../controllers/inventoryController')
const router=express.Router()

// Add doner recods \|post
router.get("/get-donars", authMiddelware, getDonarsController)

// Add inventory \|post
router.post('/create-inventory',authMiddelware,createInventoryController)


// get hospital recods
router.get('/get-hospitals', authMiddelware, getHospitalController)
//  get all blood recods
router.get("/get-inventory", authMiddelware, getInventoryController);

// get org
router.get("/get-organisation", authMiddelware, getOrgnaisationController);

//GET HOSPITAL BLOOD RECORDS
router.post(
    "/get-inventory-hospital",
    authMiddelware,
    getInventoryHospitalController
  );

router.get(
    "/get-orgnaisation-for-hospital",
    authMiddelware,
    getOrgnaisationForHospitalController
  );
  
//GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authMiddelware,
  getRecentInventoryController
);



router.put(
  "/update-inventory/:id",
  // authMiddelware,
  updateInventory
);




router.get(
  "/getbyid-inventory/:id",
  // authMiddelware,
  getbyId
);

  
module.exports=router