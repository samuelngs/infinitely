
import Inferno from 'inferno';
import Component from 'inferno-component';

export default class Redirect extends Component {

  componentDidMount() {
    return location.href= '/';
  }

  render() {
    return <div />
  }

}
