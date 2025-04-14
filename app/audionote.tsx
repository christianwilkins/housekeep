// AudioNote.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function AudioNote() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingURI, setRecordingURI] = useState<string>('');
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Unload the sound when component unmounts or sound changes.
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const startRecording = async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission for audio recording is required.');
                return;
            }

            // Configure audio mode to allow recording
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Create a new Recording instance
            const newRecording = new Audio.Recording();
            await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            await newRecording.startAsync();

            setRecording(newRecording);
            setIsRecording(true);
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const stopRecording = async () => {
        if (!recording) return;
        try {
            setIsRecording(false);
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setRecordingURI(uri || '');
            setRecording(null);
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    };

    const playSound = async () => {
        if (!recordingURI) return;
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: recordingURI },
                { shouldPlay: true }
            );
            setSound(newSound);
            setIsPlaying(true);

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false);
                }
            });
        } catch (error) {
            console.error('Error during playback', error);
        }
    };

    const stopSound = async () => {
        if (!sound) return;
        try {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
            setIsPlaying(false);
        } catch (error) {
            console.error('Error stopping sound', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audio Note Recorder</Text>

            <View style={styles.buttonRow}>
                {!isRecording ? (
                    <TouchableOpacity style={styles.button} onPress={startRecording}>
                        <Ionicons name="mic-outline" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Record</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopRecording}>
                        <Ionicons name="stop-circle" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                )}
            </View>

            {recordingURI ? (
                <Text style={styles.uriText}>Recording saved at: {recordingURI}</Text>
            ) : null}

            <View style={styles.buttonRow}>
                {!isPlaying && recordingURI ? (
                    <TouchableOpacity style={styles.button} onPress={playSound}>
                        <Ionicons name="play-circle-outline" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Play</Text>
                    </TouchableOpacity>
                ) : isPlaying ? (
                    <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopSound}>
                        <Ionicons name="pause-circle-outline" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Pause</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        margin: 20,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
        color: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3b82f6',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    stopButton: {
        backgroundColor: '#ef4444',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
    },
    uriText: {
        marginVertical: 14,
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
    },
});
