const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const getUser = catchAsync(async(req,res) => {
    let data;
    data = await userService.getUserById(req.params.userId);
    if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
    else{
        res.send(data);
    }
})

module.exports = {
    getUser,
};