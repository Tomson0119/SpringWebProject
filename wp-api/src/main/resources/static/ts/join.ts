import { getInputElementText, getElement } from "./common/utility/htmlUtility.js";

function sendJoinRequest() {
    const name = getInputElementText("name");
    const password = getInputElementText("password");

    console.log(`name: ${name}, pwd: ${password}`);
}

function main() {
    const join_button = getElement("join-button");
    join_button.addEventListener("click", sendJoinRequest);
}

main();
