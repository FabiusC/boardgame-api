module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "User",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.TEXT, allowNull: false },
            favorite_games: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true }, // ARRAY of INTEGER
            friends: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true }, // ARRAY of INTEGER for friends
            created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            email: { type: DataTypes.STRING, unique: true, allowNull: false },
            icon: { type: DataTypes.TEXT },
            verification_code: { type: DataTypes.STRING },
            verified: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );
};
