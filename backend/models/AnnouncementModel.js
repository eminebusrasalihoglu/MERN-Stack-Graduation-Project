import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
    {
        description: { type: String, required: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
        classCode:{ type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const AnnouncementModel = mongoose.model('Announcement', announcementSchema);
export default AnnouncementModel;