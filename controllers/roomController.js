const { getById, update, deleteById } = require("../services/roomService");

const roomController = require("express").Router();

roomController.get("/:id/edit", async (req, res) => {
  const roomId = req.params.id;
  const room = await getById(roomId);

  if (!req.user || room.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  res.render("edit", {
    title: "Edit Accomodation",
    room,
  });
});

roomController.post("/:id/edit", async (req, res) => {
  const roomId = req.params.id;
  const room = await getById(roomId);

  if (!req.user || room.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  try {
    const result = await update(roomId, req.body);
    res.redirect("/catalog/" + result._id);
  } catch (err) {
    req.body._id = roomId;
    // if theres error we stay on edit
    res.render("edit", {
      title: "Edit Accomodation",
      error: err.message.split("\n"),
      // and keep the values we previously entered, so the user doesn't need to type them all again
      room: req.body,
    });
  }
});

roomController.get("/:id/delete", async (req, res) => {
  res.render("delete", {
    title: "Delete Accomodation",
    room,
  });
});

roomController.post("/:id/delete", async (req, res) => {
  const roomId = req.params.id;
  const room = await getById(roomId);

  if (!req.user || room.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  try {
    await deleteById(roomId);
    res.redirect("/catalog");
  } catch (err) {
    req.body._id = roomId;
    // if theres error we stay on edit
    res.render("delete", {
      title: "Delete Accomodation",
      error: err.message.split("\n"),
      // and keep the values we previously entered, so the user doesn't need to type them all again
      room: req.body
    });
  }

});

module.exports = roomController;
