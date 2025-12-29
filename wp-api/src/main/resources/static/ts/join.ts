import { JoinRequest, WpErrorResponse } from "./common/type/model.js";
import { getInputElementText, getElement } from "./common/utility/htmlUtility.js";
import { isWpErrorResponse, post, get } from "./common/utility/httpUtility.js";

async function sendJoinRequest() {
    const name = getInputElementText("input-name");
    const password = getInputElementText("input-password");

    // name 검증
    if (validateName(name) == false) {
        console.error("input name is not valid");
        return;
    }

    // password 검증
    if (validatePassword(password) == false) {
        console.error("input pwd is not valid");
        return;
    }

    const request: JoinRequest = {
        name: name,
        password: password,
    };

    const response = await post("/members", request);
    const wpResponse = await response.json();

    if (isWpErrorResponse(response)) {
        const wpErrorResponse = wpResponse as WpErrorResponse;
        console.error(`Failed to join: ${wpErrorResponse.customErrorCode}`);
        return;
    }

    const memberUri = response.headers.get("location");
    console.info(`location: ${memberUri}`);
}

async function sendCheckNameRequest() {
    const name = getInputElementText("input-name");
    if (validateName(name) == false) {
        console.warn(`Failed to validate name: ${name}`);
        return;
    }

    const response = await get("/members/check-name", { name: name });
    if (isWpErrorResponse(response)) {
        const wpErrorResponse = (await response.json()) as WpErrorResponse;
        console.error(`Failed to check name: ${wpErrorResponse.customErrorCode}`);
        return;
    }

    console.log("Input name is not duplicated");
}

async function sendCheckEmailRequest() {
    const address = getInputElementText("input-email");
    console.log(address);
}

function checkInputName() {
    const name = getInputElementText("input-name");
    if (validateName(name) == false) {
        console.error("input name is not valid");
        return;
    }
}

function checkInputEmail() {
    const address = getInputElementText("input-email");
    if (validateEmailAddress(address) == false) {
        console.error("input email is not valid");
        return;
    }
}

function validateEmailAddress(address: string): boolean {
    return true;
}

function validateName(name: string): boolean {
    return true;
}

function checkInputPassword() {
    const password = getInputElementText("input-password");
    if (validatePassword(password) == false) {
        console.error("input pwd is not valid");
        return;
    }
}

function validatePassword(password: string): boolean {
    return true;
}

function checkInputPasswordCheck() {
    const password: string = getInputElementText("input-password");
    const password_check: string = getInputElementText("input-password-check");

    if (password == password_check) {
        console.log("Same");
    } else {
        console.error("Not same");
    }
}

function main() {
    // join-button 클릭 이벤트
    const join_button = getElement("join-button");
    join_button.addEventListener("click", sendJoinRequest);

    // check-name 클릭 이벤트
    const check_name_button = getElement("check-name");
    check_name_button.addEventListener("click", sendCheckNameRequest);

    // input-name 포커스 이벤트
    const input_name = getElement("input-name");
    input_name.addEventListener("blur", checkInputName);

    // input-email 입력 이벤트
    const input_email = getElement("input-email");
    input_email.addEventListener("input", checkInputEmail);

    // check-email 클릭 이벤트
    const check_email = getElement("check-email");
    check_email.addEventListener("click", sendCheckEmailRequest);

    // input-password 포커스 이벤트
    const input_pw = getElement("input-password");
    input_pw.addEventListener("blur", checkInputPassword);

    // input-password-check 입력 이벤트
    const input_pw_check = getElement("input-password-check");
    input_pw_check.addEventListener("input", checkInputPasswordCheck);
}

main();
