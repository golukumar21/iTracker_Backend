var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var createProjectSchema = mongoose.Schema({
    pName: String,
    pManager: String,
    pManagerEmail: String,
    pcreateDate: Date,
    pETA: Date,
    pResource: Number,
    pManagerContact: Number,
    pLead: String,
    pStatus: String,
    pDesc: String
});

var Project = mongoose.model("Project", createProjectSchema);

router.post('/', function (req, res) {
    var projectInfo = req.body;
    if (!projectInfo.pName || !projectInfo.pManager || !projectInfo.pManagerEmail || !projectInfo.pcreateDate ||
        !projectInfo.pETA || !projectInfo.pResource || !projectInfo.pManagerContact ||
        !projectInfo.pLead || !projectInfo.pStatus || !projectInfo.pDesc) {
        res.send("Field value missing. Kindly fill all the details!");
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

        newProject.save(function (err, Project) {
            if (err)
                res.send("Err! Not able to create project at the moment!!");
            else
                res.send("Sucessfully created new project");
        });
    };
});

router.get('/', function (req, res) {
    Project.find({}, function (err, result) {
        if (result) {
            res.send({ res: result });
        } else {
            res.send("Not able to fetch records!")
        }
    });
});

module.exports = router;