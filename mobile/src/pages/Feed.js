import React, { Component } from "react";

import api from "../services/api";
import io from "socket.io-client";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";

import camera from "../assets/camera.png";
import more from "../assets/more.png";
import like from "../assets/like.png";
import send from "../assets/send.png";
import comment from "../assets/comment.png";

export default class Feed extends Component {
  //Configuração pertencente somente a essa página
  //Navegação para apertar na camera ir para outra tela
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate("New")}
        style={{ marginRight: 20 }}
      >
        <Image source={camera} />
      </TouchableOpacity>
    )
  });

  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get("posts");

    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io("http://192.168.1.34:3333");

    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("like", likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id == likedPost._id ? likedPost : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`posts/${id}/like`);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>
                <Image source={more} />
              </View>

              <Image
                style={styles.feedImage}
                source={{ uri: `http://192.168.1.34:3333/files/${item.image}` }}
              />

              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => this.handleLike(item._id)}
                  >
                    <Image source={like} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={comment} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.like}>{item.likes} curtidas</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },
  feedItemHeader: {
    paddingHorizontal: 15,

    //todos elementos vem com dispplay: flex, por padrão
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    fontSize: 14,
    color: "#000"
  },
  place: {
    fontSize: 12,
    color: "#666",
    marginTop: 3,
    marginBottom: 3
  },
  feedImage: {
    width: "100%",
    height: 400
  },
  feedItemFooter: {
    paddingHorizontal: 15
  },
  actions: {
    flexDirection: "row"
  },
  action: {
    marginRight: 8,
    marginTop: 10
  },
  like: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#000"
  },
  description: {
    lineHeight: 18,
    color: "#000"
  },
  hashtags: {
    color: "blue"
  }
});
