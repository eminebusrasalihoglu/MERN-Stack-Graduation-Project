import express from "express";
import mongoose from "mongoose";
import AnnouncementModel from '../models/AnnouncementModel.js';
import { authRole } from "../auth/authRoles.js";
const announcementRouter = express.Router();

announcementRouter.post("/create",authRole('ACADEMIC'), async (req, res) => {
    try {
        const { 
        description,email,name} = req.body;
        const classCode = req.tokenPayload.classCode;
        const createdAnnouncement = await AnnouncementModel.create({
            description,email,name,classCode,
        })

        return res.status(201).json(createdAnnouncement);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})
announcementRouter.get("/create",authRole('ACADEMIC'), async(req,res) =>{
    
    res.status(200);
} );
announcementRouter.get("/", async(req,res) =>{
    const classCode = req.tokenPayload.classCode;
    const announcements = await AnnouncementModel.find({classCode:classCode});
    res.send(announcements);
} );

announcementRouter.delete('/delete/:id', authRole('ACADEMIC'), async (req, res) => {
    const _id = req.params.id;
    const item = await AnnouncementModel.findByIdAndRemove(_id);
    console.log(_id);

    if (!item) {
      return next(new Error('No item found'));
    }
    res.sendStatus(200);
  });

export default announcementRouter;
