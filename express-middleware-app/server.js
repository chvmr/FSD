import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
const app = express(); 
app.use(cors());
app.use(morgan('dev'));
const logger=(req,res,next)=>{
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = `${req.method} ${req.url} ${res.statusCode} ${duration}ms\n`;
        fs.appendFile('./server.log', log, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    });
    next();
};
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const validate = (req, res, next) => {
    if (!req.body) {
        const error = new Error('Patient details missing');
        error.status = 400;
        throw error;
    }
    const { name, ward, gender } = req.body;
    if (!name || !ward || !gender) {
        const error = new Error('Patient details missing');
        error.status = 400;
        throw error;
    }
    next();
};
app.post('/api/v1/patients', validate, (req, res) => {
    res.status(200).json({ message: 'Patient record created successfully' });
});
app.get('/api/v1/patients', (req, res) => {
    res.status(200).json({ message: 'All patient record fetched successfully' });
});
app.get('/api/v1/patients/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({ message: `Patient with ${id} fetched successfully` });
});
app.get('/api/v1/patients', (req, res) => {
    const ward = req.query.ward;
    if(ward){
        res.status(200).send(`patient records in ward ${ward} fetched successfully`);
    }
    else{
        res.status(404).send("All patient records fetched successfully");
    }
});
app.put('/api/v1/patients/:id',(req,res)=>{
    const id = req.params.id;
    res.status(200).send(`patient with ${id} record updated successfully`);
});
app.delete('/api/v1/patients/:id',(req,res)=>{
    const id = req.params.id;
    res.status(200).send(`patient with ${id} record deleted successfully`);
});
app.use((req,res)=>{
    res.status(404).send('Route not found');
});
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).send(message);
});
const PORT = 9972;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/api/v1/patients`);
});