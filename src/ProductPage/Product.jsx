import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';

class Product extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAllproduct());
    }

    render() {
      const { user, allproducts } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  <h3 className="panel-title"> 
                   <a href="/products"><button type="button" className="btn btn-default active">Product</button></a>
                    <a href="/warehouses"><button type="button" className="btn btn-default">Warehouse</button></a></h3>

                  <div className="pull-right">
                    <a href="/new-product" className="btn btn-primary btn-xs pull-right"><b>+</b> Add new Product
                    </a>
                  </div>
                </div>
                <h5 className="loading-msg">{allproducts.loading && <em>Loading All Products .....</em>}</h5>
                <table className="table table-bordered table table-border">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>ID</th>
                      <th>Code</th>
                      
                    </tr>  
                  </thead>
                  
                  { allproducts.items && allproducts.items.length > 0 &&
                    <tbody>
                    {allproducts.items.map((product, index) =>
                      <tr key={product.id} >
                        <td>{index + 1}</td>
                        <td>{product.id}</td>
                        <td>{product.code}</td>
                        
                      </tr>
                      
                    )}  
                    </tbody>
                  }  
                </table>
              </div>
            </div>
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { allproducts, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts
  };
}

const connectedProduct = connect(mapStateToProps)(Product);
export { connectedProduct as Product };