import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class CategoryDetail extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getCategoryDetails();
  }
  getCategoryDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let categoryId = this.props.match.params.id;
    axios.get(`${config.apiUrl}/categories/${categoryId}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        name: response.data.data.name
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editCategory(category){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    axios.put(`${config.apiUrl}/categories`, category, {
    headers: headers
  })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/categories"
      })
  }

  onSubmit(e){

    const category = {
      name: this.refs.name.value,
      id: this.refs.id.value
    }
    this.editCategory(category);
    e.preventDefault();

  }

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

    handleChange(event) {
      const { name, value } = event.target;
      const { category } = this.state;
      this.setState({category: event.target.value});
      this.setState({
          category: { ...category, [name]: value }
      });
    }
    componentDidMount(product) {
      this.props.dispatch(userActions.getcategorydetail(this.props.match.params.id));
    }

    categoryDelete = (id) => {
       const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/categories/${id}`, {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/categories"
        })
    }

    render() {
      const { user, category, loggingIn } = this.props;
      const { submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { category.items && 
                    <h3 className="panel-title"> 
                     {category.items.name}
                    </h3>
                  }
                  { category.items && 
                    <div className="pull-right btn-style">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.categoryDelete(category.items.id)};}}>Delete</button>
                      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                          Edit 
                        </button>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-box" role="document">
                              <div className="modal-content">
                                <div className="modal-header textdesign">
                                  <p style={{ fontWeight: 'bold' }}>{category.items.name}</p>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                                      <div className="row model-warehouse">
                                        <div className="col-md-12">
                                          <label htmlFor="categoryname" className="label">Category Name</label>
                                          <div>
                                            <input className="form-control" type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
                                          </div><br/>
                                        </div>
                                        <div className="col-md-6">
                                          <div>
                                            <input className="form-control" type="hidden" name="id" ref="id" value={this.state.id} onChange={this.handleInputChange} />
                                          </div>
                                        </div>
                                      </div><br/>  
                                      <div className="form-group">
                                       <div className="pull-right">
                                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>&nbsp;&nbsp;
                                          <button className="btn btn-primary">Submit</button>
                                        </div>
                                      </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                        </div>
                      
                    </div>
                  }
                </div>
                { category.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>Category ID</td>
                        <td>{category.items.id}</td>
                      </tr>
                      <tr>
                        <td>Category Name</td>
                        <td>{category.items.name}</td>
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
  const { categoryid, category, authentication } = state;
  const { user } = authentication;
  return {
    user,
    category
  };
}

const connectedCategoryDetail = connect(mapStateToProps)(CategoryDetail);
export { connectedCategoryDetail as CategoryDetail };