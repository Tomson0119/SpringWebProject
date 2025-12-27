import { CustomErrorCode } from "./common/type/model.js";
import { getInputElementText, getElement } from "./common/utility/htmlUtility.js";
import { isWpErrorResponse, post, get } from "./common/utility/httpUtility.js";
async function sendJoinRequest() {
    const id = getInputElementText("input-id");
    const password = getInputElementText("input-password");
    // id 검증
    if (validateId(id) == false) {
        console.error("input id is not valid");
        return;
    }
    // password 검증
    if (validatePassword(password) == false) {
        console.error("input pwd is not valid");
        return;
    }
    var request = {
        name: id,
        password: password,
    };
    var response = await post("/members", request);
    var wpResponse = await response.json();
    if (isWpErrorResponse(response)) {
        const errorCode = wpResponse.customErrorCode;
        console.error(`failed to join: ${errorCode}`);
        return;
    }
    const memberUri = response.headers.get("location");
    console.info(`location: ${memberUri}`);
    console.info(wpResponse);
}
async function findMemberByName() {
    const id = getInputElementText("input-id");
    if (validateId(id) == false) {
        return;
    }
    const response = await get("/members", { memberName: id });
    const wpResponse = await response.json();
    if (isWpErrorResponse(response)) {
        if (wpResponse.customErrorCode == CustomErrorCode.MEMBER_NOT_FOUND) {
            console.info("not duplicated id");
            return;
        }
        console.error(`Failed find member: ${wpResponse.customErrorCode}`);
        return;
    }
    console.error("id is duplicated");
}
function checkInputId() {
    const id = getInputElementText("input-id");
    if (validateId(id) == false) {
        console.error("input id is not valid");
        return;
    }
}
function validateId(id) {
    return true;
}
function checkInputPassword() {
    const password = getInputElementText("input-password");
    if (validatePassword(password) == false) {
        console.error("input pwd is not valid");
        return;
    }
}
function validatePassword(password) {
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
    // check-id 클릭 이벤트
    const check_id_button = getElement("check-id");
    check_id_button.addEventListener("click", findMemberByName);
    // input-id 포커스 이벤트
    const input_id = getElement("input-id");
    input_id.addEventListener("blur", checkInputId);
    // input-password 포커스 이벤트
    const input_pw = getElement("input-password");
    input_pw.addEventListener("blur", checkInputPassword);
    // input-password-check 입력 이벤트
    const input_pw_check = getElement("input-password-check");
    input_pw_check.addEventListener("input", checkInputPasswordCheck);
}
main();
