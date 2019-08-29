var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var createProjectSchema = mongoose.Schema({
    pName: String,
    pManager: String,
    pManagerEmail: String,
    pcreateDate: String,
    pETA: String,
    pResource: Number,
    pManagerContact: Number,
    pLead: String,
    pStatus: String,
    pDesc: String
});

var Project = mongoose.model("Project", createProjectSchema);


router.post('/', function(req, res){
    var projectInfo = req.body; //Get the parsed information
    
    if(!projectInfo.pName || !projectInfo.pManager || !projectInfo.pManagerEmail || !projectInfo.pcreateDate || 
        !projectInfo.pETA || !projectInfo.pResource || !projectInfo.pManagerContact ||
        !projectInfo.pLead || !projectInfo.pStatus || !projectInfo.pDesc) {
       res.send("sorry");
    } else {
       var newProject = new Project({
          pName: projectInfo.pName,
          pManager: projectInfo.pManager,
          pManagerEmail: projectInfo.pManagerEmail,
          pcreateDate: projectInfo.pcreateDate,
          pETA: projectInfo.pETA,
          pResource: projectInfo.pResource,
          pManagerContact: projectInfo.pManagerContact,
          pLead: projectInfo.pLead,
          pStatus: projectInfo.pStatus,
          pDesc: projectInfo.pDesc
       });
         
       newProject.save(function(err, Project){
          if(err)
             res.send("Failed");
          else
             res.send("Sucessfully created new project");
       });
    }
 });

 module.exports = router;