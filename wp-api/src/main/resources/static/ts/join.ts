import { CustomErrorCode, JoinRequest, WpErrorResponse } from "./common/type/model.js";
import { getInputElementText, getElement } from "./common/utility/htmlUtility.js";
import { isWpErrorResponse, post, get } from "./common/utility/httpUtility.js";
import { RegexHelper } from "./common/utility/stringUtility.js";

let emailValidationDone = false;
let verificationCodeValidationDone = false;
let nameValidationDone = false;
let passwordValidationDone = false;

async function sendJoinRequest() {
    const email = getInputElementText("input-email");
    const name = getInputElementText("input-name");
    const password = getInputElementText("input-password");

    if (emailValidationDone == false || verificationCodeValidationDone == false || nameValidationDone == false || passwordValidationDone == false) {
        console.error("some of required input value is not valid");
        return;
    }

    const request: JoinRequest = {
        name: name,
        emailAddress: email,
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
    const input_name = getElement("input-name") as HTMLInputElement;
    const name = input_name.value;
    if (validateName(name) == false) {
        console.warn(`Failed to validate name: ${name}`);
        return;
    }

    const name_duplication_error = getElement("name-duplication-error");
    const response = await get("/members/check-name", { name: name });
    if (isWpErrorResponse(response)) {
        const wpErrorResponse = (await response.json()) as WpErrorResponse;
        nameValidationDone = false;

        if (wpErrorResponse.customErrorCode == CustomErrorCode.DUPLICATED_MEMBER_NAME) {
            name_duplication_error.hidden = false;
            input_name.dataset.state = "fail";
            return;
        }

        console.error(`Failed to check name: ${wpErrorResponse.customErrorCode} (${wpErrorResponse.errorMessage})`);
        return;
    }

    name_duplication_error.hidden = true;
    input_name.dataset.state = "success";

    nameValidationDone = true;
    checkAndActivateJoinButton();
}

async function sendCheckEmailRequest() {
    const input_email = getElement("input-email") as HTMLInputElement;
    const email = input_email.value;
    if (validateEmailAddress(email) == false) {
        console.error("input email is not valid");
        return;
    }

    const email_duplication_error = getElement("email-duplication-error");
    const response = await get("/members/check-email", { email: email });
    if (isWpErrorResponse(response)) {
        const wpErrorResponse: WpErrorResponse = await response.json();
        emailValidationDone = false;

        if (wpErrorResponse.customErrorCode == CustomErrorCode.DUPLICATED_MEMBER_EMAIL) {
            email_duplication_error.hidden = false;
            input_email.dataset.state = "fail";
            return;
        }

        console.error(`Failed to check email address: ${wpErrorResponse.customErrorCode} (${wpErrorResponse.errorMessage})`);
        return;
    }

    const send_code_info = getElement("send-verification-code-info");
    send_code_info.hidden = false;

    email_duplication_error.hidden = true;
    input_email.dataset.state = "success";

    emailValidationDone = true;
    checkAndActivateJoinButton();
}

async function sendCheckVerificationCode() {
    const input_email = getElement("input-email") as HTMLInputElement;
    const input_code = getElement("input-verification-code") as HTMLInputElement;

    const verification_code_error = getElement("verification-code-error");
    const response = await get("/members/check-verification-code", { email: input_email.value, code: input_code.value });
    if (isWpErrorResponse(response)) {
        const wpErrorResponse: WpErrorResponse = await response.json();
        verificationCodeValidationDone = false;

        if (wpErrorResponse.customErrorCode == CustomErrorCode.INVALID_VERIFICATION_CODE) {
            verification_code_error.hidden = false;
            input_code.dataset.state = "fail";
            return;
        }

        console.error(`Failed to check verification code: ${wpErrorResponse.customErrorCode} (${wpErrorResponse.errorMessage})`);
        return;
    }

    verification_code_error.hidden = true;
    input_code.dataset.state = "success";

    verificationCodeValidationDone = true;
    checkAndActivateJoinButton();
}

function checkInputName() {
    const input_name = getElement("input-name") as HTMLInputElement;
    const input_name_error = getElement("input-name-error");

    nameValidationDone = false;

    if (input_name.value.length == 0) {
        input_name_error.hidden = true;
        input_name.dataset.state = "default";
    } else if (validateName(input_name.value)) {
        input_name_error.hidden = true;
        input_name.dataset.state = "green";
        return true;
    } else {
        input_name_error.hidden = false;
        input_name.dataset.state = "fail";
    }
}

function validateName(name: string): boolean {
    return RegexHelper.ValidNameRegex.test(name);
}

function checkInputEmail() {
    const input_email_error = getElement("input-email-error");
    const input_email = getElement("input-email") as HTMLInputElement;
    const email = input_email.value;

    const send_code_info = getElement("send-verification-code-info");
    send_code_info.hidden = true;

    emailValidationDone = false;

    if (input_email.value.length == 0) {
        input_email_error.hidden = true;
        input_email.dataset.state = "default";
    } else if (validateEmailAddress(email)) {
        input_email_error.hidden = true;
        input_email.dataset.state = "success";
    } else {
        input_email_error.hidden = false;
        input_email.dataset.state = "fail";
    }

    checkAndActivateJoinButton();
}

function validateEmailAddress(address: string): boolean {
    return RegexHelper.ValidEmailRegex.test(address);
}

function checkInputPassword() {
    const input_password = getElement("input-password") as HTMLInputElement;
    const input_password_error = getElement("input-password-error");

    if (input_password.value.length == 0) {
        input_password_error.hidden = true;
        input_password.dataset.state = "default";
    } else if (validatePassword(input_password.value)) {
        input_password_error.hidden = true;
        input_password.dataset.state = "success";
    } else {
        input_password_error.hidden = false;
        input_password.dataset.state = "fail";
    }

    checkInputPasswordCheck();
}

function validatePassword(password: string): boolean {
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
    const password: string = getInputElementText("input-password");
    const input_password_check = getElement("input-password-check") as HTMLInputElement;
    const input_password_check_error = getElement("input-password-check-error");

    passwordValidationDone = false;

    if (input_password_check.value.length == 0) {
        input_password_check_error.hidden = true;
        input_password_check.dataset.state = "default";
    } else if (input_password_check.value == password) {
        input_password_check_error.hidden = true;
        input_password_check.dataset.state = "success";
        passwordValidationDone = true;
    } else {
        input_password_check_error.hidden = false;
        input_password_check.dataset.state = "fail";
    }

    checkAndActivateJoinButton();
}

function checkAndActivateJoinButton() {
    const join_button = getElement("join-button") as HTMLButtonElement;
    if (emailValidationDone == false || verificationCodeValidationDone == false || nameValidationDone == false || passwordValidationDone == false) {
        join_button.disabled = true;
        return;
    }

    join_button.disabled = false;
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

    // check_verification_code 클릭 이벤트
    const check_verification_code = getElement("check-verification-code");
    check_verification_code.addEventListener("click", sendCheckVerificationCode);

    // input-password 입력 이벤트
    const input_pw = getElement("input-password");
    input_pw.addEventListener("input", checkInputPassword);

    // input-password-check 입력 이벤트
    const input_pw_check = getElement("input-password-check");
    input_pw_check.addEventListener("input", checkInputPasswordCheck);
}

main();
