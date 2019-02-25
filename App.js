import React from 'react';
import requests from './Requests.js'
import {FlatList, ActivityIndicator, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    requests.getTestData().then(movies => {
      this.setState({
        isLoading: false,
        dataSource: movies,
      }, function(){
  
      });
    })
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.id}. {item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
};
