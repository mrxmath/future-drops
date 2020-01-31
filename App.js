import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import { View, Text } from "react-native";
import {
  Appbar,
  List,
  FAB,
  Provider,
  Portal,
  Modal,
  TextInput,
  Button
} from "react-native-paper";

import ListDropItem from "./components/ListDropItem";

export default function App() {
  const [permission, setPermission] = useState(false);
  const [drops, setDrops] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDrop, setNewDrop] = useState({ title: "", duration: "" });

  useEffect(() => {
    const askPermission = async () => {
      const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      setPermission(response.status === "granted" ? true : false);
    };
    askPermission();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleHideModal = () => {
    setModalVisible(false);
  };

  const handleNewDrop = (e, key) => {
    let tempDrop = { ...newDrop };
    tempDrop[key] = e.target.value;
    setNewDrop(tempDrop);
  };

  const handleSaveDrop = () => {
    setDrops([...drops, newDrop]);
    setNewDrop({ title: "", duration: "" });
    setModalVisible(false);
  };

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <Appbar>
        <Appbar.Content title="Nome do aplicativo" />
      </Appbar>
      <List.Section>
        {drops.map(drop => (
          <List.Item
            key={drop.title + drop.duration}
            title={drop.title}
            description={drop.duration}
            right={() => <List.Icon icon="play-circle" />}
          />
        ))}
      </List.Section>
      <FAB
        icon="plus"
        style={{ position: "absolute", bottom: 0, right: 0 }}
        onPress={handleOpenModal}
      />
      <Provider>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={handleHideModal}
            contentContainerStyle={{ backgroundColor: "white" }}
          >
            <TextInput
              label="Title"
              value={newDrop.title}
              onChange={e => handleNewDrop(e, "title")}
            />
            <View>
              <List.Icon icon="play-circle" />
            </View>
            <TextInput
              label="Duration"
              value={newDrop.duration}
              onChange={e => handleNewDrop(e, "duration")}
            />
            <Button mode="contained" onPress={handleSaveDrop}>
              Salvar
            </Button>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}
