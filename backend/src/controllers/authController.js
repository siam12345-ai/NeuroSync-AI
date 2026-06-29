const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
successResponse,
errorResponse
} = require("../utils/response");

// ================= REGISTER =================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

// ✅ Input Validation
if (!name || !email || !password) {

    return errorResponse(
        res,
        400,
        "All fields are required."
    );

}

const existingUser = await User.findOne({ email });

if (existingUser) {

    return errorResponse(
        res,
        400,
        "Email already exists"
    );


}

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

return successResponse(
    res,
    201,
    "User Registered Successfully"
);

  } catch (error) {

    return errorResponse(
        res,
        500,
        error.message
    );

}
};

// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // ✅ Input Validation
if (!email || !password) {

    return errorResponse(
        res,
        400,
        "Email and Password are required."
    );

}

    const user = await User.findOne({ email });

   if (!user) {
  return errorResponse(
    res,
    404,
    "User not found"
  );
}
   

    // Compare Password
const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return errorResponse(
    res,
    400,
    "Wrong password"
  );
}
// Generate JWT Token
const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);
// Remove Password Before Sending Response
const userData = await User.findById(user._id).select("-password");

return successResponse(
    res,
    200,
    "Login Successful",
    {
        token,
        user: userData
    }
);
  } catch (error) {
   return errorResponse(
    res,
    500,
    error.message
);
  }
};
// ================= GET PROFILE =================

const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

   if (!user) {
  return errorResponse(
    res,
    404,
    "User not found"
  );
}

    return successResponse(
    res,
    200,
    "Profile Retrieved Successfully",
    user
);

  } catch (error) {

    return errorResponse(
    res,
    500,
    error.message
);

  }

};
// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;
        // ✅ Input Validation
if (!name && !email) {

    return errorResponse(
        res,
        400,
        "Please provide Name or Email."
    );

}

        const user = await User.findById(req.user.id);

        if (!user) {

            return errorResponse(
    res,
    404,
    "User not found"
);

        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        const updatedUser = await User.findById(req.user.id).select("-password");

       return successResponse(
    res,
    200,
    "Profile Updated Successfully",
    updatedUser
);

    }

    catch (error) {

        return errorResponse(
    res,
    500,
    error.message
);

    }

};
// ================= LOGOUT =================

const logout = async (req, res) => {

    try {

        return successResponse(
    res,
    200,
    "Logout Successful"
);

    }

    catch (error) {

        return errorResponse(
    res,
    500,
    error.message
);

    }

};
module.exports = {

register,
login,
getProfile,
updateProfile,
logout

};