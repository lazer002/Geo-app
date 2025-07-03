// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://test:bguwabguwbagubwuabguwabguwab@cluster0.vaaxy4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const gpsSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  count: { type: Number, default: 0 },
  deviceType: { type: String },
  osVersion: { type: String },
  appVersion: { type: String },
  userAgent: { type: String },
  ipAddress: { type: String }
});

const GPSLocation = mongoose.model('GPSLocation', gpsSchema);


app.post('/api/location', async (req, res) => {
  console.log(req.body);
  const { latitude, longitude, deviceId, deviceType, osVersion, appVersion } = req.body;
  const userAgent = req.headers['user-agent'];
  const ipAddress = req.connection.remoteAddress;

  if (!deviceId) {
    return res.status(400).json({ message: 'Device ID is required.' });
  }
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ message: 'Latitude and longitude are required.' });
  }

  try {
    const updatedLocation = await GPSLocation.findOneAndUpdate(
      { deviceId },
      {
        $set: {
          latitude,
          longitude,
          deviceType,
          osVersion,
          appVersion,
          userAgent,
          ipAddress,
          timestamp: new Date()
        },
        $inc: { count: 1 }
      },
      { upsert: true, new: true }
    );
    res.json({ message: 'Location updated successfully', data: updatedLocation });
  } catch (err) {
    console.error('Error saving/updating location:', err);
    res.status(500).json({ message: 'Error saving/updating location.' });
  }
});

// GET API to return all location data
app.get('/api/all-locations', async (req, res) => {
  try {
    const allLocations = await GPSLocation.find({}).sort({ timestamp: -1 });
    res.json(allLocations);
  } catch (err) {
    console.error('Error fetching all locations:', err);
    res.status(500).json({ message: 'Error fetching all locations.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
