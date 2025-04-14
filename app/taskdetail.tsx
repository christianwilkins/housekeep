import React, { useState } from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import {
    Actionsheet,
    ActionsheetContent,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetBackdrop,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import AudioNote from './audionote';

export default function TaskDetail() {
    // State for actionsheet, audio recorder, and description editor modals
    const [showActionsheet, setShowActionsheet] = useState<boolean>(false);
    const [showAudioRecorder, setShowAudioRecorder] = useState<boolean>(false);
    const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
    const [description, setDescription] = useState<string>(
        "This is a detailed description of your task. Provide more context here so that users know what needs to be done."
    );

    // Close the actionsheet
    const handleCloseActionsheet = () => setShowActionsheet(false);

    // Open the audio recorder modal from the actionsheet
    const handleShowAudioRecorder = () => {
        setShowAudioRecorder(true);
        handleCloseActionsheet();
    };

    // Open the edit description modal from the actionsheet
    const handleEditDescription = () => {
        setIsEditingDescription(true);
        handleCloseActionsheet();
    };

    return (
        <View style={styles.container}>
            {/* Header with task title */}
            <View style={styles.header}>
                <Heading style={styles.headingText}>Task Name</Heading>
            </View>

            {/* Description Box - using state so changes are reflected dynamically */}
            <Box style={styles.descriptionBox}>
                <Text style={styles.descriptionText}>
                    {description}
                </Text>
            </Box>

            {/* Image Display */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('@/assets/images/react-logo.png')}
                    style={styles.image}
                />
            </View>

            {/* Options button */}
            <View style={styles.buttonGroup}>
                <Button onPress={() => setShowActionsheet(true)}>
                    <ButtonText>Options</ButtonText>
                </Button>
            </View>

            {/* Actionsheet with various task actions */}
            <Actionsheet isOpen={showActionsheet} onClose={handleCloseActionsheet}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    {/* Edit Description Action */}
                    <ActionsheetItem onPress={handleEditDescription}>
                        <ActionsheetItemText>Edit Description</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleCloseActionsheet}>
                        <ActionsheetItemText>Add Images</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleCloseActionsheet}>
                        <ActionsheetItemText>Remove Task</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleCloseActionsheet}>
                        <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleShowAudioRecorder}>
                        <ActionsheetItemText>Add Audio Note</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem isDisabled onPress={handleCloseActionsheet}>
                        <ActionsheetItemText>Delete</ActionsheetItemText>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>

            {/* Modal for Audio Recorder */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={showAudioRecorder}
                onRequestClose={() => setShowAudioRecorder(false)}
            >
                <View style={styles.modalContainer}>
                    <AudioNote />
                    <Button onPress={() => setShowAudioRecorder(false)}>
                        <ButtonText>Close Recorder</ButtonText>
                    </Button>
                </View>
            </Modal>

            {/* Modal for Editing Description */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={isEditingDescription}
                onRequestClose={() => setIsEditingDescription(false)}
            >
                <View style={styles.modalContainer}>
                    <Heading style={styles.modalTitle}>Edit Description</Heading>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter new description"
                    />
                    <View style={styles.modalButtonRow}>
                        <Button onPress={() => setIsEditingDescription(false)}>
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button onPress={() => setIsEditingDescription(false)}>
                            <ButtonText>Save</ButtonText>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    header: {
        marginBottom: 20,
        alignItems: 'center'
    },
    headingText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333'
    },
    descriptionBox: {
        backgroundColor: '#f1f5f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 16,
        color: '#374151',
        lineHeight: 22
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 10
    },
    buttonGroup: {
        marginVertical: 20,
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        marginBottom: 20,
        color: '#333',
    },
    textInput: {
        width: '100%',
        minHeight: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
