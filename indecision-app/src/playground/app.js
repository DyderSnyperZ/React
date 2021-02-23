class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePickOption = this.handlePickOption.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOneOption = this.handleDeleteOneOption.bind(this);
        this.state = {
            //options: props.options //data de la valeurs par default
            options: []
        }
    }
    ///--------------- LIFECYCLE FUNCTIONS -------------------------
    componentDidMount() {
        /*alert when component is mounted*/
        try {
            const json = localStorage.getItem('options'); // utilise les données stocker dans le browser non perdu en reloadant
            const options = JSON.parse(json);
            if(options)
                this.setState(() => ({ options })); //{options: options}
        } catch (error) {
            
        }
    }
    componentDidUpdate(prevProps, prevState) {
        /*alert when component updated*/
        if (prevState.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json); // localStorage permet de stocker des données dans la console javascript, permet de manipuler des données depuis le browser sans les perdres en reloadant
        }
    }
    componentWillUnmount() {
        console.log('alert when component is unmounted')
    }
    ///-------------------------------------------------------------
    handleDeleteOptions() {
        this.state.options = [];
        /* this.setState(() => {
            return {
                options: []
            }
        }) */
        this.setState(() => ({ options: [] }))
    }
    handleDeleteOneOption(optionToDelete) {
        this.setState((prevState) => ({
            options: prevState.options.filter(option => option !== optionToDelete)
        }))
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

        this.setState((prevState) => ({
            options: this.state.options.concat(option)
        }));

    }
    render() {
        let subtitle = 'Ferme la mec';
        return (
            <div>
                <Header subtitle={subtitle} />
                <Actions handlePickOption={this.handlePickOption} />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOneOption={this.handleDeleteOneOption} />
                <AddOptions handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}

/* IndecisionApp.defaultProps = {
    options: ['1', '2', '3']
} */

const Header = (props) => {  //stateless fontion, évite de générer une classe pour chaque composent qui nécéssite juste un affichage
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = { // Permet de setter des valeurs par défault, si aucune valeur envoyer dans le template, il prend cette valeur par default
    title: 'Indecision APP'
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
            <button onClick={props.handleDeleteOptions} disabled={!props.options.length > 0}>Remove ALL</button>
            {props.options.length === 0 && <p>Aucune options</p>}
            { props.options.map((option) => (
                    <Option
                        key={option}
                        optionText={option}
                        handleDeleteOneOption={props.handleDeleteOneOption}
                    />
                ))
            }
        </div>
    )
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button onClick={(e) => {
                props.handleDeleteOneOption(props.optionText);
            }}
            >
                X
            </button>
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
        if(!error)
            e.target.elements.option.value = '';
        this.setState(() => ({ error }));
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