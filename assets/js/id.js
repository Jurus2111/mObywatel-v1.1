var params = new URLSearchParams(window.location.search);
// Odzyskaj obraz z localStorage jeśli istnieje
const savedImage = localStorage.getItem('userImage');
if (savedImage) {
    params.set('image', savedImage);
}

var input = document.querySelector(".password_input");
var dot = "•";
var original = "";
var eye = document.querySelector(".eye");

document.querySelector(".login").addEventListener('click', () => {
    checkPassword();
});

function checkPassword() {
    var savedPassword = localStorage.getItem('appPassword');

    // Odczytaj faktycznie wpisane hasło
    var enteredPassword;
    if (eye && eye.classList.contains("eye_close")) {
        // Oko otwarte = widać tekst w polu
        enteredPassword = input.value;
    } else {
        // Oko zamknięte = kropki, używamy internal trackera
        enteredPassword = original;
    }

    // Brak hasła w rejestrze → wejdź bez hasła
    if (!savedPassword || savedPassword.trim() === '') {
        toHome();
        return;
    }

    // Hasło jest ustawione – sprawdź czy wpisano cokolwiek
    if (enteredPassword.trim() === '') {
        alert("Wpisz hasło!");
        return;
    }

    // Sprawdź czy hasło się zgadza
    if (enteredPassword === savedPassword) {
        toHome();
    } else {
        original = "";
        input.value = "";
        alert("Błędne hasło!");
    }
}

var welcome = "Dzień dobry!";

var date = new Date();
if (date.getHours() >= 18){
    welcome = "Dobry wieczór!"
}
document.querySelector(".welcome").innerHTML = welcome;

function toHome(){
    location.href = 'home.html?' + params.toString();
}

input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
        checkPassword();
    }
})

input.addEventListener("input", () => {
    var value = input.value.toString();
    var char = value.substring(value.length - 1);
    if (value.length < original.length){
        original = original.substring(0, original.length - 1);
    }else{
        original = original + char;
    }

    if (!eye.classList.contains("eye_close")){
        var dots = "";
        for (var i = 0; i < value.length - 1; i++){
            dots = dots + dot
        }
        input.value = dots + char;
        delay(3000).then(() => {
            value = input.value;
            if (value.length != 0){
                input.value = value.substring(0, value.length - 1) + dot
            }
        });
        console.log(original)
    }
})

function delay(time, length) {
    return new Promise(resolve => setTimeout(resolve, time));
}

eye.addEventListener('click', () => {
    var classlist = eye.classList;
    if (classlist.contains("eye_close")){
        classlist.remove("eye_close");
        var dots = "";
        for (var i = 0; i < input.value.length - 1; i++){
            dots = dots + dot
        }
        input.value = dots;
    }else{
        classlist.add("eye_close");
        input.value = original;
    }
})