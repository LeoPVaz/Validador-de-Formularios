let Validador = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll("input");

        Validador.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = Validador.checkInput(input);
            if (check !== true) {
                send = false;
                Validador.showErro(input, check);
            }
        }

        if (send) {
            form.submit()
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute("data-rules");
        if (rules !== null) {
            rules = rules.split("|");
            for (let k in rules) {
                let rDetails = rules[k].split("=");

                min = 2
                switch (rDetails[0]) {
                    case "required":
                        if (input.value == "") {
                            return "Campo obrigatorio"
                        }
                        break;
                    case "min":
                        if (input.value.length < rDetails[1]) {
                            return "Capo tem que ter no minimo" + " " + rDetails[1] + " " + "caracteris"
                        }
                        break;
                    case "email":
                        if (input.value != "") {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return "E-mail digitado não é valido!"
                            }

                        }
                        break;
                }
            }
        }

        return true
    },
    showErro: (input, error) => {
        input.style.borderColor = "#FF0000";
        let erroElement = document.createElement("div");
        erroElement.classList.add("error");
        erroElement.innerHTML = error;

        input.parentElement.insertBefore(erroElement, input.ElementSibling)
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll("input");
        for (i = 0; i < inputs.length; i++) {
            inputs[i].style = "";
        }

        let erroElement = document.querySelectorAll(".error");
        for (i = 0; i < erroElement.length; i++) {
            erroElement[i].remove();
        }
    }
};

let form = document.querySelector(".validador");
form.addEventListener("submit", Validador.handleSubmit);




// Slider
let totalSlides = document.querySelectorAll(".slider--item").length;
let currentSlide = 0;

document.querySelector(".slider--width").style.width = `calc(100vw * ${totalSlides})`;


function goNext() {
    currentSlide++;
    if (currentSlide > (totalSlides - 1)) {
        currentSlide = 0;
    }
    updateMargin()
}

function updateMargin() {
    let sliderItemWidth = document.querySelector(".slider--item").clientWidth;
    let newMargin = (currentSlide * sliderItemWidth);
    document.querySelector(".slider--width").style.marginLeft = `-${newMargin}px`;
}

setInterval(goNext, 4000);