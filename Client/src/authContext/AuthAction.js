export const loginStart = () =>({
    type:"LOGIN_START",
});

export const loginFailure = () =>({
    type:"LOGIN_FAILURE",
});

export const loginSuccess = (user) =>({
    type:"LOGIN_SUCCESS",
    payload:user
});


//For Logout
export const logOut = () =>({
    type:"LOGOUT"
});
