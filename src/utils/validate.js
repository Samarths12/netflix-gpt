export const checkValidData = (email, password, name) => {

    const isEmailVaild = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-aZ-Z]).{8,}$/.test(password);

    const isValidName = /^([a-zA-Z]+[ \-']{0,1}){1,3}$/.test(name);

    if(!isEmailVaild) return "Email ID is not valid!";
    if(!isPasswordValid) return "Password is not valid!";
    if(!isValidName) return "Name not valid!";

    return null;
}