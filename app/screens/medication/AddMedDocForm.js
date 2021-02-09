import React, { Component } from 'react';
import { Text, TextInput, TextField, View , Button, TextInputComponent, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Group, Alert } from 'react-native';
import { styles } from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import {COLORS, LAYOUT, TYPE} from '../../styles/theme';

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
                    {this.props.isFirst ? (
                        <ThemeButton
                            type={'muted'}
                            text={"Back"}
                            onPressEvent={this.props.onBack} //go to main screen
                        />
                    ) : (
                        <ThemeButton
                            type={'muted'}
                            text={"Previous"}
                            onPressEvent={this.props.prevStep}
                        />
                    )}
                    
                    {this.props.isLast ? (
                        <ThemeButton
                            type={'muted'}
                            text={"Submit"}
                            onPressEvent={this.props.onSubmit}
                        />
                    ) : (
                        <ThemeButton
                            type={'muted'}
                            text={"Next"}
                            onPressEvent={this.props.nextStep}
                        />
                    )}
                </View>
            </View>

        );
    }
}


class AddMedDocForm extends Component {
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
        //console.log(JSON.stringify(this.state.values));
        console.log(this.state.values);
    };
    
    _onBack = () => {
        console.log('Go to Medication Main Screen');
    };

    _onChangeTimersNumber = (value) => {
        this.setState(prevState => ({
            index: prevState.index + (value - 1),
        }));
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
                            isFirst: this.state.index === 0,
                            isLast: this.state.index === (this.props.children.length - 1),
                            onChangeValue: this._onChangeValue,
                            values: this.state.values,
                            onBack: this._onBack,
                            onSubmit: this._onSubmit,
                            onChangeTimersNumber: this._onChangeTimersNumber,
                        })
                    }
                    return null;
                })}
            </View>
        );
    }
}

export default AddMedDocForm;