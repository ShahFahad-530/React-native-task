import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import TaskPopup from "../../popups/TaskPopup";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebasApp } from "../../../firebaseConfig";
import Toast from "react-native-toast-message";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const firestore = getFirestore(firebasApp);
const TaskList = () => {
  const user = useSelector((state) => state.task.user);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    getTasks();
  }, [isModalVisible]);

  const getTasks = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(firestore, "task"), where("userId", "==", user.uid))
      );
      const taskslist = [];
      querySnapshot.forEach((doc) => {
        taskslist.push({ ...doc.data(), id: doc.id });
      });
      setTasks(taskslist);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onAddTask = async () => {
    if (isModalVisible === "edit") {
      EditTask();
      return;
    }
    try {
      const userRef = await addDoc(collection(firestore, "task"), {
        name: taskName,
        description: taskDescription,
        userId: user.uid,
      });
      console.log("Document written with ID: ", userRef.id);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Task added successfully",
      });
      setIsModalVisible(false);
      getTasks();
      setTaskName("");
      setTaskDescription("");
    } catch (error) {
      console.error("Error adding document: ", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error adding task",
      });
    }
  };

  const EditTask = async () => {
    try {
      const updatTask = await updateDoc(doc(firestore, "task", taskId), {
        name: taskName,
        description: taskDescription,
      });
      console.log("Document updated with ID: ", updatTask);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Task updated successfully",
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error updating task",
      });
    }
  };

  const onPressDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "task", id));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Task deleted successfully",
      });
      getTasks();
    } catch (error) {
      console.error("Error removing document: ", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error deleting task",
      });
    }
  };
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={{ width: "70%" }}>
        <Text style={styles.taskName}>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <Pressable
          onPress={() => {
            setIsModalVisible("edit");
            setTaskName(item.name);
            setTaskDescription(item.description);
            setTaskId(item.id);
          }}
        >
          <AntDesign name="edit" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => onPressDelete(item.id)}>
          <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptycontainer}>
      <Text>No tasks available</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Task List</Text>
        <TouchableOpacity
          onPress={() => setIsModalVisible("add")}
          style={styles.button}
        >
          <Text style={{ color: "white" }}>Add Task +</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ListEmptyComponent={ListEmptyComponent}
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TaskPopup
        handleAddTask={onAddTask}
        visible={isModalVisible ? true : false}
        onClose={toggleModal}
        isModalVisible={isModalVisible}
        taskName={taskName}
        taskDescription={taskDescription}
        setTaskName={setTaskName}
        setTaskDescription={setTaskDescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptycontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height - 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
});

export default TaskList;
