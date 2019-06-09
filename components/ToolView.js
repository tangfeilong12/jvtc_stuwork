/**
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class ToolView extends Component {


    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentWillMount(): void {

    }

    render() {
        return (
            <View style={styles.container}>
                退出
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        position: 'fl'
    },
});
