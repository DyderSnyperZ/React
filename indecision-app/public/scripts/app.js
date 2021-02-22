'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePickOption = _this.handlePickOption.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            this.state.options = [];
            this.setState(function () {
                return {
                    options: []
                };
            });
        }
    }, {
        key: 'handlePickOption',
        value: function handlePickOption() {
            var random = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[random];
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            var _this2 = this;

            if (!option) return 'Enter value to submit';else if (this.state.options.indexOf(option) > -1) return 'This option already exist';

            this.setState(function (prevState) {
                return {
                    options: _this2.state.options.concat(option)
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Header, null),
                React.createElement(Actions, { handlePickOption: this.handlePickOption }),
                React.createElement(Options, {
                    tabOptions: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions }),
                React.createElement(AddOptions, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

var Header = function Header() {
    //stateless fontion, évite de générer une classe pour chaque composent qui nécéssite juste un affichage
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Indecision'
        ),
        React.createElement(
            'h2',
            null,
            'Ferme la mec'
        )
    );
};

var Actions = function Actions(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handlePickOption },
            'Je fais quoi ?'
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        'OPTIONS :',
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions, disabled: props.tabOptions.lenght > 0 },
            'Remove ALL'
        ),
        React.createElement(
            'ul',
            null,
            props.tabOptions.map(function (option) {
                return React.createElement(
                    'li',
                    { key: option },
                    option
                );
            })
        ),
        React.createElement(Option, null)
    );
};

var Option = function Option() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'Option component ici'
        )
    );
};

var AddOptions = function (_React$Component2) {
    _inherits(AddOptions, _React$Component2);

    function AddOptions(props) {
        _classCallCheck(this, AddOptions);

        var _this3 = _possibleConstructorReturn(this, (AddOptions.__proto__ || Object.getPrototypeOf(AddOptions)).call(this, props));

        _this3.handleAddOption = _this3.handleAddOption.bind(_this3);
        _this3.state = { // utilisable uniquement ici et eventuellement dans l'enfant
            error: undefined
        };
        return _this3;
    }

    _createClass(AddOptions, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option); // stock résultat fonction
            this.setState(function () {
                return { error: error };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Ajouter Option'
                    )
                )
            );
        }
    }]);

    return AddOptions;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
