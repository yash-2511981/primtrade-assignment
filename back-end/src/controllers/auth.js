const { getUser, createUser } = require("../services/user");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { validatePassword, generateHashPassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const { successResponse } = require("../utils/successResponse");


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;


    const user = await getUser("email", email.toLowerCase());

    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials')
    }

    const token = generateToken({ id: user._id, role: user.role });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000
    });

    const { password: pwd, ...userWithoutPassword } = user;

    successResponse(res, { user: userWithoutPassword }, 'Login successful');
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await getUser("email", email);
    if (existingUser) {
        throw new ApiError(409, 'User already exists');
    }

    const hashedPassword = await generateHashPassword(password);

    const newUser = await createUser({ name, email: email.toLowerCase(), password: hashedPassword });

    const token = generateToken({ id: newUser._id, role: newUser.role });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000
    });

    const { password: pwd, ...userWithoutPassword } = newUser.toObject();

    successResponse(res, { user: userWithoutPassword }, 'User registered successfully', 201);
});


const logout = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    successResponse(res, null, 'Logout successful');
});


module.exports = { login, registerUser, logout };