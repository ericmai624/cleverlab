module.exports = (db, DataTypes) => {
  const { ARRAY, STRING, INTEGER, DATE } = DataTypes;

  return db.define('Class', 
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: STRING,
    },
    {
      indexes: []
    }
  );
};