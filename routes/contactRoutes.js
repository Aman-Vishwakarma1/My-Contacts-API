const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/tokenValidationHandler");
const {
  getContacts,
  createContacts,
  getContactsId,
  updateContacts,
  deleteContacts,
} = require("../controllers/contactController");

router.use(validateToken);

router.route("/").get(getContacts)

router.route("/").post(createContacts);

router.route("/:id").get(getContactsId);

router.route("/:id").put(updateContacts);

router.route("/:id").delete(deleteContacts);

module.exports = router;