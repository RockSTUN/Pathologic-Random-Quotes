import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import  './style.css'
import $ from 'jquery';
//REDUX LOGIC
const CHANGE = 'CHANGE';
const initialState=Math.random();

        const colors = [
  '#3A415A',
  '#283357',
  '#1A2E6E',
  '#2E5177',
  '#3E5773',
  '#42464B',
  '#581C42',
  '#1C4458',
  '#3A505B',
  '#17583A',
  '#385E4C',
  '#26335F'
];
        

    
  
function getChange(){
    return {
        type: CHANGE,
        randomIndex: Math.random()
    }
}

function randomReducer(state = initialState, action){
    switch(action.type){
        case CHANGE:
            return action.randomIndex;
        default:
            return state
    }
}

const store = createStore(randomReducer);
//

//MAP STATE TO PROPS
function mapStateToProps(state){
    return {
        randomIndex: state
    }
}
//MAP DISPATCH TO PROPS provides action
function mapDispatchToProps(dispatch){
    return {
        getNewIndex: () => dispatch(getChange())
    }
};


class TextBox extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.getAuthor = this.getAuthor.bind(this);
        this.getQuote = this.getQuote.bind(this);
    }
    

    handleClick() {
       $('body').animate({ opacity: 0 }, 25, function () {
        $(this).animate({ opacity: 1 }, 25);
    });
            $("#quote-box").css('color', colors[Math.floor(this.props.randomIndex*colors.length)])
        $("#new-quote").css('color', colors[Math.floor(this.props.randomIndex*colors.length)])
        $("body").css('background-color', colors[Math.floor(this.props.randomIndex*colors.length)])
    
        this.props.getNewIndex();
    };
    getAuthor(){
        return this.props.data[Math.floor(this.props.randomIndex*this.props.data.length)].author;
    };
    getQuote(){
        return this.props.data[Math.floor(this.props.randomIndex*this.props.data.length)].quote;
    }
    
    render(){
        return <div style={{ opacity: 1 }} id='quote-box'>
            <h1 id='text'><i className={'fa fa-quote-left'}></i>{this.getQuote()}<i className='fa fa-quote-right'></i></h1>
            <div class={'quote-author'}>
            <p id='author'>-{this.getAuthor()}</p>
            </div>
            <div style={{  }}>
                <button id='new-quote' className={'fa fa-button'} onClick={this.handleClick}>New Quote</button>
                
                <a style={{paddingLeft: '5%'}} id='tweet-quote' className={'fa fa-twitter-square fa-2x'} href='twitter.com/intent/tweet'></a>
            </div>
        </div>
    }
}




//CONNECT
const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(TextBox)

class Warper extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return <Provider store={store}>
            <ConnectedComponent data={this.props.arr}/>
            
        </Provider>
    }
}






export default Warper;
