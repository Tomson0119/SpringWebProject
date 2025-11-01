import { LoginRequest, LoginResponse } from "./common/type/model";
import * as HtmlUtility from "./common/utility/htmlUtility.js";
import { post } from "./common/utility/httpUtility.js";

async function postLogin(name: string, password: string): Promise<LoginResponse | null> {
    var loginRequest: LoginRequest = {
        name: name,
        password: password,
    };

    const response = await post("/login", loginRequest);
    if (response.ok == false) {
        return null;
    }

    const loginResponse: LoginResponse = await response.json();
    return loginResponse;
}

async function sendLoginRequest() {
    const inputName = HtmlUtility.getInputElementText("name");
    const inputPassword = HtmlUtility.getInputElementText("password");

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
    const loginButton = HtmlUtility.getElement("loginButton");
    loginButton.addEventListener("click", sendLoginRequest);
}

main();
