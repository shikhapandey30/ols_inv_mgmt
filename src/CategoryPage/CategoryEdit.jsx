import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class CategoryEdit extends React.Component {

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

    render() {
      const { loggingIn} = this.props;
      const { submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))

      return (
        <div>
          <div>
            <Header />
            <div className="container">
              <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                  <center><h2>Edit Category</h2></center><br/>
                  <div className="form-group">
                    <label htmlFor="categoryname" className="col-sm-2 control-label">Category Name</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <input className="form-control" type="hidden" name="id" ref="id" value={this.state.id} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-1 col-sm-offset-2">
                      <button className="btn btn-primary btn-block">Submit</button>
                    </div>
                  </div>
              
              </form>
            </div>
          </div> 
        </div>
      );
    }
}

function mapStateToProps(state) {
  const {categoryid, authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedCategoryEdit = connect(mapStateToProps)(CategoryEdit);
export { connectedCategoryEdit as CategoryEdit };