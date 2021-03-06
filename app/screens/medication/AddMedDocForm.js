import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles/globals';
import ThemeButton from '../../components/ThemeButton';
import PaddedDivider from '../../components/PaddedDivider';

// components to include in each step (input field and buttons)
class Step extends Component {
  state = {};
  render() {
    return (
      <View>
        {this.props.children({
          onChangeValue: this.props.onChangeValue,
          navigation: this.props.navigation,
          values: this.props.values,
        })}
        <PaddedDivider />

        <View style={styles.navBackNext}>
          {this.props.isFirst ? (
            <Text>{' '}</Text>
          ) : (
            <ThemeButton
              type={'muted'}
              text={'Previous'}
              onPressEvent={this.props.prevStep}
            />
          )}

          <ThemeButton
            type={'muted'}
            text={'Next'}
            onPressEvent={this.props.nextStep}
          />
        </View>
      </View>
    );
  }
}

// adding functionality to the above buttons
class AddMedDocForm extends Component {
  static Step = Step;

  state = {
    index: 0,
    navigation: {...this.props.navigation},
    values: {
      ...this.props.initialValues,
    },
  };

  _nextStep = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));
  };

  _prevStep = () => {
    if (this.state.index !== 0) {
      this.setState((prevState) => ({
        index: prevState.index - 1,
      }));
    }
  };

  _onChangeValue = (name, value) => {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  _onBack = () => {
    console.log('Go to Medication Main Screen');
    this.state.navigation.goBack();
  };

  render() {
    return (
      <View>
        {React.Children.map(this.props.children, (elem, index) => {
          if (index === this.state.index) {
            return React.cloneElement(elem, {
              currentIndex: this.state.index,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              isFirst: this.state.index === 0,
              isLast: this.state.index === this.props.children.length - 1,
              onChangeValue: this._onChangeValue,
              values: this.state.values,
              onBack: this._onBack,
            });
          }
          return null;
        })}
      </View>
    );
  }
}

export default AddMedDocForm;
