const express = require("express");
const Users = require("./models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const Sequelize = require('sequelize')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/current", async (req, res) => {
//     try {
//         const user = await Users.findOne({
//             where: {
//                 name: req.user.name
//             }
//         })
//         res.send({
//             person: user
//         })
//     } catch (err) {
//         res.status(500).send("Server error !!!");
//     }
// });

app.post("/signup", (req, res) => {
  const { name, family_name, password } = req.body;
  console.log("payload state back", req.body);
  const userData = {
    name,
    family_name,
    password,
  };
  console.log("userData", userData);
  Users.findOne({
    where: {
      name,
    },
  })
    .then((user) => {
      if (!user) {
        const hash = bcrypt.hashSync(userData.password, 10);
        userData.password = hash;
        Users.create(userData)
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("err:" + err);
    });
});

app.post("/login", (req, res) => {
  Users.findOne({
    where: {
      name: req.body.name,
    },
  })
    .then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user.dataValues, "secretKey");
        res.json({ token });
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error" + err);
      console.log("error login", err);
    });
});

app.get("/api/list-user", (req, res) => {
  Users.findAll().then((user) => {
    res.json(user);
  });
});

app.get("/api/list-user/:id", (req, res) => {
  let { id } = req.params;
  Users.findByPk(id).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).send();
    }
  });
});

app.put("/api/update/:id", async (req, res) => {
  const { name, family_name } = req.body;
  await Users.update(
    {
      name,
      family_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  Users.findAll().then((user) => {
    res.json(user);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id,
    },
  });
  Users.findAll().then((user) => {
    res.json(user);
  });
});

app.listen(5000, () => {
  console.log("running on port 5000");
});
