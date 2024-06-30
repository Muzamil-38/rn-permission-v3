/* eslint-disable prettier/prettier */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {List} from 'react-native-paper';
import {permissionStore} from './app/store/permissionStore';
import {observer} from 'mobx-react';


const PermissionScreen = observer(() => {
  

  const toggleChangeCamera = () => {
    console.log('Toggling Camera Permission');
    permissionStore.toggleCameraPermission();
  };

  const toggleChangeNotification = () => {
    console.log('Toggling Notification Permission');
    permissionStore.toggleNotificationPermission();
  };

  console.log('Current Camera Permission:', permissionStore.cameraPermission);
  console.log('Current Notification Permission:', permissionStore.notificationPermission);

  return (
    <View style={{flex: 1}}>
   
      <View style={styles.content}>
      <List.Item
          title="Notification"
          titleStyle={{fontSize: 14, fontWeight:'600', lineHeight: 14}}
          right={() => (
            <TouchableOpacity onPress={toggleChangeNotification} activeOpacity={0.8}>
              <View style={[styles.container, permissionStore.notificationPermission === 'granted' && styles.containerActive]}>
                <View style={[styles.track, permissionStore.notificationPermission === 'granted' && styles.trackActive]} />
                <View style={[styles.thumb, permissionStore.notificationPermission === 'granted' && styles.thumbActive]} />
              </View>
            </TouchableOpacity>
          )}
        />
        <List.Item
          title="Camera"
          titleStyle={{fontSize: 14, fontWeight:'600', lineHeight: 14}}
          right={() => (
            <TouchableOpacity onPress={toggleChangeCamera} activeOpacity={0.8}>
              <View style={[styles.container, permissionStore.cameraPermission === 'granted' && styles.containerActive]}>
                <View style={[styles.track, permissionStore.cameraPermission === 'granted' && styles.trackActive]} />
                <View style={[styles.thumb, permissionStore.cameraPermission === 'granted' && styles.thumbActive]} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
});

export default PermissionScreen;

const styles = StyleSheet.create({
  content: {
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  brand: {
    color: '#f00',
    fontWeight: 'bold',
  },
  container: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  containerActive: {
    backgroundColor: '#4CAF50', // Active background color
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#efefef',
  },
  trackActive: {
    backgroundColor: '#4CAF50', // Active track color
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 14,
    backgroundColor: '#fff',
    position: 'absolute',
    marginLeft: 2,
  },
  thumbActive: {
    backgroundColor: '#fff', // Active thumb color
    transform: [{translateX: 22}],
  },
});