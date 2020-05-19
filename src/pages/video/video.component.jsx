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
  
  playMovie(movieData){
    this.setMovieCounter();
    this.setState( {movie: movieData} );
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
            let clearData = {
              name: '',
              type: '',
              id: '',
              isPlaying: false
            }
          
            that.setState( {movie: clearData} );
            alert('The End!')
        }
    }
  }

  getMovieData( movieList, movieName ){
    var movieData = {};
    movieList.map(function(movieCategory){
        movieCategory.videoList.map(function( movie ){
          if( movie.name === movieName ){
            movieData.name = movie.name;
            movieData.type = movieCategory.type;
            movieData.id   = movie.id;
            movieData.isPlaying = true;
          }
        });
      });
      return movieData;
  }

  handleClickMovieQueue( event ){
    var auxMovieQueue =  this.state.movieQueue,
    movieData = {};

    if(!this.state.movie.isPlaying ){
      let movieIndex = auxMovieQueue.findIndex(movie => movie.name === event.target.innerText );
      movieData = auxMovieQueue.splice(movieIndex, 1)[0];
      this.playMovie( movieData );
      this.setState({movieQueue:auxMovieQueue});
    }
  }

  handleClick( event ){
    var movieName = event.currentTarget.options[event.currentTarget.options.selectedIndex].text.trim(),
    auxMovieQueue =  this.state.movieQueue,
    movieDataToPlay = this.getMovieData( this.state.videos, movieName );

    if( this.state.movie.isPlaying === false ){
      //if theres is a movie queue and we select a movie that exists in the queue, remove movie from queuue
      if(this.state.movieQueue.length > 0 ){
        let indexOfMovieInQueue = this.state.movieQueue.findIndex(movie => movie.name === movieDataToPlay.name );
        if( indexOfMovieInQueue >= 0){
          auxMovieQueue.splice(indexOfMovieInQueue, 1);
          this.setState( {movieQueue: auxMovieQueue} );
        }
      }
      this.playMovie(movieDataToPlay);
    }else{
      if( !this.state.movieQueue.find(element => element.name === movieDataToPlay.name ) ){
        auxMovieQueue.push( movieDataToPlay );
        this.setState( {movieQueue: auxMovieQueue} );
      }else{
        alert('Movie already in queue!');
      }
    }
    document.getElementsByClassName('custom-select')[0].selectedIndex = 0;
  }

  render(){
    return (
      <div className="video-content">
            <UserInfo userData={this.state.movie} />
            <SelectComponent optionsList={this.state.videos} handleClick={this.handleClick.bind(this)}/>
            <MovieQueue movieQueue={this.state.movieQueue} handleClickMovieQueue={this.handleClickMovieQueue.bind(this)}/>
      </div>
    );
  }
} 

export default Video;