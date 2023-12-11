import { Router } from "express";

const chatRouters = Router();

chatRouters.get("/", (req, res) => {
  res.status(200).render("chat");
});

export default chatRouters;
