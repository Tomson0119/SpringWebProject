import { post } from "./common/utility/httpUtility.js";
async function postLogin(name, password) {
    var loginRequest = {
        name: name,
        password: password,
    };
    const response = await post("/login", loginRequest);
    if (response.ok == false) {
        return null;
    }
    const loginResponse = await response.json();
    return loginResponse;
}
async function sendLoginRequest() {
    const inputName = document.getElementById("name").value;
    const inputPassword = document.getElementById("password").value;
    if (inputName == null || inputName.length <= 0) {
        console.error("cannot find inputName tag or didn't input name");
        return;
    }
    if (inputPassword == null || inputPassword.length <= 0) {
        console.error("cannot find inputPassword tag or didn't input password");
        return;
    }
    console.log(`name: ${inputName}`);
    console.log(`pwd: ${inputPassword}`);
    const memberInfo = await postLogin(inputName, inputPassword);
    if (memberInfo == null) {
        console.error("Failed to login");
        return;
    }
    if (memberInfo.name != inputName || memberInfo.password != inputPassword) {
        console.error(`invalid server response: (${memberInfo.name}, ${memberInfo.password})`);
        return;
    }
    console.log("login succeeded");
}
async function main() {
    const loginButton = document.getElementById("loginButton");
    if (loginButton == null) {
        console.error("Failed to find login button");
        return;
    }
    loginButton.addEventListener("click", sendLoginRequest);
}
main();
