import React, { Component } from 'react';
import { Text, TextInput, TextField, View , Button, TextInputComponent, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Group, Alert } from 'react-native';
import { styles } from '../../styles/globals';


class Step extends Component {
    state = {}
    render() {
        return (
            <View>
                {this.props.children({
                    onChangeValue: this.props.onChangeValue,
                    values: this.props.values
                })}
                <View style={styles.navButtonsForm}>
                    <Button
                        title="Previous"
                        disabled={this.props.currentIndex === 0}
                        onPress={this.props.prevStep}
                    />
                    {this.props.isLast ? (
                        <Button title="Submit" onPress={this.props.onSubmit}/>
                    ) : (
                        <Button title="Next" onPress={this.props.nextStep}/>
                    )}
                </View>
            </View>

        );
    }
}


class AddMedicationForm extends Component {
    static Step = Step;

    state = {
        index: 0,
        values: {
            ...this.props.initialValues
        }
    };

    _nextStep = () => {
        if (this.state.index !== this.props.children.length - 1){
            this.setState(prevState => ({
                index: prevState.index + 1,
            }));
        }
    };
    
    _prevStep = () => {
        if (this.state.index !== 0){
            this.setState(prevState => ({
                index: prevState.index - 1,
            }));
        }
    };

    _onChangeValue = (name, value) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: value,
            },
        }));
    };

    _onSubmit = () => {
        console.log(JSON.stringify(this.state.values));
        console.log(this.state.values);

    };

    render() {
        return (
            <View>
                {React.Children.map(this.props.children, (elem, index) => {
                    if(index === this.state.index) {
                        return React.cloneElement(elem, {
                            currentIndex: this.state.index,
                            nextStep: this._nextStep,
                            prevStep: this._prevStep,
                            isLast: this.state.index === (this.props.children.length - 1),
                            onChangeValue: this._onChangeValue,
                            values: this.state.values,
                            onSubmit: this._onSubmit,
                        })
                    }
                    return null;
                })}
            </View>
        );
    }
}

export default AddMedicationForm;