import React from 'react';
import Alert from 'react-s-alert';
var tools = require('./tools.js');
const remote = require('electron').remote;

export default class App extends React.Component {
  constructor(props) {
  	super(props);
  	this.handleInputChange = this.handleInputChange.bind(this);
    this.generateAuth = this.generateAuth.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  	this.copy = this.copy.bind(this);
  	this.state = {start: '', end: '', auth: 0};
  }

  handleInputChange(event) {
  	const target = event.target;
  	const value = target.value;
  	const name = target.name;

  	this.setState({ 
  		[name]: value 
  	});
  }

  handleKeyPress(event) {
    console.log(event);
    if (event.key == 'Esc') {
      window.close();
    }
  }

  generateAuth(event) {
    if (this.state.start[0] != '0' &&
        this.state.end[0] != '0')
    {
      this.setState({
          auth: tools.diff(this.state.start,this.state.end)
      });
    }
  }

  copy (event) {
  	tools.copy(this.state.auth);
  	Alert.success('Copied!');
  }

  componentDidMount() {
    window.addEventListener('keyup', function(e) {
      if ((e.keyCode || e.which) == 27) {
        remote.getGlobal('mainWindow').minimize();
        window.minimize();
      }
    });
  }

  render() {
    return (
    <div className="body" onKeyPress={this.handleKeyPress}>
		<div className="container-fluid">      
      	
          <div className="row">
        		<div className="col-6">
              <div className="form-group">
          			<label htmlFor="sdatefield" className="form-label">Start Date</label>
    	      		<input name="start" className="form-control" type="date" id="sdatefield" 
    	      			value={this.state.start} onChange={this.handleInputChange}/>
              </div>
  	      	  <div className="form-group">
                <label htmlFor="edatefield" className="form-label">End Date</label>
                <input name="end" className="form-control" type="date" id="edatefield" 
                  value={this.state.end} onChange={this.handleInputChange}/>
              </div>
            </div>

            <div className="col-6">
              <button className="btn btn-secondary" onClick={this.generateAuth}>Go!</button>
              <label name="end" className="lead result" onClick={this.copy}>
                { this.state.auth } days
              </label>
              <small className="lead" onClick={this.copy}>Click to Copy</small>
            </div>
          </div>

          

          

	      	<Alert stack={{limit: 1}} position='bottom'/>
	    </div>

    </div>);
  }
}
