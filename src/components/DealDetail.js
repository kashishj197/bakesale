import React, { Component } from 'react'
import PropTypes from 'prop-types';
import convertPrice from '../util';
import ajax from '../ajax';

import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

export default class DealDetail extends Component {
  static propTypes = {
    initialDeal: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
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
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Image style={styles.itemImage} source={{uri: deal.media[0]}}/>
        <View style={styles.detail}>
          <View>
            <Text style={styles.title}>{deal.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.price}>{convertPrice(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
            { deal.user && (
              <View style={styles.userInfo}>
                <Image style={ styles.userAvatar } source={{uri: deal.user.avatar}} />
                <Text>{deal.user.name}</Text>
              </View> 
            )}
          </View>
          <View style={styles.description}>
            <Text>{deal.description}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 30,
  },
  detail: {
    borderColor: '#bbb',
    borderWidth: 1,
  },
  backLink: {
    marginBottom: 5,
    color: 'blue',
  },
  itemImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  info: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'rgba(237,149,45,0.4)'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  cause: {
    flex: 1,
  },
  price: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
  },
  userAvatar: {
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  description: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});