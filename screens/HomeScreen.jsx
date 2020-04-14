import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import { NEW_TRIP_FORM, SHOW_LOGIN_FORM } from "../state/actions/actionTypes";
import { onLogout } from "../modules/authentication";

const HomeScreen = () => {
  const authenticated = useSelector((state) => state.authenticated);
  const logoutMessage = useSelector((state) => state.logoutMessage);
  const dispatch = useDispatch();
  const newTrip = () => {
    dispatch({ type: NEW_TRIP_FORM });
  };
  const login = () => {
    dispatch({ type: SHOW_LOGIN_FORM });
  };

  return (
    <View>
      <Text>{!authenticated && logoutMessage}</Text>
      {authenticated ? (
        <TouchableHighlight style={styles.button}>
          <Text id="logout-button" style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight style={styles.button} onPress={login}>
          <Text id="login-button" style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>
      )}
      {authenticated && (
        <TouchableHighlight style={styles.button} onPress={newTrip}>
          <Text id="new-trip-button" style={styles.buttonText}>
            New Trip
          </Text>
        </TouchableHighlight>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#black",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default HomeScreen;
