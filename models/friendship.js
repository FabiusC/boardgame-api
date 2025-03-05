module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Friendship",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_ID: { type: DataTypes.INTEGER, allowNull: false },
            friend_ID: { type: DataTypes.INTEGER, allowNull: false },
            status: { type: DataTypes.STRING, allowNull: false },
        },
        {
            tableName: "friendships",
            timestamps: false,
        }
    );
};
