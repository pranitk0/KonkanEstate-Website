const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./server/models/User');

const createAdmin = async () => {
  try {
    console.log(' Connecting to MongoDB Atlas...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); 

    console.log(' Connected to MongoDB Atlas');

    const existingAdmin = await User.findOne({ email: 'admin@konkanproperties.com' });
    
    if (existingAdmin) {
      console.log('  Admin user already exists');
      console.log(' Email: ');
      console.log(' Role: Administrator');
    } else {
      const admin = new User({
        name: 'Super Administrator',
        email: 'admin@konkanproperties.com',
        password: '',
        phone: '+91-1234567890',
        address: 'Konkan Coast, Maharashtra, India',
        isVerified: true
      });

      await admin.save();
      console.log(' Admin user created successfully!');
      console.log(' Email: admin@konkanproperties.com');
      console.log(' Password: ');
      console.log(' Role: Administrator');
      console.log('  IMPORTANT: Change the password after first login!');
    }

  } catch (error) {
    console.error(' Error creating admin user:', error);
  } finally {
    await mongoose.connection.close();
    console.log(' Database connection closed');
    process.exit();
  }
};

createAdmin();
