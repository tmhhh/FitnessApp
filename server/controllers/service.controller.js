const serviceModel = require("../models/service.model");
const registerModel = require("../models/service_register.model");
module.exports = {
  async getAll(req, res) {
    try {
      const services = await serviceModel.find();
      return res.status(200).json({ isSuccess: true, services });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  async getByVendor(req, res) {
    const { vendor } = req.query;
    try {
      const services = await serviceModel.find({ vendor });
      return res.status(200).json({ isSuccess: true, services });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  async create(req, res) {
    const { name, vendor, price } = req.body;
    try {
      const service = new serviceModel({
        name,
        vendor,
        price,
        slot: 1,
        thumbnail:
          req.files.thumbnailFile?.length > 0
            ? req.files.thumbnailFile[0].filename
            : "default-product.png",
        images: req.files.imagesFile?.map((img) => img.filename),
      });
      await service.save();
      return res.status(200).json({ isSuccess: true, service });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  async update(req, res) {
    const serviceId = req.params.id;
    try {
      const oldService = await serviceModel.findById(serviceId);
      if (!oldService)
        return res.status(404).json({ message: "Service is not exists" });
      const service = {
        ...req.body,
      };
      await serviceModel.updateOne({ _id: serviceId }, service);
      return res.status(200).json({ isSuccess: true, service });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  async delete(req, res) {
    const serviceId = req.params.id;
    try {
      const oldService = await serviceModel.findById(serviceId);
      if (!oldService)
        return res.status(404).json({ message: "Service is not exists" });
      await serviceModel.deleteOne({ _id: serviceId });
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  async register(req, res) {
    const { first_name, last_name, phone, email, serviceId, expired } =
      req.body;
    const user = req.userID;
    try {
      const register = new registerModel({
        user,
        first_name,
        last_name,
        phone,
        email,
        service: serviceId,
        expired,
      });
      await register.save();
      return res.status(200).json({ isSuccess: true, register });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
  async unregister(req, res) {
    const registerId = req.params.id;
    try {
      await registerModel.deleteOne({ _id: registerId });
      return res.status(500).json({ isSuccess: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ isSuccess: false, error });
    }
  },
};
