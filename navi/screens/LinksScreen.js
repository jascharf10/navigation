import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert
} from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import geolib from 'geolib';
import { getDistance } from 'geolib';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      // markers: [],
      dataSource: [],
      locationResult: null,
      location: {coords: { latitude: 37.78825, longitude: -122.4324}},
      error: null,
      
    };
  }

  componentDidMount() {
    
       return fetch('https://indoorhoops.com/api/markets/5/boroughs-with-hoods-and-locations')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             console.log(this.state.dataSource[0].hoods[0].locations[0]);
           });
           
         })
         .catch((error) => {
           console.error(error);
         });
     }

  renderItem = ({item}) => {
  let items = [];
  if( item.hoods ){
    items = item.hoods.map (row => {
      return <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, row.locations[0].address)} >{row.locations[0].name}</Text>
    })
  } 

  return (
    <View>
      <Text style={styles.FlatListItemStyle}>
        {item.name}
      </Text>
      {items}
    </View>
  )
}

keyExtractor = (item, index) => {
  return index.toString();
}


    FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }


  GetFlatListItem (name) {
   
  Alert.alert(name);
 
  }

    render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
 

return (
        <View style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
    
}

LinksScreen.navigationOptions = {
  title: 'Games',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 10,
    paddingTop: 20,
  },

  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    // backgroundColor: '#AD8560',
  },

});
