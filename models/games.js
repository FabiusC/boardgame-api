module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Game", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.TEXT, allowNull: false },
        autor: { type: DataTypes.STRING, allowNull: false },
        bggurl: { type: DataTypes.STRING, allowNull: false },
    }, {
        tableName: "games",
        timestamps: false,
    });
};
