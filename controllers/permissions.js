const permissionSchema = require('../models/admin/permissions');
const adminUserSchema = require('../models/admin/users');
const permissionValidator = require('../validators/permissions.validator');

module.exports = {

    addPermission: async (req, res, next) => {
        try {
            let { userId, permission } = await permissionValidator.addPermission().validateAsync(req.body);
            let userName = await adminUserSchema.findOne({
                _id: userId
            },{ _id: 0, name: 1}).lean();
            const data = await permissionSchema.findOneAndUpdate({
                userId
            }, {
                $push: {
                    permissions: permission
                },
                $set: {
                    userName: userName.name
                }
            }, { upsert: true});
            return res.json({
                code: 200,
                data,
                message: "Permission added successfully",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    removePermission: async (req, res, next) => {
        try {
            let { userId, permission } = await permissionValidator.removePermission().validateAsync(req.body);
            const data = await permissionSchema.findOneAndUpdate({
                userId
            }, {
                $pull: {
                    permissions: permission
                }
            }, { new: true});
            return res.json({
                code: 200,
                data,
                message: "Permission removed successfully",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    getAllPermission: async (req, res, next) => {
        try {
            let { userId } = await permissionValidator.listPermissionOneUser().validateAsync(req.params);
            let data = await permissionSchema.findOne({
                userId
            }).lean();
            return res.json({
                code: 200,
                data,
                message: "Permission fetched successfully",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    getPermissionForOneUser: async (req, res, next) => {
        try {
            let { skip, limit } = await permissionValidator.listAllPermission().validateAsync(req.body);
            let data = await permissionSchema.findOne({
            })
            .skip(skip)
            .limit(limit)
            .lean();
            return res.json({
                code: 200,
                data,
                message: "All Permissions fetched successfully",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }
}