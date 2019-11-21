import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';

class NewProduct extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          products: {
              name: '',
              code: '',
              brandName: '',
              category: '',
              cgst: '',
              hsnCode: '',
              imageUrl: '',
              isActive: '',
              sgst: '',
              description: '',
              selectedFile: null,
              loaded: 0
          },
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { products, category } = this.state;
      this.setState({
          products: { ...products, [name]: value }
      });
    }

    handleChanges(FileList) {
      console.log(FileList[0].name);
      const data = new FormData()
      data.append('file', FileList[0], FileList[0].name)
      axios.post(`${config.apiUrl}/images`, data)
      .then(res => {
        console.log(res.data)
        alert('Image Successfully Uploaded, Please continue');
        this.setState({
            imageUrl: res.data.data
          })
      })
      
    }

    handleSubmit(event) {
      event.preventDefault();
      this.setState({ submitted: true });
      const { products } = this.state;
      const { dispatch } = this.props;
      var product = { name: products.name, code: products.code, brandName: products.brandName, description: products.description, cgst: products.cgst, hsnCode: products.hsnCode, imageUrl: this.state.imageUrl, isActive: products.isActive, sgst: products.sgst,   category: { id: products.category} }
      axios.post(`${config.apiUrl}/products`, product)
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/products"
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllcategory());
    }

    render() {
      const { loggingIn, user, allcategories } = this.props;
      const { products, category, imageUrl, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("imageUrl*******************************", imageUrl)
      console.log("allcategories*******************************", allcategories)
      return (
        <div>
          <Header />
          <div className="container">
          <div className="product-img-upload">
            
          </div>
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <center><h2>Add New Product</h2></center><br/>
              <div className="form-group">
                <label htmlFor="image" className="col-sm-2 control-label">Product Image Upload </label>
                <input className="image-box" type="file" onChange={ (e) => this.handleChanges(e.target.files) } />
              </div>
              <div className="form-group">
                <label htmlFor="productname" className="col-sm-2 control-label">Product Name</label>
                <div className="col-sm-9">
                  {submitted && !products.name && 
                    <div className="help-block required-msg"> Product Name is required</div>
                  }
                  <input type="text" id="productname" className="form-control" placeholder="Product Name" name="name" value={products.name} onChange={this.handleChange}  autoFocus />
                  <input type="hidden" name="image" value={this.state.imageUrl} onChange={this.handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productcode" className="col-sm-2 control-label">Product Code</label>
                <div className="col-sm-9">
                  {submitted && !products.code && 
                    <div className="help-block required-msg"> Product Code is required</div>
                  }
                  <input type="text" id="productcode" className="form-control" placeholder="Product Code" name="code" value={products.code} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productbrandName" className="col-sm-2 control-label">Product Brand Name</label>
                <div className="col-sm-9">
                  {submitted && !products.brandName && 
                    <div className="help-block required-msg"> Product Brand Name is required</div>
                  }
                  <input type="text" id="productbrandName" className="form-control" placeholder="Product brand name" name="brandName" value={products.brandName} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productcategoryid" className="col-sm-2 control-label">Category </label>
                <div className="col-sm-9">
                  {submitted && !products.category && 
                    <div className="help-block required-msg"> Product category is required</div>
                  }
                   { allcategories.items && allcategories.items.length > 0 &&
                    <select value={products.category} onChange={this.handleChange} name="category" className="form-control select-field" >
                      {allcategories.items.map((category, index) =>
                        <option key={index} value={category.id} >
                          {category.name}
                        </option>
                      )}
                    </select>
                   }
                </div>   
              </div>

              

              <div className="form-group">
                <label htmlFor="productcgst" className="col-sm-2 control-label">Product cgst</label>
                <div className="col-sm-9">
                  {submitted && !products.cgst && 
                    <div className="help-block required-msg"> Product cgst is required</div>
                  }
                  <input type="text" id="productcgst" className="form-control" placeholder="Product cgst" value={products.cgst}  name="cgst"  onChange={this.handleChange}  autoFocus />
                  
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="producthsnCode" className="col-sm-2 control-label">Product hsnCode</label>
                <div className="col-sm-9">
                  {submitted && !products.hsnCode && 
                    <div className="help-block required-msg"> Product hsnCode is required</div>
                  }
                  <input type="text" id="producthsnCode" className="form-control" placeholder="Product hsnCode" value={products.hsnCode}  name="hsnCode"  onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <input type="hidden" id="productisActive" className="form-control" placeholder="Product isActive" value={products.isActive}  name="isActive"  onChange={this.handleChange}  autoFocus />

              <div className="form-group">
                <label htmlFor="productsgst" className="col-sm-2 control-label">Product sgst</label>
                <div className="col-sm-9">
                  {submitted && !products.sgst && 
                    <div className="help-block required-msg"> Product sgst is required</div>
                  }
                  <input type="text" id="productsgst" className="form-control" placeholder="Product sgst" value={products.sgst}  name="sgst"  onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productdescription" className="col-sm-2 control-label">Product Description</label>
                <div className="col-sm-9">
                  {submitted && !products.description && 
                    <div className="help-block required-msg"> Product description is required</div>
                  }

                   <textarea id="productdescription" className="form-control" placeholder="Product description" value={products.description}  name="description"  onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productisActive" className="col-sm-2 control-label">isActive </label>
                <div className="col-sm-9">
                  {submitted && !products.isActive && 
                    <div className="help-block required-msg"> Product isActive is required</div>
                  }
                  <select value={products.isActive} onChange={this.handleChange} name="isActive" className="form-control select-field" >
                      <option >
                        {"True"}
                      </option><br/>
                      <option >
                        {"False"}
                      </option>
                  </select>
                  
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
  const { products,imageUrl,allcategories, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allcategories,
    products,
    imageUrl,
    users,
  };
}

const connectedNewProduct = connect(mapStateToProps)(NewProduct);
export { connectedNewProduct as NewProduct };