module.exports = process.env.NODE_ENV === 'product' ? process.env : require('./dev');
