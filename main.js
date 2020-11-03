"use strict";
// Calculator class
class Calculator {
  constructor(process, result) {
    this.process = process;
    this.result = result;
  }
  // 숫자 삽입
  insert(number) {
    if (this.result.value === "0" || this.result.value === "Error") {
      this.result.value = "";
    }
    if (number === ".") {
      if (this.result.value.substr(-1) === ".") return;
    }
    this.result.value += number;
  }
  // 숫자에 요소 추가
  add(value) {
    if (this.result.value === "" || this.result.value == "Error") return;
    switch (value) {
      case "%":
        this.result.value = eval(this.result.value) * 0.01;
        break;
      case "x²":
        this.result.value = Math.pow(this.result.value, 2);
        break;
      case "√":
        if (this.result.value < 0) {
          this.result.value = "Error";
          return;
        }
        this.result.value = Math.sqrt(this.result.value);
        break;
      case "+/-":
        this.result.value = eval(this.result.value) * -1;
        break;
    }
  }
  // 숫자 수식 적용
  operate(value) {
    if (this.result.value === "" || this.result.value == "Error") return;
    if (value === "×") {
      value = "*";
    } else if (value === "÷") {
      value = "/";
    }
    this.process.value += this.result.value + value;
    this.result.value = "";
  }
  // 계산 적용
  calc() {
    this.answer = this.process.value + this.result.value;
    this.process.value = "";
    if (/[^0-9]/.test(this.answer.substr(-1))) {
      this.answer = this.answer.substr(0, this.answer.length - 1);
    }
    if (/-{2,}/.test(this.answer)) {
      this.answer = this.replaceAll(this.answer, "--", "+");
    }
    this.result.value = eval(this.answer);
  }
  replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
  }
  // 전체 지우기
  clear() {
    this.process.value = "";
    this.result.value = "";
  }
  // 백스페이스
  back() {
    if (this.result.value === "") return;
    if (this.result.value === "Error") this.result.value = "";
    this._back = this.result.value.substr(0, this.result.value.length - 1);
    this.result.value = this._back;
  }
}

const process = document.querySelector("#process");
const result = document.querySelector("#result");
const calculator = new Calculator(process, result);

// key click
const btnContainer = document.querySelector(".container");
const backSpace = document.querySelector(".back");
btnContainer.addEventListener("click", event => {
  const value = event.target.innerText;
  const type = event.target.dataset.type;
  if (type == null) return;
  switch (type) {
    case "number":
      calculator.insert(value);
      break;
    case "add":
      calculator.add(value);
      break;
    case "operator":
      calculator.operate(value);
      break;
    case "calc":
      calculator.calc();
      break;
    case "clear":
      calculator.clear();
      break;
    case "back":
      calculator.back();
      break;
  }
});
