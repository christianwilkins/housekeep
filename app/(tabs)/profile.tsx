import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [preferences, setPreferences] = useState({
        due: true,
        daily: false,
        weekly: false,
    });

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
        setPreferences(prev => {
            return {
                ...prev,
                [key]: !prev[key]
            };
        });
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
                    channelId: 'default'
                },
            });
        } catch (error) {
            console.error('Notification error:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.name}>Aarham Wasit</Text>
                <Button
                    title={isSignedIn ? 'Sign Out' : 'Sign In'}
                    onPress={() => setIsSignedIn(!isSignedIn)}
                />
            </View>
            <View style={styles.separator} />

            {/* Preferences Section */}
            <Text style={styles.sectionTitle}>Reminder Preferences</Text>
            <View style={styles.preferenceItem}>
                <Checkbox
                    value={preferences.due}
                    onValueChange={() => togglePreference('due')}
                />
                <Text style={styles.label}>Notify When Due</Text>
            </View>
            <View style={styles.preferenceItem}>
                <Checkbox
                    value={preferences.daily}
                    onValueChange={() => togglePreference('daily')}
                />
                <Text style={styles.label}>Daily Summary</Text>
            </View>
            <View style={styles.preferenceItem}>
                <Checkbox
                    value={preferences.weekly}
                    onValueChange={() => togglePreference('weekly')}
                />
                <Text style={styles.label}>Weekly Summary</Text>
            </View>
            <View style={styles.separator} />

            {/* Notification Test Section */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Test Notification"
                    onPress={handleTestNotification}
                    color="#007AFF" // system blue
                />
            </View>
            <View style={styles.separator} />

            {/* Photo Test Section */}
            <View style={styles.photoSection}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Test Camera Upload"
                        onPress={handleTakePhoto}
                        color="#007AFF" // system blue
                    />
                </View>

                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.uploadPreview}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        marginTop: 35
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDD', // gray
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 15,
    },
    preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
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
        borderColor: '#DDD', // gray
    },
});
