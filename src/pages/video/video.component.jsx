import React from 'react';
import './video.styles.scss';

import MovieQueue from '../../components/movie-queue/movie-queue.component';
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
        isPlaying: false,
        name:'',
        type:''
      },
      movieQueue: []
    };
  }
  
  playMovie( ){
    this.setMovieCounter();
    this.setState( {movie: this.movieData} );
  }

  movieData = {
    name : '',
    type : '',
    id   : '',
    isPlaying : false
  };
 
  setMovieCounter(){
    var sec     = 15,
    that        = this,
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

            that.movieData.name = '';
            that.movieData.type = '';
            that.movieData.id   = '';
            that.movieData.isPlaying = false;
            document.getElementsByClassName('custom-select')[0].selectedIndex = 0;
      
            that.setState( {movie: that.movieData} );
            
            alert('The End!')
        }
    }
  }

  getMovieData( movieList, movieName ){
    var that = this;
    movieList.map(function(movieCategory){
        movieCategory.videoList.map(function( movie ){
          if( movie.name === movieName ){
            that.movieData.name = movie.name;
            that.movieData.type = movieCategory.type;
            that.movieData.id   = movie.id;
            that.movieData.isPlaying = true;
            return true;
          }
        });
        if( that.movieData && that.movieData.isPlaying)
          return true;
      });
  }

  handleClickMovieQueue( event ){
    var auxMovieQueue =  this.state.movieQueue;

    this.movieData = auxMovieQueue.splice(0, 1)[0];
   
    if( !this.state.movie.isPlaying ){
      this.playMovie( this.movieData );
      this.setState({movieQueue:auxMovieQueue});
    }
  }

  handleClick( event ){
    var movieName = event.currentTarget.options[event.currentTarget.options.selectedIndex].text.trim();
    this.movieData = {};
    this.getMovieData( this.state.videos, movieName );

    if( this.state.movie.isPlaying === false && this.state.movieQueue.length < 1 ){
      this.playMovie(this.movieData);
    }else{
      if( !this.state.movieQueue.find(element => element.name === this.movieData.name ) ){
        var auxMovieQueue =  this.state.movieQueue;
        auxMovieQueue.push( this.movieData );
        document.getElementsByClassName('custom-select')[0].selectedIndex = 0;
        this.setState( {movieQueue: auxMovieQueue} );

      }
    }
  }

  render(){
    return (
      <div className="video-content">
            <SelectComponent optionsList={this.state.videos} handleClick={this.handleClick.bind(this)}/>
            <UserInfo userData={this.state.movie} />
            <MovieQueue movieQueue={this.state.movieQueue} handleClickMovieQueue={this.handleClickMovieQueue.bind(this)}/>
      </div>
    );
  }
} 

export default Video;