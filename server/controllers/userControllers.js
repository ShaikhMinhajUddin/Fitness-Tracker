const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const profileImage = req.file ? req.file.path : '';
  
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
     
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }
      
        user = new User({
            username,
            email,
            password,
            profileImage
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).json({ error: 'Server error' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }     

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (err) {
        console.error('Error logging in user', err);
        res.status(500).json({ error: 'Server error' });
    }
}


const getUser = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); 
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching registered users:", error);
        res.status(500).send("Error fetching registered users");
      }
}


const getUpdate = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send("User not found");
        }
        res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Error fetching user");
      }
}


const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, email, password } = req.body;
        const profileImage = req.file ? req.file.path : null;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password; 
        if (profileImage) {
            user.profileImage = profileImage;
        }

        await user.save();
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'Server error' });
    }
}






module.exports = {  registerUser, loginUser, getUser, updateUser, getUpdate };
