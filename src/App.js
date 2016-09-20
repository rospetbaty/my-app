var React = require ('react');
var ReactDOM = require ('react-dom');
import logo from './logo.svg';
import './App.css';

var TodoItems = React.createClass({
  render: function() {

    var todoEntries = this.props.entries;

   function createTasks(item) {
     return <li key={item.key} >{item.text}
            <input type="checkBox" onClick={function(){item.checked = true}} />
     </li>
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
          key: Date.now(),
          checked: false
        }
      );

      this.setState({
        items: itemArray
      });

      this._inputElement.value = "";

      e.preventDefault();
    },

  removeItem: function(e) {
    var itemArray = this.state.items.filter(function (item) {
      return !item.checked;
    });

    this.setState({ items: itemArray });

    this._inputElement.value = "";

    e.preventDefault();
  },
  editItem: function(e) {
    var itemArray = this.state.items.filter(function (item) {
      return !item.checked;
    });

    this.setState({ items: itemArray });

    this._inputElement.value = '<input type="textbox">';

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
              <button onClick={this.removeItem}>remove</button>
            </form>
          </div>
          <TodoItems entries={this.state.items}/>
        </div>
      );

    }

});



module.exports = TodoList;
