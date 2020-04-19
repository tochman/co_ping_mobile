import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getTripInformation,
  closeTrip
} from "../modules/tripActions";
import { PongToPingDetails } from "./PongToPingDetails"
import axios from "axios"

const TripDetails = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);

  useEffect(() => {
    getTripInformation(userId, dispatch);
  }, []);

  const myPongs = useSelector(state => state.myPongs);
  const userTrip = useSelector(state => state.userTrip);
  const pingId = useSelector(state => state.userTrip.id);
  const noPongsMessage = useSelector(state => state.noPongsMessage);
  const closeTripMessage = useSelector(state => state.closeTripMessage);

  const [check, setCheck] = useState("unchecked");
  // const [totalCost, setTotalCost] = useState()

  let pingBoardMessage;
  if (noPongsMessage === "") {
    pingBoardMessage = `You're going to ${userTrip.store} at ${userTrip.time}.`;
  } else {
    pingBoardMessage = `${noPongsMessage}`;
  }

  const isChecked = () => {
    if (check === "checked") {
      setCheck("unchecked");
    } else {
      setCheck("checked");
    }
  };

  // const handleTotalCostChange = async (cost) => {
  //   await setTotalCost(cost)
  // }

  // let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  // const sendCostInformation = async (event, pongId) => {
  //   event.preventDefault();
  //   debugger
  //   let response = await axios.put(
  //     `https://co-ping.herokuapp.com/pongs/${pongId}`,
  //     {
  //       pong: {
  //         ping_id: pingId,
  //         total_cost: totalCost
  //       }
  //     },
  //     {
  //       headers: headers
  //     }
  //   );
  //   // debugger
  // }

  function Item({
    pongId,
    name,
    itemOne,
    itemTwo,
    itemThree,
    acceptButton,
    rejectButton,
    status,
  }) {
    return (
      <View>
        {PongToPingDetails(
          pongId,
          name,
          itemOne,
          itemTwo,
          itemThree,
          acceptButton,
          rejectButton,
          status
        )}
      </View>
    )
  }

  return (
    <View style={styles.container} className="request-form">
      <LinearGradient
        colors={["#71b280", "#134e5e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>My Current Trip</Text>
        <Text style={styles.trip}>{pingBoardMessage}</Text>
        {closeTripMessage ? (
          <Text id="close-trip-message" style={styles.trip}>
            {closeTripMessage}
          </Text>
        ) : (
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => {
                closeTrip(pingId, userId, dispatch);
              }}
            >
              <Text style={styles.buttonText} id="close-trip-button">
                No More Pongs
            </Text>
            </TouchableHighlight>
          )}
        <FlatList
          data={myPongs}
          renderItem={({ item }) => (
            <Item
              pongId={item.id}
              name={item.user_name}
              itemOne={item.item1}
              itemTwo={item.item2}
              itemThree={item.item3}
              status={item.status}
              acceptButton="Of course!"
              rejectButton="Sorry, not this time"
            />
          )}
          keyExtractor={item => item.id}
          id="request"
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    margin: 10
  },
  pong: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 2.0
  },
  item: {
    fontSize: 18,
    margin: 10
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    marginLeft: 15
  },
  name: {
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  acceptButton: {
    height: 30,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#71B280",
    marginTop: 15,
    margin: 5,
    paddingTop: 16,
    paddingBottom: 18,
    width: "40%",
    justifyContent: "center",
    alignItems: "center"
  },
  rejectButton: {
    height: 30,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#B27183",
    marginTop: 15,
    margin: 5,
    paddingTop: 16,
    paddingBottom: 18,
    width: "40%",
    justifyContent: "center",
    alignItems: "center"
  },
  requestButtonText: {
    color: "white",
    fontSize: 12
  },
  trip: {
    color: "white",
    margin: 10,
    textAlign: "center",
    fontSize: 18
  },
  closeButton: {
    height: 30,
    borderRadius: 10,
    backgroundColor: "#71B280",
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#black",
    fontSize: 18
  },
  costContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "left"
  },
  costInput: {
    width: 70
  },
  sendButton: {
    height: 30,
    width: 70,
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: "#71B280",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TripDetails;
