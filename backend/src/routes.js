const { Router } = require("express");
const Perritos = require("./model/Perritos");
const router = Router();

//get all
router.get("/api/perritos", async (req,res) =>{  
  const perritos = await Perritos.find();
  res.json(perritos);
});

//get by Id
router.get("/api/perritos/:id",async (req,res)=>{
  //console.log(req.params);    
  const {id} = req.params;
  console.log(id);

  const perrito = await Perritos.findById(id);
  res.json(perrito)
});


//create perrito
router.post("/api/perritos",async (req,res) =>{
  try{
      const {nombre,raza,color,edad,fechaing} = req.body;
      const newPerritos = await Perritos({
          nombre: nombre,
          raza: raza,
          color: color,
          edad: edad,
          fechaing: fechaing,
      });
      newPerritos.save();
      res.json({msg: "post method"})
  }catch(error){
      res.status(500).json({msg:error});
  }
  
})

//put perrito
router.put("/api/perritos/:id",async (req,res) =>{
  try{
      const {id} = req.params;
      const updatePerrito = req.body;
  
      await Perritos.findByIdAndUpdate(id, updatePerrito);
      const perritos = await Perritos.find();//mostrar la informacion modificada
      res.json(perritos)
  }catch(error){
      res.status(500).json({msg:error});
  }
});


//delete by id
router.delete("/api/perritos/:id",async (req,res) =>{
  const {id}= req.params;

  await Perritos.findByIdAndDelete(id);
  const perritos = await Perritos.find();
  res.json(perritos);
})


module.exports = router;