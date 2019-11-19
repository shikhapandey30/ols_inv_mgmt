import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class WareHouseEdit extends React.Component {
    componentDidMount(warehouse) {
      this.props.dispatch(userActions.getwarehousedetail(this.props.match.params.id));
    }

    constructor(props) {
        super(props);
        this.state = {
            warehouses: {
              name : '',
              city : '',
                loaded: 0
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { warehouses } = this.state;
      this.setState({
          warehouses: { ...warehouses, [name]: value }
      });
    }

    // handleSubmit(event) {
    //   event.preventDefault();
    //   this.setState({ submitted: true });
    //   const { warehouses } = this.state;
    //   const { dispatch } = this.props;

    //   axios.post(`${config.apiUrl}/warehouses`, warehouses)
    //   .then(response => {
    //     this.setState({ locations: response.data });
    //     window.location = "/warehouses"
    //   })
    // }

    render() {
      const { loggingIn, user,warehouse, users } = this.props;
      let abc;
      
      const { warehouses, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      if (warehouse.items) {
        console.log("warehouse#########", warehouse.items.id)
        const  abc  = warehouse.items.name;
        console.log("abc#########", abc)

      }
      return (
        <div>
          <Header />
          <div className="container">
           
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <center><h2>Add New WareHouse</h2></center><br/>
              <div className="form-group">
                <label htmlFor="warehousesname" className="col-sm-2 control-label">name</label>
                <div className="col-sm-9">
                  {submitted && !warehouses.name && 
                    <div className="help-block required-msg"> Warehouses name is required</div>
                  }
                  <input type="text" id="warehousename" className="form-control" placeholder="WareHouse name" name="name" value={warehouses.name} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="warehousescity" className="col-sm-2 control-label">City</label>
                <div className="col-sm-9">
                  {submitted && !warehouses.city && 
                    <div className="help-block required-msg"> Warehouses City is required</div>
                  }
                  <input type="text" id="warehousecity" className="form-control" placeholder="WareHouse City" name="city" value={warehouses.city} onChange={this.handleChange}  autoFocus />
                </div>
              </div>
 
              <div className="form-group">
                <div className="col-sm-9 col-sm-offset-2">
                  <button className="btn btn-primary btn-block">Submit</button>
                  
                </div>
              </div>
            </form>
          
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { warehouseid, users,warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehouse,
    users
  };
}

const connectedWareHouseEdit = connect(mapStateToProps)(WareHouseEdit);
export { connectedWareHouseEdit as WareHouseEdit };