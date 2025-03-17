import { Image, StyleSheet, Platform, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"

import { Actionsheet, ActionsheetContent, ActionsheetItem, ActionsheetItemText, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetBackdrop } from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import React from "react";



export default function TaskDetail() {
    const [showActionsheet, setShowActionsheet] = React.useState(false);
    const handleClose = () => setShowActionsheet(false);
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Heading size='xl'>Task Name</Heading>
            <Box className="bg-primary-500 p-5">
                <Text className="text-typography-0">Description</Text>
            </Box>
            <Image source={require('@/assets/images/react-logo.png')} />
            <Button onPress={() => setShowActionsheet(true)}>
                <ButtonText>Open Actionsheet</ButtonText>
            </Button>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <ActionsheetItem onPress={handleClose}>
                        <ActionsheetItemText>Edit Description</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleClose}>
                        <ActionsheetItemText>Add Images</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleClose}>
                        <ActionsheetItemText>Remove Task</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleClose}>
                        <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem isDisabled onPress={handleClose}>
                        <ActionsheetItemText>Delete</ActionsheetItemText>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>

        </View>



    );

}
