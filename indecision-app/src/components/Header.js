import React from 'react';

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

export default Header;