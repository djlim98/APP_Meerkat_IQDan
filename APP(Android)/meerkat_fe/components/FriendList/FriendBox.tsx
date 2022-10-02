import { StyleSheet, View, Text, Image } from "react-native";
import { UserEvent, UserProfile } from "../../common/types.d";

/**
 * @param event typeof enum UserEvent | null
 * @returns the image layer according to the image type.
 */
function getEventImage(event: UserEvent | null | undefined) {
  if (event === UserEvent.NONE || event === null || event === undefined) {
    return <></>;
  }
  if (event === UserEvent.RESERVE) {
    return (
      <Image
        style={styles.eventImage}
        source={require("../../assets/users/reserving.jpg")}
      />
    );
  } else if (event === UserEvent.PROMOTION) {
    return (
      <Image
        style={styles.eventImage}
        source={require("../../assets/users/promotion.jpg")}
      />
    );
  }
}

export default function FriendBox(props: UserProfile) {
  const { name, image, event, statusMessage } = props; // profile image must be delivered as prop

  const ProfileImageSource =
    image === null || image == undefined
      ? require("../../assets/users/emptyProfile.jpg")
      : image;

  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={ProfileImageSource} />
      <View style={styles.nameContainer}>
        <View style={styles.nameLayout}>
          <Text style={styles.nameText}>{name}</Text>
          {getEventImage(event)}
        </View>
        {statusMessage === "" ? (
          <></>
        ) : (
          <Text style={styles.statusMessageText}>{statusMessage}</Text>
        )}
      </View>
      <View style={styles.ddayContainer}>
        <Text style={styles.ddayText}>D-100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "white",
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 17,
    marginLeft: 18,
    marginRight: 12,
  },
  nameContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  nameLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: 18,
    fontFamily: "noto-reg",
    lineHeight: 25,
  },
  eventImage: {
    marginLeft: 6,
    width: 15,
    height: 15,
  },
  statusMessageText: {
    fontSize: 11,
    color: "rgba(0, 0, 0, 0.45)",
    fontFamily: "noto-reg",
    lineHeight: 20,
  },
  ddayContainer: {
    position: "absolute",
    borderRadius: 4,
    padding: 4,
    right: 18,
    backgroundColor: "#D6D6D6",
  },
  ddayText: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "noto-reg",
    lineHeight: 15
  },
});