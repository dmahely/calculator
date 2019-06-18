var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.props.value;
      var id = this.props.id;

      return React.createElement(
        "button",
        { "class": "button", id: id, onClick: function onClick() {
            return _this2.props.onClick();
          } },
        value
      );
    }
  }]);

  return Button;
}(React.Component);

var DisplayBox = function (_React$Component2) {
  _inherits(DisplayBox, _React$Component2);

  function DisplayBox() {
    _classCallCheck(this, DisplayBox);

    return _possibleConstructorReturn(this, (DisplayBox.__proto__ || Object.getPrototypeOf(DisplayBox)).apply(this, arguments));
  }

  _createClass(DisplayBox, [{
    key: "render",
    value: function render() {
      var formula = this.props.formula;
      var result = this.props.result;
      return React.createElement(
        "span",
        { id: "display" },
        formula
      );
    }
  }]);

  return DisplayBox;
}(React.Component);

var Calculator = function (_React$Component3) {
  _inherits(Calculator, _React$Component3);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this4 = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

    _this4.state = {
      formula: "0"
    };
    return _this4;
  }

  _createClass(Calculator, [{
    key: "handleConsecutiveOperators",
    value: function handleConsecutiveOperators(formula, consecutiveOperators) {
      console.log("handleConsecutiveOperators");

      if (consecutiveOperators.length > 1) {
        var lastOperator = consecutiveOperators[consecutiveOperators.length - 1];
        console.log("Final operator " + lastOperator);
        var newFormula = formula.split("");
        for (var i = 0; i < newFormula.indexOf(lastOperator); i++) {
          //           console.log("Old formula: " + newFormula.join(""));
          newFormula.splice(newFormula.indexOf(consecutiveOperators[i]), 1);
          //           console.log("New formula: " + newFormula.join(""));
        }
        this.setState({
          formula: math.format(math.eval(newFormula.join("")), { precision: 5 })
        });
      }
    }
  }, {
    key: "handleDecimalPoints",
    value: function handleDecimalPoints(formula) {
      console.log("handleDecimalPoints");
      // splits the formula based on operands
      var formulaNumbers = formula.split(/\+|\-|\/|\*/);
      var replacedFormula = formula;
      console.log("replacedFormula: " + replacedFormula);

      formulaNumbers.forEach(function (num) {
        if (num.indexOf(".") !== num.lastIndexOf(".")) {
          var numArray = num.split("");
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
  }, {
    key: "handleClick",
    value: function handleClick(value) {
      var formula = this.state.formula;

      // first input
      if (formula == "0") {
        // adds a zero if the user enters a decimal point first thing
        if (value == ".") this.setState({ formula: "0" + value });else {
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
        if (formula[formula.length - 1] == ".") this.setState({ formula: formula });else {
          // doesn't allow multiple decimal points in one number
          // splits the formula based on operands
          var formulaNumbers = formula.split(/\+|\-|\/|\*/);
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
        var operatorsRegex = /[+-/*]/;
        var consecutiveOperators = [];
        for (var i = 0; i < formula.length; i++) {
          if (i + 1 < formula.length) {
            if (operatorsRegex.test(formula[i]) && operatorsRegex.test(formula[i + 1]) || operatorsRegex.test(formula[i]) && operatorsRegex.test(formula[i - 1])) {
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
  }, {
    key: "renderButton",
    value: function renderButton(id, value) {
      var _this5 = this;

      return React.createElement(Button, Object.assign({
        "class": "button",
        id: id,
        value: value,
        onClick: function onClick() {
          return _this5.handleClick(value);
        }
      }, this.state));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "container" },
        React.createElement(
          "div",
          { id: "calculator" },
          React.createElement(DisplayBox, this.state),
          React.createElement(
            "div",
            { "class": "row" },
            this.renderButton("clear", "AC"),
            this.renderButton("divide", "/"),
            this.renderButton("multiply", "*")
          ),
          React.createElement(
            "div",
            { "class": "row" },
            this.renderButton("seven", 7),
            this.renderButton("eight", 8),
            this.renderButton("nine", 9),
            this.renderButton("subtract", "-")
          ),
          React.createElement(
            "div",
            { "class": "row" },
            this.renderButton("four", 4),
            this.renderButton("five", 5),
            this.renderButton("six", 6),
            this.renderButton("add", "+")
          ),
          this.renderButton("one", 1),
          this.renderButton("two", 2),
          this.renderButton("three", 3),
          React.createElement("br", null),
          this.renderButton("zero", 0),
          this.renderButton("decimal", "."),
          this.renderButton("equals", "=")
        )
      );
    }
  }]);

  return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));