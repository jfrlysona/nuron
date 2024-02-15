import { CollectionModel } from "../model/CollectionModel.js";

export const getAllCollections = async (req, res) => {
  try {
    const AllCollections = await CollectionModel.find({});
    res.status(200).json(AllCollections);
  } catch (error) {
    res.send("Collections are not Found!");
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await CollectionModel.findById(id);
    res.send(collection);
  } catch (error) {
    res.send(error.message);
  }
};

export const createCollection = async (req, res) => {
  try {
    const {
      name,
      image,
      bannerImage,
      description,
      createdBy,
    } = req.body;
    const newCollection = CollectionModel({
      name,
      image,
      bannerImage,
      description,
      createdBy,
    });
    await newCollection.save();
    res.send(newCollection);
  } catch (error) {
    res.status(500).json("Collection is not created!");
  }
};

export const updateCollection = async (req, res) => {
  const { id } = req.params;
  const { name, image, bannerImage, description, nfts, createdAt, createdBy } =
    req.body;
  const collection = await CollectionModel.findByIdAndUpdate(id, {
    name,
    image,
    bannerImage,
    description,
    nfts,
    createdAt,
    createdBy,
  });
  res.send(collection);
};

export const deleteCollection = async (req, res) => {
  const { id } = req.params;
  const collection = await CollectionModel.findByIdAndDelete(id);
  res.send(collection);
};
