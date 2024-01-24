import { Router } from "express";
import { MongoUsers } from "../dao/db/mongoUsers.js";
import crypto from "crypto";

export const sessionsRouter = Router();

const userManager = new MongoUsers();

const userAdmin = {
  first_name: "Admin",
  last_name: "Coder",
  email: "adminCoder@coder.com",
  password: "adminCod3r123",
  age: 0,
  role: "Admin",
  isAdmin: true,
}

export const auth = (req, res, next) => {
  if (!req.session.usuario) {
    res.redirect("/");
  } else {
    next();
  }
};

const authAdmin = (req, res, next) => {
  let { email, password } = req.body
  if (email === userAdmin.email && password === userAdmin.password) {
    req.session.usuario = userAdmin
    return res.redirect("/products")
  } else{
    next()
  }
}

sessionsRouter.get("/register", (req, res) => {
  let { error, success } = req.query;
  res.status(200).render("userregister", { error, success });
});

sessionsRouter.get("/profile", auth, (req, res) => {
  const { userExist } = req.session?.usuario || {};
  res.status(200).render("userprofile", { userExist });
});

sessionsRouter.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.redirect("/sessions/profile?error=Error al cerrar sesión");
    }
  });
  res.redirect("/");
});

// POST

sessionsRouter.post("/login", authAdmin, async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/?error=Complete todos los campos");
  }
  password = crypto
    .createHmac("sha256", "CoderCoder")
    .update(password)
    .digest("hex");
  const userExist = await userManager.userExist(email, password);
  if (!userExist) {
    return res.redirect(`/?error=Usuario o Contraseña Incorrecta`);
  }
  delete userExist.password;
  req.session.usuario = userExist;
  res.redirect("/products");
});

sessionsRouter.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    if (
      !newUser.first_name ||
      !newUser.last_name ||
      !newUser.email ||
      !newUser.age ||
      !newUser.password
    ) {
      return res.redirect(
        `/sessions/register?error=Datos%20incompletos! Complete todos los campos.`
      );
    }
    const userExist = await userManager.userByEmail(newUser.email);
    if (userExist) {
      return res.redirect(`/sessions/register?error=El%20email%20ya%20existe`);
    }
    newUser.password = crypto
      .createHmac("sha256", "CoderCoder")
      .update(newUser.password)
      .digest("hex");
    await userManager.userSave(newUser);
    res.redirect("/?success=Usuario%20registrado%20correctamente");
  } catch (error) {
    res.redirect(
      "/sessions/register?error=Ah ocurrido un error inesperado. Reintente nuevamente"
    );
  }
});
