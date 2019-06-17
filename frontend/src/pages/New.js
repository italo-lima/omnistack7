import React, { Component } from "react";
import api from "../services/api";
import "./New.css";

export default class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    /*Se fosse enviar somente texto(json)
    await api.post('posts', {
      author, place,...
    }) */

    //Por ter arquivo, faz dessa forma:
    const data = new FormData();
    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    //history é o histórico de navegação, vindo do route
    this.props.history.push("/");
  };

  //pegando a imagem
  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />

        <input
          type="text"
          name="author"
          placeholder="Autor do Post"
          value={this.state.author}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="place"
          placeholder="Local do Post"
          value={this.state.place}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição do Post"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do Post"
          value={this.state.hashtags}
          onChange={this.handleChange}
        />

        <button type="submit">Enviar</button>
      </form>
    );
  }
}
