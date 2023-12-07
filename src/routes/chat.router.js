import { Router } from "express";

const chatRouters = Router();

chatRouters.get("/", async (req, res) => {
  res.status(200).render("chat");
});

export default chatRouters;
