import React, { Component } from 'react';
import { Text, TextInput, TextField, View , Button, TextInputComponent, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Group } from 'react-native';


class Step extends Component {
    state = {}
    render() {
        return (
            <View>
                <Text>{this.props.children} Step {this.props.currentIndex}</Text>
                <Button title="Previous" disabled={this.props.currentIndex === 0} onPress={this.props.prevStep}/>
                <Button title="Next" disabled={this.props.isLast} onPress={this.props.nextStep}/>
            </View>

        );
    }
}


class AddMedicationForm extends Component {
    static Step = (props) => <Step {...props} />

    state = {
        index: 0,
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
                        })
                    }
                    return null;
                })}
            </View>
        );
    }
}

export default AddMedicationForm;