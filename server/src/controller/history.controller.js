const Search = require('../models/search.model');

exports.getHistory = async (req, res) => {
  try {
    const history = await Search.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};