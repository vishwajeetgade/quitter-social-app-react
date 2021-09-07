import React, {useState} from 'react'
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';


function MessageForm(props) {
    let [message, setmessage] = useState('');

    const handleNewMessage = (e) => {
        e.preventDefault();
        props.postNewMessage(message);
        setmessage(message='');
        props.history.push('/');
    }
    return (
        <form onSubmit={handleNewMessage}>
            {props.errors.message && ( <div className="alert alert-danger">{props.error.message}</div> )}
            <input type="text" name="message" value={message} onChange={e=>setmessage(message=e.target.value)} />
            <button className="btn btn-success" type='submit'>Submit</button>
        </form>
    )
}

function mapStateToProps(state){
    return{
        errors: state.errors
    }
}


export default connect(mapStateToProps, {postNewMessage})(MessageForm);
