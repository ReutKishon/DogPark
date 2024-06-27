// commonStyles.js
import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  inputbox: {
    width: 300,
    height: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 13,
    flexDirection: 'row', // Flex direction can be row or column as per your need
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Add more common styles as needed
});

export default commonStyles;
