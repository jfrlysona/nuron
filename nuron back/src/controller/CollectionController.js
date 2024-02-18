import { CollectionModel } from "../model/CollectionModel.js";
import { UserModel } from "../model/UserModel.js";

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

export const createCollection = async (req, res, next) => {
  try {
    const { name, description, createdBy } = req.body;
    const newCollection = CollectionModel({
      name,
      description,
      createdBy,
    });

    if (req.files && req.files["image"]) {
      newCollection.image =
        "http://localhost:3000/" + req.files["image"][0].filename;
    }

    if (req.files && req.files["banner"]) {
      newCollection.bannerImage =
        "http://localhost:3000/" + req.files["banner"][0].filename;
    }

    await newCollection.save();

    const user = await UserModel.findByIdAndUpdate(
      createdBy,
      {
        $push: { collections: newCollection._id },
      },
      { new: true }
    );
    res.json({ newCollection, user });
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
  try {
    const collection = await CollectionModel.findByIdAndDelete(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    await UserModel.updateOne(
      { collections: id },
      { $pull: { collections: id } }
    );

    res.json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting collection" });
  }
};

