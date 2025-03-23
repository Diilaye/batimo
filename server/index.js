import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import Message from './models/Message.js';
import Quote from './models/Quote.js';
import Admin from './models/Admin.js';
import Service from './models/Service.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  retryWrites: true,
  w: 'majority'
};

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, mongoOptions)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

app.use(cors({
  origin: 'http://localhost:3010',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Non autorisé' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user;
    next();
  });
};

// Get all admins
app.get('/api/admins', authenticateToken, async (req, res) => {
  try {
    const admins = await Admin.find().select('email');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des administrateurs' });
  }
});

// Add comment to quote
app.post('/api/quotes/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { content, mentions } = req.body;
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }

    quote.comments.push({
      content,
      author: req.user.id,
      mentions: mentions || []
    });

    await quote.save();

    // Populate the newly added comment with author details
    const populatedQuote = await Quote.findById(quote._id)
      .populate('comments.author', 'email')
      .populate('comments.mentions', 'email');

    res.json(populatedQuote);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire' });
  }
});

// Delete comment from quote
app.delete('/api/quotes/:quoteId/comments/:commentId', authenticateToken, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.quoteId);
    
    if (!quote) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }

    quote.comments = quote.comments.filter(
      comment => comment._id.toString() !== req.params.commentId
    );

    await quote.save();
    res.json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du commentaire' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({ message: 'Connexion réussie' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await Message.create({ name, email, message });
    res.status(200).json({ message: 'Message enregistré avec succès' });
  } catch (error) {
    console.error('Erreur d\'enregistrement:', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du message' });
  }
});

// Quote submission
app.post('/api/quote', async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du devis' });
  }
});

// Get a single quote
app.get('/api/quotes/:id', authenticateToken, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('comments.author', 'email')
      .populate('comments.mentions', 'email');
    
    if (!quote) {
      return res.status(404).json({ message: 'Devis non trouvé' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du devis' });
  }
});

// Get all quotes
app.get('/api/quotes', authenticateToken, async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate('comments.author', 'email')
      .populate('comments.mentions', 'email')
      .sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des devis' });
  }
});

// Update quote status
app.patch('/api/quotes/:id/status', authenticateToken, async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('comments.author', 'email')
     .populate('comments.mentions', 'email');
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du devis' });
  }
});

// Delete a quote
app.delete('/api/quotes/:id', authenticateToken, async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Devis supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du devis' });
  }
});

// Get a single message
app.get('/api/messages/:id', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du message' });
  }
});

// Get all messages
app.get('/api/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
  }
});

// Mark message as read
app.patch('/api/messages/:id/read', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du message' });
  }
});

// Delete a message
app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du message' });
  }
});

// Services API endpoints
app.get('/api/services', authenticateToken, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des services' });
  }
});

app.post('/api/services', authenticateToken, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du service' });
  }
});

app.put('/api/services/:id', authenticateToken, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du service' });
  }
});

app.delete('/api/services/:id', authenticateToken, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du service' });
  }
});

const PORT = 3011;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});