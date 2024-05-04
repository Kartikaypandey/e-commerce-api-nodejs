const CustomError = require('../errors');

function checkPermission (requestUser , requestedUserId){
    if(requestUser.role === 'admin') return;
    console.log(requestUser.userId);
    console.log(requestedUserId);
    if(requestUser.userId === requestedUserId.toString()) return;
    throw new CustomError.UnauthorizedError('Unauthorized access');
}

module.exports = checkPermission