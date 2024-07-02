const express = require("express");
const uuid = require("uuid");
const router = express.Router();
let members = require("../../Members");

//gets all members
router.get("", (req, res) => {
  res.json(members);
});

//get a single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }

  //   res.send(req.params.id);
});

//create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    staus: "active",
  };

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);

  res.json(members);
  // res.redirect("/");
});

//update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      members.forEach((member) => {
        if (member.id === parseInt(req.params.id)) {
          member.name = updateMember.name ? updateMember.name : member.name;
          member.email = updateMember.email ? updateMember.email : member.email;

          res.json({ msg: "member upadtes", member });
        }
      });
    });
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` });
  }

  //   res.send(req.params.id);
});

//delete a member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (!found) {
    res.status(404).json({ msg: `there's no member with id ${req.params.id}` });
  }

  members = members.filter((member) => member.id !== parseInt(req.params.id));

  res.send({ msg: `member deleted with id - ${req.params.id}`, members });
});

module.exports = router;
