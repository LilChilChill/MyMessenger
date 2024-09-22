// components/SideMenu.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SideMenu = ({ isVisible, onClose }) => {
  return (
    <View style={[styles.container, { left: isVisible ? 0 : -250 }]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.menuItem}>Home</Text>
      <Text style={styles.menuItem}>Profile</Text>
      <Text style={styles.menuItem}>Settings</Text>
      <Text style={styles.menuItem}>Logout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#FFF',
    borderRightWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    zIndex: 1,
    transition: 'left 0.3s ease-in-out',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default SideMenu;
