class Button extends React.Component {
  render() {
    const value = this.props.value;
    const id = this.props.id;

    return (
      <button class="button" id={id} onClick={() => this.props.onClick()}>
        {value}
      </button>
    );
  }
}

class DisplayBox extends React.Component {
  render() {
    const formula = this.props.formula;
    const result = this.props.result;
    return (
    <div id="display-container">
      <span id="display">
      {formula}
      </span>
    </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "0"
    };
  }

  handleConsecutiveOperators(formula, consecutiveOperators) {
    console.log("handleConsecutiveOperators");

    if (consecutiveOperators.length > 1) {
      const lastOperator =
        consecutiveOperators[consecutiveOperators.length - 1];
      console.log("Final operator " + lastOperator);
      let newFormula = formula.split("");
      for (let i = 0; i < newFormula.indexOf(lastOperator); i++) {
        //           console.log("Old formula: " + newFormula.join(""));
        newFormula.splice(newFormula.indexOf(consecutiveOperators[i]), 1);
        //           console.log("New formula: " + newFormula.join(""));
      }
      this.setState({
        formula: math.format(math.eval(newFormula.join("")), { precision: 5 })
      });
    }
  }

  handleDecimalPoints(formula) {
    console.log("handleDecimalPoints");
    // splits the formula based on operands
    const formulaNumbers = formula.split(/\+|\-|\/|\*/);
    let replacedFormula = formula;
    console.log("replacedFormula: " + replacedFormula);

    formulaNumbers.forEach(function(num) {
      if (num.indexOf(".") !== num.lastIndexOf(".")) {
        const numArray = num.split("");
        numArray.splice(num.lastIndexOf("."), 1);
        console.log("After splice: " + numArray.join(""));
        replacedFormula = replacedFormula.replace(num, numArray.join(""));
        console.log("replacedFormula after replacement " + replacedFormula);
      }
    });

    this.setState({
      formula: math.format(math.eval(replacedFormula), { precision: 5 })
    });
  }

  handleClick(value) {
    const formula = this.state.formula;

    // first input
    if (formula == "0") {
      // adds a zero if the user enters a decimal point first thing
      if (value == ".") this.setState({ formula: "0" + value });
      else {
        // sets the formula and display to the input value (non-decimal point)
        this.setState({ formula: value });
      }
    } else {
      // not the first input
      this.setState({ formula: formula + "" + value });
    }
    // clears formula and display
    if (value == "AC") {
      this.setState({ formula: "0" });
    } else if (value == ".") {
      // doesn't allow consecutive decimal points
      if (formula[formula.length - 1] == ".")
        this.setState({ formula: formula });
      else {
        // doesn't allow multiple decimal points in one number
        // splits the formula based on operands
        const formulaNumbers = formula.split(/\+|\-|\/|\*/);
        // last entered number already has a decimal point
        if (formulaNumbers[formulaNumbers.length - 1].indexOf(".") !== -1) {
          // don't allow change
          this.setState({ formula: formula });
        }
      }
    } else if (value == "=") {
      console.log("=");
      // evaluates expressions

      // checks for consecutive operators
      const operatorsRegex = /[+-/*]/;
      const consecutiveOperators = [];
      for (var i = 0; i < formula.length; i++) {
        if (i + 1 < formula.length) {
          if (
            (operatorsRegex.test(formula[i]) &&
              operatorsRegex.test(formula[i + 1])) ||
            (operatorsRegex.test(formula[i]) &&
              operatorsRegex.test(formula[i - 1]))
          ) {
            consecutiveOperators.push(formula[i]);
          }
        }
      }

      if (consecutiveOperators.length > 1) {
        console.log(1);
        this.handleConsecutiveOperators(formula, consecutiveOperators);
      } else {
        console.log(3);
        this.setState({
          formula: math.format(math.eval(formula), { precision: 5 })
        });
      }
    }
  }

  renderButton(id, value) {
    return (
      <Button
        class="button"
        id={id}
        value={value}
        onClick={() => this.handleClick(value)}
        {...this.state}
      />
    );
  }

  render() {
    return (
      <div id="container">
        <div id="calculator">
          <DisplayBox {...this.state} />
          <div class="row">
            {this.renderButton("clear", "AC")}
            {this.renderButton("divide", "/")}
            {this.renderButton("multiply", "*")}
          </div>
          <div class="row">
            {this.renderButton("seven", 7)}
            {this.renderButton("eight", 8)}
            {this.renderButton("nine", 9)}
            {this.renderButton("subtract", "-")}
          </div>
          <div class="row">
            {this.renderButton("four", 4)}
            {this.renderButton("five", 5)}
            {this.renderButton("six", 6)}
            {this.renderButton("add", "+")}
          </div>
          {this.renderButton("one", 1)}
          {this.renderButton("two", 2)}
          {this.renderButton("three", 3)}
          <br />
          {this.renderButton("zero", 0)}
          {this.renderButton("decimal", ".")}
          {this.renderButton("equals", "=")}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));

