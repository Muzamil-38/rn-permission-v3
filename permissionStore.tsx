/* eslint-disable prettier/prettier */
import {makeAutoObservable} from 'mobx';
import {AppState, Alert} from 'react-native';
import {
  check,
  request,
  openSettings,
  PermissionStatus,
  PERMISSIONS,
  requestNotifications,
  checkNotifications,
  RESULTS,
} from 'react-native-permissions';

class PermissionStore {
  cameraPermission: PermissionStatus = 'unavailable';
  notificationPermission: PermissionStatus = 'unavailable';
  permissionNeeded: number = 2;

  constructor() {
    makeAutoObservable(this);
    this.initializePermissions();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  async initializePermissions() {
    await this.checkCameraPermission();
    await this.checkNotificationPermission();
    this.updatePermissionsNeeded();
  }

  async checkCameraPermission() {
    const status = await check(PERMISSIONS.ANDROID.CAMERA);
    this.cameraPermission = status;
    this.updatePermissionsNeeded();
  }

  async requestCameraPermission() {
    const status = await request(PERMISSIONS.ANDROID.CAMERA);
    this.cameraPermission = status;

    if (status === RESULTS.BLOCKED) {
      this.showSettingsAlert();
    }
    this.updatePermissionsNeeded();
  }

  async checkNotificationPermission() {
    const {status} = await checkNotifications();
    this.notificationPermission = status;
    this.updatePermissionsNeeded();
  }

  async requestNotificationPermission() {
    const {status} = await requestNotifications(['alert', 'sound']);
    this.notificationPermission = status;

    if (status === RESULTS.BLOCKED) {
      this.showSettingsAlert();
    }
    this.updatePermissionsNeeded();
  }

  toggleCameraPermission() {
    if (this.cameraPermission !== RESULTS.GRANTED) {
      this.requestCameraPermission();
    } else {
      this.openAppSettings();
    }
  }

  toggleNotificationPermission() {
    if (this.notificationPermission !== RESULTS.GRANTED) {
      this.requestNotificationPermission();
    } else {
      this.openAppSettings();
    }
  }

  openAppSettings() {
    openSettings().catch(() => console.warn('Cannot open settings'));
  }

  showSettingsAlert() {
    Alert.alert(
      'Permission Required',
      'The app permissions can only be changed from the app settings.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open App Settings', onPress: () => this.openAppSettings()},
      ],
      {cancelable: false},
    );
  }

  handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === 'active') {
      await this.checkCameraPermission();
      await this.checkNotificationPermission();
    }
  };

  updatePermissionsNeeded() {
    let count = 2;

    if (this.cameraPermission === 'granted') {
      count -= 1;
    }
    if (this.notificationPermission === 'granted') {
      count -= 1;
    }

    this.permissionNeeded = count;
  }
}

export const permissionStore = new PermissionStore();
