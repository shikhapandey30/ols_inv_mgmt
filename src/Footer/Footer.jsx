import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Header } from '../Header';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.editRow = this.editRow.bind(this);
  }
  
  

  handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
  }

  editRow(song){
    const { dispatch } = this.props;
     
      dispatch(userActions.getSong(song.id));
  }


    fShow(song) {
        const { dispatch } = this.props;
        dispatch(userActions.getAllshow(song.id));
    } 

    fEdit(song) {
        const { dispatch } = this.props;
        dispatch(userActions.getSongedit(song.id));
    } 

    fDelete(song) {
      const { dispatch } = this.props;
      dispatch(userActions.getSongdelete(song.id));
    }
  
  render() {
    const { song, songs } = this.props;
      console.log("songs", songs)
    return (
    
<div> 
    
</div>
      
  
   
    )
  }
}

function mapStateToProps(state) {
  const { songs, authentication } = state;
  const { song } = authentication;
  return {
    song,
    songs
  };
}

const connectedFooter = connect(mapStateToProps)(Footer);
export { connectedFooter as Footer };