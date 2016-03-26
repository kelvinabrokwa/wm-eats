import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caf: {},
      sadler: {},
      selected: 'sadler'
    };
  }
  componentWillMount() {
    fetch('http://ec2-52-207-245-202.compute-1.amazonaws.com:3000/caf')
      .then(res => res.json())
      .then(formatData)
      .then(data => this.setState({caf: data}))
      .catch(e => { console.log(e); });
    fetch('http://ec2-52-207-245-202.compute-1.amazonaws.com:3000/sadler')
      .then(res => res.json())
      .then(formatData)
      .then(data => this.setState({sadler: data}))
      .catch(e => { console.log(e); });
  }
  select(hall) {
    this.setState({ selected: hall });
  }
  render() {
    var { caf, sadler, selected } = this.state;
    return <div>
      {selected === 'caf' && <DiningHall name='Caf' data={caf}/>}
      {selected === 'sadler' && <DiningHall name='Sadler' data={sadler}/>}
    </div>;
  }
}

class DiningHall extends React.Component {
  render() {
    var { data } = this.props;
    return <div className='center'>
      <h2 className='center'>{this.props.name}</h2>
      <div className='mv3'>
        {Object.keys(data).map(mealName => <div key={mealName}>
          <h4 className='white bg-black'>{mealName}</h4>
          <div>
            {Object.keys(data[mealName]).map(station => <div key={station}>
              <div className='bold mt3 mb1'>{station}</div>
              <div>{data[mealName][station].map((meal, i) => <div key={meal + i}>{meal}</div>)}</div>
            </div>)}
          </div>
        </div>)}
      </div>
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
