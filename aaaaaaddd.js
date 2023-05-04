const handleButtonClick = () => {
  const audioName = 'mp3.mp3';
  const audioDirectory = '/path/to/audio/directory';
  axios.get(`http://localhost:8080/audio?name=${audioName}&directory=${audioDirectory}`, {
    responseType: 'blob',
    headers: {
      Range: 'bytes=0-',
    },
  })
    .then((response) => {
      const url = URL.createObjectURL(response.data);
      setAudioSrc(url);
    })
    .catch((error) => {
      console.error('Error fetching audio:', error);
    });
};





const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(cors({
  origin: 'http://localhost:3000' // Set the origin to your React app's domain
}));

app.get('/audio', (req, res) => {
  const audioName = req.query.name;
  const audioDirectory = req.query.directory;
  const audioFilePath = path.join(audioDirectory, audioName);
  const audioFileStat = fs.statSync(audioFilePath);

  const { range } = req.headers;
  const fileSize = audioFileStat.size;
  const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
  const end = fileSize - 1;
  const chunkSize = (end - start) + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'audio/mpeg',
  };

  res.writeHead(206, headers);

  const audioStream = fs.createReadStream(audioFilePath, { start, end });

  audioStream.pipe(res);
});
