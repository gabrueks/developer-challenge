import React, { Component } from 'react';

import { createPost } from '../../../services/postServices';

import './styles/create-post.css';

export default class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
        if (event.key === 'Enter') {
            console.log(event.key)
            this.handleSubmit();
        }
    }

    handleSubmit = (e) => {
        if (e) {    
            e.preventDefault();
        }
        this.setState({
            value: ''
        });
        this.forceUpdate();
        createPost(this.state).then((x) => console.log(x));
    }

     render() {
        return (<div style={{
            marginLeft: '15%',
            marginTop: '2%',
            position: 'relative'
        }}>
            <div className="raf-panel raf-panel--rounded">
                <form id="form-data" onSubmit={this.handleSubmit}>
                    <div className="rfu-dropzone" aria-disabled="false" style={{position: 'relative'}}>
                        <div className="raf-panel-header">
                            <div className="raf-title" style={{fontSize: '18px'}}>New Post</div>
                        </div>
                        <div className="raf-panel-content">
                            <div style={{display: 'flex'}}>
                                <div className="rta  raf-textarea">
                                    <textarea onKeyPress={this.handleChange} name="text" rows="3" placeholder="Type your post... " value={this.state.value} onChange={this.handleChange} className="rta__textarea raf-textarea__textarea"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="raf-panel-footer">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{flex: '1 1 0%'}}>
                                </div>
                            <button className="raf-button raf-button--primary" type="submit" disabled={!this.state.value.length > 0}>Post</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )};
}