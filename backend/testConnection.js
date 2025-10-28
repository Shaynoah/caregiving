const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://carebridge_user:care2025@cluster0.hbuq5.mongodb.net/carebridge?retryWrites=true&w=majority';

console.log('🔄 Testing MongoDB connection...');

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
    console.log('📁 Database:', mongoose.connection.db.databaseName);
    
    // Create a test document
    const TestModel = mongoose.model('Test', { 
      name: String,
      date: { type: Date, default: Date.now }
    });

    return new TestModel({ name: 'test entry' }).save();
  })
  .then(() => {
    console.log('✅ Successfully saved test data!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
