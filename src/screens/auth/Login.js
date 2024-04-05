import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { firebasApp } from "../../../firebaseConfig";
import { setIsSigned, setUser } from "../../redux/TaskSlice";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const auth = getAuth(firebasApp);
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    // Add your authentication logic here
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          dispatch(setUser(user));
          dispatch(setIsSigned(true));
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "User logged in successfully",
          });
        }
      );
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter valid email and password",
      });
      setErrorMessage("Please enter valid email and password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sing In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text>Don't have an account? Signup here</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default LoginScreen;
