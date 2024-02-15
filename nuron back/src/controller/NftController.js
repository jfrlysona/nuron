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

export const createNft = async (req, res) => {
  try {
    const { name, description, collectionId, authorId, price, endsAt, image } =
      req.body;
    const newnft = NftModel({
      name,
      description,
      collectionId,
      authorId,
      price,
      endsAt,
      image,
    });
    await newnft.save();
    res.send(newnft);
  } catch (error) {
    res.status(500).json("nft is not created!");
  }
};

export const updateNft = async (req, res) => {
  const { id } = req.params;
  const { name, description, collectionId, authorId, price, endsAt, image } =
    req.body;
  const nft = await NftModel.findByIdAndUpdate(id, {
    name,
    description,
    collectionId,
    authorId,
    price,
    endsAt,
    image,
  });
  res.send(nft);
};

export const deleteNft = async (req, res) => {
  const { id } = req.params;
  const nft = await NftModel.findByIdAndDelete(id);
  res.send(nft);
};
