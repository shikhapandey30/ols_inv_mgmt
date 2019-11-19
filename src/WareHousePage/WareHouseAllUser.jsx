import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class WareHouseAllUser extends React.Component {
    componentDidMount(warehouse) {
      this.props.dispatch(userActions.warehouseuser(this.props.match.params.id));
    }
    
    render() {
      const { user, warehouse, warehouseuser } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { warehouseuser.items && 
                    <h3 className="panel-title"> 
                     {warehouseuser.items.name}
                    </h3>
                  }
                  
                </div>
                { warehouseuser.items && 
                  <table className="table table-bordered table table-border">
                    
                    <tbody>
                      <tr>
                        <td>warehouseuser ID</td>
                        <td>{warehouseuser.items.id}</td>
                      </tr>
                     
                    </tbody>

                  </table>
                }
              </div>
            </div>
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { warehouseid,warehouseuser, warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehouseuser,
    warehouse
  };
}

const connectedWareHouseAllUser = connect(mapStateToProps)(WareHouseAllUser);
export { connectedWareHouseAllUser as WareHouseAllUser };