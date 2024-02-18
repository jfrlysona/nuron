import { CollectionModel } from "../model/CollectionModel.js";
import { NftModel } from "../model/NftModel.js";

export const getAllNft = async (req, res) => {
  try {
    const AllNft = await NftModel.find({});
    res.status(200).json(AllNft);
  } catch (error) {
    res.send("Nft are not Found!");
  }
};

export const getNftById = async (req, res) => {
  try {
    const { id } = req.params;
    const nft = await NftModel.findById(id);
    res.send(nft);
  } catch (error) {
    res.send(error.message);
  }
};

export const createNft = async (req, res, next) => {
  try {
    const {
      name,
      description,
      collectionId,
      category,
      tags,
      authorId,
      price,
      endingOn,
    } = req.body;
    const newnft = NftModel({
      name,
      description,
      collectionId,
      category,
      tags,
      authorId,
      price,
      endingOn,
    });

    newnft.image = "http://localhost:3000/" + req.uploadFileName;
    await newnft.save();

    const collection = await CollectionModel.findByIdAndUpdate(
      collectionId,
      {
        $push: { nfts: newnft._id },
      },
      { new: true }
    );
    res.json({ newnft, collection });
  } catch (error) {
    res.status(500).json("nft is not created!");
  }
};

export const updateNft = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    collectionId,
    category,
    tags,
    authorId,
    price,
    endingOn,
    image,
  } = req.body;
  const nft = await NftModel.findByIdAndUpdate(id, {
    name,
    description,
    collectionId,
    category,
    tags,
    authorId,
    price,
    endingOn,
    image,
  });
  res.send(nft);
};

export const deleteNft = async (req, res) => {
  const { id } = req.params;
  try {
    const nft = await NftModel.findByIdAndDelete(id);
    if (!nft) {
      return res.status(404).json({ message: "Nft not found" });
    }

    await CollectionModel.updateOne({ nfts: id }, { $pull: { nfts: id } });

    res.json({ message: "Nft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting nft" });
  }
};
