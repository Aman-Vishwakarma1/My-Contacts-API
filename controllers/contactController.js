const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactSchema");
const { default: mongoose } = require("mongoose");
//------------------------------------GET ALL CONTACTS CONTROLLER------------------------------------//
//@description : GET all contacts
//@route : GET /api/contact
//@access : private
exports.getContacts = asyncHandler(async (req, res, next) => {
  // console.log(req.user.id);
  const contact = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

//-----------------------------------CREATE NEW CONTACTS CONTROLLER-------------------------------------//
//@description : create new contacts
//@route : POST /api/contact
//@access : private
exports.createContacts = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are Mandatory!");
  }
  
  // const registeredContactPhone = await Contact.findOne({phone});
  // if(registeredContactPhone){
  //   res.status(403);
  //   throw new Error("Phone number is registered, Please Update that or first Delete it")
  // }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});

//-----------------------------------------GET CONTACT BY ID CONTROLLER-------------------------//
//@description : GET contacts by id
//@route : GET /api/contact
//@access : private
exports.getContactsId = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact Found");
  }
  res.status(200).json(contact);
  console.log(contact);
});

//---------------------------------------UPDATE A CONTACT BY ID CONTROLLER-----------------------------------//
//@description : update contacts by id
//@route : PUT /api/contact
//@access : private
exports.updateContacts = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact Found");
  }
  console.log(contact.user_id.toString());
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("Not have permission to do this operation")
  };
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  console.log(updatedContact);
  res.status(200).json(updatedContact);
});
// exports.updateContacts = asyncHandler(async (req, res, next) => {
//   const contact = await Contact.findById(req.params.id);
//   console.log(Contact);
//   if (!contact) {
//     res.status(404);
//     throw new Error("No Contact Found");
//   }
//   // console.log(contact.user_id.toString());
//   if (contact.user_id.toString() !== req.user.id) {
//     res.status(403);
//     throw new Error("Not have permission to do this operation");
//   }
//   const updatedContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   await updatedContact.save();
//   // console.log(updatedContact);
//   res.status(200).json(updatedContact);
// });

//---------------------------------------------DELETE A CONTACT BY ID CONTROLLER--------------------------------//
//@description : delete contacts by id
//@route : DELETE /api/contact
//@access : private
exports.deleteContacts = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No Contact Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not have permission to do this operation");
  }
  await Contact.deleteOne({ _id: req.params.id }); // Pass the query object
  res.status(200).json(contact);
});