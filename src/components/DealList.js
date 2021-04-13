import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {FlatList, View, StyleSheet} from 'react-native';
import DealItem from './DealItem';

export default class DealList extends Component {
  static propTypes = {
    deals: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View style={styles.list}>
         <FlatList
          data={this.props.deals}
          renderItem={({item}) => <DealItem onPress={this.props.onItemPress} deal={item}/>}
          keyExtractor={item => item.key}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#eee',
  }
})
