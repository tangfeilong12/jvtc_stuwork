/**
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';


export default class HeadBgImg extends Component {


    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentWillMount() {

    }

    render() {
        return (
            <ImageBackground resizeMode='cover' source={require('../assets/img/home_top.png')} style={styles.home_top} />
        );
    }


}

const styles = StyleSheet.create({
    home_top: {
        position: 'absolute',
        width: "100%",
        height: 300,
        top: -10,
        left: 0,
    },
});
