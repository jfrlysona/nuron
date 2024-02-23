import { CollectionModel } from "../model/CollectionModel.js";
import { NftModel } from "../model/NftModel.js";
import { UserModel } from "../model/UserModel.js";

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
  const decoded = req.decoded;
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
    likes,
    bidPrice,
    bidBy,
  } = req.body;
  const update = {
    name,
    description,
    collectionId,
    category,
    tags,
    authorId,
    price,
    endingOn,
    image,
    likes,
  };

  if (bidPrice && bidBy) {
    update.$push = {
      bids: { bidPrice, bidBy, created: Date.now() },
    };
  }
  
  const user = await UserModel.findById(decoded.userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  if (decoded.email !== user.email && decoded.role === "User") {
    return res.status(403).send("You don't have access");
  }

  try {
    const updatedNft = await NftModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    await updatedNft.save();
    res.send(updatedNft);
  } catch (error) {
    res.status(500).json("Error updating nft");
  }
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
