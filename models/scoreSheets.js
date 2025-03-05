module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "ScoreSheet",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            game_ID: { type: DataTypes.INTEGER, allowNull: false },
            owner_ID: { type: DataTypes.INTEGER, allowNull: false },
            date_played: { type: DataTypes.DATE, allowNull: false },
            list_of_players: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false,
            },
            score_details: { type: DataTypes.JSONB, allowNull: false },
            time_duration: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            tableName: "scoreSheets",
            timestamps: false,
        }
    );
};
