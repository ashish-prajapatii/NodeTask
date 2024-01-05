const router = require("express").Router();
const middleware = require("../helper/middleware");
const userModel = require("../model/user.model");
const user = require("../model/user.model");
const bcrypt = require("bcrypt");

//Insert Data
module.exports.insertData = async (req, res) => {
    try {
        const users = new user({
            name: req.body.name,
            email: req.body.email,
            phoneno: req.body.phoneno,
            password: req.body.password
        });
        console.log(users);
        await users.save().then(async (content) => {
            if (content) {
                res.send(middleware.responseMiddlewares("Data Successfully Inserted", true, content, 200));
            } else {
                res.send(middleware.responseMiddlewares("Data Does Not Inserted", false, undefined, 300));
            }
        })
            .catch((err) => {
                res.send(middleware.responseMiddlewares(err, false, undefined, 400));
            });
    } catch (err) {
        res.send(middleware.responseMiddlewares(err, false, undefined, 500));
    }
};

//Get All Data
module.exports.getAllData = async (req, res) => {
    try {
        const data = await user.find().then(async (content) => {
            if (content) {
                res.send(middleware.responseMiddlewares("Data Get Successfully", true, content, 200));
            } else {
                res.send(middleware.responseMiddlewares("Data Do Not Get", false, undefined, 300));
            }
        })
            .catch((err) => {
                res.send(middleware.responseMiddlewares(err, false, undefined, 400));
            });
    } catch (err) {
        res.send(middleware.responseMiddlewares(err, false, undefined, 500));
    }
};

//Get Single Data
module.exports.getSingleData = async (req, res) => {
    try {
        const id = req.body._id;
        const data = await user.findById({ _id: id }).then(async (content) => {
            if (content) {
                res.send(middleware.responseMiddlewares("Data Get Successfully", true, content, 200));
            } else {
                res.send(middleware.responseMiddlewares("Data Do not Get", false, undefined, 300));
            }
        })
            .catch((err) => {
                res.send(middleware.responseMiddlewares(err, false, undefined, 400));
            });
    } catch (err) {
        res.send(middleware.responseMiddlewares(err, false, undefined, 500));
    }
};

//Update Data
module.exports.updateData = async (req, res) => {
    try {
        const data1 = {
            name: req.body.name,
            email: req.body.email,
            phoneno: req.body.phoneno,
            password: req.body.password,
        };
        const id = req.body._id;
        await user.findById({ _id: id }).then(async (data) => {
            console.log(data, "data");
            if (data) {
                await user.findByIdAndUpdate(id, data1).then(async (content) => {
                    if (content) {
                        res.send(middleware.responseMiddlewares("Data Update Successfully", true, content, 200));
                    } else {
                        res.send(middleware.responseMiddlewares("Data Do Not Update", false, undefined, 300));
                    }
                });
            } else {
                res.send(middleware.responseMiddlewares("Data Do Not Exists", false, undefined, 400));
            }
        })
            .catch((err) => {
                res.send(middleware.responseMiddlewares(err, false, undefined, 500));
            });
    } catch (err) {
        res.send(middleware.responseMiddlewares(err, false, undefined, 600));
    }
};

//Delete Data
module.exports.deleteData = async (req, res) => {
    try {
        const id = req.body._id;
        await user.findById({ _id: id }).then(async (data) => {
            if (data) {
                await user.findByIdAndDelete(id).then(async (content) => {
                    if (content) {
                        res.send(middleware.responseMiddlewares("Data Successfully Deleted", true, content, 200));
                    } else {
                        res.send(middleware.responseMiddlewares("Data Do Not Delete", false, undefined, 300));
                    }
                });
            } else {
                res.send(middleware.responseMiddlewares("Data Do Not Exists", false, undefined, 400));
            }
        })
            .catch((err) => {
                res.send(middleware.responseMiddlewares(err, false, undefined, 500));
            });
    } catch (err) {
        res.send(middleware.responseMiddlewares(err, false, undefined, 600));
    }
};

//Check User is Exists or Not
module.exports.checkUser = async (req, res) => {
    try {
        await user.find({ email: req.body.email, phoneno: req.body.phoneno })
            .then(async (data) => {
                if (data.length > 0) {
                    res.send(middleware.responseMiddlewares("Data Already Exists", false, undefined, 300));
                } else {
                    const data1 = new user({
                        name: req.body.name,
                        email: req.body.email,
                        phoneno: req.body.phoneno,
                        password: req.body.password
                    });
                    await data1.save().then(async (content) => {
                        if (content.length > 0) {
                            res.send(middleware.responseMiddlewares("Registration Failed", false, undefined, 400));
                        } else {
                            res.send(middleware.responseMiddlewares("Registartion Successfull,", true, content, 200));
                        }
                    });
                }
            })
            .catch((err) => {
                res.send(middleware.responseMiddlewares(err, false, undefined, 500));
            });
    } catch (err) {
        res.send(middleware.responseMiddlewares(err, false, undefined, 600));
    }
};

//Login
module.exports.login = async (req, res) => {
    try {
        await user.find({ email: req.body.email, phoneno: req.body.phoneno }).then(async (data) => {
            if (data.length > 0) {
                res.send(middleware.responseMiddlewares("Login Successfully", true, data, 200));
            } else {
                res.send(middleware.responseMiddlewares("Login Failed", false, undefined, 300));
            }
        })
            .catch((err) => {
                res.send(middleware.responseMiddlewares(err, false, undefined, 400));
            });
    } catch (err) {
        res.send(middleware.responseMiddlewares(err, false, undefined, 500));
    }
};