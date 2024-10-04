const express = require('express');
const app = express();
const PORT = 4010;

const API_KEY = '123456789'; 

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; 

  if (!apiKey) {
    return res.status(401).json({ message: 'Accès interdit : clé API manquante.' });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: 'Accès refusé : clé API invalide.' });
  }

  next();
};

app.get('/api/private-data', apiKeyMiddleware, (req, res) => {
  res.json({ message: 'Voici des données privées que vous avez accès avec une clé API valide.' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
