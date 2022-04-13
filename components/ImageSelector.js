import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Camera from 'expo-camera';
import colors from '../constants/colors';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    //ask for permission to access camera
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        // const result = await Camera.getCameraPermissionsAsync(Camera.CAMERA, Camera.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions!', 'You need to grant camera permission to use this app.', [{ text: 'Okay' }]);
            return false;
        }
        return true;
    };
    //this is to open device camera
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            //allowsEditing will let u to edit e.g to crop
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        //save internally to have a preview
        setPickedImage(image.uri);

        //forward also to parent component(NewPlaceScreen)
        props.onImageTaken(image.uri);
    };
    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Text>No image picked yet.</Text>
                ) : (
                    <Image style={styles.image} source={{ uri: pickedImage }}></Image>
                )}
                <Button title='Take Image' color={colors.primary} onPress={takeImageHandler}></Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

export default ImgPicker;