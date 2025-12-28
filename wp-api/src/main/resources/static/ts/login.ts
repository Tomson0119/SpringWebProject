import { LoginRequest, CustomErrorCode } from "./common/type/model.js";
import * as HtmlUtility from "./common/utility/htmlUtility.js";
import { isWpErrorResponse, post } from "./common/utility/httpUtility.js";

async function postLogin(name: string, password: string) {
    var loginRequest: LoginRequest = {
        name: name,
        password: password,
    };

    const response = await post("/auth/login", loginRequest);

    if (isWpErrorResponse(response)) {
        const wpErrorResponse = await response.json();
        const errorCode = wpErrorResponse.customErrorCode;

        if (errorCode == CustomErrorCode.MEMBER_NOT_FOUND) {
            const errorMessageText = HtmlUtility.getElement("login-error-message");
            errorMessageText.innerText = "아이디 혹은 비밀번호를 잘못 입력하였습니다.";
            errorMessageText.style.display = "flex";
            return;
        }

        return;
    }

    console.log(`Login succeeded - ${response.status}`);
    window.location.href = response.url;
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

    await postLogin(inputName, inputPassword);
}

async function main() {
    const loginButton = HtmlUtility.getElement("loginButton");
    loginButton.addEventListener("click", sendLoginRequest);
}

main();
