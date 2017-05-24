'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = function (_React$Component) {
  _inherits(Cell, _React$Component);

  function Cell() {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Cell.prototype.render = function render() {
    var _this2 = this;

    var id = this.props.id;
    if (this.props.state == 1) return React.createElement('div', {
      className: 'cell alive',
      id: id,
      onClick: function onClick() {
        _this2.props.updateCells(id);
      } });
    return React.createElement('div', {
      className: 'cell dead',
      id: id,
      onClick: function onClick() {
        _this2.props.updateCells(id);
      } });
  };

  return Cell;
}(React.Component);

var Cells = function (_React$Component2) {
  _inherits(Cells, _React$Component2);

  function Cells() {
    _classCallCheck(this, Cells);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Cells.prototype.updateCells = function updateCells(id) {
    this.props.updateCells(id);
  };

  Cells.prototype.render = function render() {
    var _this4 = this;

    var cells = [];
    var count = 0;
    this.props.cellsTable.forEach(function (state) {
      count++;
      cells.push(React.createElement(Cell, { state: state.state, id: count, updateCells: _this4.updateCells.bind(_this4) }));
    });

    return React.createElement(
      'div',
      { className: 'cellsContainer' },
      cells
    );
  };

  return Cells;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this5 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this5.state = {
      h: 40,
      w: 40,
      cells: [],
      gen: 0,
      interval: null
    };
    return _this5;
  }

  App.prototype.initializer = function initializer() {
    var tmpTable = [];
    for (var i = 0; i < this.state.h; i++) {
      for (var j = 0; j < this.state.w; j++) {
        var r = Math.floor(Math.random() * 2);
        // var r = 0;
        tmpTable.push({ state: r });
      }
    }
    this.setState({ cells: tmpTable });
  };

  App.prototype.componentDidMount = function componentDidMount() {
    //initialize board
    this.initializer();
  };

  App.prototype.launch = function launch() {
    var _this6 = this;

    var interval = setInterval(function () {
      var newArray = [];
      var t = _this6.state.cells;
      for (var i = 0; i < t.length; i++) {
        //number of neighbours
        var n = 0;

        if (i < t.length - 1) if (t[i + 1].state == 1) n++;
        if (i > 0) if (t[i - 1].state == 1) n++;
        if (i < t.length - _this6.state.w) if (t[i + _this6.state.w].state == 1) n++;
        if (i > _this6.state.w) if (t[i - _this6.state.w].state == 1) n++;

        //diagonals
        if (i > _this6.state.w + 1) if (t[i - _this6.state.w - 1].state == 1) n++;

        if (i > _this6.state.w - 1) if (t[i - _this6.state.w + 1].state == 1) n++;

        if (i < t.length - _this6.state.w - 1) if (t[i + _this6.state.w + 1].state == 1) n++;

        if (i < t.length - _this6.state.w + 1) if (t[i + _this6.state.w - 1].state == 1) n++;

        if (t[i].state == 1 && n < 2) {
          newArray.push({ state: 0 });
        }
        if (t[i].state == 1 && (n == 2 || n == 3)) {
          newArray.push({ state: 1 });
        }
        if (t[i].state == 1 && n > 3) {
          newArray.push({ state: 0 });
        }
        if (t[i].state == 0 && n == 3) {
          newArray.push({ state: 1 });
        }
        if (t[i].state == 0 && n != 3) {
          newArray.push({ state: 0 });
        }
      }
      _this6.setState({ cells: newArray });
      _this6.setState({ gen: _this6.state.gen + 1 });
    }, 100);
    this.setState({ interval: interval });
  };

  App.prototype.stop = function stop() {
    clearInterval(this.state.interval);
  };

  App.prototype.updateCells = function updateCells(id) {
    var tmp = this.state.cells;
    if (tmp[id - 1].state == 1) tmp[id - 1] = { state: 0 };else tmp[id - 1] = { state: 1 };

    this.setState({ cells: tmp });
  };

  App.prototype.clearBoard = function clearBoard() {
    var clean = [];
    for (var i = 0; i < this.state.cells.length; i++) {
      clean.push({ state: 0 });
    }
    this.setState({ cells: clean });
    console.log('cleared');
  };

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'board' },
        React.createElement(Cells, {
          cellsTable: this.state.cells,
          updateCells: this.updateCells.bind(this)
        })
      ),
      React.createElement(
        'div',
        { className: 'buttonContainer' },
        React.createElement(
          'button',
          { onClick: this.launch.bind(this) },
          'Start'
        ),
        React.createElement(
          'button',
          { onClick: this.stop.bind(this) },
          'Stop'
        ),
        React.createElement(
          'button',
          { onClick: this.initializer.bind(this) },
          'Randomize board'
        ),
        React.createElement(
          'button',
          { onClick: this.clearBoard.bind(this) },
          'Clear board'
        )
      ),
      React.createElement(
        'p',
        { className: 'generations' },
        'Generation ',
        this.state.gen
      )
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("game"));