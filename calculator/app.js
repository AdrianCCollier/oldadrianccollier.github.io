const buttonContainer = document.getElementById("button-container");

for(let i = 0; i < 20; i++) {

    let button = document.createElement("button");

    button.textContent = "Button " + (i + 1);
    button.id = "button" + (i + 1);

    buttonContainer.appendChild(button);

} // end for 