import React, { Component } from 'react'
import { connect } from 'react-redux';
import {fetchMessages, deleteMessage} from '../store/actions/messages';
import MessageItem from '../components/MessageItem';


class MessageList extends Component {
    
    componentDidMount(){
        this.props.fetchMessages();
    }

    handleDelete(message_id){
        this.props.deleteMessage(message_id);
    }

    render() {
        const messagesList = this.props.messages.map(m => (
            <MessageItem 
                key={m._id}
                date={m.createdAt}
                text={m.text}
                username = {m.user.username}
                profileImgUrl ={m.user.profileImgUrl}
                onDelete = {() => {this.handleDelete(m._id)}}
                showDelete = {m.user._id===this.props.userId? true : false}
            />
        ))
        return (
            <div className="row col-sm-8">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" id="messages">
                        {messagesList}
                    </ul>
                </div>
            </div>   
        )
    }
}

function mapStateToProps(state){
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps, {fetchMessages, deleteMessage}) (MessageList);
