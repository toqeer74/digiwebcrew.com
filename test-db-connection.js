const mongoose = require('mongoose');

// Load environment variables from .env.local
const fs = require('fs');
const path = require('path');

// Read .env.local file manually
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

console.log('🔍 Testing Database Connection');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

if (process.env.MONGODB_URI) {
  console.log('MONGODB_URI length:', process.env.MONGODB_URI.length);
  console.log('MONGODB_URI starts with:', process.env.MONGODB_URI.substring(0, 20) + '...');
  
  // Test connection
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });
} else {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}
