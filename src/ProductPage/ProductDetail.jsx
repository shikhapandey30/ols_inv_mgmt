import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class ProductDetail extends React.Component {
    componentDidMount(product) {
      this.props.dispatch(userActions.getproductdetail(this.props.match.params.id));
    }

    productDelete = (id) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/products/${id}`,  {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/products"
        })
    }

    render() {
      const { user, product } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { product.items && 
                    <h3 className="panel-title"> 
                     {product.items.name}
                    </h3>
                  }
                  { product.items && 
                    <div className="pull-right product-delete-btn">
                      <button className="btn btn-danger btn-style-product" onClick={() => {if(window.confirm('Delete the item?')){this.productDelete(product.items.id)};}}>Delete</button>
                    </div>
                  }
                </div>
                { product.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>Product ID</td>
                        <td>{product.items.id}</td>
                      </tr>
                      <tr>
                        <td>Product Name</td>
                        <td>{product.items.name}</td>
                      </tr>
                      <tr>
                        <td>Product Code</td>
                        <td>{product.items.code}</td>
                      </tr>
                      <tr>
                        <td>Product brandName</td>
                        <td>{product.items.brandName}</td>
                      </tr>
                      <tr>
                        <td>Product description</td>
                        <td>{product.items.description}</td>
                      </tr>
                      <tr>
                        <td>Product image</td>
                        <td>
                        <a target = "_blank" href={product.items.imageUrl}><img style={{width: 100, height: 100}} className='tc br3' alt='none' src={ product.items.imageUrl } /></a>
                        </td>
                      </tr>
                      <tr>
                        <td>Product hsnCode</td>
                        <td>{product.items.hsnCode}</td>
                      </tr>
                      <tr>
                        <td>Product cgst</td>
                        <td>{product.items.cgst}</td>
                      </tr>
                       <tr>
                        <td>Product sgst</td>
                        <td>{product.items.sgst}</td>
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
  const { productid, product, authentication } = state;
  const { user } = authentication;
  return {
    user,
    product
  };
}

const connectedProductDetail = connect(mapStateToProps)(ProductDetail);
export { connectedProductDetail as ProductDetail };