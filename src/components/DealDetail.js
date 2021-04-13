import React, { Component } from 'react'
import PropTypes from 'prop-types';
import convertPrice from '../util';
import ajax from '../ajax';

import {Image, View, StyleSheet, Text} from 'react-native';

export default class DealDetail extends Component {
  static propTypes = {
    initialDeal: PropTypes.object.isRequired,
  }
  state = {
    deal: this.props.initialDeal,
  }
  async componentDidMount() {
    const deal = await ajax.fetchMoreInfo(this.props.initialDeal.key);
    this.setState({
      deal,
    })
    console.log(deal);
  }
  render() {
    const { deal } = this.state;
    return (
      <View style={styles.deal}>
        <Image style={styles.itemImage} source={{uri: deal.media[0]}}/>
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.cause}>{deal.cause.name}</Text>
            <Text style={styles.price}>{convertPrice(deal.price)}</Text>
          </View>
        </View>
        { deal.user && <View style={styles.userInfo}>
          <Image style={ styles.userAvatar } source={{uri: deal.user.avatar}} />
          <Text>{deal.user.name}</Text>
        </View> }
        <Text>{deal.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  itemImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  info: {
    padding: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#bbb',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
  userAvatar: {
    width: 60,
    height: 60,
  }
});