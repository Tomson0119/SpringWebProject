import { CustomErrorCode } from "./common/type/model.js";
import { getInputElementText, getElement } from "./common/utility/htmlUtility.js";
import { isWpErrorResponse, post, get } from "./common/utility/httpUtility.js";
import { RegexHelper } from "./common/utility/stringUtility.js";
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
    const request = {
        name: name,
        password: password,
    };
    const response = await post("/members", request);
    const wpResponse = await response.json();
    if (isWpErrorResponse(response)) {
        const wpErrorResponse = wpResponse;
        console.error(`Failed to join: ${wpErrorResponse.customErrorCode}`);
        return;
    }
    const memberUri = response.headers.get("location");
    console.info(`location: ${memberUri}`);
}
async function sendCheckNameRequest() {
    const input_name = getElement("input-name");
    const name = input_name.value;
    if (validateName(name) == false) {
        console.warn(`Failed to validate name: ${name}`);
        return;
    }
    const name_duplication_error = getElement("name-duplication-error");
    const response = await get("/members/check-name", { name: name });
    if (isWpErrorResponse(response)) {
        const wpErrorResponse = (await response.json());
        if (wpErrorResponse.customErrorCode == CustomErrorCode.DUPLICATED_MEMBER_NAME) {
            name_duplication_error.style.display = "flex";
            input_name.style.borderColor = "red";
            input_name.style.borderWidth = "2px";
            return;
        }
        console.error(`Failed to check name: ${wpErrorResponse.customErrorCode} (${wpErrorResponse.errorMessage})`);
        return;
    }
    name_duplication_error.style.display = "none";
    input_name.style.borderColor = "green";
    input_name.style.borderWidth = "2px";
    console.log("Input name is not duplicated");
}
async function sendCheckEmailRequest() {
    const input_email = getElement("input-email");
    const email = input_email.value;
    if (validateEmailAddress(email) == false) {
        console.error("input email is not valid");
        return;
    }
    const email_duplication_error = getElement("email-duplication-error");
    const response = await get("/members/check-email", { email: email });
    if (isWpErrorResponse(response)) {
        const wpErrorResponse = await response.json();
        if (wpErrorResponse.customErrorCode == CustomErrorCode.DUPLICATED_MEMBER_EMAIL) {
            input_email.style.borderColor = "red";
            input_email.style.borderWidth = "2px";
            email_duplication_error.style.display = "flex";
            return;
        }
        console.error(`Failed to check email address: ${wpErrorResponse.customErrorCode} (${wpErrorResponse.errorMessage})`);
        return;
    }
    input_email.style.borderColor = "green";
    input_email.style.borderWidth = "2px";
    email_duplication_error.style.display = "none";
}
function checkInputName() {
    const name = getInputElementText("input-name");
    if (validateName(name) == false) {
        console.error(`${name} - input name is not valid`);
    }
    else {
        console.log(`${name} - input name is valid`);
    }
}
function validateName(name) {
    return RegexHelper.ValidNameRegex.test(name);
}
function checkInputEmail() {
    const input_email = getElement("input-email");
    const email = input_email.value;
    if (validateEmailAddress(email) == false) {
        console.error(`${email} - input email is not valid`);
    }
    else {
        console.log(`${email} - input email is valid`);
    }
}
function validateEmailAddress(address) {
    return RegexHelper.ValidEmailRegex.test(address);
}
function checkInputPassword() {
    const password = getInputElementText("input-password");
    if (validatePassword(password) == false) {
        console.error(`${password} - input pwd is not valid`);
    }
    else {
        console.log(`${password} - input pw is valid`);
    }
}
function validatePassword(password) {
    // 8자 이상 32자 이하 입력
    if (password.length < 8 || password.length > 16) {
        console.log("length is wrong");
        return false;
    }
    // 허용되지 않은 문자 입력
    if (RegexHelper.ValidPasswordRegex.test(password) == false) {
        console.log("invalid character is included");
        return false;
    }
    // 영문자 포함 여부 체크
    if (RegexHelper.AlphabetRegex.test(password) == false) {
        console.log("alphabet is not included");
        return false;
    }
    // 숫자 포함 여부 체크
    if (RegexHelper.NumberRegex.test(password) == false) {
        console.log("number is not included");
        return false;
    }
    // 특수문자 포함 여부 체크
    if (RegexHelper.SpecialCharRegex.test(password) == false) {
        console.log("Special char is not included");
        return false;
    }
    return true;
}
function checkInputPasswordCheck() {
    const password = getInputElementText("input-password");
    const password_check = getInputElementText("input-password-check");
    if (password == password_check) {
        console.log("Same");
    }
    else {
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
    // input-name 입력 이벤트
    const input_name = getElement("input-name");
    input_name.addEventListener("input", checkInputName);
    // input-email 입력 이벤트
    const input_email = getElement("input-email");
    input_email.addEventListener("input", checkInputEmail);
    // check-email 클릭 이벤트
    const check_email = getElement("check-email");
    check_email.addEventListener("click", sendCheckEmailRequest);
    // input-password 입력 이벤트
    const input_pw = getElement("input-password");
    input_pw.addEventListener("input", checkInputPassword);
    // input-password-check 입력 이벤트
    const input_pw_check = getElement("input-password-check");
    input_pw_check.addEventListener("input", checkInputPasswordCheck);
}
main();
