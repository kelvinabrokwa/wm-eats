import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caf: {},
      sadler: {},
      selected: 'caf',
      collapsed: [],
      sadlerUnavailable: false,
      cafUnavailable: false
    };
  }
  componentWillMount() {
    fetch('https://wm-eats.herokuapp.com/caf')
      .then(res => res.json())
      .then(formatData)
      .then(data => {
        if (Object.keys(data).length)
          this.setState({caf: data});
        else
          this.setState({cafUnavailable: true});
      })
      .catch(e => { console.log(e); });
    fetch('https://wm-eats.herokuapp.com/sadler')
      .then(res => res.json())
      .then(formatData)
      .then(data => {
        if (Object.keys(data).length)
          this.setState({sadler: data});
        else
          this.setState({sadlerUnavailable: true});
      })
      .catch(e => { console.log(e); });
  }
  select(hall) {
    this.setState({ selected: hall });
  }
  collapse(mealName) {
    var { collapsed } = this.state;
    if (collapsed.indexOf(mealName) > -1) {
      collapsed = collapsed.filter(m => m !== mealName);
    } else {
      collapsed.push(mealName);
    }
      this.setState({ collapsed });
  }
  render() {
    var { selected, collapsed } = this.state;
    var data = selected === 'caf' ? this.state.caf : this.state.sadler;
    var unavailable = this.state[selected + 'Unavailable'];
    return <div className='center'>
      <div className='center med mt3'>
        <span className={`ptr ${selected === 'caf' ? 'white bg-black' : ''}`} onClick={this.select.bind(this, 'caf')}>
          Caf
        </span> / <span className={`ptr ${selected === 'sadler' ? 'white bg-black' : ''}`} onClick={this.select.bind(this, 'sadler')}>
          Sadler
        </span>
      </div>

      {unavailable && <div className='mb3 mt3'>{selected} menu unavailable today...thanks sodexo :(</div>}

      {(!unavailable) && <div className='mb3 mt3'>
        {Object.keys(data).map(mealName => <div key={mealName}>
          <div className='white bg-black mt3 ptr' onClick={this.collapse.bind(this, mealName)}>{mealName}</div>
          <div className={`${collapsed.indexOf(mealName) === -1 ? 'hidden' : 'block'}`}>
            {Object.keys(data[mealName]).map(station => <div key={station}>
              <div className='mt3 mb1 bold'>{station}</div>
              <div>{data[mealName][station].map((meal, i) => <div key={meal + i}>{meal}</div>)}</div>
            </div>)}
          </div>
        </div>)}
      </div>}
    </div>;
  }
}

function formatData(data) {
  return new Promise(function(resolve) {
    var out = {}, item;
    for (var i = 0; i < data.length; i++) {
      item = data[i];
      if (!(item.mealName in out)) {
        out[item.mealName] = {};
      }
      if (!(item.station in out[item.mealName])) {
        out[item.mealName][item.station] = [];
      }
      out[item.mealName][item.station].push(item.meal);
    }
    resolve(out);
  });
}

ReactDOM.render(<App/>, document.getElementById('app'));
