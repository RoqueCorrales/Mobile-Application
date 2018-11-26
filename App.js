import React, {Component} from 'react';
import Preloader from "./app/components/Preloader";
import RoutingNavigation from './app/navigations/routing';

console.disableYellowBox = true;

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    async componentDidMount () {
        this.setState({
            loaded: true
        });
    }

    render() {
        const {loaded} = this.state;

        if ( ! loaded) {
            return (<Preloader/>);
        }

        return (<RoutingNavigation />);
    }
}

