import React, { useState, useCallback } from 'react';
import { ScrollView, View, Button, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../constants/colors';

import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        //here u could add validation
        setTitleValue(text);
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback(location => {
        console.log(location);
        setSelectedLocation(location);
    }, []);

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
        props.navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue}></TextInput>
                <ImagePicker onImageTaken={imageTakenHandler}></ImagePicker>
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}></LocationPicker>
                <Button title='Save Place' color={colors.primary} onPress={savePlaceHandler}></Button>
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add New Place'
};

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;