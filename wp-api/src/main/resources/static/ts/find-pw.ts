import { CustomErrorCode, WpErrorResponse } from "./common/type/model.js";
import { getElement, getInputElementText } from "./common/utility/htmlUtility.js";
import { get, isWpErrorResponse } from "./common/utility/httpUtility.js";

async function sendFindPwRequest() {
    const input_name = getElement("input-name") as HTMLInputElement;
    const success_message = getElement("success-message");
    const invalid_name_error = getElement("invalid-name-error");

    const response = await get("/members/find-pw", { name: input_name.value });
    if (isWpErrorResponse(response)) {
        const wpErrorResponse: WpErrorResponse = await response.json();
        console.error(`Failed to find pw: ${wpErrorResponse.customErrorCode}`);

        if (wpErrorResponse.customErrorCode == CustomErrorCode.MEMBER_NOT_FOUND) {
            invalid_name_error.style.display = "flex";
            success_message.style.display = "none";
            input_name.value = "";
        }

        return;
    }

    invalid_name_error.style.display = "none";
    success_message.style.display = "flex";

    cleanup();
}

function cleanup() {
    const input_name = getElement("input-name") as HTMLInputElement;
    const find_button = getElement("find-pw-button") as HTMLButtonElement;

    input_name.disabled = true;
    find_button.disabled = true;
}

function main() {
    // input_name 엔터 입력 이벤트
    const input_name = getElement("input-name");
    input_name.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            sendFindPwRequest();
        }
    });

    // find_pw_button 클릭 이벤트
    const find_pw_button = getElement("find-pw-button");
    find_pw_button.addEventListener("click", sendFindPwRequest);
}

main();
