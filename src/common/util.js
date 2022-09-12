



// use controller
const ROLE_MEMBER = 'Member';
const ROLE_ADMIN = 'Admin';

// use router
const Admin = 'Admin';
const Member = 'Member';

function sendError(code, errorStr, err) {
  return {
    code: code || 500,
    // eslint-disable-next-line no-use-before-define
    data: error(errorStr, err),
  };
}

function sendSuccess(response) {
  const responseData = {
    success: true, ...response
  };
  return {
    code: 200,
    data: responseData,
  };
}


module.exports = {
    ROLE_ADMIN,
    ROLE_MEMBER,
    Admin,
    Member,
    sendError,
    sendSuccess
}