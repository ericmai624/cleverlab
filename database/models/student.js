export default (db, DataTypes) => {
  const { ARRAY, STRING, INTEGER, DATE } = DataTypes;

  return db.define('Student', 
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      firstName: STRING,
      lastName: STRING,
      location: STRING,
      education: STRING,
      diplomas: ARRAY(STRING),
      qualifications: ARRAY(STRING),
      email: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: STRING,
      salt: STRING,
      reset_password_expires: DATE,
      reset_password_token: STRING
    },
    {
      indexes: [ { unique: true, fields: ['email'] } ]
    }
  );
};
