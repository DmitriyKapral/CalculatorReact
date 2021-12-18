import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface ButtonProps {
    value: string;
    handleOnPress: any;
}

export default class InputNumberButton extends React.Component<ButtonProps> {
    render() {
        const { value, handleOnPress } = this.props;
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => handleOnPress(value)}
            >
                <Text style={styles.text}>{value}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        color: 'black',
        fontSize: 36
    }
})
