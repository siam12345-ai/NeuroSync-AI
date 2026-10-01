const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Resend } = require("resend");
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
// ================= RESET PASSWORD =================

const resetPassword = async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return errorResponse(
        res,
        400,
        "Reset token is required."
      );
    }

    if (!password) {
      return errorResponse(
        res,
        400,
        "New password is required."
      );
    }

    if (password.length < 6) {
      return errorResponse(
        res,
        400,
        "Password must be at least 6 characters."
      );
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    });

    if (!user) {
      return errorResponse(
        res,
        400,
        "Invalid or expired reset token."
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

    // Clear reset token after successful reset
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return successResponse(
      res,
      200,
      "Password reset successfully."
    );

  } catch (error) {

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
// ================= FORGOT PASSWORD =================

const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return errorResponse(
        res,
        400,
        "Email is required."
      );
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    // Do not reveal whether the email exists
    if (!user) {
      return successResponse(
        res,
        200,
        "If an account exists with this email, password reset instructions have been sent."
      );
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires =
      Date.now() + 15 * 60 * 1000;

    await user.save();

// Create production reset URL

const resetURL =
  `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

// Send password reset email
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "NeuroSync AI <onboarding@resend.dev>",
  to: user.email,
  subject: "Reset Your NeuroSync AI Password",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>NeuroSync AI - Password Reset</h2>

      <p>Hello ${user.name || "User"},</p>

      <p>
        We received a request to reset your NeuroSync AI password.
      </p>

      <p>
        Click the button below to create a new password:
      </p>

      <p>
        <a
          href="${resetURL}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>
      </p>

      <p>
        This link will expire in 15 minutes.
      </p>

      <p>
        If you did not request a password reset, you can safely ignore this email.
      </p>

      <p>
        — NeuroSync AI Team
      </p>
    </div>
  `
});

return successResponse(
  res,
  200,
  "If an account exists with this email, password reset instructions have been sent."
);

  } catch (error) {

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
forgotPassword,
resetPassword,
logout

};