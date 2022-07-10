const express = require("express");
const router = express.Router();
const ResenhasController = require("../controllers/ResenhasController");
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/list", checkAuth, ResenhasController.list);
router.get("/create", checkAuth, ResenhasController.create);
router.post("/create", checkAuth, ResenhasController.createPost);
router.get("/edit", checkAuth, ResenhasController.edit);
router.post("/edit", checkAuth, ResenhasController.editPost);
router.get("/delete", checkAuth, ResenhasController.delete);
router.post("/delete", checkAuth, ResenhasController.deletePost);

module.exports = router;
