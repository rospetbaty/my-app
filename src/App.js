var React = require ('react');
var ReactDOM = require ('react-dom');
import logo from './logo.svg';
import './App.css';

function TodoItem(props) {
  return (
    <li key={props.id}>
      {props.editing ? (
        <input type='text' value={props.text} onChange={props.onChange} />
      ) : props.text}

      <input type='checkbox' onClick={props.onClick} />
    </li>
  )
}

let id = 0

function TodoItems(props) {
 var listItems = props.entries
 .map((item, i) => <TodoItem  {...item}
  onClick={props.onSelectItem(i)}
  onChange={props.onItemChange(i)}  />);
 return (
    <ul className="theList">
      {listItems}
    </ul>
  );
}

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      items: []
    };
  },
  addItem: function(e) {
    var itemArray = this.state.items;

    id++
      itemArray.push(
        {
          text: this._inputElement.value,
          key: Date.now(),
          checked: false,
          id: id
        }
      );

      this.setState({
        items: itemArray
      });

      this._inputElement.value = "";

      e.preventDefault();
    },

  onSelectItem(idx) {
    return () => {
      this.setState({
        items: this.state.items.map((item, i) => {
          if (i === idx) {
            item.checked = !item.checked
          }
          return item
        })
      })
    }
  },

  onItemChange(idx) {
    return e => {
      this.setState({
        items: this.state.items.map((item, i) => {
          if (i === idx) {
            item.text = e.target.value
          }
          return item
        })
      })
    }
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

    this._inputElement.value = 'heyhey';

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
              <button onClick={this.addItem}>Add</button>
              <button onClick={this.removeItem}>Remove</button>
              <button onClick={this.editItem}>Edit</button>
            </form>
          </div>
          <TodoItems entries={this.state.items}
          onSelectItem={this.onSelectItem}
          onItemChange={this.onItemChange}/>
        </div>
      );

    }

});



module.exports = TodoList;
