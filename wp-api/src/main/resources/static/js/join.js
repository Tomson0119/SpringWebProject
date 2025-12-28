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
    const request = {
        name: id,
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
async function callCheckIdApi() {
    const id = getInputElementText("input-id");
    if (validateId(id) == false) {
        console.warn(`Failed to validate id: ${id}`);
        return;
    }
    const response = await get("/members/check-name", { name: id });
    if (isWpErrorResponse(response)) {
        const wpErrorResponse = (await response.json());
        console.error(`Failed to check name: ${wpErrorResponse.customErrorCode}`);
        return;
    }
    console.log("Input name is not duplicated");
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
    check_id_button.addEventListener("click", callCheckIdApi);
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
