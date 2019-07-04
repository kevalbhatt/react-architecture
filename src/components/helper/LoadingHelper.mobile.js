'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

class LoadingHelper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {loading, children, childrenStyle} = this.props;
    return (<View style={{
        flex: 1
      }}>
      {
        (loading !== undefined && (loading == null || loading == true || loading.length === 0))
          ? (<View style={[styles.loaderContainer, styles.loaderHorizontal]}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>)
          : <View style={childrenStyle || {
                flex: 1
              }}>{children}</View>
      }
    </View>);
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  loaderHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default LoadingHelper
