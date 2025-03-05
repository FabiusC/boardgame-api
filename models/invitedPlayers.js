module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "InvitedPlayer",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false },
            icon: { type: DataTypes.TEXT, allowNull: false },
            owner_ID: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            tableName: "invitedPlayers",
            timestamps: false,
        }
    );
};
