import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, Switch } from 'react-native';
import Checkbox from 'expo-checkbox';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [imageUri, setImageUri] = useState<string | null>(null);

    // Preferences for notifications
    const [preferences, setPreferences] = useState({
        due: true,
        daily: false,
        weekly: false,
    });

    // Dark mode state
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Request permissions for notifications and camera
    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });

        const requestPermissions = async () => {
            const [notificationStatus, cameraStatus] = await Promise.all([
                Notifications.requestPermissionsAsync(),
                ImagePicker.requestCameraPermissionsAsync(),
            ]);

            if (notificationStatus.status !== 'granted') {
                alert('Notification permission required');
            }

            if (cameraStatus.status !== 'granted') {
                alert('Camera permission required');
            }
        };

        requestPermissions();
    }, []);

    const handleTakePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setImageUri(result.assets[0].uri);
        }
    };

    const togglePreference = (key: keyof typeof preferences) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleTestNotification = async () => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Test Successful',
                    body: 'Notification is working properly',
                },
                trigger: {
                    seconds: 1,
                    channelId: 'default',
                },
            });
        } catch (error) {
            console.error('Notification error:', error);
        }
    };

    // Define dynamic styles for dark/light mode
    const dynamicStyles = createDynamicStyles(isDarkMode);

    return (
        <View style={dynamicStyles.container}>
            {/* Header Section */}
            <View style={dynamicStyles.header}>
                <Text style={dynamicStyles.name}>Aarham Wasit</Text>
                <Button
                    title={isSignedIn ? 'Sign Out' : 'Sign In'}
                    onPress={() => setIsSignedIn(!isSignedIn)}
                />
            </View>
            <View style={dynamicStyles.separator} />

            {/* Preferences Section */}
            <Text style={dynamicStyles.sectionTitle}>Reminder Preferences</Text>
            <View style={dynamicStyles.preferenceItem}>
                <Checkbox
                    value={preferences.due}
                    onValueChange={() => togglePreference('due')}
                />
                <Text style={dynamicStyles.label}>Notify When Due</Text>
            </View>
            <View style={dynamicStyles.preferenceItem}>
                <Checkbox
                    value={preferences.daily}
                    onValueChange={() => togglePreference('daily')}
                />
                <Text style={dynamicStyles.label}>Daily Summary</Text>
            </View>
            <View style={dynamicStyles.preferenceItem}>
                <Checkbox
                    value={preferences.weekly}
                    onValueChange={() => togglePreference('weekly')}
                />
                <Text style={dynamicStyles.label}>Weekly Summary</Text>
            </View>
            <View style={dynamicStyles.separator} />

            {/* Dark Mode Toggle */}
            <View style={dynamicStyles.preferenceItem}>
                <Switch
                    value={isDarkMode}
                    onValueChange={() => setIsDarkMode(!isDarkMode)}
                />
                <Text style={dynamicStyles.label}>Dark Mode</Text>
            </View>

            <View style={dynamicStyles.separator} />

            {/* Notification Test Section */}
            <View style={dynamicStyles.buttonContainer}>
                <Button
                    title="Test Notification"
                    onPress={handleTestNotification}
                    color="#007AFF" // system blue
                />
            </View>
            <View style={dynamicStyles.separator} />

            {/* Photo Test Section */}
            <View style={dynamicStyles.photoSection}>
                <View style={dynamicStyles.buttonContainer}>
                    <Button
                        title="Test Camera Upload"
                        onPress={handleTakePhoto}
                        color="#007AFF" // system blue
                    />
                </View>

                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={dynamicStyles.uploadPreview}
                    />
                )}
            </View>
        </View>
    );
}

/**
 * A helper function to generate styles dynamically
 * depending on isDarkMode.
 */
const createDynamicStyles = (isDarkMode: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: isDarkMode ? '#000' : '#fff',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 15,
            marginTop: 35,
        },
        name: {
            fontSize: 20,
            fontWeight: '500',
            color: isDarkMode ? '#fff' : '#000',
        },
        separator: {
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#444' : '#DDD',
            marginVertical: 20,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 15,
            color: isDarkMode ? '#fff' : '#000',
        },
        preferenceItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
        },
        label: {
            fontSize: 16,
            marginLeft: 10,
            color: isDarkMode ? '#fff' : '#000',
        },
        buttonContainer: {
            marginVertical: 8,
            overflow: 'hidden',
        },
        photoSection: {
            marginTop: 10,
            alignItems: 'center',
        },
        uploadPreview: {
            width: '100%',
            height: 300,
            marginTop: 15,
            borderWidth: 1,
            borderColor: isDarkMode ? '#444' : '#DDD',
        },
    });
