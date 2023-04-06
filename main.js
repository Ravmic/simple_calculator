// Klasa odpowiedzialna za przechowywanie liczb i operatorów oraz wykonywanie działań
class Calc {
    //Zmienne
    constructor() {
        this.firstNumber = ""
        this.secNumber = ""
        this.operatorSign = ""
    }
    //Funkcja czyszcząca zmienne 
    clearValue() {
        this.firstNumber = ""
        this.secNumber = ""
        this.operatorSign = ""

    }
    //Funkcja obliczająca. Na podstawie przechowywanego operatora wybiera rodzaj operacji matematycznej, dokonuje obliczenia i przypisuje wynik do zmiennej firstNumber (pozostałe zmienne są "czyszczone")
    calculate() {
        let operator = this.operatorSign
        let firstNumber = parseFloat(this.firstNumber)
        let secNumber = parseFloat(this.secNumber)
        let result

        switch (operator) {
            case "+":
                result = firstNumber + secNumber
                break;
            case "-":
                result = firstNumber - secNumber
                break;
            case "/":
                result = firstNumber / secNumber
                break;
            case "*":
                result = firstNumber * secNumber
                break;
        }
        this.secNumber = ""
        this.operatorSign = ""
        this.firstNumber = result
        return this.firstNumber
    }
}

//Klasa odpowiedzialna za interface kalkulatora (działanie przycisków i wyświetlanie numerów) oraz przypisywanie wartości do zmiennych 

class Interface {
    constructor() {

        this.calc = new Calc()
        this.screen = document.querySelector('div.screen')
        this.numberBtns = document.querySelectorAll('[data-number]')
        this.operatorBtns = document.querySelectorAll('[data-operation]')

        this.equalBtn = document.querySelector('div.equal')
        this.deleteBtn = document.querySelector('[data-delete]')

        this.deleteTrigger()
        this.calcTrigger()
        this.display()
    }

    //Przypisywanie nowej wartości fo firstNumber i secNumber. firstNumber zostanie przypisana po kliknięciu na operator (funkcja jest wywoływana w funkcji display) a secNumber zostaje przypisany po kliknięciu w znak "=". firstNumber zostanie nadpisany kiedy wykonamy działanie i do wyświetlonej liczny będziemy chcieli dodać jakieś liczby  

    updateNumber() {
        let tempNumber = this.screen.textContent
        if (this.calc.operatorSign === "") {
            this.calc.firstNumber = tempNumber
        } else {
            tempNumber = tempNumber.split(/[+\-\*\/]/) //Wyrażenie regularne (regular expresion) odzielanie znaków "\" używa split na znakach z wybranego zbioru (tutaj + - \ *)
            if (tempNumber.length < 3) {
                this.calc.secNumber = tempNumber[1];
            } else { this.calc.secNumber = tempNumber[2] }
        }
    }

    display() {
        //Nasłuchiwanie na kliknięcie przycisków z numerami i kropką. Dodaje wciśniętą wartość na ekran kalkulatora
        this.numberBtns.forEach(btn => btn.addEventListener("click", () => {
            let digit = btn.textContent
            // jeśli ekran jest pusty, a my klikniemy "0" lub ""." to automatycznie wstawia nam "0."
            if (this.screen.textContent === "" && digit === "0" || this.screen.textContent === "" && digit === ".") {
                this.screen.textContent += "0."
            } else {
                this.screen.textContent += digit
            }
        }))

        //Nasłuchiwanie na kliknięcie przycisku z operatorem. Funkcja nadpisuje zmienną operatorSign, wyświetla wybrany operator i nadpisuje zmienną firstNumber
        this.operatorBtns.forEach(btn => btn.addEventListener('click', () => {

            if (this.screen.textContent === "" || this.screen.textContent[this.screen.textContent.length - 1] === ".") return  //return jeśli jest pusty ekran lub liczba kończy się "."

            let op = btn.textContent

            //pierwsza część if jeśli nie mamy przypisanego operatora do zmiennej operatorSign. Druga część jeśli mamy wybrany operator i chcemy go zmienić. Kolejne wciśnięcie przycisku operatora nadpisuje jego zmienną, i "odoświeża" wartości na ekranie- czyści wyświetlacz i pokazuje liczbę ze zmiennej fistNumber z nowym operatorem.   

            if (this.calc.operatorSign === "") {
                this.updateNumber()    //Nadpisanie (update) firstNumber
                this.calc.operatorSign = op
                this.screen.textContent += op
            } else {                    //
                this.screen.textContent = ""
                this.calc.operatorSign = op
                this.screen.textContent += `${this.calc.firstNumber}${op}`
                // this.screen.textContent op
            }

        }))
    }
    // Nasłuchiwanie na przycisk "=". Funkcja nadpisuje zmienną secNumner, wywołuje funkcje obliczającą z klasy Calc (calculate()), następnie czyści wyświetlacz i pokazuje na nim wynik obliczenia (przypisany do zmiennej firstNumber)
    calcTrigger() {
        this.equalBtn.addEventListener('click', () => {

            if (this.screen.textContent[this.screen.textContent.length - 1] === ".") return  // Return jeśli chcemy zakończyć drugą liczbę "." 

            this.updateNumber() //Nadpisane (update) secNumber

            if (this.calc.secNumber === "") return

            this.calc.calculate()
            this.screen.textContent = ""
            this.screen.textContent = this.calc.firstNumber

        })
    }
    // Nasłuchiwanie na przycisk C. Wywołanie funkcji czyszczącej z klasy Calc (clearValue()) i "wyczyszczenie" wyświetlacza
    deleteTrigger() {
        this.deleteBtn.addEventListener('click', () => {
            this.calc.clearValue()
            this.screen.textContent = ""
        })
    }

}



const calcUi = new Interface()

