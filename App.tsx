import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputNumberButton from './containers/InputNumberButton';

const buttons = [
  ['CLEAR', 'DEL'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+']
]

interface AppProps {
  displayValue: any;
  operator: string | null;
  firstValue: string;
  secondValue: string;
  nextValue: boolean
}


export default class App extends React.Component<{}, AppProps> {

  constructor(props: any) {
    super(props)
    this.state = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false
    };
  }

  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <InputNumberButton
          value={buttonItems}
          handleOnPress={this.handleInput.bind(this, buttonItems)}
          key={'btn-' + buttonIndex}
        />
      });

      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    });
    return layouts
  }

  handleInput = (input: any) => {
    const { displayValue, operator, firstValue, secondValue, nextValue } = this.state;

    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: (displayValue === '0') ? input : displayValue + input
        })
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })

        }
        else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if (!secondValue) {
          this.setState({
            nextValue: true,
            operator: input,
            displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + input
          })
        }
        break;

      case '.':
        let dot = displayValue.toString().slice(-1)
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue
        })
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })

        }
        else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;

      case '=':
        if (secondValue) {
          let result = eval(firstValue + operator + secondValue)
          this.setState({
            displayValue: result % 1 === 0 ? result : result.toFixed(2),
            firstValue: result % 1 === 0 ? result : result.toFixed(2),
            secondValue: '',
            operator: null,
            nextValue: false
          })
        }
        break;

      case 'CLEAR':
        this.setState({
          displayValue: '0',
          operator: null,
          firstValue: '',
          secondValue: '',
          nextValue: false
        });
        break;

      case 'DEL':
        let string = displayValue.toString();
        let deleteString = string.substr(0, string.length - 1);
        let length = string.length;
        if (deleteString.includes('-') || deleteString.includes('+') || deleteString.includes('*') || deleteString.includes('/')) {
          this.setState({
            displayValue: deleteString
          })
        }
        else {
          this.setState({
            displayValue: length == 1 ? '0' : deleteString,
            firstValue: length == 1 ? '' : deleteString,
            operator: null,
            secondValue: '',
            nextValue: false
          })

        }
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {this.state.displayValue}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {this.renderButtons()}

        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: 'rgb(200, 203, 200)'
  },
  inputContainer: {
    flex: 8,
    backgroundColor: 'rgb(200, 203, 200)'
  },
  resultText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 20,
    top: 40,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  }


})
