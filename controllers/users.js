const usersSchema = require('../models/admin/users');
const sellerSchema = require('../models/users/users');
const storeSchema = require('../models/stores/storenames');
const permissionSchema = require('../models/admin/permissions');
const customerSchema = require('../models/customers/users');
const adminUserSchema = require('../models/admin/users');

const userValidator = require('../validators/users.validators');
const crypto = require('../utils/crypto/Crypto');
const jwtService = require('../utils/jwt/jwt');

module.exports = {

    login : async (req, res, next) => {
        try {
            let { email, password } = await userValidator.login().validateAsync(req.body);
            let count = await usersSchema.countDocuments({
                email
            });
            if (count) {
                let data = await usersSchema.findOne({
                    email
                }).lean();
                let userPassword = await crypto.staticDecrypter(data.password);
                let id = data._id;
                let permissions = await permissionSchema.findOne({
                    userId: id
                }).lean();
                data.permissions = permissions;
                if(password === userPassword) {
                    const accessToken = await jwtService.generateAccessToken({
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        isAdmin: data.isAdmin
                    });
                    return res.json({
                        code: 200,
                        data,
                        message: "Fetched user details",
                        accessToken
                    });
                } else {
                    return res.json({
                        code: 400,
                        data: {},
                        message: "password did not match",
                        accessToken: {}
                    }); 
                }
            } else {
                return res.json({ 
                    code: 400,
                    data: {},
                    message: "User not registered.", 
                    error: null 
                });
            }
        } catch (err) {
            next(err);
        }
    },

    signup: async (req, res, next) => {
        try {
            let {
                name, email, password, phone
            } = await userValidator.signup().validateAsync(req.body);
            let count = await usersSchema.countDocuments({
                email
            });
            if (count) {
                return res.json({
                    code: 400,
                    message: 'Email already exists !!',
                    data:{},
                    error: null
                }); 
            }
            phone = await crypto.staticEncrypter(phone);
            password = await crypto.staticEncrypter(password);
            let data = new usersSchema({
                name,
                email,
                password,
                phone
            });
            const sellerData = await data.save();
            delete sellerData.mobile;
            if (sellerData) {
                return res.json({
                    code: 200,
                    message: 'Registration Completed!!',
                    data: sellerData,
                    error: null
                });
            } else {
                return res.json({ 
                    code: 400,
                    data: {},
                    messgae: "Something Error!! Not created successfully.", 
                    error: null 
                });
            }
        } catch (err) {
            next(err)
        }
    },

    listAllUsers: async (req, res, next) => {
        try {
            let usersData = [];
            let { skip, limit, status } = await userValidator.listAllUsers().validateAsync(req.body);
            if (!status) { 
                usersData = await sellerSchema.find({
                    isDeleted: false
                })
                .skip(skip)
                .limit(limit)
                .lean(); 
            } else {
                usersData = await usersSchema.find({
                    isDeleted: false,
                    isApproved: status
                })
                .skip(skip)
                .limit(limit)
                .lean(); 
            }
            for(let i = 0; i < usersData.length; i++) {
                if (usersData[i]['mobile'])
                    usersData[i]['mobile'] = await crypto.staticDecrypter(usersData[i]['mobile'])
                let storeData = await storeSchema.findOne({
                    userId: usersData[i]._id
                }).lean();
                usersData[i]["storename"] = storeData ? storeData.storename : "";
            }
            // usersData.forEach(async (user, i) => {
               
            // });
            // console.log(userData)
            if (usersData && usersData.length > 0) {
                return res.json({
                    code: 200,
                    data: usersData,
                    message: "Found all active users",
                    error: null
                });
            } else {
                return res.json({
                    code: 400,
                    data: {},
                    message: "No users found !!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    },

    listAllCustomers: async (req, res, next) => {
        try {
            let usersData = [];
            let { skip, limit } = await userValidator.listAllCustomers().validateAsync(req.body);
            usersData = await customerSchema.find({
            })
            .skip(skip)
            .limit(limit)
            .lean(); 
        if (usersData && usersData.length > 0) {
            return res.json({
                code: 200,
                data: usersData,
                message: "Found all active users",
                error: null
            });
            } else {
                return res.json({
                    code: 400,
                    data: {},
                    message: "No users found !!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    },

    getUserData: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let userData = await sellerSchema.findOne({
                _id: userId
            }).lean();
            if (userData) {
                return res.json({
                    code: 200,
                    message: 'User profile data found !!',
                    data: userData,
                    accessToken,
                    error: null
                });
            } else {
                return res.json({
                    code: 400,
                    message: 'No user found !!',
                    data: {},
                    accessToken,
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    },

    sortUser: async (req, res, next) => {
        try {
            let { key, sortBy, skip, limit } = await userValidator.sortUser().validateAsync(req.body);
            let query = {};
            query[key] = sortBy;
            let products = await sellerSchema.find({})
            .sort(query)
            .skip(skip)
            .limit(limit)
            .lean();
            return res.json({
                code: 200,
                data: products,
                message: "Sorted List",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    searchUser: async (req, res, next) => {
        try {
            let { skip, limit, search } = await userValidator.searchUser().validateAsync(req.body);
            let userData = await sellerSchema.find({
                $or: [
                    { email: { $regex: new RegExp(search, 'i') }},
                    { name:  { $regex: new RegExp(search, 'i') }}
                ]
            })
            .skip(skip)
            .limit(limit)
            .lean();
            return res.send({
                code: 200,
                data: userData,
                message: "Searched User",
                error: null
            })
        } catch (err) {
            next(err);
        }
    },

    approveDisapproveCustomer: async (req, res, next) => {
        try {
            let { customerId, status } = await userValidator.approveCustomers().validateAsync(req.body);
            let customerdata = await customerSchema.findOneAndUpdate({
                _id: customerId
            }, {
                $set: {
                    isDeleted: status
                }
            }, {new: true});
            return res.json({
                code: 200,
                data: customerdata,
                message: "Customer status changed",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    approveDisapproveSeller: async (req, res, next) => {
        try {
            let { sellerId, status } = await userValidator.approveSeller().validateAsync(req.body);
            let customerdata = await sellerSchema.findOneAndUpdate({
                _id: sellerId
            }, {
                $set: {
                    isActive: status
                }
            }, {new: true});
            return res.json({
                code: 200,
                data: customerdata,
                message: "Seller status changed",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    approveDisapproveAdminUsers: async (req, res, next) => {
        try {
            let { userId, status } = await userValidator.approveAdminUser().validateAsync(req.body);
            let customerdata = await adminUserSchema.findOneAndUpdate({
                _id: sellerId
            }, {
                $set: {
                    isActive: status
                }
            }, {new: true});
            return res.json({
                code: 200,
                data: customerdata,
                message: "Seller status changed",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }
}