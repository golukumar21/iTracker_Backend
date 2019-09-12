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

router.get('/getCount', async function (req, res) {
    try {
        var totalCount = await Project.countDocuments();
        var ongoingCount = await Project.find({ "pStatus": "In Progress" }).countDocuments();
        var completedCount = await Project.find({ "pStatus": "Completed" }).countDocuments();
        res.send({
            res: {
                "total": totalCount,
                "ongoing": ongoingCount,
                "completed": completedCount
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/', async function (req, res) {
    try {
        var result = await Project.find().exec();
        res.send({ res: result });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async function (req, res) {
    try {
        var proj = await Project.findById(req.params.id).exec();
        res.send({ res: proj });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.put("/:id", async function (req, res) {
    try {
        var proj = await Project.findById(request.params.id).exec();
        proj.set(request.body);
        var result = await proj.save();
        res.send({ res: result });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/:id", async function (req, res) {
    try {
        var result = await Project.deleteOne({ _id: request.params.id }).exec();
        res.send({ res: result });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
