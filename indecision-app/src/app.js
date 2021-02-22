class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePickOption = this.handlePickOption.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        }
    }
    handleDeleteOptions() {
        this.state.options = [];
        this.setState(() => {
            return {
                options: []
            }
        })
    }
    handlePickOption() {
        let random = Math.floor(Math.random() * this.state.options.length);
        let option = this.state.options[random];
        alert(option);
    }
    handleAddOption(option) {
        if (!option)
            return 'Enter value to submit';
        else if (this.state.options.indexOf(option) > -1)
            return 'This option already exist';

        this.setState((prevState) => {
            return {
                options: this.state.options.concat(option)
            }
        });

    }
    render() {
        return (
            <div>
                <Header />
                <Actions handlePickOption={this.handlePickOption} />
                <Options
                    tabOptions={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions} />
                <AddOptions handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}

const Header = () => {  //stateless fontion, évite de générer une classe pour chaque composent qui nécéssite juste un affichage
    return (
        <div>
                <h1>Indecision</h1>
                <h2>Ferme la mec</h2>
            </div> 
    );
}

const Actions = (props) => {
        return (
            <div>
                <button onClick={props.handlePickOption}>Je fais quoi ?</button>
            </div>
        )
}

const Options = (props) => {
    return (
        <div>OPTIONS :
        <button onClick={props.handleDeleteOptions} disabled={props.tabOptions.lenght > 0}>Remove ALL</button>
        <ul>
            {props.tabOptions.map(option => <li key={option}>{option}</li>)}
        </ul>
        <Option />
    </div>
    )
}

const Option = () => {
    return (
        <div>
                <p>Option component ici</p>
            </div>
    );
}

class AddOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = { // utilisable uniquement ici et eventuellement dans l'enfant
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();
        let option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option); // stock résultat fonction
        this.setState(() => {
            return { error }
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type='text' name="option"></input>
                    <button>Ajouter Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));