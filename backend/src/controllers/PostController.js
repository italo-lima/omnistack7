const Post = require("../models/Post");
const sharp = require("sharp"); //Redimensionar imagens
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const post = await Post.find().sort("-createdAt");

    return res.json(post);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split(".");
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500) //Tamanho da imagem: 500 x 500
      .jpeg({ quality: 70 }) //70% da imagem
      .toFile(path.resolve(req.file.destination, "resized", fileName)); //Onde será salvo após redimensionar

    //excluir imagem antiga
    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    req.io.emit("post", post); //Emite uma mensagem para tds usuarios cadastrados

    res.json(post);
  }
};
