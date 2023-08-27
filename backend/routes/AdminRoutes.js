import express from 'express';
import { authRole } from '../auth/authRoles.js';
import Class from '../models/ClassModel.js';

const adminRouter = express.Router();

adminRouter.post('/form', async (req, res) => {
  try {
    const { students, academic, classCode } = req.body;
    const createdClass = await Class.create({
      students,
      academic,
      classCode,
    });

    return res.status(201).json(createdClass);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

adminRouter.get('/class', authRole('ADMIN'), async (req, res) => {
  const classes = await Class.find();
  res.send(classes);
});

adminRouter.delete('/delete/:id', authRole('ADMIN'), async (req, res) => {

  const _id = req.params.id;
  console.log(req.params);
  const item = await Class.findByIdAndRemove(_id);
  if (!item) {
    return next(new Error('Class not found'));
  }
  res.sendStatus(200);
});
adminRouter.put('/put/:id', authRole('ADMIN'), async (req, res) => {

  const _id = req.params.id;
  const { students, academic, classCode } = req.body;
  const item = await Class.findByIdAndUpdate(_id, { students, academic, classCode })
  .then(updatedClass => {
    if (!updatedClass) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.sendStatus(200);
  })
  .catch(error => {
    res.status(500).json({ error: 'Error..' });
  });
});
export default adminRouter;
