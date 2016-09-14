var React = require ('react');
var ReactDOM = require ('react-dom');
import logo from './logo.svg';
import './App.css';

var TodoItems = React.createClass({
  render: function() {

    var todoEntries = this.props.entries;

   function createTasks(item) {
     return <li key={item.key}>{item.text}</li>
   }

   var listItems = todoEntries.map(createTasks);
   return (
      <ul className="theList">
        {listItems}
      </ul>
    );

  }
});

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },
  addItem: function(e) {
    var itemArray = this.state.items;

      itemArray.push(
        {
          text: this._inputElement.value,
          key: Date.now()
        }
      );

      this.setState({
        items: itemArray
      });

      this._inputElement.value = "";

      e.preventDefault();
    },
  removeItem: function(e) {
    var itemArray = this.state.items;

      itemArray.pop();

      this.setState({
        items: itemArray
      });

      this._inputElement.value = "";

      e.preventDefault();
  },
  render: function() {
      return (
        <div className="todoListMain">
          <div className="header">
          <h1>App for the gifted ones!</h1>
            <form>
            <input ref={(a) => this._inputElement = a}
                   placeholder="enter task">
            </input>
              <button onClick={this.addItem}>add</button>
              <button onClick={this.removeItem}>remove last</button>
            </form>
          </div>
          <TodoItems entries={this.state.items}/>
        </div>
      );

    }

});



module.exports = TodoList;
