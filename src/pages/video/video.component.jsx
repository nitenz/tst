import React from 'react';
import './video.styles.scss';

import UserInfo from '../../components/user-data/user-data.component';
import SelectComponent from '../../components/search-content/search-content.component';

class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos :[
        {id:'vidType1',type:'Drama',videoList:[{id:'11',name:'Black Panther (2018)'},{id:'12',name:'Avengers: Endgame (2019)'},{id:'13',name:'Lady Bird (2017)'},{id:'14',name:'Mission: Impossible - Fallout (2018)'},{id:'15',name:'The Irishman (2019)'}]},
        {id:'vidType2',type:'Comedy',videoList:[{id:'21',name:'Good Boys'},{id:'22',name:'Stuber'},{id:'23',name:'Shazam!'},{id:'24',name:'When We First Met'},{id:'25',name:'Blockers'}]},
        {id:'vidType3',type:'Action',videoList:[{id:'31',name:'Ip man'},{id:'32',name:'Ip man 2'},{id:'33',name:'Ip man 3'},{id:'34',name:'Ip man 4'},{id:'35',name:'Rambo'}]}
      ],
      movie: {
        timeWatched:'',
        isWatching: false,
        name:'',
        type:''
      }
    };
  }
 
  handleClick( event ){
    var movieName = event.currentTarget.options[event.currentTarget.options.selectedIndex].text.trim();
    var movieData = {};
    var that = this;

    setMovieCounter();
    
    getMovieData( this.state.videos, movieName );
   
    this.setState( {login: movieData} );
    

    function setMovieCounter(){
      var sec         = 15,
      countDiv    = document.getElementById("timer"),
      countDown   = setInterval(function () {
          secpass();
      }, 1000);

      function secpass() {
          var min     = Math.floor(sec / 60),
              remSec  = sec % 60;
          
          if (remSec < 10) {
              remSec = '0' + remSec;
          }
          if (min < 10) {
              min = '0' + min;
          }
          countDiv.innerHTML = min + ":" + remSec;
          
          if (sec > 0) {
              sec = sec - 1;
          } else {
              clearInterval(countDown);

              movieData.name = '';
              movieData.type = '';
              movieData.id   = '';
              movieData.isWatching = false;
              document.getElementsByClassName('custom-select')[0].selectedIndex = 0;
        
              that.setState( {movie: movieData} );
              
              alert('The End!')
          }
      }
    }

    function getMovieData( movieList, movieName ){
      
      movieList.map(function(movieCategory){
          movieCategory.videoList.map(function( movie ){
            if( movie.name === movieName ){
              movieData.name = movie.name;
              movieData.type = movieCategory.type;
              movieData.id   = movie.id;
              movieData.isWatching = true;
              return true;
            }
          });
          if( movieData && movieData.isWatching)
            return true;
        });
    }
  }

  render(){
    return (
      <div className="video-content">
            <SelectComponent optionsList={this.state.videos} handleClick={this.handleClick.bind(this)}/>
            <UserInfo userData={this.state.movie} />
      </div>
    );
  }
} 

export default Video;