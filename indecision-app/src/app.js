class IndecisionApp extends React.Component {
    render(){
        const tabOptions = ['Anal', 'Vaginal', 'Nasal'];
        return (
            <div>
                <Header />
                <Actions />
                <Options tabOptions = {tabOptions}/>
                <AddOptions />
            </div>
            );
    }
}

class Header extends React.Component {
    render(){
        return (
            <div>
                <h1>Indecision</h1>
                <h2>Ferme la mec</h2>
            </div>
            );
    }
}

class Actions extends React.Component {
    handleAction (){
        alert('action test');
    }
    render(){
        return (
            <div>
               <button onClick={this.handleAction}>Je fais quoi ?</button>
            </div>
            );
    }
}

class Options  extends React.Component {
    constructor(props){
        super(props);
        this.removeAll = this.removeAll.bind(this);
    }
    removeAll(){
        alert('remove ALL');
        console.log(this.props.tabOptions)
    }
    render(){
        return (
            <div>OPTIONS :
            <button onClick={this.removeAll}>Remove ALL</button>
                <ul>
                    {this.props.tabOptions.map(option => <li key={option}>{option}</li>)}
                </ul>
                <Option />
            </div>
            );
    }
}

class Option  extends React.Component {
    render(){
        return (
            <div>
                <p>Option component ici</p>
            </div>
            );
    }
}

class AddOptions extends React.Component {
    handleAddOption(e){
        e.preventDefault();
        let option = e.target.elements.option.value.trim();
        if (option){
            alert(option);
        }
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type='text' name="option"></input>
                    <button>Ajouter Option</button>
                </form>
            </div>
            );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));